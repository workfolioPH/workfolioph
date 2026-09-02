import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { FaqItem } from '../types';

const INITIAL_FAQS: FaqItem[] = [
  {
    category: 'Domain & Hosting',
    question: 'Do I need my own domain name?',
    answer: 'No! All packages include a free subdomain like yourname.workfolio.ph. If you choose the Professional or Premium package, we register a custom domain (.com or .ph) for you at no extra charge for the first year.'
  },
  {
    category: 'Domain & Hosting',
    question: 'Who owns my custom domain name?',
    answer: 'You own 100% of your domain. We register it under your contact details. If you ever want to transfer it to another host in the future, we provide full transfer EPP codes.'
  },
  {
    category: 'Payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept local Philippine payment methods including GCash, Maya, BDO, BPI Bank Transfer, and PayPal for international cards.'
  },
  {
    category: 'CV & Media',
    question: 'What if I don’t have all my photos and certificates ready right now?',
    answer: 'Don’t worry! You can submit your order first and send your photos, certificates, and videos later via Google Drive, Email, or WhatsApp as you find them.'
  },
  {
    category: 'General',
    question: 'How long does it take to get my portfolio live?',
    answer: 'Our standard turnaround is 2–3 business days for Starter, and 3–5 business days for Professional & Premium. Expedited 24-hour service is available upon request.'
  },
  {
    category: 'Guarantee',
    question: 'How many rounds of revisions are included?',
    answer: 'Starter includes 2 rounds of revisions, Professional includes 3 rounds, and Premium includes unlimited revisions until you are completely satisfied with your layout.'
  }
];

export const FaqSection: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>(INITIAL_FAQS);
  const [category, setCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetch('/api/faqs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setFaqs(data);
        }
      })
      .catch(() => {});
  }, []);

  const categories = ['All', 'Domain & Hosting', 'Payments', 'CV & Media', 'General'];

  const filteredFaqs = faqs.filter(item => {
    const matchesCat = category === 'All' || item.category === category;
    const matchesSearch = item.question.toLowerCase().includes(search.toLowerCase()) || item.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#090E0B] text-white border-b border-emerald-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>QUESTIONS ANSWERED PLAINLY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Everything you need to know about domain ownership, payments, revision policies, and turnaround times.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. GCash, domain, ATS)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-emerald-900/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  category === cat
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-emerald-950/40 text-gray-300 hover:bg-emerald-900/60 border border-emerald-900/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-slate-950 border border-emerald-900/40 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left font-semibold text-sm sm:text-base text-white hover:text-emerald-400 flex items-center justify-between gap-4"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-emerald-900/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
