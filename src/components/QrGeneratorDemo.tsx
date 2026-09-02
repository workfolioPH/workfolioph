import React, { useState } from 'react';
import { QrCode, Download, Share2, Sparkles, User, Globe, Check } from 'lucide-react';

export const QrGeneratorDemo: React.FC = () => {
  const [name, setName] = useState('Juan Dela Cruz');
  const [title, setTitle] = useState('Senior Piping Engineer');
  const [subdomain, setSubdomain] = useState('juandelacruz');
  const [copied, setCopied] = useState(false);

  const fullUrl = `https://${subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '') || 'yourname'}.workfolio.ph`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 md:py-24 bg-[#090E0B] text-white border-b border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold">
            <QrCode className="w-3.5 h-3.5" />
            <span>DIGITAL QR BUSINESS CARD FEATURE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your portfolio in one instant scan.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Every WorkFolio PH includes a downloadable QR code badge. Print it on physical business cards, save it on your phone lock screen, or insert it into your email signature.
          </p>
        </div>

        {/* Live Interactive Card Builder */}
        <div className="max-w-4xl mx-auto bg-slate-950 border border-emerald-900/50 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Form Inputs */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                Test QR Digital Business Card:
              </h3>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-emerald-800/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Your Job Title / Profession</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-emerald-800/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Desired WorkFolio Subdomain</label>
                <div className="flex items-center bg-slate-900 border border-emerald-800/60 rounded-xl px-3 py-2 text-sm text-gray-300 font-mono">
                  <span>https://</span>
                  <input
                    type="text"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value)}
                    className="bg-transparent text-emerald-300 font-bold focus:outline-none flex-1 px-1"
                  />
                  <span>.workfolio.ph</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCopyLink}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-950 border border-emerald-800 hover:bg-emerald-900 text-emerald-300 text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? 'Link Copied!' : 'Copy Demo Link'}</span>
                </button>
              </div>
            </div>

            {/* Generated Card Visual Preview */}
            <div className="bg-gradient-to-br from-emerald-950/90 to-slate-900 border-2 border-emerald-500/50 rounded-2xl p-6 text-center space-y-4 shadow-xl">
              <div className="inline-block bg-emerald-500 text-slate-950 font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                WorkFolio Digital Business Card
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-bold text-white">{name || 'Your Name'}</h4>
                <p className="text-xs text-emerald-300 font-medium">{title || 'Your Profession'}</p>
              </div>

              {/* Simulated QR Code SVG Graphic */}
              <div className="bg-white p-4 rounded-xl max-w-[180px] mx-auto shadow-inner border-2 border-emerald-300">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path fill="#0B100D" d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v20 h-10 z M40,40 h20 v20 h-20 z M70,40 h20 v10 h-20 z M10,40 h20 v10 h-20 z M70,70 h30 v30 h-30 z M80,80 h10 v10 h-10 z M40,70 h20 v20 h-20 z" />
                </svg>
              </div>

              <div className="text-[11px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-800 inline-block">
                {fullUrl}
              </div>

              <p className="text-[10px] text-gray-400">
                Scan with any smartphone camera to open portfolio immediately.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
