import { LeadProvider } from "@/components/lead/LeadContext";
import { LeadModal } from "@/components/lead/LeadModal";
import { Navbar } from "@/components/layout/Navbar";
import { StickyContactBar } from "@/components/layout/StickyContactBar";
import { FloatingContactButton } from "@/components/layout/FloatingContactButton";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { CostSection } from "@/components/landing/CostSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { DemoSection } from "@/components/landing/DemoSection";
import { ArchitectureSection } from "@/components/landing/ArchitectureSection";
import { CasesSection } from "@/components/landing/CasesSection";
import { OfferSection } from "@/components/landing/OfferSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <LeadProvider>
      <Navbar />
      <StickyContactBar />
      <FloatingContactButton />
      <LeadModal />

      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <CostSection />
        <SolutionSection />
        <DemoSection />
        <ArchitectureSection />
        <CasesSection />
        <OfferSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <Footer />
    </LeadProvider>
  );
}
