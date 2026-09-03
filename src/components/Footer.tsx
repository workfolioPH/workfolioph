import React from 'react';
import { ShieldCheck, PhoneCall, Mail, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070B08] text-gray-400 text-xs border-t border-emerald-900/30 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-sm">
                WF
              </div>
              <span className="text-white font-extrabold text-base">WorkFolio <span className="text-emerald-400">PH</span></span>
            </div>
            <p className="text-gray-400 leading-relaxed text-[11px]">
              Turn your experience, skills, certifications, ATS CV, photos and work videos into one professional digital portfolio link for employers.
            </p>
            <p className="text-[10px] text-emerald-400 font-mono">
              Packages from ₱3,500 • Fast 2–3 Day Delivery
            </p>
          </div>

          {/* Contact Col */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] text-emerald-400">Direct Contact</h4>
            <ul className="space-y-2 text-[11px]">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: +63 991 872 0311</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Email: workfolioph@proton.me</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Web: workfolioph.vercel.app</span>
              </li>
            </ul>
          </div>

          {/* Accepted Payments */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] text-emerald-400">Accepted Payments</h4>
            <div className="flex flex-wrap gap-1.5 text-[10px] text-emerald-300">
              <span className="bg-emerald-950 border border-emerald-800 px-2 py-1 rounded">GCash</span>
              <span className="bg-emerald-950 border border-emerald-800 px-2 py-1 rounded">Maya</span>
              <span className="bg-emerald-950 border border-emerald-800 px-2 py-1 rounded">BDO Transfer</span>
              <span className="bg-emerald-950 border border-emerald-800 px-2 py-1 rounded">BPI Transfer</span>
              <span className="bg-emerald-950 border border-emerald-800 px-2 py-1 rounded">PayPal</span>
            </div>
          </div>

          {/* Ethics Guarantee */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] text-emerald-400">Verification Ethics</h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              We present your true experience, real licenses, and actual work photos with professional polish. We do not manufacture fake credentials.
            </p>
          </div>

        </div>

        <div className="pt-6 border-t border-emerald-900/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <div>
            © {new Date().getFullYear()} WorkFolio PH. All rights reserved. Built for Filipino Professionals worldwide.
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Overseas & Local Filipino Workers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
