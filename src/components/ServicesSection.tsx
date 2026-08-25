import { useState } from 'react';
import { SERVICES, SPECIALTIES, METHODOLOGY, IMAGES } from '../data';
import { User, Users, Sparkles, Brain, Layers, Compass, ShieldCheck, ArrowRight, Moon, BookOpen, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LazyImage from './LazyImage';

interface ServicesSectionProps {
  onNavigate?: (page: 'booking' | 'workshops' | 'about') => void;
}

export default function ServicesSection({ onNavigate }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<'categories' | 'pricing' | 'specialties' | 'methodology'>('categories');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Moon': return <Moon className="w-5 h-5 text-sage" />;
      case 'User': return <User className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <Compass className="w-5 h-5" />;
    }
  };

  const pricingTiers = [
    {
      title: 'Book Your First Consultation',
      price: '₹499',
      duration: 'First Step Consultation',
      description: 'New to REHBR? Start your journey with a one-on-one consultation. A warm, confidential conversation designed to understand your needs and guide you toward the right path forward.',
      badge: 'New to REHBR?',
      highlight: true
    },
    {
      title: 'Already Consulted? Book Your Next Session',
      price: '₹1,499',
      duration: 'Follow-Up Session',
      description: 'Continue your journey by booking your next counseling session. Dedicated follow-up support designed to build upon your progress with personalized guidance.',
      badge: 'Returning Clients',
      highlight: false
    },
    {
      title: '🌙 Khwab Ki Tabeer (Islamic Dream Guidance)',
      price: '₹999',
      duration: 'Dream Guidance Consultation',
      description: 'Understand your dreams through the light of authentic Islamic teachings. Rooted in the Qur\'an, authentic Sunnah, and classical Islamic understanding with sincerity, wisdom, and humility while acknowledging that Allah alone has complete knowledge of the unseen.',
      badge: 'Islamic Dream Guidance',
      highlight: false
    },
    {
      title: '🎓 Join a Workshop or Course Directly',
      price: 'From ₹1,999',
      duration: 'Interactive Workshop & Blueprint',
      description: 'Prefer group learning or structured courses? Enroll directly in Insaan-e-Kamil or Mindful Parenting without booking a consultation. Includes live interactive sessions, workbook, Q&A, and certificate.',
      badge: 'Direct Course Registration',
      highlight: false,
      isWorkshop: true
    }
  ];

  return (
    <div id="services-page-root" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left">
      {/* Intro Header */}
      <div className="space-y-4 max-w-4xl">
        <span className="text-xs font-bold tracking-widest text-sage uppercase block">
          Confidential & Supportive Environment
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal">
          Islamic Counseling & Spiritual Guidance
        </h2>
        <p className="text-base text-slate-text leading-relaxed">
          REHBR provides a safe, confidential, and compassionate space for individuals, couples, and youth. Our counseling approach combines clinical counseling expertise with authentic Islamic wisdom to guide you toward healing, clarity, and emotional equilibrium.
        </p>
      </div>

      {/* Aesthetic Switcher Tabs */}
      <div className="flex border-b border-oat/60 max-w-2xl overflow-x-auto">
        {[
          { id: 'categories', label: 'Who We Serve', icon: <Users className="w-4 h-4" /> },
          { id: 'pricing', label: 'Pricing & Packages', icon: <Sparkles className="w-4 h-4" /> },
          { id: 'specialties', label: 'Specialties', icon: <Brain className="w-4 h-4" /> },
          { id: 'methodology', label: 'Methodology', icon: <Layers className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            id={`services-tab-${tab.id}`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-sage text-sage font-bold bg-sage-light/25'
                : 'border-transparent text-slate-text hover:text-charcoal hover:bg-oat/20'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Pane */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'categories' && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {SERVICES.map((srv) => (
                <div
                  id={`srv-card-${srv.id}`}
                  key={srv.id}
                  className="bg-alabaster border border-oat/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-sage/40 transition-all duration-300 flex flex-col justify-between"
                >
                  {srv.image && (
                    <div className="aspect-[16/9] w-full relative overflow-hidden bg-oat/30 border-b border-oat/40">
                      <LazyImage
                        src={srv.image}
                        alt={srv.title}
                        referrerPolicy="no-referrer"
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-alabaster/90 backdrop-blur-xs flex items-center justify-center text-sage shadow-xs">
                        {getIcon(srv.icon)}
                      </div>
                    </div>
                  )}

                  <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      {!srv.image && (
                        <div className="w-12 h-12 rounded-2xl bg-sage-light flex items-center justify-center text-sage">
                          {getIcon(srv.icon)}
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-sage font-semibold uppercase tracking-wider mb-1">{srv.subtitle}</p>
                        <h4 className="font-serif text-xl font-medium text-charcoal">{srv.title}</h4>
                      </div>
                      <p className="text-sm text-slate-text leading-relaxed">{srv.description}</p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-oat/40 space-y-3">
                      <span className="text-xs font-bold text-charcoal uppercase tracking-wider block">Key Focus Areas:</span>
                      <div className="flex flex-wrap gap-2">
                        {srv.focusAreas.map((focus, fIdx) => (
                          <span 
                            key={fIdx}
                            className="text-xs bg-oat/55 text-slate-text px-3 py-1.5 rounded-full border border-oat/40"
                          >
                            {focus}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'pricing' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {pricingTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={`border rounded-3xl p-8 flex flex-col justify-between transition-all space-y-6 ${
                    tier.highlight 
                      ? 'bg-gradient-to-br from-sage-light/30 via-alabaster to-oat/20 border-sage/50 shadow-md ring-1 ring-sage/20' 
                      : 'bg-alabaster border-oat/80 shadow-sm'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        tier.highlight ? 'bg-sage text-alabaster' : 'bg-oat text-charcoal'
                      }`}>
                        {tier.badge}
                      </span>
                      <span className="text-xs font-semibold text-slate-text/80">{tier.duration}</span>
                    </div>

                    <h4 className="font-serif text-2xl font-bold text-charcoal">{tier.title}</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif font-bold text-3xl text-sage">{tier.price}</span>
                      <span className="text-xs text-slate-text">/ session</span>
                    </div>

                    <p className="text-sm text-slate-text leading-relaxed">{tier.description}</p>
                  </div>

                  <button
                    onClick={() => onNavigate && onNavigate(tier.isWorkshop ? 'workshops' : 'booking')}
                    className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      tier.highlight
                        ? 'bg-sage text-alabaster hover:bg-sage/90 shadow-xs'
                        : tier.isWorkshop
                        ? 'bg-sage/90 text-alabaster hover:bg-sage font-bold'
                        : 'bg-oat text-charcoal hover:bg-oat/80'
                    }`}
                  >
                    <span>{tier.isWorkshop ? 'Explore Courses & Workshops' : `Book ${tier.title}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'specialties' && (
            <motion.div
              key="specialties"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {SPECIALTIES.map((spec, idx) => (
                <div
                  id={`spec-card-${idx}`}
                  key={idx}
                  className="bg-alabaster border border-oat/80 rounded-3xl p-8 shadow-sm flex gap-5 items-start"
                >
                  <div className="w-10 h-10 rounded-full bg-dustyblue-light text-dustyblue flex items-center justify-center shrink-0 mt-1">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-serif text-lg font-medium text-charcoal">{spec.title}</h4>
                    <p className="text-sm text-slate-text leading-relaxed">{spec.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'methodology' && (
            <motion.div
              key="methodology"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-sage-light/20 border border-sage/10 rounded-2xl p-6 mb-8 flex items-start gap-4">
                <Compass className="w-6 h-6 text-sage shrink-0 mt-1" />
                <div className="space-y-1">
                  <h5 className="font-serif font-medium text-charcoal text-sm">Grounded in Authentic Islamic Teaching</h5>
                  <p className="text-xs text-slate-text leading-relaxed">
                    The Qur'an and authentic Sunnah are our primary foundation. Evidence-based psychological tools (such as CBT, ACT, and Solution-Focused Therapy) are integrated strictly as supporting instruments compatible with Islamic principles.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {METHODOLOGY.map((meth, idx) => (
                  <div
                    id={`meth-card-${idx}`}
                    key={idx}
                    className="bg-alabaster border border-oat/80 rounded-2xl p-6 shadow-xs space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sage" />
                      <h4 className="font-serif font-medium text-charcoal text-base">{meth.name}</h4>
                    </div>
                    <p className="text-sm text-slate-text leading-relaxed pl-4">{meth.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Closing Callout */}
      <div className="bg-oat/25 border border-oat/60 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-2xl">
          <h4 className="font-serif text-xl font-medium text-charcoal">Ready to Take the First Step?</h4>
          <p className="text-sm text-slate-text leading-relaxed">
            Start with our <strong>Book a Consultation – ₹499</strong> session. It's a relaxed, confidential session to understand your needs and guide you toward the right path with zero pressure.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-text tracking-wider">
            <ShieldCheck className="w-5 h-5 text-sage" />
            <span>100% Confidential</span>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('booking')}
            className="px-6 py-3 rounded-full bg-sage hover:bg-sage/90 text-alabaster font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
          >
            Book Consultation (₹499)
          </button>
        </div>
      </div>
    </div>
  );
}
