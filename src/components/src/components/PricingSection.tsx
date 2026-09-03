import React from 'react';
import { Check, Star, ShieldCheck, Zap, Sparkles, ArrowRight, Info } from 'lucide-react';

interface PricingSectionProps {
  onOpenInquiry: (packageName: string) => void;
  onScrollToCalculator: () => void;
}

export const PACKAGES = [
  {
    name: 'Starter',
    price: 3500,
    priceFormatted: '₱3,500',
    tagline: 'Essential digital portfolio for job applications & overseas submissions.',
    popular: false,
    turnaround: '2–3 Business Days',
    revisions: '2 Rounds of Revisions',
    subdomain: 'yourname.workfolio.ph',
    features: [
      'Single-page mobile-first responsive portfolio',
      'Free subdomain (yourname.workfolio.ph)',
      'Professional profile summary & contact buttons',
      'Detailed work history & education timeline',
      'Core skills & certifications list with badges',
      'Up to 10 workplace photos embedded',
      'Up to 2 embedded skill demonstration videos',
      'Downloadable ATS CV button (PDF)',
      'Digital QR Code for business cards',
      'Direct WhatsApp, Email & Phone action buttons'
    ]
  },
  {
    name: 'Professional',
    price: 6500,
    priceFormatted: '₱6,500',
    tagline: 'Our most popular all-inclusive package with custom domain & email.',
    popular: true,
    turnaround: '3–5 Business Days',
    revisions: '3 Rounds of Revisions',
    subdomain: 'yourname.com or .ph included (1 Year)',
    features: [
      'Everything in Starter Package, PLUS:',
      'Your Own Custom Domain (.com or .ph) for 1 Year',
      'Custom Domain DNS configuration & SSL security',
      'Up to 25 workplace photos in high-res lightbox gallery',
      'Up to 5 embedded HD skill videos with custom thumbnails',
      'Professional ATS CV review & formatting polish',
      'Custom Professional Email setup (contact@yourname.com)',
      'Interactive certificate viewer modal',
      'Customized QR Code badge graphic asset for print'
    ]
  },
  {
    name: 'Premium',
    price: 10500,
    priceFormatted: '₱10,500',
    tagline: 'Complete career branding suite with video editing & application materials.',
    popular: false,
    turnaround: '4–6 Business Days',
    revisions: 'Unlimited Revisions',
    subdomain: 'yourname.com / custom setup + 1 Year Updates',
    features: [
      'Everything in Professional Package, PLUS:',
      'Multi-section custom designed layout & animations',
      'Unlimited work photos & video showcases',
      'Full Application Materials Bundle (ATS CV rewrite + Cover Letter + Email template)',
      'Professional Skill Video Editing (up to 3 video trims & subtitles)',
      'Photo enhancement & color grading (up to 15 photos)',
      'LinkedIn Profile optimization guide & banner background',
      '1 Year Free Portfolio Content Updates (Quarterly)',
      'Printable NFC Business Card design file'
    ]
  }
];

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenInquiry, onScrollToCalculator }) => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#0B100D] text-white border-b border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold">
            <span>TRANSPARENT PHILIPPINE PESO PRICING</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Choose how you want to show up to employers.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            No hidden monthly subscription fees. One-time setup payment in PHP via GCash, Maya, Bank Transfer, or PayPal.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? 'bg-gradient-to-b from-emerald-950/90 via-slate-900 to-emerald-950/80 border-2 border-emerald-400 shadow-2xl shadow-emerald-950/90 lg:-translate-y-2'
                  : 'bg-slate-950/90 border border-emerald-900/50 hover:border-emerald-700/50'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-xs px-4 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Most Popular Choice</span>
                </div>
              )}

              <div>
                {/* Package Header */}
                <div className="space-y-2 pb-6 border-b border-emerald-900/40">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                    <span className="text-xs text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800/60 font-mono">
                      {pkg.turnaround}
                    </span>
                  </div>
                  
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">{pkg.priceFormatted}</span>
                    <span className="text-xs text-gray-400">/ one-time payment</span>
                  </div>

                  <p className="text-xs text-gray-300 pt-1 leading-relaxed">{pkg.tagline}</p>
                </div>

                {/* Domain Pill */}
                <div className="my-4 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-xs text-emerald-300 flex items-center gap-2">
                  <Info className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Domain: <strong>{pkg.subdomain}</strong></span>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">What's Included:</p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className={feat.startsWith('Everything') ? 'font-semibold text-emerald-300' : ''}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 space-y-2">
                <button
                  onClick={() => onOpenInquiry(pkg.name)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-slate-950 hover:from-emerald-400 hover:to-teal-300 shadow-lg shadow-emerald-950/80'
                      : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-800/80'
                  }`}
                >
                  <span>Order {pkg.name} Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-gray-400">
                  {pkg.revisions} • GCash / Maya / Bank Accepted
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Custom Calculator Teaser */}
        <div className="mt-12 text-center bg-slate-950/80 border border-emerald-900/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-white text-base">Want custom add-ons like Video Editing or ATS CV rewrite?</h4>
            <p className="text-xs text-gray-400 mt-1">Calculate your custom total package in real-time with our interactive calculator.</p>
          </div>
          <button
            onClick={onScrollToCalculator}
            className="px-5 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700 text-xs font-bold whitespace-nowrap transition-all"
          >
            Open Price Calculator →
          </button>
        </div>

      </div>
    </section>
  );
};
