import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Portfolio", href: "#projects" },
    { name: "About Us", href: "#services" },
    { name: "Contact Us", href: "#newsletter" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-100 px-8 py-6 flex justify-between items-center mix-blend-difference">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="z-50"
      >
        <a href="#hero" className="text-2xl font-serif tracking-tighter text-paper">
          Lumina<span className="font-light italic text-gold"> Architects</span>
        </a>
      </motion.div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-12">
        {navItems.map((item, i) => (
          <motion.a
            key={item.name}
            href={item.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-[10px] font-mono tracking-[0.3em] uppercase text-paper/70 hover:text-paper transition-colors py-2"
          >
            {item.name}
          </motion.a>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="z-50"
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-paper flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:text-gold transition-colors p-2"
          id="menu-toggle"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span>{isOpen ? 'Close' : 'Menu'}</span>
        </button>
      </motion.div>

      {/* Mobile/Overlay Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="absolute top-0 left-0 w-full h-screen bg-ink text-paper flex flex-col items-center justify-center gap-8 md:gap-12 z-40"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                onClick={() => setIsOpen(false)}
                className="text-4xl md:text-6xl font-serif hover:italic hover:text-gold transition-all duration-300"
              >
                {item.name}
              </motion.a>
            ))}
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex gap-8 font-mono text-[10px] tracking-[0.4em] uppercase text-paper/40"
            >
              <span>Oslo</span>
              <span>Berlin</span>
              <span>Atacama</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
