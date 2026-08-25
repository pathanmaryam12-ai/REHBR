import React from 'react';
import { X, Calendar, Sprout, HeartHandshake, CreditCard, MessageCircle, Send, ShieldCheck, ExternalLink, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  // Correct 10-digit Indian WhatsApp Business number: 7666669461 (five 6s)
  // Full international number string for wa.me link: 917666669461
  const WHATSAPP_NUMBER = '917666669461'; 
  const DISPLAY_NUMBER = '+91 7666669461';

  const options = [
    {
      id: 'consultation',
      title: '📅 Book a Consultation',
      icon: <Calendar className="w-5 h-5 text-sage shrink-0" />,
      message: 'Assalamu Alaikum! I would like to book a consultation. Please guide me through the next steps. JazakAllahu Khair.',
    },
    {
      id: 'khwab-ki-tabeer',
      title: '🌙 Khwab Ki Tabeer (Islamic Dream Guidance)',
      icon: <Moon className="w-5 h-5 text-sage shrink-0" />,
      message: 'Assalamu Alaikum! I would like to book a Khwab Ki Tabeer (Islamic Dream Guidance) consultation. Please guide me through the next steps. JazakAllahu Khair.',
    },
    {
      id: 'insaan-e-kamil',
      title: '🌱 Learn about Insaan-e-Kamil',
      icon: <Sprout className="w-5 h-5 text-sage shrink-0" />,
      message: 'Assalamu Alaikum! I would like to know more about the Insaan-e-Kamil workshop. Please share the details. JazakAllahu Khair.',
    },
    {
      id: 'mindful-parenting',
      title: '👨‍👩‍👧 Learn about Mindful Parenting',
      icon: <HeartHandshake className="w-5 h-5 text-sage shrink-0" />,
      message: 'Assalamu Alaikum! I would like to know more about the Mindful Parenting workshop. Please guide me. JazakAllahu Khair.',
    },
    {
      id: 'pricing',
      title: '💰 Pricing & Registration',
      icon: <CreditCard className="w-5 h-5 text-sage shrink-0" />,
      message: 'Assalamu Alaikum! I would like to know about the pricing and registration process. Please guide me. JazakAllahu Khair.',
    },
    {
      id: 'general',
      title: '💬 General Inquiry',
      icon: <MessageCircle className="w-5 h-5 text-sage shrink-0" />,
      message: 'Assalamu Alaikum! I would like to know more about REHBR and your services. Please guide me. JazakAllahu Khair.',
    },
  ];

  // Official WhatsApp Click-to-Chat URL with URL-encoded text parameter
  const getWaUrl = (message: string) => {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  };

  const handleOptionClick = (opt: typeof options[0]) => {
    const whatsappUrl = getWaUrl(opt.message);
    
    // Console log to verify generated URL in browser dev tools
    console.log('[REHBR WhatsApp] Connecting to:', DISPLAY_NUMBER);
    console.log('[REHBR WhatsApp] Option:', opt.title);
    console.log('[REHBR WhatsApp] Encoded Message:', encodeURIComponent(opt.message));
    console.log('[REHBR WhatsApp] Opening URL:', whatsappUrl);

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/60 transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative bg-alabaster border border-oat rounded-3xl shadow-2xl max-w-md w-full overflow-hidden text-left z-10"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-br from-[#38433B] via-[#4D5D50] to-[#68786B] text-alabaster p-6 sm:p-7 relative">
              <button
                id="close-whatsapp-modal"
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full bg-black/20 hover:bg-black/35 text-alabaster transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-sage-light border border-white/20">
                  <MessageCircle className="w-5 h-5 fill-white/10" />
                </div>
                <span className="text-xs font-semibold tracking-wider text-sage-light/90">
                  REHBR WhatsApp • {DISPLAY_NUMBER}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
                Assalamu Alaikum 👋
              </h3>
              <p className="text-sm text-sage-light/90 mt-1 font-medium">
                How can we support you today?
              </p>
            </div>

            {/* Direct Clean Options List */}
            <div className="p-5 space-y-2.5">
              {options.map((opt) => (
                <a
                  id={`wa-direct-link-${opt.id}`}
                  key={opt.id}
                  href={getWaUrl(opt.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onClose()}
                  className="w-full bg-white hover:bg-sage-light/30 border border-oat hover:border-sage/40 p-4 rounded-2xl transition-all duration-200 flex items-center justify-between group cursor-pointer shadow-2xs hover:shadow-xs text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-sage-light/60 group-hover:bg-sage-light transition-colors shrink-0">
                      {opt.icon}
                    </div>
                    <span className="font-serif font-bold text-charcoal text-sm sm:text-base group-hover:text-charcoal transition-colors">
                      {opt.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 pl-2">
                    <div className="w-8 h-8 rounded-full bg-sage text-alabaster flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                      <Send className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Footer note */}
            <div className="bg-oat/20 border-t border-oat/60 px-6 py-3.5 flex items-center justify-between text-xs text-slate-text">
              <div className="flex items-center gap-1.5 text-[11px] text-charcoal font-medium">
                <ShieldCheck className="w-4 h-4 text-sage shrink-0" />
                <span>Message pre-populates automatically into your WhatsApp keypad</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
