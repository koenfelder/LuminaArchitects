import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const services = [
  {
    title: "Architectural Planning",
    description: "Comprehensive spatial conceptualization that prioritizes human experience and sustainable integration. We don't just build structures, we sculpt environments."
  },
  {
    title: "Sustainable Engineering",
    description: "Utilizing cutting-edge passive solar design, greywater recycling systems, and reclaimed material sourcing to minimize carbon footprints without compromising luxury."
  },
  {
    title: "Interior Curation",
    description: "A holistic approach to living spaces, where every texture, light fixture, and tactile surface is chosen to evoke a sense of quiet luxury."
  },
  {
    title: "Urban Revitalization",
    description: "Transforming neglected industrial zones into vibrant community hubs through adaptive reuse and vertical greenery."
  }
];

export default function ServiceAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="services" className="py-24 px-8 md:px-20 bg-paper">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-[1fr,1.5fr] gap-16">
        <div>
          <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-gold mb-6">Our Methodology</h2>
          <h3 className="text-4xl md:text-5xl leading-tight text-ink">
            Crafting the future through architectural <span className="italic">integrity</span>.
          </h3>
        </div>
        
        <div className="space-y-4">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="border-b border-ink/10 pb-4 overflow-hidden"
              id={`service-item-${index}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="text-xl md:text-2xl font-serif text-ink/80 group-hover:text-ink transition-colors">
                  {service.title}
                </span>
                <span className="p-2 border border-ink/10 rounded-full group-hover:border-ink/30 transition-all">
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="pb-8 pr-12 text-ink/60 leading-relaxed max-w-xl">
                      {service.description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
