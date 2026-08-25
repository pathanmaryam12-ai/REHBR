import { useState } from 'react';
import { FAQS } from '../data';
import { MapPin, Globe, Shield, Calendar, ChevronDown, Info, CreditCard, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function LogisticsSection() {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'fees' | 'process'>('all');

  const filteredFaqs = selectedCategory === 'all' 
    ? FAQS 
    : FAQS.filter(faq => faq.category === selectedCategory);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div id="logistics-page-root" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 text-left">
      {/* 1. Intro Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold tracking-widest text-sage uppercase block">
          Methodology, Rates & Practice Logistics
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal">
          Transparency & Platform Logistics
        </h2>
        <p className="text-base text-slate-text leading-relaxed">
          Embarking on counseling or an educational programme is an investment in your spiritual, emotional, and relational health. We believe in complete transparency regarding fees, format options, and practice policies.
        </p>
      </div>

      {/* 2. Rates & Format Cards */}
      <section id="rates-format-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Card 1: Investment Rates */}
        <div className="bg-alabaster border border-oat/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center text-sage font-bold font-serif text-lg">
              ₹
            </div>
            <h4 className="font-serif text-xl font-medium text-charcoal">Counseling & Workshop Fees</h4>
            <div className="space-y-3 text-sm text-slate-text pt-2">
              <div className="flex justify-between border-b border-oat/40 pb-2">
                <span className="font-semibold text-charcoal">Consultation Session</span>
                <span className="font-mono font-bold text-sage">₹499 <span className="text-[10px] text-slate-text/70">(First Step)</span></span>
              </div>
              <div className="flex justify-between border-b border-oat/40 pb-2">
                <span className="font-semibold text-charcoal">Young Adult Counseling</span>
                <span className="font-mono font-bold">₹2,999 <span className="text-[10px] text-slate-text/70">(50 mins)</span></span>
              </div>
              <div className="flex justify-between border-b border-oat/40 pb-2">
                <span className="font-semibold text-charcoal">Individual Counseling</span>
                <span className="font-mono font-bold">₹3,999 <span className="text-[10px] text-slate-text/70">(50 mins)</span></span>
              </div>
              <div className="flex justify-between border-b border-oat/40 pb-2">
                <span className="font-semibold text-charcoal">Couples / Marital</span>
                <span className="font-mono font-bold">₹4,999 <span className="text-[10px] text-slate-text/70">(60 mins)</span></span>
              </div>
              <div className="flex justify-between border-b border-oat/40 pb-2">
                <span className="font-semibold text-charcoal">Insaan-e-Kamil Workshop</span>
                <span className="font-mono font-bold text-sage">₹8,999 <span className="text-[10px] text-slate-text/70">(4 Hours)</span></span>
              </div>
              <div className="flex justify-between border-b border-oat/40 pb-2">
                <span className="font-semibold text-charcoal">Mindful Parenting Workshop</span>
                <span className="font-mono font-bold text-sage">₹8,999 <span className="text-[10px] text-slate-text/70">(3 Hours)</span></span>
              </div>
            </div>
          </div>
          <div className="bg-oat/25 rounded-2xl p-4 text-xs text-slate-text leading-relaxed flex items-start gap-2.5">
            <Info className="w-4 h-4 text-sage shrink-0 mt-0.5" />
            <span>Sliding-scale financial assistance is available for individuals experiencing financial hardship. Please inquire during your consultation.</span>
          </div>
        </div>

        {/* Card 2: Payment Methods & Transparency */}
        <div className="bg-alabaster border border-oat/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-dustyblue-light flex items-center justify-center text-dustyblue">
              <CreditCard className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl font-medium text-charcoal">Payment & Invoicing</h4>
            <p className="text-xs text-slate-text font-semibold uppercase tracking-wider text-dustyblue">Simple & Secure Payment Options</p>
            <div className="space-y-3.5 text-sm text-slate-text pt-2 leading-relaxed">
              <p>
                We accept all major <strong>UPI options (GPay, PhonePe, Paytm), Netbanking, and Credit/Debit cards</strong>.
              </p>
              <p>
                Payment is due at the time of booking to secure your preferred calendar slot. An official GST invoice and digital receipt are generated automatically upon confirmation.
              </p>
            </div>
          </div>
          <div className="bg-dustyblue-light/30 border border-dustyblue/10 rounded-2xl p-4 text-xs text-slate-text leading-relaxed flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-dustyblue shrink-0 mt-0.5" />
            <span>All transactions are encrypted and processed through secure payment gateways.</span>
          </div>
        </div>

        {/* Card 3: Formats & Delivery */}
        <div className="bg-alabaster border border-oat/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-lavender-light flex items-center justify-center text-lavender">
              <Building className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl font-medium text-charcoal">Formats & Policies</h4>
            <div className="space-y-4 text-sm text-slate-text pt-2">
              <div className="space-y-1">
                <p className="font-semibold text-charcoal flex items-center gap-2">
                  <Globe className="w-4 h-4 text-dustyblue" />
                  Online Sessions & Virtual Workshops
                </p>
                <p className="text-xs leading-relaxed pl-6">
                  Online video sessions and interactive workshops accessible from anywhere via encrypted link.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-charcoal flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sage" />
                  In-Person Counseling
                </p>
                <p className="text-xs leading-relaxed pl-6">
                  In-person counseling sessions available by appointment at our dedicated center.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-charcoal flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-lavender" />
                  Rescheduling Policy
                </p>
                <p className="text-xs leading-relaxed pl-6">
                  A minimum of 24 hours notice is required to cancel or reschedule appointments.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-lavender-light/40 border border-lavender/10 rounded-2xl p-4 text-xs text-slate-text leading-relaxed">
            <p className="font-semibold text-charcoal mb-1">Confidentiality Commitment:</p>
            All sessions, participant identities, and discussion records are kept strictly confidential.
          </div>
        </div>
      </section>

      {/* 3. FAQ Section */}
      <section id="faq-section" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-sage uppercase block">
            Common Inquiries
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
            Frequently Asked Questions
          </h3>
          <p className="text-sm text-slate-text">
            Learn more about REHBR's Islamic foundation, methodology, workshop seats, and counseling policies:
          </p>
        </div>

        {/* FAQ Filter Chips */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'general', label: 'General & Foundation' },
            { id: 'process', label: 'Workshops & Method' },
            { id: 'fees', label: 'Fees & Confidentiality' },
          ].map((cat) => (
            <button
              id={`faq-filter-${cat.id}`}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-sage text-alabaster shadow-xs font-bold'
                  : 'bg-oat/50 text-slate-text hover:bg-oat/80 hover:text-charcoal'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion Wrapper */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                id={`faq-wrapper-${faq.id}`}
                key={faq.id}
                className="bg-alabaster border border-oat/85 rounded-2xl overflow-hidden shadow-xs hover:border-oat transition-colors duration-200"
              >
                <button
                  id={`faq-btn-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-serif font-medium text-charcoal text-base cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-sage transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-sm text-slate-text leading-relaxed border-t border-oat/30 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
