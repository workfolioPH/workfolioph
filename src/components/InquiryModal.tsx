import React, { useState } from 'react';
import { X, Send, CheckCircle, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react';
import { Inquiry } from '../types';
import { quoteFromSelection, resolveAddonIds, resolvePackageId } from '../lib/catalog';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPackage?: string;
  preselectedAddons?: string[];
  preselectedPrice?: number;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedPackage = 'professional',
  preselectedAddons = [],
  preselectedPrice = 6500
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactMethod, setContactMethod] = useState<'WhatsApp' | 'Viber' | 'Email' | 'Phone'>('WhatsApp');
  const [profession, setProfession] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<Inquiry | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const packageId = resolvePackageId(preselectedPackage) || 'professional';
  const addonIds = resolveAddonIds(preselectedAddons) || [];
  const quote = quoteFromSelection(packageId, addonIds);
  const estimate = quote?.total_price ?? preselectedPrice;
  const packageLabel = quote?.package_name ?? 'Professional';

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      setErrorMsg('Please enter your Name, Email, and Phone number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone,
          contact_method: contactMethod,
          profession: profession || 'General Professional',
          package_id: packageId,
          addon_ids: addonIds,
          custom_domain: customDomain,
          notes,
          company_website: honeypot
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessData(data);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry.');
      }
    } catch {
      setErrorMsg('Network error. Please try again or contact us directly on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappText = successData
    ? encodeURIComponent(`Hi WorkFolio PH, I submitted my inquiry ${successData.ref_code} for the ${successData.package_name} package! Name: ${successData.full_name}`)
    : '';

  return (
    <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-3 sm:p-4 pt-16 sm:pt-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="inquiry-modal-panel relative w-full max-w-xl max-h-[calc(100dvh-5rem)] sm:max-h-[calc(100dvh-2rem)] overflow-y-auto bg-[#0D1410] border border-emerald-800/80 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-2 sm:my-8">

        <button
          onClick={onClose}
          aria-label="Close order and consultation dialog"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#0D1410] text-gray-300 hover:text-white hover:bg-emerald-950 shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {successData ? (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-400 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Inquiry Received!</h3>
              <p className="text-xs text-emerald-300 font-mono">
                Reference Code: <strong className="text-base text-white">{successData.ref_code}</strong>
              </p>
              <p className="text-xs text-gray-300 max-w-md mx-auto">
                Thank you, <strong>{successData.full_name}</strong>. Confirmed estimate for the <strong>{successData.package_name}</strong> package: <strong>₱{Number(successData.total_price).toLocaleString()}</strong>.
              </p>
            </div>

            <ol className="p-4 rounded-xl bg-slate-900 border border-emerald-800 text-xs text-left space-y-3">
              <li className="flex gap-3">
                <span className="font-mono text-emerald-400 font-bold">1</span>
                <div>
                  <p className="font-bold text-emerald-400 uppercase tracking-wider">Inquiry received</p>
                  <p className="text-gray-300">We have your details and this reference code.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-emerald-400 font-bold">2</span>
                <div>
                  <p className="font-bold text-emerald-400 uppercase tracking-wider">Send your CV & supporting files</p>
                  <p className="text-gray-300">Use the WhatsApp button below to attach your current CV, certificates, photos, and videos.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-emerald-400 font-bold">3</span>
                <div>
                  <p className="font-bold text-emerald-400 uppercase tracking-wider">We confirm project + payment</p>
                  <p className="text-gray-300">WorkFolio PH confirms the scope, you pay via GCash / Maya / Bank, then we build your portfolio.</p>
                </div>
              </li>
            </ol>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/639918720311?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Open WhatsApp Now</span>
              </a>
              <button
                onClick={onClose}
                className="py-3 px-6 rounded-xl bg-emerald-950 text-emerald-300 hover:bg-emerald-900 font-semibold text-xs border border-emerald-800"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 border-b border-emerald-900/50 pb-3">
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WORKFOLIO PH ORDER & CONSULTATION</span>
              </div>
              <h3 className="text-xl font-bold text-white">Start Your Digital Portfolio</h3>
              <p className="text-xs text-gray-400">
                Selected Package: <strong className="text-emerald-300">{packageLabel}</strong> (Est. ₱{estimate.toLocaleString()})
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950 border border-red-800 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company_website">Company website</label>
              <input
                id="company_website"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  placeholder="e.g. Maria Santos"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-900 border border-emerald-800/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  maxLength={254}
                  placeholder="e.g. maria@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-emerald-800/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Phone Number (WhatsApp/Viber) *</label>
                <input
                  type="text"
                  required
                  maxLength={20}
                  placeholder="+63 917 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-emerald-800/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Preferred Contact Method</label>
                <select
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value as 'WhatsApp' | 'Viber' | 'Email' | 'Phone')}
                  className="w-full bg-slate-900 border border-emerald-800/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Viber">Viber</option>
                  <option value="Email">Email</option>
                  <option value="Phone">Phone Call</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Profession / Job Field</label>
                <input
                  type="text"
                  maxLength={150}
                  placeholder="e.g. ICU Nurse / Civil Engineer / Welder"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full bg-slate-900 border border-emerald-800/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Your Own Domain (optional — leave blank for a free subdomain)</label>
                <input
                  type="text"
                  maxLength={253}
                  placeholder="e.g. mariasantos.com"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  className="w-full bg-slate-900 border border-emerald-800/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Additional Notes / Questions</label>
              <textarea
                rows={2}
                maxLength={2000}
                placeholder="Timeline, target country, special files — and your design taste: favorite colors or example sites you like..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-900 border border-emerald-800/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-sm hover:from-emerald-400 hover:to-teal-300 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Submitting…' : 'Get My Portfolio Started'}</span>
              </button>
            </div>

            <div className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>We present your experience accurately. We never invent fake information.</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
