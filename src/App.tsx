import Navigation from './components/Navigation';
import HeroCarousel from './components/HeroCarousel';
import ServiceAccordion from './components/ServiceAccordion';
import ProjectGrid from './components/ProjectGrid';
import NewsletterForm from './components/NewsletterForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-gold selection:text-ink">
      <header>
        <Navigation />
      </header>

      <main className="relative">
        <HeroCarousel />
        <ServiceAccordion />
        <ProjectGrid />
        <NewsletterForm />
      </main>

      <Footer />
    </div>
  );
}
