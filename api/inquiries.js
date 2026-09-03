import supabase from './db-client.js';

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
  return true;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.PUBLIC_SITE_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      if (!(await requireAdmin(req, res))) return;
      const { ref, status } = req.query || {};
      
      let query = supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      
      if (ref) {
        query = query.eq('ref_code', ref);
      } else if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const {
        full_name,
        email,
        phone,
        contact_method,
        profession,
        package_name,
        selected_addons,
        total_price,
        custom_domain,
        notes
      } = req.body;

      if (!full_name || !email || !phone) {
        return res.status(400).json({ error: 'Full name, email, and phone are required.' });
      }

      // Generate reference code
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const ref_code = `WF-${randomNum}`;

      const newInquiry = {
        ref_code,
        full_name,
        email,
        phone,
        contact_method: contact_method || 'WhatsApp',
        profession: profession || 'General Professional',
        package_name: package_name || 'Professional',
        selected_addons: selected_addons || [],
        total_price: Number(total_price) || 6500,
        custom_domain: custom_domain || '',
        notes: notes || '',
        status: 'New'
      };

      const { data, error } = await supabase
        .from('inquiries')
        .insert([newInquiry])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      if (!(await requireAdmin(req, res))) return;
      const { id, status, notes } = req.body;
      if (!id) return res.status(400).json({ error: 'Inquiry ID is required' });

      const updates = {};
      if (status) updates.status = status;
      if (notes !== undefined) updates.notes = notes;

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
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
