import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1920",
    title: "Aetheria Residence",
    subtitle: "Coastal Brutalism",
    location: "Oslo, Norway"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920",
    title: "Nexus Hub",
    subtitle: "Urban Synthesis",
    location: "Berlin, Germany"
  },
  {
    image: "https://images.unsplash.com/photo-1666209282400-c7d956461df0?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Terra Retreat",
    subtitle: "Desert Sustainability",
    location: "Atacama, Chile"
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className="h-full w-full object-cover brightness-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-20 lg:p-32 max-w-[1280px] mx-auto">
        <motion.div
          key={currentIndex + "-text"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-4"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-paper/70">
            {slides[currentIndex].location}
          </p>
          <h1 className="text-6xl md:text-8xl text-paper leading-tight">
            {slides[currentIndex].title}
          </h1>
          <p className="text-xl md:text-2xl text-paper/80 font-serif italic">
            {slides[currentIndex].subtitle}
          </p>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-4 md:right-20">
        <button
          onClick={prevSlide}
          className="p-4 border border-paper/20 rounded-full text-paper hover:bg-paper hover:text-ink transition-all duration-300 group"
          id="prev-slide"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="p-4 border border-paper/20 rounded-full text-paper hover:bg-paper hover:text-ink transition-all duration-300 group"
          id="next-slide"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="absolute left-8 bottom-8 z-20 flex gap-2 md:left-20">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === currentIndex ? "w-12 bg-white" : "w-4 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
