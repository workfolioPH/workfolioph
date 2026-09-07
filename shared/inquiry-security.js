import { randomBytes } from 'node:crypto';
import { CONTACT_METHODS } from './catalog.js';

const REF_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DOMAIN_RE = /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;

export function makeRef() {
  const bytes = randomBytes(10);
  let out = '';
  for (const b of bytes) out += REF_ALPHABET[b % REF_ALPHABET.length];
  return `WF-${out}`;
}

export function clientIp(req) {
  const xf = req.headers['x-forwarded-for'];
  if (typeof xf === 'string' && xf.trim()) return xf.split(',')[0].trim().slice(0, 64);
  const real = req.headers['x-real-ip'];
  if (typeof real === 'string' && real.trim()) return real.trim().slice(0, 64);
  return 'unknown';
}

export function trimStr(value, max) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

export function normalizeEmail(value) {
  return trimStr(value, 254).toLowerCase();
}

export function normalizeDomain(value) {
  let s = trimStr(value, 253).toLowerCase();
  s = s.replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/:\d+$/, '');
  return s;
}

export function isEmail(value) {
  return !!value && value.length <= 254 && EMAIL_RE.test(value);
}

export function isPhone(value) {
  const compact = String(value ?? '').trim();
  if (compact.length < 10 || compact.length > 20) return false;
  const digits = compact.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

export function isDomain(value) {
  if (!value) return true;
  return DOMAIN_RE.test(value);
}

export function honeypotFilled(body) {
  const traps = [body?.company_website, body?.website, body?.fax];
  return traps.some((v) => typeof v === 'string' && v.trim().length > 0);
}

/**
 * Validate and sanitize a public inquiry payload (contact fields only).
 * @returns {{ ok: true, fields: object } | { ok: false, error: string }}
 */
export function validateContactFields(body) {
  const full_name = trimStr(body?.full_name, 100);
  const email = normalizeEmail(body?.email);
  const phone = trimStr(body?.phone, 20);
  const profession = trimStr(body?.profession, 150) || 'General Professional';
  const custom_domain = normalizeDomain(body?.custom_domain);
  const notes = trimStr(body?.notes, 2000);
  const contact_method = trimStr(body?.contact_method, 20) || 'WhatsApp';

  if (full_name.length < 2) return { ok: false, error: 'Please enter your full name (2–100 characters).' };
  if (!isEmail(email)) return { ok: false, error: 'Please enter a valid email address.' };
  if (!isPhone(phone)) return { ok: false, error: 'Please enter a valid phone number.' };
  if (!CONTACT_METHODS.includes(contact_method)) {
    return { ok: false, error: 'Please choose WhatsApp, Viber, Email, or Phone as the contact method.' };
  }
  if (!isDomain(custom_domain)) {
    return { ok: false, error: 'Please enter a valid domain (e.g. mariasantos.com) or leave it blank.' };
  }

  return {
    ok: true,
    fields: { full_name, email, phone, profession, custom_domain, notes, contact_method },
  };
}

export async function verifyTurnstile(token, ip) {
  const secret = (process.env.TURNSTILE_SECRET_KEY || '').trim();
  if (!secret) return { ok: true, skipped: true };
  if (!token || typeof token !== 'string') return { ok: false };

  try {
    const body = new URLSearchParams();
    body.set('secret', secret);
    body.set('response', token);
    if (ip && ip !== 'unknown') body.set('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const data = await res.json();
    return { ok: !!data.success };
  } catch (err) {
    console.error('Turnstile verify failed:', err);
    return { ok: false };
  }
}

/**
 * Increment a sliding window counter. Fail-open if the table is missing.
 * @returns {Promise<boolean>} true if the request is allowed
 */
export async function bumpRateLimit(supabase, key, limit, windowMs) {
  try {
    const now = Date.now();
    const { data, error } = await supabase
      .from('rate_limits')
      .select('key, window_start, hit_count')
      .eq('key', key)
      .maybeSingle();

    if (error) {
      console.warn('rate_limits lookup skipped:', error.message);
      return true;
    }

    const windowStart = data ? Date.parse(data.window_start) : 0;
    const expired = !data || !Number.isFinite(windowStart) || now - windowStart >= windowMs;

    if (expired) {
      const { error: upErr } = await supabase.from('rate_limits').upsert({
        key,
        window_start: new Date(now).toISOString(),
        hit_count: 1,
      });
      if (upErr) {
        console.warn('rate_limits upsert skipped:', upErr.message);
        return true;
      }
      return true;
    }

    if ((data.hit_count || 0) >= limit) return false;

    const { error: incErr } = await supabase
      .from('rate_limits')
      .update({ hit_count: (data.hit_count || 0) + 1 })
      .eq('key', key);
    if (incErr) {
      console.warn('rate_limits update skipped:', incErr.message);
      return true;
    }
    return true;
  } catch (err) {
    console.warn('rate_limits failed open:', err);
    return true;
  }
}

export async function tooManyByEmail(supabase, email, limit, windowMs) {
  try {
    const since = new Date(Date.now() - windowMs).toISOString();
    const { count, error } = await supabase
      .from('inquiries')
      .select('id', { count: 'exact', head: true })
      .eq('email', email)
      .gte('created_at', since);
    if (error) {
      console.warn('email rate-limit skipped:', error.message);
      return false;
    }
    return (count || 0) >= limit;
  } catch (err) {
    console.warn('email rate-limit failed open:', err);
    return false;
  }
}
