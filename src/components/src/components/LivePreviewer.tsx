import React, { useState } from 'react';
import { Smartphone, Monitor, Play, FileText, CheckCircle, ExternalLink, QrCode, Award, Shield, Image as ImageIcon } from 'lucide-react';

interface LivePreviewerProps {
  onOpenInquiry: (pkg?: string) => void;
}

const SAMPLE_PORTFOLIOS = [
  {
    id: 'nurse',
    title: 'Maria Santos, RN',
    profession: 'Senior ICU Nurse',
    industry: 'Healthcare',
    location: 'Doha, Qatar (8 Years Exp)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    subdomain: 'maria-santos.workfolio.ph',
    summary: 'DHA/HAAD Licensed ICU Nurse with expertise in hemodialysis, mechanical ventilation, and post-operative critical care.',
    skills: ['ICU Ventilation', 'Hemodialysis', 'BLS & ACLS Certified', 'Patient Triage', 'Patient Care Systems'],
    certs: ['DHA Nursing License #88219', 'American Heart Association ACLS', 'PRC Registered Nurse Philippines'],
    mediaCount: '12 Photos • 2 Skills Videos'
  },
  {
    id: 'engineer',
    title: 'Engr. Juan Dela Cruz',
    profession: 'Civil & Structural Engineer',
    industry: 'Engineering & Construction',
    location: 'Riyadh, KSA (10 Years Exp)',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    subdomain: 'juandelacruz-eng.com',
    summary: 'Lead QA/QC Engineer for high-rise commercial developments. Specialized in structural inspection, AutoCAD, and Primavera P6.',
    skills: ['AutoCAD & Revit', 'QA/QC Inspection', 'Primavera P6', 'Structural Concrete', 'Project Safety ISO 45001'],
    certs: ['PRC Licensed Civil Engineer', 'OSHA 30-Hour Construction Safety', 'COPRP Certified Saudi Arabia'],
    mediaCount: '24 Site Photos • 4 Project Videos'
  },
  {
    id: 'welder',
    title: 'Ramon "Mon" Tan',
    profession: '6G SMAW/GTAW Pipe Welder',
    industry: 'Skilled Trades',
    location: 'Subic, Philippines (6 Years Exp)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    subdomain: 'ramontan-welder.workfolio.ph',
    summary: 'Certified 6G Pipe Welder with marine shipyard and refinery pipeline experience. TESDA NC III Certified.',
    skills: ['6G Pipe Welding', 'TIG / GTAW', 'Stick / SMAW', 'Blueprint Reading', 'Non-Destructive Testing'],
    certs: ['TESDA NC III Pipe Welding', 'Bureau Veritas 6G Qualification', 'Shipyard Safety Pass'],
    mediaCount: '15 Welding Photos • 5 Test Weld Videos'
  },
  {
    id: 'va',
    title: 'Angela Reyes',
    profession: 'Executive Virtual Assistant & Social Media Manager',
    industry: 'IT & Virtual Assistance',
    location: 'Cebu City, Philippines (5 Years Exp)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    subdomain: 'angelareyes.workfolio.ph',
    summary: 'Top-rated VA supporting US e-commerce founders with inbox management, GoHighLevel CRM, Canva design, and Shopify maintenance.',
    skills: ['Shopify & WooCommerce', 'GoHighLevel CRM', 'Canva Graphic Design', 'Google Workspace Admin', 'Asana & Notion'],
    certs: ['HubSpot Inbound Marketing Certified', 'Shopify Partner Specialist'],
    mediaCount: '18 Case Study Graphics • 2 Demo Screencasts'
  }
];

export const LivePreviewer: React.FC<LivePreviewerProps> = ({ onOpenInquiry }) => {
  const [selectedId, setSelectedId] = useState('nurse');
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');

  const currentSample = SAMPLE_PORTFOLIOS.find(s => s.id === selectedId) || SAMPLE_PORTFOLIOS[0];

  return (
    <section id="preview" className="py-16 md:py-24 bg-[#080D0A] text-white border-b border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold">
            <span>INTERACTIVE DEMO PREVIEW</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            See what your portfolio could look like.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Switch professions and devices to experience how employers view your credentials on phone and laptop.
          </p>
        </div>

        {/* Profession Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {SAMPLE_PORTFOLIOS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => setSelectedId(sample.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedId === sample.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-900/50'
                  : 'bg-emerald-950/40 text-gray-300 hover:bg-emerald-900/50 border border-emerald-900/40'
              }`}
            >
              {sample.title} ({sample.profession})
            </button>
          ))}
        </div>

        {/* Device View Mode Switcher */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              device === 'mobile'
                ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-700'
                : 'bg-slate-900 text-gray-400 border border-slate-800 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Mobile View</span>
          </button>
          <button
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              device === 'desktop'
                ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-700'
                : 'bg-slate-900 text-gray-400 border border-slate-800 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4 text-emerald-400" />
            <span>Desktop Frame</span>
          </button>
        </div>

        {/* Interactive Device Simulation Container */}
        <div className="flex justify-center">
          <div
            className={`transition-all duration-300 w-full ${
              device === 'mobile' ? 'max-w-md' : 'max-w-4xl'
            }`}
          >
            <div className="bg-slate-950 border-2 border-emerald-800/60 rounded-3xl p-4 sm:p-6 shadow-2xl shadow-emerald-950/80">
              
              {/* Browser / Address Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-900/40 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="bg-emerald-950/90 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800/60 font-mono text-xs flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span>https://{currentSample.subdomain}</span>
                </div>
                <div className="text-[10px] text-gray-400 font-mono">LIVE DEMO</div>
              </div>

              {/* Portfolio Body Preview */}
              <div className="space-y-6">
                
                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/50 border border-emerald-800/40">
                  <img
                    src={currentSample.avatar}
                    alt={currentSample.title}
                    className="w-20 h-20 rounded-full object-cover border-2 border-emerald-400 shrink-0"
                  />
                  <div className="text-center sm:text-left space-y-1">
                    <div className="inline-block px-2 py-0.5 rounded text-[10px] bg-emerald-900/80 text-emerald-300 font-bold uppercase tracking-wider">
                      {currentSample.industry}
                    </div>
                    <h3 className="text-xl font-bold text-white">{currentSample.title}</h3>
                    <p className="text-sm text-emerald-300 font-medium">{currentSample.profession}</p>
                    <p className="text-xs text-gray-400">{currentSample.location}</p>
                  </div>
                </div>

                {/* Bio Summary */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-900/40 text-xs sm:text-sm text-gray-300 leading-relaxed">
                  <p className="font-semibold text-emerald-400 text-xs mb-1 uppercase tracking-wider">Professional Profile</p>
                  {currentSample.summary}
                </div>

                {/* Skills & Certifications Split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-900/40 space-y-2">
                    <p className="font-semibold text-emerald-400 text-xs uppercase tracking-wider">Core Competencies</p>
                    <div className="flex flex-wrap gap-1.5">
                      {currentSample.skills.map((skill, i) => (
                        <span key={i} className="text-[11px] bg-emerald-950 text-emerald-200 px-2 py-1 rounded border border-emerald-800/60">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-900/40 space-y-2">
                    <p className="font-semibold text-emerald-400 text-xs uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Licenses & Certs
                    </p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {currentSample.certs.map((cert, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Media Evidence Strip */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-900/40 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5" /> Verified Work Evidence
                    </span>
                    <span className="text-gray-400 text-[11px]">{currentSample.mediaCount}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-emerald-950 border border-emerald-800 flex items-center justify-center group cursor-pointer">
                      <Play className="w-6 h-6 text-emerald-400 fill-emerald-400" />
                      <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 px-1 rounded text-gray-300">0:45</span>
                    </div>
                    <div className="aspect-video rounded-lg bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-[10px] text-emerald-300 font-mono">
                      [PHOTO 1]
                    </div>
                    <div className="aspect-video rounded-lg bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-[10px] text-emerald-300 font-mono">
                      [CERTIFICATE]
                    </div>
                  </div>
                </div>

                {/* Interactive Action Row inside Preview */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onOpenInquiry('Professional')}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Get A Portfolio Like This (₱6,500)</span>
                  </button>
                  <div className="text-xs text-emerald-300 flex items-center gap-1 font-mono">
                    <QrCode className="w-4 h-4 text-emerald-400" />
                    <span>Includes Instant Digital QR Code</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
