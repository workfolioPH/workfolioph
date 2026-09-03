import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, Play, FileText, QrCode, Globe, Star, Sparkles, Video, Image, ChevronRight } from 'lucide-react';

interface HeroProps {
  onOpenInquiry: (pkg?: string) => void;
  onScrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry, onScrollTo }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B100D] via-[#0E1712] to-[#0B100D] text-white pt-8 pb-16 md:pt-16 md:pb-24 border-b border-emerald-900/30">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs font-medium shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Built for Filipino Overseas & Local Professionals</span>
              <span className="hidden sm:inline bg-emerald-800/50 text-emerald-200 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold">
                From ₱3,500
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Your experience deserves <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                more than an email attachment.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Turn your years of experience, skills, certifications, ATS CV, workplace photos, and skill videos into <strong className="text-white font-semibold">one professional digital portfolio link</strong> employers can open on any device.
            </p>

            {/* Key feature pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-gray-200 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-900/50 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>One Shareable Link</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-900/50 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ATS-Friendly CV</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-900/50 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Photos & Videos</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-900/50 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Digital QR Code</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-900/50 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Custom Domain</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-900/50 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2–3 Day Delivery</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onOpenInquiry('Professional')}
                className="w-full sm:w-auto px-7 py-4 text-sm font-bold rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-slate-950 hover:from-emerald-400 hover:to-teal-300 shadow-lg shadow-emerald-950/80 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                <span>Order Professional Package (₱6,500)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onScrollTo('preview')}
                className="w-full sm:w-auto px-6 py-4 text-sm font-semibold rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-800/80 text-emerald-200 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>See Live Portfolio Demos</span>
              </button>
            </div>

            {/* Trust Micro Footer */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-gray-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
                <span className="text-gray-300 ml-1 font-normal">Sample layout preview</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>GCash / Maya / Bank Accepted</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Column (Interactive Portfolio Mockup Frame) */}
          <div className="lg:col-span-5 relative">
            
            {/* Mock Phone / Portfolio Device Container */}
            <div className="relative mx-auto max-w-sm rounded-3xl bg-slate-950 border-4 border-emerald-900/60 p-4 shadow-2xl shadow-emerald-950/90 overflow-hidden transform hover:scale-[1.01] transition-transform">
              
              {/* Header Bar inside mockup */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
                  maria-santos.workfolio.ph
                </div>
              </div>

              {/* Mockup Card Content */}
              <div className="pt-4 space-y-4">
                
                {/* Profile Header */}
                <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-950/80 to-slate-900 p-3 rounded-xl border border-emerald-800/40">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                    alt="Sample Portfolio Nurse"
                    className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-1">
                      Maria Santos, RN
                      <span className="text-emerald-400 text-xs">✓ Verified</span>
                    </h3>
                    <p className="text-xs text-emerald-300">Senior ICU & Dialysis Nurse</p>
                    <p className="text-[10px] text-gray-400">Doha, Qatar • 8 Years Exp</p>
                  </div>
                </div>

                {/* Quick Stats Grid inside mockup */}
                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div className="bg-slate-900/90 border border-emerald-900/40 p-2 rounded-lg">
                    <div className="font-bold text-emerald-400 text-xs">12+</div>
                    <div className="text-gray-400">Certifications</div>
                  </div>
                  <div className="bg-slate-900/90 border border-emerald-900/40 p-2 rounded-lg">
                    <div className="font-bold text-emerald-400 text-xs">8 Yrs</div>
                    <div className="text-gray-400">Experience</div>
                  </div>
                  <div className="bg-slate-900/90 border border-emerald-900/40 p-2 rounded-lg">
                    <div className="font-bold text-emerald-400 text-xs">100%</div>
                    <div className="text-gray-400">ATS Verified</div>
                  </div>
                </div>

                {/* Media Showcase Preview inside mockup */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-emerald-300 font-semibold">
                    <span className="flex items-center gap-1">
                      <Image className="w-3.5 h-3.5" /> Work Proof & Videos
                    </span>
                    <span className="text-[10px] text-gray-400">18 items</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-emerald-900/50 group">
                      <img
                        src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=200&q=80"
                        alt="ICU Procedure"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center">
                        <Play className="w-4 h-4 text-emerald-300 fill-emerald-300" />
                      </div>
                    </div>
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-900 border border-emerald-900/50">
                      <img
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=200&q=80"
                        alt="Dialysis Equipment Setup"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-900 border border-emerald-900/50">
                      <img
                        src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=200&q=80"
                        alt="BLS License Certificate"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Download CV & QR Button Row inside mockup */}
                <div className="pt-2 flex gap-2">
                  <div className="flex-1 py-2 text-center text-xs font-bold rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download ATS CV</span>
                  </div>
                  <div className="px-3 py-2 text-xs rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 flex items-center justify-center">
                    <QrCode className="w-4 h-4" />
                  </div>
                </div>

              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-slate-950 px-3.5 py-1.5 rounded-full font-bold text-xs shadow-xl flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Live Portfolio Link</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
