import AppShell from "./components/layout/AppShell";
import Hero from "./components/marketing/Hero";
import ServiceGrid from "./components/marketing/ServiceGrid";
import PortfolioGrid from "./components/marketing/PortfolioGrid";
import CapabilitySection from "./components/marketing/CapabilitySection";
import QuoteSection from "./components/marketing/QuoteSection";
import ClosingCTA from "./components/marketing/ClosingCTA";
import ContactInfo from "./components/marketing/ContactInfo";

/**
 * Sprint 6 scope: menambahkan ClosingCTA + ContactInfo setelah QuoteSection.
 * Footer ditambahkan di AppShell (di luar <main>, tampil di semua halaman).
 * Homepage sekarang lengkap: Hero -> Services -> Portfolio -> Capability ->
 * Quote -> ClosingCTA -> ContactInfo -> Footer.
 */
function App() {
  return (
    <AppShell>
      <Hero />
      <ServiceGrid />
      <PortfolioGrid />
      <CapabilitySection />
      <QuoteSection />
      <ClosingCTA />
      <ContactInfo />
    </AppShell>
  );
}

export default App;
