import React, { useState } from 'react';
import { Calculator, CheckSquare, Square, ArrowRight, ShieldCheck, X } from 'lucide-react';

interface PricingCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiryWithCustom: (packageName: string, addons: string[], price: number) => void;
}

const BASE_OPTIONS = [
  { id: 'Starter', name: 'Starter Package', price: 3500, desc: 'Single-page portfolio + free subdomain' },
  { id: 'Professional', name: 'Professional Package', price: 6500, desc: 'Includes 1-yr custom domain (.com/.ph) + email' },
  { id: 'Premium', name: 'Premium Package', price: 10500, desc: 'Multi-section + application suite + 1-yr updates' }
];

const ADDON_OPTIONS = [
  { id: 'ats-cv', name: 'ATS-Friendly CV Rewrite', price: 2500, desc: 'Keyword optimization + ATS PDF formatting' },
  { id: 'cover-letter', name: 'Custom Cover Letter & Email Copy', price: 1000, desc: 'Tailored application letter for target job role' },
  { id: 'video-edit', name: 'Professional Skill Video Editing (3 clips)', price: 2500, desc: 'Trimming, audio boost, captions & TESDA badges' },
  { id: 'photo-grade', name: 'Workplace Photo Enhancement (15 photos)', price: 1500, desc: 'Color grading, lighting fix & background cleanup' },
  { id: 'linkedin-opt', name: 'LinkedIn Profile Optimization Guide', price: 1200, desc: 'Profile summary, headline & banner graphic' },
  { id: 'annual-care', name: '1-Year Annual Portfolio Maintenance', price: 1500, desc: 'Quarterly content updates & domain renewal care' }
];

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ isOpen, onClose, onOpenInquiryWithCustom }) => {
  const [selectedBase, setSelectedBase] = useState('Professional');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['ats-cv']);

  const baseObj = BASE_OPTIONS.find(b => b.id === selectedBase) || BASE_OPTIONS[1];
  
  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADDON_OPTIONS.find(a => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const grandTotal = baseObj.price + addonsTotal;

  const handleOrder = () => {
    const addonNames = selectedAddons.map(id => ADDON_OPTIONS.find(a => a.id === id)?.name || id);
    onOpenInquiryWithCustom(baseObj.name, addonNames, grandTotal);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <section id="calculator" role="dialog" aria-modal="true" aria-labelledby="calculator-title" className="relative w-full max-w-7xl max-h-[92vh] overflow-y-auto py-8 md:py-12 bg-[#090E0B] text-white border border-emerald-900/50 rounded-3xl">
        <button onClick={onClose} aria-label="Close price calculator" className="absolute top-4 right-4 z-10 p-2 rounded-full text-gray-400 hover:text-white hover:bg-emerald-950">
          <X className="w-5 h-5" />
        </button>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE COST CALCULATOR</span>
          </div>
          <h2 id="calculator-title" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Build your custom package estimate.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Select your core base package and toggle optional add-ons to see your exact one-time total in Philippine Pesos (₱).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step 1: Base Package */}
            <div className="bg-slate-950/80 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <span>1. Select Base Package</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BASE_OPTIONS.map((base) => (
                  <div
                    key={base.id}
                    onClick={() => setSelectedBase(base.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedBase === base.id
                        ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-md'
                        : 'bg-slate-900/60 border-emerald-900/30 text-gray-300 hover:border-emerald-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">{base.name}</span>
                      <span className="font-extrabold text-emerald-400 text-sm">₱{base.price.toLocaleString()}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-tight">{base.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Add-on Services */}
            <div className="bg-slate-950/80 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <span>2. Choose Optional Add-Ons</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADDON_OPTIONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'bg-emerald-950/70 border-emerald-500 text-white'
                          : 'bg-slate-900/60 border-emerald-900/30 text-gray-300 hover:border-emerald-800'
                      }`}
                    >
                      <div className="mt-0.5 text-emerald-400">
                        {isChecked ? <CheckSquare className="w-5 h-5 fill-emerald-900" /> : <Square className="w-5 h-5 text-gray-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs">{addon.name}</span>
                          <span className="font-mono text-xs text-emerald-300 font-bold">+₱{addon.price.toLocaleString()}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5">{addon.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Live Estimate Summary Sticky Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-gradient-to-b from-emerald-950 via-slate-950 to-slate-950 border-2 border-emerald-500/60 rounded-2xl p-6 space-y-6 shadow-2xl shadow-emerald-950">
              
              <div className="flex items-center justify-between border-b border-emerald-900/50 pb-4">
                <h3 className="font-extrabold text-white text-base">Cost Summary</h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  PHP (₱)
                </span>
              </div>

              {/* Line items */}
              <div className="space-y-3 text-xs text-gray-300">
                <div className="flex items-center justify-between">
                  <span>{baseObj.name}</span>
                  <span className="font-mono font-bold text-white">₱{baseObj.price.toLocaleString()}</span>
                </div>

                {selectedAddons.length > 0 && (
                  <div className="pt-2 border-t border-emerald-900/40 space-y-2">
                    <p className="text-[11px] text-emerald-400 font-semibold">Selected Add-ons ({selectedAddons.length}):</p>
                    {selectedAddons.map(id => {
                      const item = ADDON_OPTIONS.find(a => a.id === id);
                      if (!item) return null;
                      return (
                        <div key={id} className="flex items-center justify-between pl-2 text-[11px] text-gray-300">
                          <span className="truncate max-w-[180px]">• {item.name}</span>
                          <span className="font-mono">₱{item.price.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Total Row */}
              <div className="pt-4 border-t-2 border-emerald-800 space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-white">Estimated Total:</span>
                  <span className="text-3xl font-black text-emerald-400">₱{grandTotal.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-gray-400 text-right">One-time payment • No monthly fees</p>
              </div>

              {/* Action Button */}
              <button
                onClick={handleOrder}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-sm hover:from-emerald-400 hover:to-teal-300 shadow-lg shadow-emerald-950 transition-all flex items-center justify-center gap-2"
              >
                <span>Order Custom Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-gray-400 text-center space-y-1">
                <p className="flex items-center justify-center gap-1 text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5" /> GCash, Maya, BDO, BPI & PayPal
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
      </section>
    </div>
  );
};
