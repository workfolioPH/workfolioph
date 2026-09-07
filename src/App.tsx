import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { ProfessionGrid } from './components/ProfessionGrid';
import { LivePreviewer } from './components/LivePreviewer';
import { PricingSection } from './components/PricingSection';
import { PricingCalculator } from './components/PricingCalculator';
import { WorkflowSection } from './components/WorkflowSection';
import { QrGeneratorDemo } from './components/QrGeneratorDemo';
import { AddonsSection } from './components/AddonsSection';
import { FaqSection } from './components/FaqSection';
import { InquiryModal } from './components/InquiryModal';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { quoteFromSelection, resolveAddonIds, resolvePackageId } from './lib/catalog';

export function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState('professional');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [calculatedPrice, setCalculatedPrice] = useState(6500);

  const handleOpenInquiry = (packageName?: string) => {
    const packageId = resolvePackageId(packageName) || 'professional';
    setSelectedPackage(packageId);
    setSelectedAddons([]);
    const quote = quoteFromSelection(packageId, []);
    setCalculatedPrice(quote ? quote.total_price : 6500);
    setInquiryModalOpen(true);
  };

  const handleOpenInquiryWithCustom = (packageName: string, addons: string[]) => {
    const packageId = resolvePackageId(packageName) || 'professional';
    const addonIds = resolveAddonIds(addons) || [];
    const quote = quoteFromSelection(packageId, addonIds);
    setSelectedPackage(packageId);
    setSelectedAddons(addonIds);
    setCalculatedPrice(quote ? quote.total_price : 6500);
    setInquiryModalOpen(true);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B100D] text-white font-sans selection:bg-emerald-500 selection:text-slate-950">
      <Header
        onOpenInquiry={handleOpenInquiry}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenCalculator={() => setCalculatorModalOpen(true)}
      />

      <main>
        <Hero
          onOpenInquiry={handleOpenInquiry}
          onScrollTo={handleScrollTo}
        />

        <ProblemSolution
          onOpenInquiry={() => handleOpenInquiry('Professional')}
        />

        <ProfessionGrid
          onSelectProfession={() => {
            handleScrollTo('preview');
          }}
        />

        <LivePreviewer
          onOpenInquiry={handleOpenInquiry}
        />

        <PricingSection
          onOpenInquiry={handleOpenInquiry}
          onScrollToCalculator={() => setCalculatorModalOpen(true)}
        />

        <PricingCalculator
          isOpen={calculatorModalOpen}
          onClose={() => setCalculatorModalOpen(false)}
          onOpenInquiryWithCustom={handleOpenInquiryWithCustom}
        />

        <WorkflowSection />

        <QrGeneratorDemo />

        <AddonsSection
          onOpenInquiry={handleOpenInquiry}
        />

        <FaqSection />
      </main>

      <Footer />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        preselectedPackage={selectedPackage}
        preselectedAddons={selectedAddons}
        preselectedPrice={calculatedPrice}
      />

      <AdminPortal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </div>
  );
}

export default App;
