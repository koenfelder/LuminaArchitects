import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function NewsletterForm() {
  const [usr, setUsr] = useState('');
  const [mail, setMail] = useState('');
  const [subbed, setSubbed] = useState(false);
  const [cacheName, setCacheName] = useState<string | null>(null);

  useEffect(() => {
    const rawData = window.localStorage.getItem('lumina_user_name');
    if (rawData) setCacheName(rawData);
  }, []);

  const onRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usr || !mail) return;

    window.localStorage.setItem('lumina_user_name', usr);
    setCacheName(usr);
    setSubbed(true);
    
    setUsr('');
    setMail('');

    setTimeout(() => { setSubbed(false); }, 5000);
  };

  const killSession = () => {
    window.localStorage.removeItem('lumina_user_name');
    setCacheName(null);
  };

  return (
    <section id="newsletter" className="py-24 px-8 md:px-20 bg-ink text-paper overflow-hidden">
      <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-gold mb-6">Stay Connected</h2>
          <h3 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
            Elevate your spatial <span className="italic">consciousness</span>.
          </h3>
          
          {cacheName ? (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 border border-paper/10 bg-paper/5 backdrop-blur-sm space-y-4"
            >
              <h4 className="text-2xl font-serif">Welcome back, {cacheName}.</h4>
              <p className="text-paper/60 leading-relaxed">
                You're currently receiving our bi-monthly newsletter campaigns. We're excited to have you in our creative circle.
              </p>
              <button 
                onClick={killSession}
                className="text-xs font-mono uppercase tracking-widest text-gold hover:text-white transition-colors"
                id="reset-storage"
              >
                (Not you? Clear session)
              </button>
            </motion.div>
          ) : (
            <p className="text-xl text-paper/60 leading-relaxed max-w-lg">
              Join our exclusive circle for early access to private openings and architectural insights from our lead partners.
            </p>
          )}
        </div>

        <div className="relative min-h-[400px] flex items-center">
          <AnimatePresence mode="wait">
            {!cacheName ? (
              <motion.form 
                key="form"
                onSubmit={onRegSubmit}
                className="w-full space-y-8"
                id="newsletter-form"
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-widest text-paper/40 ml-1">Your Name</label>
                  <input
                    type="text"
                    value={usr}
                    onChange={(e) => setUsr(e.target.value)}
                    placeholder="E.g. Jane Doe"
                    className="w-full bg-transparent border-b border-paper/20 py-4 text-xl outline-hidden focus:border-gold transition-colors placeholder:text-paper/10"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-widest text-paper/40 ml-1">Email Address</label>
                  <input
                    type="email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    placeholder="janedoe@yahoo.com"
                    className="w-full bg-transparent border-b border-paper/20 py-4 text-xl outline-hidden focus:border-gold transition-colors placeholder:text-paper/10"
                    required
                  />
                </div>
                
                <button 
                  type="submit"
                  className="group flex items-center gap-4 py-4 px-8 border border-paper/20 hover:bg-gold hover:border-gold hover:text-ink transition-all duration-500 rounded-full text-lg"
                >
                  Join the Perspective
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </motion.form>
            ) : subbed ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full bg-gold text-ink flex flex-col items-center justify-center text-center p-12 py-20 rounded-2xl shadow-2xl"
              >
                <CheckCircle2 className="w-16 h-16 mb-6" />
                <h4 className="text-3xl md:text-4xl font-serif mb-4">Thank you, {cacheName}.</h4>
                <p className="text-lg font-sans font-medium">Your subscription is active.</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
