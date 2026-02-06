import { HeroSection } from "@/components/home/HeroSection";
import { EnhancedFooter } from "@/components/home/EnhancedFooter";
import { ClientsSection } from "@/components/home/ClientsSection";
import { UnderTheHoodSection } from "@/components/home/UnderTheHoodSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { AgentInstallSection } from "@/components/home/AgentInstallSection";
import { HighlightsSection } from "@/components/home/HighlightsSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Agent Installation Section - Version 1: Visual Diagram + Install Command */}
      <AgentInstallSection />

      {/* Clients Section */}
      <ClientsSection />

      {/* Under the Hood Section */}
      <UnderTheHoodSection />

      {/* Highlights Section */}
      <HighlightsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </main>
  );
}
