import React, { useState } from 'react';
import { Layers, Send, Cpu, CheckCircle2, Rocket, Share2, Search, ArrowRight, Clock, AlertCircle } from 'lucide-react';

interface WorkflowSectionProps {
  onOpenInquiry: () => void;
}

const STEPS = [
  {
    step: '01',
    title: 'Choose Package',
    desc: 'Select Starter (₱3,500), Professional (₱6,500), or Premium (₱10,500) based on your needs.',
    icon: Layers
  },
  {
    step: '02',
    title: 'Send Your Files',
    desc: 'Send us your current CV, TESDA/PRC certificates, workplace photos, and skill videos via Google Drive or WhatsApp.',
    icon: Send
  },
  {
    step: '03',
    title: 'We Build Your Site',
    desc: 'Our design team formats your experience, builds your digital portfolio, formats your ATS CV, and sets up your domain.',
    icon: Cpu
  },
  {
    step: '04',
    title: 'Review & Refine',
    desc: 'You review your live draft link and request any text, photo, or layout adjustments.',
    icon: CheckCircle2
  },
  {
    step: '05',
    title: 'Go Live',
    desc: 'We launch your custom domain (yourname.com or .ph) with SSL security and professional email.',
    icon: Rocket
  },
  {
    step: '06',
    title: 'Share Everywhere',
    desc: 'Add your link and digital QR Code to your email signature, WhatsApp, LinkedIn, and agency job applications.',
    icon: Share2
  }
];

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onOpenInquiry }) => {
  const [refCode, setRefCode] = useState('');
  const [trackerResult, setTrackerResult] = useState<any>(null);
  const [tracking, setTracking] = useState(false);
  const [trackerError, setTrackerError] = useState('');

  const handleTrackInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refCode.trim()) return;

    setTracking(true);
    setTrackerError('');
    setTrackerResult(null);

    try {
      const res = await fetch(`/api/inquiries?ref=${encodeURIComponent(refCode.trim().toUpperCase())}`);
      const data = await res.json();
      if (res.ok && data && data.length > 0) {
        setTrackerResult(data[0]);
      } else {
        setTrackerError('No inquiry found with this Reference Code. Please check your reference (e.g., WF-892140).');
      }
    } catch (err) {
      setTrackerError('Could not connect to tracker. Please try again.');
    } finally {
      setTracking(false);
    }
  };

  return (
    <section id="workflow" className="py-16 md:py-24 bg-[#0B100D] text-white border-b border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold">
            <span>CLEAR 6-STEP PROCESS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            From your files to a live portfolio in 6 clear steps.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            We handle all technical setup, domain registration, and mobile responsive design so you can focus on your job search.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {STEPS.map((stepItem, idx) => {
            const Icon = stepItem.icon;
            return (
              <div
                key={idx}
                className="bg-slate-950/80 border border-emerald-900/40 rounded-2xl p-6 space-y-3 relative hover:border-emerald-700/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800/60 text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-500 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-900">
                    STEP {stepItem.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white pt-2">{stepItem.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{stepItem.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Real-Time Order Tracker Widget */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-emerald-950/80 via-slate-950 to-emerald-950/80 border border-emerald-800/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              <span>Track Your Portfolio Order Status</span>
            </h3>
            <p className="text-xs text-gray-300">
              Already ordered? Enter your Reference Code (e.g. <code className="text-emerald-300 bg-emerald-950 px-1 rounded">WF-892140</code>) to check your current build status.
            </p>
          </div>

          <form onSubmit={handleTrackInquiry} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter Ref Code (e.g. WF-1001)"
              value={refCode}
              onChange={(e) => setRefCode(e.target.value)}
              className="flex-1 bg-slate-900 border border-emerald-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              disabled={tracking}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>{tracking ? 'Searching...' : 'Check Status'}</span>
            </button>
          </form>

          {/* Tracker Error */}
          {trackerError && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/60 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{trackerError}</span>
            </div>
          )}

          {/* Tracker Success Result */}
          {trackerResult && (
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-600/60 text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-900/50 pb-2">
                <span className="font-bold text-white text-sm">{trackerResult.full_name}</span>
                <span className="font-mono text-emerald-400 font-bold">{trackerResult.ref_code}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-gray-300">
                <div>Package: <strong className="text-white">{trackerResult.package_name}</strong></div>
                <div>Profession: <strong className="text-white">{trackerResult.profession}</strong></div>
                <div>Status: <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">{trackerResult.status}</span></div>
                <div>Total: <strong className="text-emerald-400">₱{trackerResult.total_price?.toLocaleString()}</strong></div>
              </div>
              <p className="text-[11px] text-gray-400 pt-1">
                Need to update assets or ask questions? Message us on WhatsApp with reference <strong>{trackerResult.ref_code}</strong>.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
