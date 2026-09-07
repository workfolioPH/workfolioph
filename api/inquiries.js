import supabase from './db-client.js';
import { resolvePackageId, resolveAddonIds, quoteFromSelection, STATUSES } from '../shared/catalog.js';
import {
  makeRef,
  clientIp,
  honeypotFilled,
  validateContactFields,
  verifyTurnstile,
  bumpRateLimit,
  tooManyByEmail,
} from '../shared/inquiry-security.js';

const POST_IP_LIMIT = 5;
const POST_EMAIL_LIMIT = 3;
const GET_IP_LIMIT = 20;
const WINDOW_MS = 10 * 60 * 1000;

async function requireAdmin(req, res) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) {
    res.status(401).json({ error: 'Authentication required.' });
    return false;
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    res.status(401).json({ error: 'Authentication required.' });
    return false;
  }

  const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  if (!adminEmail || user.email?.toLowerCase() !== adminEmail) {
    res.status(403).json({ error: 'Administrator access required.' });
    return false;
  }
  return true;
}

async function insertWithRetry(row) {
  let lastError = null;
  for (let i = 0; i < 3; i++) {
    const payload = { ...row, ref_code: makeRef() };
    const { data, error } = await supabase.from('inquiries').insert([payload]).select().single();
    if (!error) return data;
    lastError = error;
    if (error.code !== '23505') throw error;
  }
  throw lastError || new Error('Could not allocate a reference code.');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.PUBLIC_SITE_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { ref, status } = req.query || {};

      if (ref) {
        const ip = clientIp(req);
        const allowed = await bumpRateLimit(supabase, `get:${ip}`, GET_IP_LIMIT, WINDOW_MS);
        if (!allowed) {
          res.setHeader('Retry-After', '600');
          return res.status(429).json({ error: 'Too many lookups. Please try again in a few minutes.' });
        }

        const { data, error } = await supabase
          .from('inquiries')
          .select('ref_code, package_name, status, created_at')
          .eq('ref_code', String(ref).trim().toUpperCase())
          .limit(1);
        if (error) throw error;
        return res.status(200).json(data || []);
      }

      if (!(await requireAdmin(req, res))) return;

      let query = supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      if (status) query = query.eq('status', status);

      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const ip = clientIp(req);

      if (honeypotFilled(body)) {
        return res.status(201).json({
          ref_code: makeRef(),
          full_name: 'Guest',
          package_name: 'Professional',
          total_price: 6500,
          status: 'New',
        });
      }

      const ipAllowed = await bumpRateLimit(supabase, `post:${ip}`, POST_IP_LIMIT, WINDOW_MS);
      if (!ipAllowed) {
        res.setHeader('Retry-After', '600');
        return res.status(429).json({ error: 'Too many inquiries from this network. Please try again in 10 minutes.' });
      }

      const turnstile = await verifyTurnstile(body.turnstile_token, ip);
      if (!turnstile.ok) {
        return res.status(400).json({ error: 'Please complete the anti-bot check and try again.' });
      }

      const validated = validateContactFields(body);
      if (!validated.ok) return res.status(400).json({ error: validated.error });
      const fields = validated.fields;

      if (await tooManyByEmail(supabase, fields.email, POST_EMAIL_LIMIT, WINDOW_MS)) {
        res.setHeader('Retry-After', '600');
        return res.status(429).json({ error: 'Too many inquiries for this email. Please try again in 10 minutes.' });
      }

      const packageId = resolvePackageId(body.package_id || body.package_name);
      if (!packageId) {
        return res.status(400).json({ error: 'Please choose a valid package (Starter, Professional, Premium, or Business Web Build).' });
      }

      const addonIds = resolveAddonIds(body.addon_ids ?? body.selected_addons ?? []);
      if (!addonIds) {
        return res.status(400).json({ error: 'One or more selected add-ons are not valid.' });
      }

      const quote = quoteFromSelection(packageId, addonIds);
      if (!quote) {
        return res.status(400).json({ error: 'Could not price this selection.' });
      }

      if (body.total_price != null && Number(body.total_price) !== quote.total_price) {
        console.warn('Ignoring client total_price', {
          client: body.total_price,
          server: quote.total_price,
          package_id: packageId,
          addon_ids: addonIds,
        });
      }

      const newInquiry = {
        full_name: fields.full_name,
        email: fields.email,
        phone: fields.phone,
        contact_method: fields.contact_method,
        profession: fields.profession,
        package_name: quote.package_name,
        selected_addons: quote.selected_addons,
        total_price: quote.total_price,
        custom_domain: fields.custom_domain,
        notes: fields.notes,
        status: 'New',
      };

      const data = await insertWithRetry(newInquiry);
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      if (!(await requireAdmin(req, res))) return;
      const { id, status, notes } = req.body || {};
      if (!id) return res.status(400).json({ error: 'Inquiry ID is required' });

      const updates = {};
      if (status) {
        if (!STATUSES.includes(status)) {
          return res.status(400).json({ error: 'Invalid status.' });
        }
        updates.status = status;
      }
      if (notes !== undefined) updates.notes = String(notes).slice(0, 2000);
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'No valid fields to update.' });
      }

      const { data, error } = await supabase
        .from('inquiries')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Inquiries API error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
