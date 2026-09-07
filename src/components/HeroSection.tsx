import { motion } from 'motion/react';
import { ArrowRight, Shield, Heart, Sparkles, BookOpen, CheckCircle, RefreshCw, Lightbulb, MessageCircle, ChevronDown } from 'lucide-react';
import { IMAGES, WHY_REHBR, METHODOLOGY_STEPS, WHO_ITS_FOR } from '../data';
import { ActivePage } from '../types';
import { useState } from 'react';
import TestimonialSlider from './TestimonialSlider';
import InstagramFeed from './InstagramFeed';
import LazyImage from './LazyImage';

interface HeroSectionProps {
  onNavigate: (page: ActivePage) => void;
  onOpenWhatsApp?: () => void;
}

export default function HeroSection({ onNavigate, onOpenWhatsApp }: HeroSectionProps) {
  const [selectedNeed, setSelectedNeed] = useState<'personal' | 'counseling' | 'parenting' | 'spiritual' | 'workshops'>('personal');

  const helpOptions = {
    personal: {
      title: 'Personal Growth & Emotional Clarity',
      feeling: 'Feeling overwhelmed by stress, daily pressures, or stuck in unhealthy routines?',
      empathy: 'You deserve a space where you can pause, breathe, and untangle your thoughts without judgment.',
      outcome: 'Achieve greater mental clarity, emotional wellbeing, and daily habits that bring lasting tranquility.',
      ctaText: 'Begin Your Journey',
      targetPage: 'services' as ActivePage
    },
    counseling: {
      title: '1-on-1 Confidential Counseling',
      feeling: 'Navigating marital friction, deep anxiety, grief, or personal emotional pain?',
      empathy: 'You do not have to carry these silent burdens alone. We are here to listen with warm compassion and clinical expertise.',
      outcome: 'Experience emotional healing, stronger family relationships, and newfound hope.',
      ctaText: 'Book a Consultation',
      targetPage: 'booking' as ActivePage
    },
    parenting: {
      title: 'Parenting Support & Family Harmony',
      feeling: 'Struggling to manage parenting stress and instill Sunnah manners in your children?',
      empathy: 'Parenting in today’s world is challenging. You are doing your best, and gentle guidance can make all the difference.',
      outcome: 'Build a calm home, better parenting skills, and deeper emotional connection with your children.',
      ctaText: 'Explore Mindful Parenting',
      targetPage: 'workshops' as ActivePage
    },
    spiritual: {
      title: 'Spiritual Renewal & Inner Peace',
      feeling: 'Experiencing spiritual exhaustion, guilt, or feeling distant from your faith?',
      empathy: 'Allah’s mercy is boundless. Every step back toward Him begins with gentle reflection and sincere intention.',
      outcome: 'Rebuild a strong, loving relationship with Allah and experience profound Sakeenah (inner peace).',
      ctaText: 'Let’s Take the First Step Together',
      targetPage: 'services' as ActivePage
    },
    workshops: {
      title: 'Small-Group Transformation Workshops',
      feeling: 'Seeking practical, interactive group learning with step-by-step guidance?',
      empathy: 'Join supportive, small-group cohorts where reflection leads directly to practical positive change.',
      outcome: 'Gain concrete reflection blueprints and lifelong growth tools in a safe, interactive environment.',
      ctaText: 'Explore Flagship Workshops',
      targetPage: 'workshops' as ActivePage
    }
  };

  return (
    <div id="landing-page-root" className="space-y-24 pb-20">
      {/* 1. Hero Banner: Empathy & Understanding First */}
      <section id="hero-section" className="relative min-h-[85vh] flex items-center pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text Copy */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-light text-sage text-xs font-bold tracking-widest uppercase"
              >
                <Heart className="w-4 h-4 fill-sage" />
                <span>A Safe & Confidential Space for Healing & Growth</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-4"
              >
                <h1 className="font-serif text-charcoal text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.15] font-medium">
                  You Don't Have to Carry <br className="hidden sm:inline" />
                  <span className="italic text-sage font-normal text-3xl sm:text-4xl md:text-5xl block mt-2">
                    The Weight Alone
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-text max-w-xl leading-relaxed">
                  Whether you are navigating emotional exhaustion, family challenges, or seeking a deeper connection with Allah — we understand. You are in a safe, compassionate space where you are heard, valued, and supported.
                </p>
                <p className="text-sm font-medium text-charcoal/90 border-l-2 border-sage pl-4 py-1 italic">
                  REHBR provides authentic Islamic counseling and reflection-based workshops to guide you step-by-step toward emotional wellbeing, stronger relationships, and personal growth.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
              >
                <button
                  id="hero-cta-booking"
                  onClick={() => onNavigate('booking')}
                  className="px-8 py-4 rounded-full text-base font-bold text-alabaster bg-sage hover:bg-sage/90 active:scale-[0.98] transition-all duration-300 shadow-md shadow-sage/10 text-center cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Book a Consultation – ₹499</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                {onOpenWhatsApp && (
                  <button
                    id="hero-cta-whatsapp"
                    onClick={onOpenWhatsApp}
                    className="px-6 py-4 rounded-full text-base font-bold text-charcoal bg-sage-light/80 hover:bg-sage-light active:scale-[0.98] transition-all duration-300 text-center cursor-pointer flex items-center justify-center gap-2 border border-sage/30 shadow-2xs"
                  >
                    <MessageCircle className="w-5 h-5 text-sage fill-sage/20" />
                    <span>Message Us</span>
                  </button>
                )}

                <button
                  id="hero-cta-workshops"
                  onClick={() => onNavigate('workshops')}
                  className="px-6 py-4 rounded-full text-base font-semibold text-charcoal bg-oat hover:bg-oat/80 active:scale-[0.98] transition-all duration-300 text-center cursor-pointer"
                >
                  Find Guidance
                </button>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-oat/50 text-xs font-semibold text-slate-text"
              >
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-sage shrink-0" />
                  <span>Safe & Confidential</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-dustyblue shrink-0" />
                  <span>Qur'an & Sunnah Based</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-sage shrink-0" />
                  <span>Compassionate Care</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-lavender shrink-0" />
                  <span>Practical Change</span>
                </div>
              </motion.div>
            </div>

            {/* Visual Element: Calming Environment */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute -inset-2 rounded-3xl bg-oat/50 -rotate-2 -z-10" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-sage-light/20 to-transparent pointer-events-none z-10" />
              
              <div className="aspect-[4/3] sm:aspect-video lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-alabaster">
                <LazyImage
                  src={IMAGES.office}
                  alt="A peaceful, supportive counseling environment"
                  referrerPolicy="no-referrer"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-700"
                />
              </div>

              {/* Floating reassuring card */}
              <div className="absolute -bottom-6 -left-6 bg-white border border-oat p-4 rounded-2xl shadow-lg max-w-xs hidden sm:block z-20">
                <span className="text-[10px] uppercase tracking-widest text-sage font-bold block mb-1">Compassionate Promise</span>
                <p className="text-xs italic text-slate-text font-serif leading-snug">
                  "Every soul deserves to be heard with warmth and guided with sincere care."
                </p>
              </div>
            </motion.div>

            {/* Scroll for more arrow indicator */}
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: [0, 8, 0] }}
              transition={{
                opacity: { delay: 0.8, duration: 0.6 },
                y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
              }}
              className="col-span-full flex flex-col items-center justify-center pt-8 sm:pt-12 cursor-pointer group select-none"
              onClick={() => {
                const element = document.getElementById('consultation-featured-cta') || document.getElementById('why-rehbr-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-text group-hover:text-sage transition-colors mb-1.5 flex items-center gap-1">
                Scroll for more
              </span>
              <div className="w-8 h-8 rounded-full bg-white border border-oat shadow-2xs group-hover:border-sage group-hover:bg-sage-light/60 transition-all flex items-center justify-center">
                <ChevronDown className="w-4 h-4 text-sage group-hover:translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prominent Consultation Banner Section */}
      <section id="consultation-featured-cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-sage-light/40 via-alabaster to-oat/30 border-2 border-sage/30 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage text-alabaster text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Easiest First Step</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal">
                Book a Consultation – <span className="font-bold text-sage">₹499</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-text leading-relaxed max-w-2xl">
                Taking the first step should never feel overwhelming. A consultation is a relaxed, confidential session with Lead Counselor Mohamad Asif Khan to discuss what you are experiencing.
              </p>
              <div className="p-4 bg-alabaster border border-oat rounded-2xl text-xs sm:text-sm text-charcoal space-y-1">
                <p className="font-bold">What happens during the consultation?</p>
                <p className="text-slate-text leading-relaxed">
                  We listen to your concerns, answer your questions, and gently recommend the most suitable counseling service or workshop tailored specifically for your needs—no pressure or obligation.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-stretch lg:items-end justify-center space-y-3">
              <div className="bg-alabaster p-6 rounded-2xl border border-sage/20 text-center space-y-3 shadow-2xs w-full">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-text block">Consultation Fee</span>
                <span className="font-serif font-bold text-4xl text-charcoal block">₹499</span>
                <span className="text-xs text-sage font-semibold block">1-on-1 Confidential Call</span>
                <button
                  id="featured-consultation-btn"
                  onClick={() => onNavigate('booking')}
                  className="w-full py-3.5 px-6 rounded-full bg-sage hover:bg-sage/90 text-alabaster font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Book Consultation Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] text-slate-text text-center w-full">
                🔒 100% Confidential • Tailored Guidance • Instant Scheduling
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Helper: "How can we help you today?" */}
      <section id="how-we-help-interactive" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-alabaster border border-oat/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest text-sage uppercase block">
              Personalized Guidance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
              How Can We Help You Today?
            </h2>
            <p className="text-xs sm:text-sm text-slate-text">
              Select the area that matters most to you right now, and we will guide you toward the right support:
            </p>
          </div>

          {/* Interactive Option Chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { id: 'personal', label: 'Personal Growth' },
              { id: 'counseling', label: 'Counseling' },
              { id: 'parenting', label: 'Parenting Support' },
              { id: 'spiritual', label: 'Spiritual Growth' },
              { id: 'workshops', label: 'Workshops' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedNeed(opt.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  selectedNeed === opt.id
                    ? 'bg-sage text-alabaster shadow-sm scale-105'
                    : 'bg-oat/40 text-slate-text hover:bg-oat/70 hover:text-charcoal'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Dynamic Content Panel based on choice */}
          <div className="bg-sage-light/20 border border-sage/10 rounded-2xl p-6 sm:p-8 space-y-4 max-w-3xl mx-auto text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sage">
                {helpOptions[selectedNeed].title}
              </span>
              <h3 className="font-serif text-xl font-medium text-charcoal">
                {helpOptions[selectedNeed].feeling}
              </h3>
            </div>

            <p className="text-sm text-slate-text leading-relaxed">
              {helpOptions[selectedNeed].empathy}
            </p>

            <div className="pt-2 pb-1 border-t border-sage/10 flex items-center gap-2 text-xs font-semibold text-charcoal">
              <Sparkles className="w-4 h-4 text-sage shrink-0" />
              <span>Outcome: {helpOptions[selectedNeed].outcome}</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate(helpOptions[selectedNeed].targetPage)}
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-alabaster bg-sage hover:bg-sage/90 transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
              >
                <span>{helpOptions[selectedNeed].ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Why REHBR?" & The Implementation Problem */}
      <section id="why-rehbr-section" className="py-20 bg-oat/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold tracking-widest text-sage uppercase block">
              Bridging Learning and Living
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal">
              Why REHBR Exists
            </h2>
            <p className="text-slate-text text-base leading-relaxed">
              In today's world, Islamic information is accessible everywhere with a single click. However, <strong>implementation remains the true challenge</strong>. REHBR bridges the gap between learning guidance and living it every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_REHBR.map((item, index) => (
              <div 
                key={index} 
                className="bg-alabaster border border-oat/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-sage/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-full bg-sage-light flex items-center justify-center text-sage font-serif font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-charcoal">{item.title}</h3>
                  <p className="text-xs text-slate-text leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The REHBR Learning Methodology & Foundation */}
      <section id="methodology-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest text-sage uppercase block">
            The Learning Framework
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal">
            How REHBR Guides Transformation
          </h2>
          <p className="text-slate-text text-sm sm:text-base leading-relaxed">
            Every programme is structured around a clear 5-phase progression, ensuring that learning leads directly to character reform and real-life impact.
          </p>
        </div>

        {/* Methodology Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {METHODOLOGY_STEPS.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-oat rounded-2xl p-5 text-left relative flex flex-col justify-between shadow-2xs"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-sage px-2 py-0.5 bg-sage-light rounded-full">
                  Step 0{idx + 1}
                </span>
                <h4 className="font-serif text-base font-bold text-charcoal">{step.phase}</h4>
                <p className="text-xs text-slate-text leading-relaxed">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting Tools Notice */}
        <div className="bg-sage-light/20 border border-sage/10 rounded-2xl p-6 sm:p-8 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-sage">
              <Lightbulb className="w-5 h-5 shrink-0" />
              <h4 className="font-serif font-bold text-charcoal text-base">Authentic Foundation & Supporting Tools</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-text leading-relaxed">
              <strong>The Qur'an and Authentic Sunnah remain the primary foundation of every programme.</strong> Relevant insights from Psychology, Behavioral Science, Neuroscience, and NLP are utilized <em>only as supporting tools</em> where they align with Islamic principles.
            </p>
          </div>
          <button
            onClick={() => onNavigate('logistics')}
            className="shrink-0 px-6 py-3 rounded-full text-xs font-bold tracking-wider text-sage bg-sage-light hover:bg-sage/15 transition-all cursor-pointer uppercase"
          >
            Explore Methodology
          </button>
        </div>
      </section>

      {/* 4. Showcase Flagship Programmes */}
      <section id="flagship-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest text-sage uppercase block">
            Featured Educational Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal">
            REHBR Flagship Programmes
          </h2>
          <p className="text-slate-text text-sm sm:text-base leading-relaxed">
            Our programmes are reflection-based, practical, and action-oriented—designed so you leave knowing exactly what needs to change and how to begin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Insaan-e-Kamil */}
          <div className="bg-alabaster border border-oat rounded-3xl overflow-hidden space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[16/9] w-full relative overflow-hidden bg-oat/30 border-b border-oat/40">
              <LazyImage
                src={IMAGES.sereneStudy}
                alt="Insaan-e-Kamil Structured Spiritual Reflection Workshop"
                referrerPolicy="no-referrer"
                containerClassName="w-full h-full"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-alabaster/90 backdrop-blur-xs text-[10px] font-bold uppercase tracking-widest text-sage border border-sage/20 shadow-xs">
                Flagship Transformation
              </div>
            </div>
            <div className="p-8 pt-0 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-text font-semibold">Virtual • Small Group Cohort</span>
                  <span className="text-xs font-bold text-sage">4.0 Hours</span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-charcoal">Insaan-e-Kamil</h3>
                  <p className="text-xs text-sage font-bold uppercase tracking-wide mt-1">Structured Transformation Journey</p>
                </div>
                <p className="text-sm text-slate-text leading-relaxed">
                  Rooted in the Qur'an and Sunnah, Insaan-e-Kamil is NOT a motivational seminar or information-heavy lecture. It is an interactive, reflection-driven workshop where you audit your daily habits, address spiritual blocks, and build an actionable plan for personal reform.
                </p>
                <ul className="space-y-2 text-xs text-slate-text pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-sage" />
                    <span>Interactive Muhasabah (self-reflection) exercises</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-sage" />
                    <span>Personalized action plan for daily prayer and character</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-sage" />
                    <span>Strictly limited seats for tailored interaction & guidance</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('workshops')}
                className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-alabaster bg-sage hover:bg-sage/90 transition-all cursor-pointer shadow-xs mt-4"
              >
                Learn More & Register
              </button>
            </div>
          </div>

          {/* Card 2: Mindful Parenting */}
          <div className="bg-alabaster border border-oat rounded-3xl overflow-hidden space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[16/9] w-full relative overflow-hidden bg-oat/30 border-b border-oat/40">
              <LazyImage
                src={IMAGES.parenting}
                alt="Mindful Parenting Islamically Grounded Workshop"
                referrerPolicy="no-referrer"
                containerClassName="w-full h-full"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-alabaster/90 backdrop-blur-xs text-[10px] font-bold uppercase tracking-widest text-dustyblue border border-dustyblue/20 shadow-xs">
                Parenting Workshop
              </div>
            </div>
            <div className="p-8 pt-0 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-text font-semibold">Virtual • Small Group Cohort</span>
                  <span className="text-xs font-bold text-dustyblue">3.0 Hours</span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-charcoal">Mindful Parenting</h3>
                  <p className="text-xs text-dustyblue font-bold uppercase tracking-wide mt-1">Conscious, Islamically Grounded Parenting</p>
                </div>
                <p className="text-sm text-slate-text leading-relaxed">
                  Empowering Muslim parents to develop conscious, compassionate, and Islamically grounded parenting strategies. Learn practical tools to regulate emotional reactions, establish gentle firmness, and nurture authentic faith in your children.
                </p>
                <ul className="space-y-2 text-xs text-slate-text pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-dustyblue" />
                    <span>Practical emotional regulation tools for parents</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-dustyblue" />
                    <span>Nurturing love for Sunnah manners in modern culture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-dustyblue" />
                    <span>Reflection-based guidance and group discussion</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('workshops')}
                className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-charcoal bg-oat hover:bg-oat/80 transition-all cursor-pointer mt-4"
              >
                Explore Workshop Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Who REHBR Is For */}
      <section id="who-rehbr-for" className="bg-oat/20 border border-oat/60 rounded-3xl p-8 sm:p-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold tracking-widest text-sage uppercase block">
            A Welcoming Space for All Seekers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal">
            Who REHBR Is For
          </h2>
          <p className="text-slate-text text-sm sm:text-base leading-relaxed">
            REHBR welcomes every Muslim who sincerely wants to improve. Whether you are beginning your journey, returning to Allah, or seeking deeper spiritual and emotional growth—everyone is welcome.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHO_ITS_FOR.map((item, idx) => (
            <div key={idx} className="bg-alabaster border border-oat/50 rounded-2xl p-6 space-y-3 text-left">
              <div className="w-8 h-8 rounded-full bg-sage-light text-sage flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <h4 className="font-serif font-bold text-charcoal text-base">{item.title}</h4>
              <p className="text-xs text-slate-text leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Testimonial Slider */}
      <section id="mini-testimonials" className="max-w-5xl mx-auto px-4 sm:px-6">
        <TestimonialSlider />
      </section>

      {/* 7. Official Instagram Call to Action */}
      <InstagramFeed />
    </div>
  );
}
