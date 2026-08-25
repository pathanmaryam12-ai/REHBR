import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, HeartHandshake, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';

interface TestimonialSliderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function TestimonialSlider({
  title = "Stories of Reflection, Healing & Growth",
  subtitle = "Real experiences from individuals, couples, and families guided through REHBR counseling and workshops.",
  className = ""
}: TestimonialSliderProps) {
  const [filter, setFilter] = useState<'all' | 'counseling' | 'workshops' | 'marital'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const filteredTestimonials = TESTIMONIALS.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'counseling') return t.category === 'counseling' || t.category === 'marital';
    if (filter === 'workshops') return t.category === 'workshops';
    if (filter === 'marital') return t.category === 'marital';
    return true;
  });

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  // Auto-advance timer (every 6 seconds unless hovered)
  useEffect(() => {
    if (isPaused || filteredTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, filteredTestimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const activeTestimonial = filteredTestimonials[currentIndex] || TESTIMONIALS[0];

  return (
    <div 
      id="testimonial-slider-root" 
      className={`bg-alabaster border border-oat/80 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-oat/50 pb-6">
        <div className="space-y-2 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sage">
            <HeartHandshake className="w-4 h-4" />
            <span>Trusted Guidance</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-text leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Stories' },
            { id: 'counseling', label: 'Counseling' },
            { id: 'workshops', label: 'Workshops' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-sage text-alabaster shadow-2xs'
                  : 'bg-oat/30 text-slate-text hover:bg-oat/60 hover:text-charcoal'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Slider Card */}
      <div className="relative min-h-[220px] flex flex-col justify-between pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTestimonial.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-6 text-left"
          >
            {/* Outcome Highlight Tag */}
            {activeTestimonial.highlight && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-light text-sage text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeTestimonial.highlight}</span>
              </div>
            )}

            {/* Quote Block */}
            <div className="relative space-y-3">
              <Quote className="w-8 h-8 text-sage/20 absolute -top-3 -left-2 pointer-events-none" />
              <p className="font-serif text-lg sm:text-xl md:text-2xl italic text-charcoal leading-relaxed pl-6">
                "{activeTestimonial.quote}"
              </p>
            </div>

            {/* Author Attribution */}
            <div className="flex items-center justify-between pt-2 border-t border-oat/30 text-xs">
              <div className="space-y-0.5">
                <p className="font-serif font-bold text-charcoal text-sm">
                  {activeTestimonial.author}
                </p>
                <p className="text-[11px] text-slate-text/80 font-medium">
                  {activeTestimonial.period}
                </p>
              </div>

              {/* Rating stars or subtle icon */}
              <div className="flex items-center gap-1 text-sage">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-sage text-sage" />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls Bar */}
        <div className="flex items-center justify-between pt-8">
          {/* Pagination dots */}
          <div className="flex items-center gap-2">
            {filteredTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 bg-sage'
                    : 'w-2 bg-oat/60 hover:bg-oat'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-oat/20 border border-oat text-charcoal hover:bg-sage hover:border-sage hover:text-alabaster transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-oat/20 border border-oat text-charcoal hover:bg-sage hover:border-sage hover:text-alabaster transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
