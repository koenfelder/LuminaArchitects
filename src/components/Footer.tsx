export default function Footer() {
  return (
    <footer className="bg-paper py-20 px-8 md:px-20 border-t border-ink/5">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-4 gap-16">
        <div className="col-span-2 space-y-8">
          <h2 className="text-3xl font-serif">Lumina Architects</h2>
          <p className="text-ink/50 max-w-sm leading-relaxed">
            International studio dedicated to the exploration of space, materiality, and the human condition.
          </p>
          <div className="flex gap-6">
            {['Instagram', 'Twitter'].map(social => (
              <a key={social} href="#" className="text-xs font-mono uppercase tracking-widest text-ink/40 hover:text-gold transition-colors">{social}</a>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-ink/30">Studio</h4>
          <address className="not-italic text-sm text-ink/60 space-y-2">
            <p>Mollstraße, 10178 Berlin, Germany</p>
          </address>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-ink/30">Contact</h4>
          <div className="text-sm text-ink/60 space-y-2">
            <p>inquiries@lumina.arch</p>
            <p>+47 21 00 22 33</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto mt-24 pt-8 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase text-ink/30 tracking-widest">
        <p>© 2026 Lumina Architectural Studio. All Rights Reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-gold">Privacy Policy</a>
          <a href="#" className="hover:text-gold">Terms of Service</a>
          <span>Lumina Digital</span>
        </div>
      </div>
    </footer>
  );
}
