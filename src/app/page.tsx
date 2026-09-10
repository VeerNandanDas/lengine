import { LandingNav } from "@/components/landing/landing-nav";
import { HeroSection } from "@/components/landing/hero-section";
import { SystemOverviewSection } from "@/components/landing/system-overview-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { TwoEnginesSection } from "@/components/landing/two-engines-section";
import { DarkFeatureGrid } from "@/components/landing/dark-feature-grid";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaBanner } from "@/components/landing/cta-banner";
import { LandingFooter } from "@/components/landing/landing-footer";
import { ScrollProgressWidget } from "@/components/landing/scroll-progress-widget";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090b] text-slate-900 dark:text-slate-100 selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900/40 dark:selection:text-indigo-200">
      {/* Interactive Corner Scroll Progress & Jump-to-Top Widget */}
      <ScrollProgressWidget />
      {/* 1. Top Institutional Sticky Navigation */}
      <LandingNav />

      <main className="flex-1">
        {/* 2. Hero Section with Ambient Glow & Terminal Mockup */}
        <HeroSection />

        {/* 3. The Complete Cross-Border Trade Intelligence System Architecture */}
        <SystemOverviewSection />

        {/* 4. Live Ingestion & Data Ecosystem - Direct Pipelines Showcase */}
        <IntegrationsSection />

        {/* 5. Two Engines Showcase (Trade Flows + Buyer Directory) */}
        <TwoEnginesSection />

        {/* 5. Institutional Dark Contrast Feature Grid */}
        <DarkFeatureGrid />

        {/* 6. Impact Telemetry & Executive Testimonials */}
        <TestimonialsSection />

        {/* 7. Institutional Pricing Matrix with Annual/Monthly Toggle & FAQs */}
        <PricingSection />

        {/* 8. Conversion CTA Banner */}
        <CtaBanner />
      </main>

      {/* 9. Institutional Footer with Compliance Badges */}
      <LandingFooter />
    </div>
  );
}
