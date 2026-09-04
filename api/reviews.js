import supabase from './db-client.js';


async function requireAdmin(req, res) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) { res.status(401).json({ error: 'Authentication required.' }); return false; }
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) { res.status(401).json({ error: 'Authentication required.' }); return false; }
  const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  if (!adminEmail || user.email?.toLowerCase() !== adminEmail) {
    res.status(403).json({ error: 'Administrator access required.' }); return false;
  }
  return true;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_published', true)
        .order('id', { ascending: false });

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      if (!(await requireAdmin(req, res))) return;
      const { client_name, profession, rating, review_text, portfolio_url } = req.body;
      const { data, error } = await supabase
        .from('reviews')
        .insert([{
          client_name,
          profession,
          rating: Number(rating) || 5,
          review_text,
          portfolio_url,
          verified: true
        }])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Reviews API error:', err);
    res.status(500).json({ error: err.message });
  }
}
