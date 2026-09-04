import React, { useState } from 'react';
import { PhoneCall, Menu, X, ArrowRight, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  onOpenInquiry: (packageName?: string) => void;
  onOpenAdmin: () => void;
  onOpenCalculator: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiry, onOpenAdmin, onOpenCalculator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B100D]/90 backdrop-blur-md border-b border-emerald-900/30 text-white transition-all">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-emerald-200 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-emerald-800/40">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>🇵🇭 Digital Portfolios for Filipino Overseas & Local Professionals</span>
        <span className="hidden sm:inline-block text-emerald-400/60">•</span>
        <span className="hidden sm:inline font-semibold text-emerald-300">Turnaround in 2–3 Days</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0B100D] rounded-[10px] flex items-center justify-center font-black text-emerald-400 text-xl tracking-tight">
              WF
            </div>
          </div>
          <div>
            <div className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              WorkFolio <span className="text-emerald-400">PH</span>
            </div>
            <div className="text-[10px] text-emerald-400/80 font-mono uppercase tracking-widest">
              Digital Career Portfolios
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <button onClick={() => scrollToSection('preview')} className="hover:text-emerald-400 transition-colors">
            Live Demos
          </button>
          <button onClick={() => scrollToSection('pricing')} className="hover:text-emerald-400 transition-colors">
            Packages & Pricing
          </button>
          <button onClick={onOpenCalculator} className="hover:text-emerald-400 transition-colors">
            Custom Quote
          </button>
          <button onClick={() => scrollToSection('workflow')} className="hover:text-emerald-400 transition-colors">
            How It Works
          </button>
          <button onClick={() => scrollToSection('addons')} className="hover:text-emerald-400 transition-colors">
            Add-ons
          </button>
          <button onClick={() => scrollToSection('faq')} className="hover:text-emerald-400 transition-colors">
            FAQ
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenAdmin}
            className="p-2 text-gray-400 hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-950/40"
            title="Admin Inquiry Dashboard"
          >
            <LayoutDashboard className="w-5 h-5" />
          </button>
          
          <a
            href="https://wa.me/639918720311?text=Hi%20WorkFolio%20PH,%20I'd%20like%20to%20ask%20about%20a%20digital%20portfolio."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/80 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            WhatsApp
          </a>

          <button
            onClick={() => onOpenInquiry()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:from-emerald-400 hover:to-teal-500 shadow-md shadow-emerald-900/30 transition-all transform hover:-translate-y-0.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenInquiry()}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-500 text-slate-950"
          >
            Inquire
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-emerald-950/50"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D1410] border-b border-emerald-900/50 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollToSection('preview')}
            className="block w-full text-left py-2 text-sm font-medium text-gray-300 hover:text-emerald-400"
          >
            Live Demos & Examples
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="block w-full text-left py-2 text-sm font-medium text-gray-300 hover:text-emerald-400"
          >
            Packages & Pricing (from ₱3,500)
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenCalculator(); }}
            className="block w-full text-left py-2 text-sm font-medium text-gray-300 hover:text-emerald-400"
          >
            Custom Quote Calculator
          </button>
          <button
            onClick={() => scrollToSection('workflow')}
            className="block w-full text-left py-2 text-sm font-medium text-gray-300 hover:text-emerald-400"
          >
            6-Step Process & Order Tracker
          </button>
          <button
            onClick={() => scrollToSection('addons')}
            className="block w-full text-left py-2 text-sm font-medium text-gray-300 hover:text-emerald-400"
          >
            Add-ons (ATS CV, Videos, Photos)
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 text-sm font-medium text-gray-300 hover:text-emerald-400"
          >
            Questions & Answers
          </button>
          
          <div className="pt-3 border-t border-emerald-900/40 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="w-full text-center py-2 text-xs text-gray-400 hover:text-emerald-400 border border-emerald-900/50 rounded-lg"
            >
              Admin Dashboard
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenInquiry(); }}
              className="w-full py-2.5 text-xs font-bold text-center rounded-lg bg-emerald-500 text-slate-950"
            >
              Start Portfolio Order
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
