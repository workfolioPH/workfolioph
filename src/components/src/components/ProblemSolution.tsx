import React from 'react';
import { XCircle, CheckCircle, ArrowRight, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

interface ProblemSolutionProps {
  onOpenInquiry: () => void;
}

export const ProblemSolution: React.FC<ProblemSolutionProps> = ({ onOpenInquiry }) => {
  return (
    <section className="py-16 md:py-24 bg-[#0A0F0C] text-white border-b border-emerald-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold">
            <span>THE OLD WAY VS. WORKFOLIO PH</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your experience is valuable. But is it easy for employers to see?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            When applying overseas or locally, sending bulky PDF attachments and unformatted photos lowers your chances. Here is why switching to a WorkFolio link changes everything.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Old Way Card */}
          <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-900/30 text-red-300 text-[11px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
              The Old Attachment Way
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-red-900/40 text-red-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Scattered & Messy Application</h3>
                <p className="text-xs text-red-300">Hard for HR and agency screeners to review</p>
              </div>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Bulky Email Attachments:</strong> PDF CVs get blocked by spam filters or bounced back due to file size limits.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Expired Drive Links:</strong> Google Drive or Dropbox links require permissions or expire before the hiring manager opens them.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Compressed Chat Photos:</strong> Work photos sent over Messenger or WhatsApp lose quality and get buried in chat history.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>No Video Showcase:</strong> No clear way to demonstrate physical skills like welding, nursing procedures, machine operation, or culinary presentation.</span>
              </li>
            </ul>
          </div>

          {/* WorkFolio PH Way Card */}
          <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/50 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-xl shadow-emerald-950/60">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-[11px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
              The WorkFolio PH Solution
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-900/60 text-emerald-400 border border-emerald-700/50">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">One Professional Digital Link</h3>
                <p className="text-xs text-emerald-300">Opens instantly on phone, tablet, or desktop</p>
              </div>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-gray-200">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Clean Custom Web Address:</strong> Share <code className="text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">yourname.workfolio.ph</code> or your own <code className="text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">.com</code> domain.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>ATS-Optimized CV & Profile:</strong> Downloadable verified PDF resume formatted specifically to pass applicant tracking systems.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>HD Photo & Video Gallery:</strong> High-definition workplace photos and embedded video clips proving your real hands-on expertise.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Instant Digital QR Card:</strong> Included QR Code for business cards, email signatures, and direct WhatsApp / Viber messaging.</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenInquiry}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/50 transition-all"
              >
                <span>Upgrade Your Portfolio Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
