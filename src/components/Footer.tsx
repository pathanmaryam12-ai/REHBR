import { ShieldAlert, Phone, Mail, Compass, Heart, MessageCircle } from 'lucide-react';
import { ActivePage } from '../types';

interface FooterProps {
  onChangePage: (page: ActivePage) => void;
  onOpenWhatsApp?: () => void;
}

export default function Footer({ onChangePage, onOpenWhatsApp }: FooterProps) {
  const handleNavClick = (page: ActivePage) => {
    onChangePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="site-footer" className="bg-oat/40 border-t border-oat/70 text-slate-text font-sans">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sage/15 flex items-center justify-center text-sage">
                <Compass className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-wider font-bold text-charcoal">
                  REHBR
                </span>
                <span className="text-[10px] uppercase tracking-widest text-sage font-bold">
                  Reflect • Reform • Return
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              An authentic Islamic education, counseling, and workshop platform. Bridging the gap between learning and living, nurturing healthier individuals, families, and communities.
            </p>
            <div className="text-xs text-slate-text/70 space-y-1">
              <p>Prof. Asif — Lead Counselor & Founder</p>
              <p>© {new Date().getFullYear()} REHBR. All rights reserved.</p>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-serif font-medium text-charcoal text-sm uppercase tracking-wider mb-4">
              Platform Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button 
                  id="footer-link-landing"
                  onClick={() => handleNavClick('landing')}
                  className="hover:text-sage transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-about"
                  onClick={() => handleNavClick('about')}
                  className="hover:text-sage transition-colors cursor-pointer text-left"
                >
                  About REHBR
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-services"
                  onClick={() => handleNavClick('services')}
                  className="hover:text-sage transition-colors cursor-pointer text-left"
                >
                  Islamic Counseling
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-workshops"
                  onClick={() => handleNavClick('workshops')}
                  className="hover:text-sage transition-colors cursor-pointer text-left"
                >
                  Programmes & Workshops
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-logistics"
                  onClick={() => handleNavClick('logistics')}
                  className="hover:text-sage transition-colors cursor-pointer text-left"
                >
                  Logistics & FAQ
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-admin"
                  onClick={() => handleNavClick('admin')}
                  className="hover:text-sage transition-colors cursor-pointer text-left text-xs text-sage font-bold flex items-center gap-1"
                >
                  Admin Portal (Staff Only)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Credentials & Contact */}
          <div className="space-y-4">
            <div>
              <h4 className="font-serif font-medium text-charcoal text-sm uppercase tracking-wider mb-3">
                Foundation & Standing
              </h4>
              <p className="text-xs leading-relaxed text-slate-text/80">
                Based upon the Qur'an and authentic Sunnah. Non-sectarian and dedicated to character reform (Akhlaq) and spiritual elevation.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-serif font-medium text-charcoal text-sm uppercase tracking-wider mb-1">
                Direct Contact & Support
              </h4>
              <div className="flex items-center gap-2 text-sm text-slate-text">
                <Mail className="w-4 h-4 text-sage shrink-0" />
                <span className="text-xs">contact@rehbr-platform.org</span>
              </div>
              <a
                id="footer-instagram-link"
                href="https://www.instagram.com/rehbrtalk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-pink-700 hover:text-pink-900 transition-colors pt-1"
              >
                <span className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </span>
                <span>@rehbrtalk on Instagram</span>
              </a>

              {onOpenWhatsApp && (
                <button
                  id="footer-whatsapp-btn"
                  onClick={onOpenWhatsApp}
                  className="mt-2 w-full py-2.5 px-4 rounded-xl bg-sage-light hover:bg-sage-light/80 text-charcoal font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 border border-sage/30"
                >
                  <MessageCircle className="w-4 h-4 text-sage fill-sage/20" />
                  <span>Message Us on WhatsApp</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Legal and Disclaimer */}
        <div className="mt-12 pt-8 border-t border-oat/50 text-center text-xs text-slate-text/60 space-y-3">
          <p>
            Disclaimer: The materials and educational programmes provided by REHBR are rooted in authentic Islamic tradition and clinical counseling practices for personal growth. They do not replace emergency medical care or acute crisis intervention.
          </p>
          <div className="flex justify-center items-center gap-1">
            <span>REHBR — Guidance for Continuous Personal & Spiritual Growth</span>
            <Heart className="w-3 h-3 text-sage fill-sage" />
          </div>
        </div>
      </div>
    </footer>
  );
}
