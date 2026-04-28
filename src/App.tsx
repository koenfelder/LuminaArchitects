/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

/**
 * Lumina Architects Portfolio
 * 
 * A single-page professional site built for the final course project.
 * Features:
 * - Slideshow/Carousel: Custom built with Framer Motion.
 * - Accordion: Methodology section using Framer Motion.
 * - AJAX/API: Projects fetched from /src/data/projects.json.
 * - Web Storage: Persistent user greeting in the Newsletter section.
 */

import Navigation from './components/Navigation';
import HeroCarousel from './components/HeroCarousel';
import ServiceAccordion from './components/ServiceAccordion';
import ProjectGrid from './components/ProjectGrid';
import NewsletterForm from './components/NewsletterForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-gold selection:text-ink">
      {/* 
        Semantic Header containing the Navigation 
      */}
      <header>
        <Navigation />
      </header>

      {/* 
        Main content structure 
      */}
      <main className="relative">
        {/* Slideshow Requirement */}
        <HeroCarousel />

        {/* Methodology - Reordered as requested */}
        <ServiceAccordion />

        {/* Selected Works - Reordered as requested */}
        <ProjectGrid />

        {/* Engagement - Web Storage Requirement */}
        <NewsletterForm />
      </main>

      {/* Semantic Footer */}
      <Footer />
    </div>
  );
}
