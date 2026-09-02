import React, { useState, useEffect } from 'react';
import { X, RefreshCw, CheckCircle, Search, Clock, FileText, UserCheck } from 'lucide-react';
import { Inquiry } from '../types';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [search, setSearch] = useState('');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (Array.isArray(data)) {
        setInquiries(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchInquiries();
  }, [isOpen]);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
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
            </select>

            <button
              onClick={fetchInquiries}
              className="p-2 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 hover:bg-emerald-900"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

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
