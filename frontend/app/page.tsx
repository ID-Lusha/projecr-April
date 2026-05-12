import { Navbar } from "@/components/layout/Navbar";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { DemoSection } from "@/components/landing/DemoSection";
import { ArchitectureSection } from "@/components/landing/ArchitectureSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <DemoSection />
        <ArchitectureSection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
