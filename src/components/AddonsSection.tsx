import React from 'react';
import { FileText, Video, Image, CheckCircle, ArrowRight } from 'lucide-react';

interface AddonsSectionProps {
  onOpenInquiry: (packageName?: string) => void;
}

export const AddonsSection: React.FC<AddonsSectionProps> = ({ onOpenInquiry }) => {
  return (
    <section id="addons" className="py-16 md:py-24 bg-[#0B100D] text-white border-b border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold">
            <span>FULL CAREER SERVICES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            More than just a website build.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Need application materials, skill video editing, or ongoing domain maintenance? We provide end-to-end career presentation solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: ATS CV */}
          <div className="bg-slate-950 border border-emerald-900/40 rounded-2xl p-6 space-y-4 hover:border-emerald-700/60 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-emerald-950 text-emerald-400 w-fit border border-emerald-800">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">ATS-Friendly CV Rewrite</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Applicant Tracking Systems (ATS) automatically filter out resumes with bad formatting. We reformat your CV to pass automated screeners and highlight relevant industry keywords.
              </p>
              <ul className="text-xs text-gray-400 space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Standard ATS-parseable layout</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Custom Cover Letter template</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Clean downloadable PDF file</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-emerald-900/40 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">Add-on Price:</span>
              <span className="text-emerald-400 font-bold text-sm">₱2,500</span>
            </div>
          </div>

          {/* Card 2: Skill Video Editing */}
          <div className="bg-slate-950 border border-emerald-900/40 rounded-2xl p-6 space-y-4 hover:border-emerald-700/60 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-emerald-950 text-emerald-400 w-fit border border-emerald-800">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Skill Video Demonstration Editing</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Raw phone videos of your work often look blurry or dark. We trim raw video clips, remove background noise, add titles, and highlight key techniques.
              </p>
              <ul className="text-xs text-gray-400 space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Trimming & color correction</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Text captions & TESDA badges</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Fast-loading web video player</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-emerald-900/40 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">Add-on Price:</span>
              <span className="text-emerald-400 font-bold text-sm">₱2,500 (3 clips)</span>
            </div>
          </div>

          {/* Card 3: Photo Enhancement */}
          <div className="bg-slate-950 border border-emerald-900/40 rounded-2xl p-6 space-y-4 hover:border-emerald-700/60 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-emerald-950 text-emerald-400 w-fit border border-emerald-800">
                <Image className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Workplace Photo Polish</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                We enhance your workplace, project site, and license photo uploads with professional color grading, contrast adjustment, and background cleanup.
              </p>
              <ul className="text-xs text-gray-400 space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> High-definition clarity fix</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Certificate deskewing & cropping</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> High-speed responsive gallery</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-emerald-900/40 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">Add-on Price:</span>
              <span className="text-emerald-400 font-bold text-sm">₱1,500 (15 photos)</span>
            </div>
          </div>

        </div>

        {/* Business Web Build Callout */}
        <div className="mt-12 bg-gradient-to-r from-emerald-950/90 via-slate-900 to-emerald-950/90 border border-emerald-500/50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-block bg-emerald-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
              Also Need A Business Website?
            </div>
            <h3 className="text-xl font-bold text-white">Websites for Agencies, Storefronts & Consultants</h3>
            <p className="text-xs text-gray-300 max-w-xl">
              We also build high-converting websites for recruitment agencies, manpower suppliers, local contractors, and business services starting at <strong>₱8,500</strong>.
            </p>
          </div>
          <button
            onClick={() => onOpenInquiry('Business Web Build')}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all whitespace-nowrap flex items-center gap-2"
          >
            <span>Inquire Business Web Build</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
