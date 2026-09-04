import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Search, UserCheck } from 'lucide-react';
import { Inquiry } from '../types';
import supabase, { isSupabaseConfigured } from '../lib/supabase';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [session, setSession] = useState<Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isSupabaseConfigured) {
      setAuthError('Supabase is not configured for this deployment. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel environment variables, then redeploy.');
      return;
    }
    setAuthLoading(true);
    setAuthError('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError('Invalid email or password.');
    else setSession(data.session);
    setAuthLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setInquiries([]);
  };

  const fetchInquiries = async () => {
    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (!currentSession) { setLoading(false); return; }
      setLoading(true);
      const res = await fetch('/api/inquiries', {
        headers: { Authorization: `Bearer ${currentSession.access_token}` }
      });
      const data = await res.json().catch(() => null);
      if (res.ok && Array.isArray(data)) {
        setInquiries(data);
        setLoadError('');
      } else {
        setLoadError((data && data.error) || `Inquiries API returned HTTP ${res.status}. Check that the /api/inquiries function is deployed and SUPABASE_SERVICE_ROLE_KEY + ADMIN_EMAIL are set in Vercel.`);
      }
    } catch (err) {
      console.error(err);
      setLoadError('Could not reach the inquiries API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchInquiries() awaits getSession() before any state update, so this is
    // not a synchronous setState-in-effect; suppress the conservative rule.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isOpen && session) fetchInquiries();
  }, [isOpen, session]);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (!currentSession) return;
      const res = await fetch('/api/inquiries', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentSession.access_token}`
        },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        fetchInquiries();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  if (!session) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <form onSubmit={signIn} className="relative w-full max-w-sm bg-[#0C1210] border border-emerald-800/80 rounded-3xl p-6 text-white shadow-2xl space-y-4">
          <button type="button" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
          <h2 className="text-xl font-bold">Admin sign in</h2>
          <p className="text-xs text-gray-400">Sign in with the administrator account created in Supabase.</p>
          {authError && <div className="p-3 rounded-xl bg-red-950 border border-red-800 text-red-200 text-xs">{authError}</div>}
          <input type="email" required placeholder="Admin email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-900 border border-emerald-800 rounded-xl px-3 py-2 text-sm" />
          <input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-900 border border-emerald-800 rounded-xl px-3 py-2 text-sm" />
          <button disabled={authLoading} className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold disabled:opacity-50">{authLoading ? 'Signing in…' : 'Sign in'}</button>
        </form>
      </div>
    );
  }

  const filtered = inquiries.filter(item => {
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchesSearch = item.full_name.toLowerCase().includes(search.toLowerCase()) || item.ref_code.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0C1210] border border-emerald-800/80 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-900/50">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <span>WorkFolio PH Admin Inquiry Dashboard</span>
            </h2>
            <p className="text-xs text-gray-400">Manage client submissions, update build status, and track revenue.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={signOut} className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 hover:bg-emerald-900 text-xs font-semibold">
              Sign out
            </button>
            <button onClick={onClose} aria-label="Close admin dashboard" className="p-2 rounded-full text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by name or Ref Code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-900 border border-emerald-900 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400 w-full sm:w-64"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-900 border border-emerald-900 rounded-xl px-3 py-1.5 text-xs text-white"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Assets Received">Assets Received</option>
              <option value="In Progress">In Progress</option>
              <option value="Reviewing">Reviewing</option>
              <option value="Live">Live</option>
              <option value="Completed">Completed</option>
            </select>

            <button
              onClick={fetchInquiries}
              className="p-2 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 hover:bg-emerald-900"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loadError && (
          <div className="mb-4 p-3 rounded-xl bg-red-950 border border-red-800 text-red-200 text-xs">
            {loadError}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-12 text-xs text-gray-400">Loading client inquiries from database...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-xs text-gray-400">No client inquiries found matching filter.</div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-emerald-900/60 text-emerald-400 font-mono">
                  <th className="p-2.5">REF</th>
                  <th className="p-2.5">CLIENT NAME</th>
                  <th className="p-2.5">PROFESSION</th>
                  <th className="p-2.5">PACKAGE</th>
                  <th className="p-2.5">TOTAL</th>
                  <th className="p-2.5">CONTACT</th>
                  <th className="p-2.5">STATUS</th>
                  <th className="p-2.5">UPDATE STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-950">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-emerald-950/30">
                    <td className="p-2.5 font-mono text-emerald-300 font-bold">{item.ref_code}</td>
                    <td className="p-2.5 font-bold text-white">{item.full_name}</td>
                    <td className="p-2.5 text-gray-300">{item.profession}</td>
                    <td className="p-2.5 text-emerald-200">{item.package_name}</td>
                    <td className="p-2.5 font-mono text-emerald-400 font-bold">₱{item.total_price?.toLocaleString()}</td>
                    <td className="p-2.5 text-gray-300">
                      <div>{item.phone}</div>
                      <div className="text-[10px] text-gray-500">{item.contact_method}</div>
                    </td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2.5">
                      <select
                        value={item.status}
                        onChange={(e) => handleUpdateStatus(item.id!, e.target.value)}
                        className="bg-slate-900 border border-emerald-800 rounded px-2 py-1 text-[11px] text-gray-300"
                      >
                        <option value="New">New</option>
                        <option value="Assets Received">Assets Received</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Live">Live</option>
              <option value="Completed">Completed</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};
