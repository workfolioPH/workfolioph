import React from 'react';
import { Stethoscope, HardHat, Flame, Laptop, Ship, Utensils, Briefcase, GraduationCap, ArrowUpRight } from 'lucide-react';

interface ProfessionGridProps {
  onSelectProfession: (profession: string) => void;
}

const PROFESSIONS = [
  {
    title: 'Healthcare & Nursing',
    subtitle: 'Nurses, Medical Techs, Caregivers, Physical Therapists',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
    details: 'Highlight BLS/ACLS licenses, ICU experience, hospital equipment mastery, and medical certifications.'
  },
  {
    title: 'Engineering & Construction',
    subtitle: 'Civil, Mechanical, Electrical Engineers, Architects, QA/QC',
    icon: HardHat,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=400&q=80',
    details: 'Showcase project blueprints, site inspection photos, AutoCAD designs, and safety compliance certificates.'
  },
  {
    title: 'Skilled Trades & Technical',
    subtitle: 'Welders, Pipefitters, Electricians, Heavy Equipment Operators',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80',
    details: 'Embed 6G welding videos, TESDA certifications, machinery operation clips, and work precision shots.'
  },
  {
    title: 'IT, Virtual Assistants & Creatives',
    subtitle: 'VAs, Software Devs, Graphic Designers, Digital Marketers',
    icon: Laptop,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
    details: 'Display client case studies, tool proficiencies (CRM, Notion, Figma), video edits, and workflow screenshots.'
  },
  {
    title: 'Maritime & Seafarers',
    subtitle: 'Marine Engineers, Deck Officers, Stewards, Ratings',
    icon: Ship,
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80',
    details: 'List STCW certificates, Seaman Book details, vessel types sailed, and engine/deck maintenance logs.'
  },
  {
    title: 'Culinary, Hospitality & Services',
    subtitle: 'Executive Chefs, Baristas, Hotel Supervisors, Event Staff',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
    details: 'High-res dish plating photos, food safety accreditations, latte art videos, and banqueting experience.'
  }
];

export const ProfessionGrid: React.FC<ProfessionGridProps> = ({ onSelectProfession }) => {
  return (
    <section className="py-16 md:py-24 bg-[#0B100D] text-white border-b border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold">
            <span>TAILORED FOR EVERY FIELD</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Filipino workers and professionals — whatever your domain.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Every career field requires a unique presentation. We customize layout sections, terminology, and evidence galleries to match your exact industry standard.
          </p>
        </div>

        {/* Professions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROFESSIONS.map((prof, index) => {
            const Icon = prof.icon;
            return (
              <div
                key={index}
                onClick={() => onSelectProfession(prof.title)}
                className="group relative bg-slate-950/80 border border-emerald-900/40 rounded-2xl overflow-hidden hover:border-emerald-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/80 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Header */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={prof.image}
                    alt={prof.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Floating Icon */}
                  <div className="absolute bottom-3 left-4 p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-700/60 text-emerald-400 shadow-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                      <span>{prof.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs text-emerald-300 font-medium mt-1">{prof.subtitle}</p>
                    <p className="text-xs text-gray-400 mt-2.5 leading-relaxed">{prof.details}</p>
                  </div>

                  <div className="pt-3 border-t border-emerald-900/40 text-[11px] font-semibold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Example Layout</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
