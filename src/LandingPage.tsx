import { useActiveSection } from './hooks/useActiveSection';
import { Nav } from './components/Nav';
import { HeroSection } from './components/HeroSection';
import { ContentSections } from './components/ContentSections';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';

export function LandingPage() {
  const activeSection = useActiveSection();

  return (
    <>
      <Nav activeSection={activeSection} />
      <main className="pt-[5.25rem] sm:pt-24">
        <HeroSection />
        <ContentSections />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
