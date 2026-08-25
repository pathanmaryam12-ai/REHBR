import { useState } from 'react';
import { Menu, X, Compass, Calendar, MessageCircle } from 'lucide-react';
import { ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  onChangePage: (page: ActivePage) => void;
  onOpenWhatsApp?: () => void;
}

export default function Header({ activePage, onChangePage, onOpenWhatsApp }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { id: ActivePage; label: string }[] = [
    { id: 'landing', label: 'Home' },
    { id: 'about', label: 'About REHBR' },
    { id: 'services', label: 'Counseling' },
    { id: 'workshops', label: 'Programmes' },
    { id: 'logistics', label: 'Methodology & FAQ' },
    { id: 'booking', label: 'Connect & Book' },
    { id: 'admin', label: 'Admin Portal' },
  ];

  const handleNavClick = (page: ActivePage) => {
    onChangePage(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="site-header" className="sticky top-0 z-40 bg-alabaster border-b border-oat shadow-2xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <div 
            id="brand-logo"
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('landing')}
          >
            <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center text-sage group-hover:bg-sage/20 transition-all duration-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-xl tracking-tight text-charcoal block leading-none font-bold">
                REHBR
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-sage block mt-1">
                Reflect • Reform • Return
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav id="desktop-navigation" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-sage-light text-sage font-bold'
                      : 'text-slate-text hover:text-charcoal hover:bg-oat/30'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {onOpenWhatsApp && (
              <button
                id="cta-header-whatsapp"
                onClick={onOpenWhatsApp}
                className="ml-3 px-4 py-2 rounded-full text-xs font-bold tracking-wide text-charcoal bg-sage-light/80 hover:bg-sage-light hover:text-sage transition-all duration-300 cursor-pointer flex items-center gap-1.5 border border-sage/30"
              >
                <MessageCircle className="w-3.5 h-3.5 text-sage fill-sage/20" />
                <span>Message Us</span>
              </button>
            )}

            <button
              id="cta-header-booking"
              onClick={() => handleNavClick('booking')}
              className="ml-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide text-alabaster bg-sage hover:bg-sage/90 active:scale-[0.98] transition-all duration-300 shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consult</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {onOpenWhatsApp && (
              <button
                id="mobile-header-whatsapp"
                onClick={onOpenWhatsApp}
                className="p-2 rounded-full bg-sage-light text-charcoal hover:bg-sage-light/80 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold pr-3 border border-sage/20"
              >
                <MessageCircle className="w-4 h-4 text-sage fill-sage/20" />
                <span>Message Us</span>
              </button>
            )}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-slate-text hover:text-charcoal hover:bg-oat/40 transition-all duration-200 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div id="mobile-nav-panel" className="lg:hidden border-b border-oat/50 bg-alabaster/98 animate-fade-in">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  id={`mobile-nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-sage-light text-sage font-bold'
                      : 'text-slate-text hover:text-charcoal hover:bg-oat/30'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 px-4 space-y-2">
              {onOpenWhatsApp && (
                <button
                  id="mobile-cta-header-whatsapp"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenWhatsApp();
                  }}
                  className="w-full py-3 rounded-full text-center text-sm font-bold tracking-wide text-charcoal bg-sage-light hover:bg-sage-light/80 transition-all duration-300 flex items-center justify-center gap-2 border border-sage/30"
                >
                  <MessageCircle className="w-4 h-4 text-sage" />
                  <span>Message Us on WhatsApp (+91 7666669461)</span>
                </button>
              )}
              <button
                id="mobile-cta-header-booking"
                onClick={() => handleNavClick('booking')}
                className="w-full py-3 rounded-full text-center text-sm font-bold tracking-wide text-alabaster bg-sage hover:bg-sage/90 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Consultation – ₹499</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

