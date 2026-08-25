/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import WorkshopsSection from './components/WorkshopsSection';
import LogisticsSection from './components/LogisticsSection';
import BookingSection from './components/BookingSection';
import AdminSection from './components/AdminSection';
import WhatsAppModal from './components/WhatsAppModal';
import { ActivePage } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('landing');
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const handleOpenWhatsApp = () => {
    setIsWhatsAppOpen(true);
  };

  const renderActiveSection = () => {
    switch (activePage) {
      case 'landing':
        return (
          <HeroSection 
            onNavigate={(page) => setActivePage(page)} 
            onOpenWhatsApp={handleOpenWhatsApp}
          />
        );
      case 'about':
        return <AboutSection />;
      case 'services':
        return <ServicesSection onNavigate={(page) => setActivePage(page)} />;
      case 'workshops':
        return <WorkshopsSection />;
      case 'logistics':
        return <LogisticsSection />;
      case 'booking':
        return <BookingSection onNavigate={(page) => setActivePage(page)} />;
      case 'admin':
        return <AdminSection onNavigateBooking={() => setActivePage('booking')} />;
      default:
        return (
          <HeroSection 
            onNavigate={(page) => setActivePage(page)} 
            onOpenWhatsApp={handleOpenWhatsApp}
          />
        );
    }
  };

  return (
    <div id="app-container" className="min-h-screen flex flex-col justify-between relative bg-alabaster select-none">
      {/* Decorative ambient blurred glowing shapes (Watercolor effect) */}
      <div className="absolute top-48 left-12 w-96 h-96 rounded-full bg-sage-light/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[80vh] right-12 w-96 h-96 rounded-full bg-dustyblue-light/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-48 left-20 w-80 h-80 rounded-full bg-lavender-light/25 blur-3xl pointer-events-none -z-10" />

      {/* Floating WhatsApp Action Button (Fixed Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          id="floating-whatsapp-trigger"
          onClick={handleOpenWhatsApp}
          className="group flex items-center gap-2.5 bg-[#6B7C6E] hover:bg-[#586A5F] text-alabaster px-4 py-3 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 cursor-pointer border border-sage-light/30"
          aria-label="Message Us on WhatsApp"
        >
          <div className="relative flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-alabaster fill-alabaster/20" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-sage-light animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-sage-light" />
          </div>
          <span className="font-serif font-bold text-xs tracking-wide">
            Message Us
          </span>
        </button>
      </div>

      {/* Primary Header */}
      <Header activePage={activePage} onChangePage={(page) => setActivePage(page)} onOpenWhatsApp={handleOpenWhatsApp} />

      {/* Main content viewport with fade and slight lift transition */}
      <main id="main-viewport" className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* WhatsApp Modal */}
      <WhatsAppModal isOpen={isWhatsAppOpen} onClose={() => setIsWhatsAppOpen(false)} />

      {/* Primary Footer */}
      <Footer onChangePage={(page) => setActivePage(page)} onOpenWhatsApp={handleOpenWhatsApp} />
    </div>
  );
}
