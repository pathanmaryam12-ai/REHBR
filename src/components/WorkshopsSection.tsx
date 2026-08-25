import { useState, FormEvent } from 'react';
import { WORKSHOPS, IMAGES } from '../data';
import { Calendar, Monitor, MapPin, Users, Clock, Mail, Check, ShieldCheck, Award, HeartHandshake, BookOpen, Sparkles, Target, GraduationCap, CheckCircle, Info, Layers, Lightbulb, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Workshop } from '../types';
import LazyImage from './LazyImage';
import { saveWaitlistToSupabase, saveRegistrationToSupabase } from '../lib/supabase';

export default function WorkshopsSection() {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistName, setWaitlistName] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('general');
  const [successMessage, setSuccessMessage] = useState('');
  const [registrationModal, setRegistrationModal] = useState<{ isOpen: boolean; title: string; fee: number; format: string } | null>(null);
  const [regForm, setRegForm] = useState({ name: '', email: '', phone: '', card: '4111 2222 3333 4444' });
  const [regSuccess, setRegSuccess] = useState(false);

  // Interactive Info Side Panel state
  const [infoModalWorkshop, setInfoModalWorkshop] = useState<Workshop | null>(null);
  const [activeInfoTab, setActiveInfoTab] = useState<'what' | 'how' | 'who' | 'preview' | 'receive'>('what');
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);

  const handleWaitlistSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail || !waitlistName) return;

    const existingWaitlist = JSON.parse(localStorage.getItem('rehbr_waitlist') || '[]');
    const newEntry = {
      id: Date.now(),
      name: waitlistName,
      email: waitlistEmail,
      interest: selectedInterest,
      date: new Date().toISOString()
    };
    
    existingWaitlist.push(newEntry);
    localStorage.setItem('rehbr_waitlist', JSON.stringify(existingWaitlist));

    // Save waitlist entry to Supabase
    saveWaitlistToSupabase(newEntry);

    const selectedName = selectedInterest === 'general' 
      ? 'REHBR Programme Notifications'
      : WORKSHOPS.find(i => i.id === selectedInterest)?.title || 'Selected Programme';

    setSuccessMessage(`Warmly received! You have been added to the list for "${selectedName}". We will notify you as soon as seats open.`);
    
    setWaitlistName('');
    setWaitlistEmail('');
    setSelectedInterest('general');

    setTimeout(() => {
      setSuccessMessage('');
    }, 8000);
  };

  const handleOpenRegistration = (title: string, fee: number, format: string) => {
    setRegistrationModal({ isOpen: true, title, fee, format });
    setRegSuccess(false);
  };

  const handleRegSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (registrationModal) {
      const regData = {
        name: regForm.name,
        email: regForm.email,
        phone: regForm.phone,
        courseTitle: registrationModal.title,
        fee: registrationModal.fee,
        format: registrationModal.format,
        date: new Date().toISOString()
      };
      
      const existingRegs = JSON.parse(localStorage.getItem('rehbr_registrations') || '[]');
      existingRegs.push(regData);
      localStorage.setItem('rehbr_registrations', JSON.stringify(existingRegs));

      // Save course registration to Supabase
      saveRegistrationToSupabase(regData);
    }

    setRegSuccess(true);
    setTimeout(() => {
      setRegistrationModal(null);
      setRegSuccess(false);
      setRegForm({ name: '', email: '', phone: '', card: '4111 2222 3333 4444' });
    }, 3000);
  };

  return (
    <div id="workshops-page-root" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left">
      {/* Intro Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold tracking-widest text-sage uppercase block">
          Educational Programmes & Workshops
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal">
          Explore Our Courses & Join a Workshop Directly
        </h2>
        <p className="text-base text-slate-text leading-relaxed">
          Not every visitor requires individual counseling. REHBR offers structured, reflection-driven workshops and courses that you can enroll in directly. Every course is crafted for deep self-reflection (Muhasabah), practical implementation, and lasting spiritual growth.
        </p>
      </div>

      {/* Reassurance Callouts: Why Limited Seats & Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Why Seats Are Limited Callout */}
        <div className="bg-sage-light/20 border border-sage/10 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-sage">
            <HeartHandshake className="w-5 h-5 shrink-0" />
            <h4 className="font-serif font-bold text-charcoal text-base">Why Workshop Seats Are Limited</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-text leading-relaxed">
            We limit workshop cohort sizes intentionally to ensure <strong>personal attention, rich interaction, meaningful discussions, and tailored guidance</strong> for every participant.
          </p>
        </div>

        {/* Certificates Callout */}
        <div className="bg-dustyblue-light/20 border border-dustyblue/10 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-dustyblue">
            <Award className="w-5 h-5 shrink-0" />
            <h4 className="font-serif font-bold text-charcoal text-base">Certificates & Transformation</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-text leading-relaxed">
            Certificates of completion are awarded for all workshops. REHBR's primary focus remains <strong>reflection, practical action, and authentic character reform</strong>.
          </p>
        </div>
      </div>

      {/* Featured Workshops & Direct Course Purchase Section */}
      <section id="live-workshops-grid" className="space-y-10">
        <div className="flex items-center justify-between border-b border-oat pb-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-sage" />
            <h3 className="font-serif text-2xl font-normal text-charcoal">Available Workshops & Courses</h3>
          </div>
          <span className="text-xs text-slate-text hidden sm:inline">Direct Course Registration • No Consultation Required</span>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {WORKSHOPS.map((workshop) => {
            const isFull = workshop.seatsLeft === 0;
            const isFlagship = workshop.id === 'insaan-e-kamil';

            return (
              <div
                id={`workshop-card-${workshop.id}`}
                key={workshop.id}
                className={`bg-alabaster border rounded-3xl overflow-hidden shadow-sm space-y-8 relative ${
                  isFlagship ? 'border-sage/50 ring-1 ring-sage/20' : 'border-oat/80'
                }`}
              >
                {workshop.image && (
                  <div className="aspect-[21/9] sm:aspect-[24/8] w-full relative overflow-hidden bg-oat/30 border-b border-oat/40">
                    <LazyImage
                      src={workshop.image}
                      alt={workshop.title}
                      referrerPolicy="no-referrer"
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent flex items-end p-6 sm:p-8">
                      <span className="text-alabaster font-serif text-lg sm:text-xl font-medium drop-shadow-xs">
                        {workshop.subtitle}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-10 pt-0 sm:pt-0 space-y-8">
                  {/* Header & Badges */}
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-6 border-b border-oat/50 pb-6">
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      {isFlagship && (
                        <span className="bg-sage text-alabaster text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-wider">
                          Flagship Programme
                        </span>
                      )}
                      <span className="bg-oat/60 text-charcoal text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-wider">
                        {workshop.duration} • Live Cohort
                      </span>
                    </div>
                    <h4 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal pt-1">
                      {workshop.title}
                    </h4>
                    {workshop.subtitle && (
                      <p className="text-xs font-bold text-sage uppercase tracking-wider">{workshop.subtitle}</p>
                    )}
                  </div>

                  {/* Clean Sleek Pricing + Interactive Learn More CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-text block">Course Tuition</span>
                      <span className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">₹{workshop.fee.toLocaleString('en-IN')}</span>
                      <span className="text-[11px] font-medium text-sage block">Direct Registration Available</span>
                    </div>

                    <button
                      type="button"
                      id={`learn-more-btn-${workshop.id}`}
                      onClick={() => {
                        setInfoModalWorkshop(workshop);
                        setActiveInfoTab('what');
                        setShowSampleAnswer(false);
                      }}
                      className="px-5 py-2.5 rounded-full bg-sage-light/50 border border-sage/30 hover:bg-sage/20 text-sage font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-2xs shrink-0"
                    >
                      <Info className="w-4 h-4 text-sage" />
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Logistics Info Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-oat/20 border border-oat/40 p-4 rounded-2xl text-xs text-slate-text">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-sage shrink-0" />
                    <div>
                      <span className="font-bold block text-charcoal">Date & Time</span>
                      <span>{workshop.date} ({workshop.time})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {workshop.format === 'Virtual' ? (
                      <Monitor className="w-4 h-4 text-dustyblue shrink-0" />
                    ) : (
                      <MapPin className="w-4 h-4 text-dustyblue shrink-0" />
                    )}
                    <div>
                      <span className="font-bold block text-charcoal">Format & Venue</span>
                      <span>{workshop.format} {workshop.location ? `— ${workshop.location}` : '(Interactive Zoom Room)'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-lavender shrink-0" />
                    <div>
                      <span className="font-bold block text-charcoal">Cohort Capacity</span>
                      <span>{isFull ? 'Cohort Full' : `Limited to ${workshop.seatsTotal} seats (${workshop.seatsLeft} remaining)`}</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Information Button Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-sage-light/20 border border-sage/20 p-4 rounded-2xl">
                  <div className="flex items-center gap-2.5 text-xs text-charcoal font-medium">
                    <Info className="w-4.5 h-4.5 text-sage shrink-0" />
                    <span>Want full details on curriculum, methodology, and target audience?</span>
                  </div>

                  <button
                    type="button"
                    id={`info-icon-btn-${workshop.id}`}
                    onClick={() => {
                      setInfoModalWorkshop(workshop);
                      setActiveInfoTab('what');
                      setShowSampleAnswer(false);
                    }}
                    className="px-4 py-2 rounded-full border border-sage/40 bg-alabaster hover:bg-sage/10 text-sage font-bold text-xs transition-all cursor-pointer flex items-center gap-2 shadow-2xs shrink-0"
                  >
                    <BookOpen className="w-4 h-4 text-sage" />
                    <span>View Interactive Side Panel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-sm text-slate-text leading-relaxed">
                  {workshop.description}
                </p>

                {/* Clear Explanations: What You'll Learn, Experience, Who It's For, What You'll Receive */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
                  {/* What You'll Learn */}
                  <div className="space-y-3 bg-alabaster border border-oat/60 p-5 rounded-2xl">
                    <div className="flex items-center gap-2 text-sage font-serif font-bold text-base">
                      <BookOpen className="w-4 h-4 shrink-0" />
                      <h5>What You'll Learn</h5>
                    </div>
                    <ul className="space-y-2.5">
                      {workshop.whatYoullLearn.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-text leading-relaxed">
                          <CheckCircle className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What You'll Experience */}
                  <div className="space-y-3 bg-alabaster border border-oat/60 p-5 rounded-2xl">
                    <div className="flex items-center gap-2 text-dustyblue font-serif font-bold text-base">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <h5>What You'll Experience</h5>
                    </div>
                    <ul className="space-y-2.5">
                      {workshop.whatYoullExperience.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-text leading-relaxed">
                          <CheckCircle className="w-3.5 h-3.5 text-dustyblue shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Who This Course Is For */}
                  <div className="space-y-3 bg-alabaster border border-oat/60 p-5 rounded-2xl">
                    <div className="flex items-center gap-2 text-charcoal font-serif font-bold text-base">
                      <Target className="w-4 h-4 shrink-0 text-lavender" />
                      <h5>Who This Course Is For</h5>
                    </div>
                    <ul className="space-y-2.5">
                      {workshop.whoThisIsFor.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-text leading-relaxed">
                          <CheckCircle className="w-3.5 h-3.5 text-lavender shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What You'll Receive */}
                  <div className="space-y-3 bg-sage-light/15 border border-sage/20 p-5 rounded-2xl">
                    <div className="flex items-center gap-2 text-sage font-serif font-bold text-base">
                      <Award className="w-4 h-4 shrink-0" />
                      <h5>What You'll Receive</h5>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {workshop.whatYoullReceive.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 bg-alabaster p-2 rounded-xl border border-sage/10 text-xs font-medium text-charcoal">
                          <Check className="w-3.5 h-3.5 text-sage shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="pt-4 border-t border-oat/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-text">
                    <span>Direct Enrollment • Secure Instant Confirmation • No Consultation Needed</span>
                  </div>
                  {isFull ? (
                    <button
                      id={`workshop-waitlist-btn-${workshop.id}`}
                      onClick={() => {
                        setSelectedInterest(workshop.id);
                        const el = document.getElementById('waitlist-form-card');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full text-center text-xs font-bold text-lavender bg-lavender-light hover:bg-lavender/20 transition-all cursor-pointer uppercase tracking-wider"
                    >
                      Join Waitlist
                    </button>
                  ) : (
                    <button
                      id={`workshop-register-btn-${workshop.id}`}
                      onClick={() => handleOpenRegistration(workshop.title, workshop.fee, workshop.format)}
                      className="w-full sm:w-auto px-10 py-3.5 rounded-full text-center text-xs font-bold text-alabaster bg-sage hover:bg-sage/90 transition-all cursor-pointer uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Register Directly for Workshop (₹{workshop.fee.toLocaleString('en-IN')})</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </section>

      {/* Waitlist Capture Component */}
      <section id="waitlist-form-card" className="max-w-4xl mx-auto">
        <div className="bg-sage-light/35 border border-sage/10 rounded-3xl p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-sage/15 flex items-center justify-center text-sage">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl font-medium text-charcoal leading-tight">
                Stay Informed on Upcoming Programme Dates
              </h4>
              <p className="text-xs text-slate-text leading-relaxed">
                Because workshop seats are strictly limited, cohorts fill quickly. Sign up below to receive early notifications for new cohort dates, free reflection guides, and programme updates.
              </p>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleWaitlistSubmit} className="space-y-4 bg-alabaster p-6 rounded-2xl border border-oat/80 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="waitlist-name" className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                      Your First Name
                    </label>
                    <input
                      id="waitlist-name"
                      type="text"
                      required
                      placeholder="e.g. Aisha"
                      value={waitlistName}
                      onChange={(e) => setWaitlistName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-oat bg-white text-sm text-charcoal focus:outline-none focus:border-sage transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="waitlist-email" className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                      Email Address
                    </label>
                    <input
                      id="waitlist-email"
                      type="email"
                      required
                      placeholder="e.g. 123@gmail.com"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-oat bg-white text-sm text-charcoal focus:outline-none focus:border-sage transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="waitlist-interest" className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                    Programme Interest
                  </label>
                  <select
                    id="waitlist-interest"
                    value={selectedInterest}
                    onChange={(e) => setSelectedInterest(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-oat bg-alabaster text-sm text-charcoal focus:outline-none focus:border-sage transition-all"
                  >
                    <option value="general">General REHBR Programme Updates & Reflection Guides</option>
                    <option value="insaan-e-kamil">Flagship: Insaan-e-Kamil Transformation Journey</option>
                    <option value="mindful-parenting">Workshop: Mindful Parenting</option>
                  </select>
                </div>

                <button
                  id="submit-waitlist-btn"
                  type="submit"
                  className="w-full py-3 bg-sage hover:bg-sage/90 text-alabaster font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Join Programme Waitlist
                </button>
              </form>
            </div>
          </div>

          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 bg-sage-light border border-sage/20 text-sage rounded-xl flex items-start gap-3"
              >
                <Check className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">{successMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Interactive Information & Methodology Slide-In Side Panel */}
      <AnimatePresence>
        {infoModalWorkshop && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-charcoal/60 flex justify-end">
            {/* Backdrop Click to Close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInfoModalWorkshop(null)}
              className="absolute inset-0"
            />

            {/* Slide-In Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-full max-w-2xl h-full bg-alabaster shadow-2xl border-l border-oat p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-50 space-y-6"
            >
              {/* Header */}
              <div className="space-y-4 border-b border-oat/60 pb-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-sage bg-sage-light px-3 py-1 rounded-full">
                        Course Details & Curriculum
                      </span>
                      <span className="text-xs text-slate-text font-bold">Tuition: ₹{infoModalWorkshop.fee.toLocaleString('en-IN')}</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                      {infoModalWorkshop.title}
                    </h3>
                    <p className="text-xs font-bold text-sage uppercase tracking-wider">{infoModalWorkshop.subtitle}</p>
                  </div>

                  <button
                    type="button"
                    id="close-info-modal-btn"
                    onClick={() => setInfoModalWorkshop(null)}
                    className="p-2 rounded-full bg-oat/40 hover:bg-oat text-charcoal transition-colors cursor-pointer shrink-0"
                    title="Close Side Panel"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Interactive Navigation Tabs */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveInfoTab('what')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeInfoTab === 'what'
                        ? 'bg-sage text-alabaster shadow-xs'
                        : 'bg-oat/30 text-slate-text hover:bg-oat/60'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Curriculum</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveInfoTab('how')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeInfoTab === 'how'
                        ? 'bg-sage text-alabaster shadow-xs'
                        : 'bg-oat/30 text-slate-text hover:bg-oat/60'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Methodology</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveInfoTab('who')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeInfoTab === 'who'
                        ? 'bg-sage text-alabaster shadow-xs'
                        : 'bg-oat/30 text-slate-text hover:bg-oat/60'
                    }`}
                  >
                    <Target className="w-3.5 h-3.5" />
                    <span>Target Audience</span>
                  </button>

                  {infoModalWorkshop.samplePrompt && (
                    <button
                      type="button"
                      onClick={() => setActiveInfoTab('preview')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeInfoTab === 'preview'
                          ? 'bg-sage text-alabaster shadow-xs'
                          : 'bg-oat/30 text-slate-text hover:bg-oat/60'
                      }`}
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      <span>Sample Exercise</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveInfoTab('receive')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeInfoTab === 'receive'
                        ? 'bg-sage text-alabaster shadow-xs'
                        : 'bg-oat/30 text-slate-text hover:bg-oat/60'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Deliverables</span>
                  </button>
                </div>
              </div>

              {/* Panel Content Body */}
              <div className="flex-1 space-y-6">
                {/* Tab 1: What You'll Learn (Curriculum) */}
                {activeInfoTab === 'what' && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-charcoal text-base">Course Curriculum & Learning Outcomes</h4>
                      <p className="text-xs text-slate-text leading-relaxed">
                        Rooted in authentic Islamic psychological frameworks, this course delivers key transformation pillars:
                      </p>
                    </div>

                    <div className="space-y-3">
                      {infoModalWorkshop.whatYoullLearn.map((item, idx) => (
                        <div key={idx} className="bg-sage-light/20 border border-sage/20 p-4 rounded-2xl space-y-1.5">
                          <div className="flex items-center gap-2 text-sage font-bold text-xs">
                            <CheckCircle className="w-4 h-4 shrink-0" />
                            <span>Module #{idx + 1} Pillar</span>
                          </div>
                          <p className="text-xs text-charcoal font-medium leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: How You'll Learn It (Methodology Timeline) */}
                {activeInfoTab === 'how' && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-charcoal text-base">The REHBR Learning Experience</h4>
                      <p className="text-xs text-slate-text">How the {infoModalWorkshop.duration} live session is structured step-by-step:</p>
                    </div>

                    <div className="space-y-3">
                      {infoModalWorkshop.howYoullLearn?.map((step) => (
                        <div key={step.step} className="flex items-start gap-4 bg-alabaster border border-oat/80 p-4 rounded-2xl shadow-2xs">
                          <div className="w-8 h-8 rounded-full bg-sage text-alabaster font-bold text-sm flex items-center justify-center shrink-0">
                            {step.step}
                          </div>
                          <div className="space-y-1">
                            <h5 className="font-serif font-bold text-charcoal text-sm">{step.title}</h5>
                            <p className="text-xs text-slate-text leading-relaxed">{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Target Audience (Who This Is For) */}
                {activeInfoTab === 'who' && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-charcoal text-base">Who This Course Is Designed For</h4>
                      <p className="text-xs text-slate-text">This programme is tailored specifically for individuals seeking authentic growth:</p>
                    </div>

                    <div className="space-y-3">
                      {infoModalWorkshop.whoThisIsFor.map((person, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-oat/20 border border-oat/60 p-4 rounded-2xl">
                          <Target className="w-4 h-4 text-lavender shrink-0 mt-0.5" />
                          <span className="text-xs font-medium text-charcoal leading-relaxed">{person}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 4: Interactive Sample Exercise */}
                {activeInfoTab === 'preview' && infoModalWorkshop.samplePrompt && (
                  <div className="space-y-6">
                    <div className="bg-amber-50/60 border border-amber-200/60 p-6 rounded-2xl space-y-4">
                      <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-base">
                        <Sparkles className="w-5 h-5 text-amber-600" />
                        <h4>{infoModalWorkshop.samplePrompt.title}</h4>
                      </div>

                      <p className="text-xs text-slate-text leading-relaxed">
                        <strong>Scenario:</strong> {infoModalWorkshop.samplePrompt.scenario}
                      </p>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setShowSampleAnswer(!showSampleAnswer)}
                          className="px-4 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-alabaster font-bold text-xs transition-all cursor-pointer flex items-center gap-2 shadow-2xs"
                        >
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>{showSampleAnswer ? 'Hide Prophetic Guidance Framework' : 'Click to Reveal Prophetic Guidance Framework'}</span>
                        </button>
                      </div>

                      <AnimatePresence>
                        {showSampleAnswer && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-alabaster border border-amber-200 p-4 rounded-xl text-xs text-charcoal leading-relaxed font-sans space-y-2"
                          >
                            <span className="font-bold text-amber-800 uppercase text-[10px] block">Guided Reflection:</span>
                            <p>{infoModalWorkshop.samplePrompt.guidance}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* Tab 5: What You'll Receive (Deliverables) */}
                {activeInfoTab === 'receive' && (
                  <div className="space-y-6">
                    <h4 className="font-serif font-bold text-charcoal text-base">Deliverables & Included Resources</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {infoModalWorkshop.whatYoullReceive.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-sage-light/20 border border-sage/20 p-3.5 rounded-xl text-xs font-medium text-charcoal">
                          <Check className="w-4 h-4 text-sage shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Fixed Action Footer */}
              <div className="pt-4 border-t border-oat/60 flex flex-col sm:flex-row items-center justify-between gap-4 bg-alabaster">
                <div className="text-xs text-slate-text">
                  <span className="font-bold block text-charcoal">{infoModalWorkshop.title}</span>
                  <span>Direct Registration • ₹{infoModalWorkshop.fee.toLocaleString('en-IN')}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const ws = infoModalWorkshop;
                    setInfoModalWorkshop(null);
                    handleOpenRegistration(ws.title, ws.fee, ws.format);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-sage hover:bg-sage/90 text-alabaster font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2 shrink-0"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Register Directly Now</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal for Direct Workshop Registration */}
      <AnimatePresence>
        {registrationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-alabaster max-w-md w-full rounded-3xl p-6 sm:p-8 border border-oat shadow-2xl relative space-y-6"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-widest text-sage bg-sage-light px-3 py-1 rounded-full">
                  Direct Course Registration
                </span>
                <button
                  id="close-modal-btn"
                  onClick={() => setRegistrationModal(null)}
                  className="text-slate-text hover:text-charcoal p-1 cursor-pointer font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-xl font-bold text-charcoal leading-tight">
                  {registrationModal.title}
                </h4>
                <p className="text-xs text-slate-text">Format: {registrationModal.format} • Direct Seat Confirmation</p>
              </div>

              <div className="bg-sage-light/30 border border-sage/20 p-4 rounded-2xl flex justify-between items-center text-sm">
                <span className="font-semibold text-slate-text">Course Tuition:</span>
                <span className="font-serif font-bold text-charcoal text-xl">₹{registrationModal.fee.toLocaleString('en-IN')}</span>
              </div>

              {regSuccess ? (
                <div className="p-6 bg-sage-light border border-sage/20 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center text-sage mx-auto">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h5 className="font-serif font-bold text-charcoal text-lg">Workshop Enrollment Confirmed!</h5>
                  <p className="text-xs text-slate-text leading-relaxed">
                    Assalamu Alaikum! You are enrolled. A welcome email with Zoom access details, schedule, and your participant workbook has been sent.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-text">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aisha Ahmed"
                      value={regForm.name}
                      onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-oat bg-alabaster focus:outline-none focus:border-sage"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-text">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. 123@gmail.com"
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-oat bg-alabaster focus:outline-none focus:border-sage"
                    />
                  </div>
                  <div className="bg-sage-light/40 border border-sage/20 p-3.5 rounded-xl text-xs text-charcoal flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                    <p className="leading-relaxed text-slate-text">
                      After you submit the inquiry, we’ll contact you. Payment is required only after that, so there’s no need to pay now.
                    </p>
                  </div>

                  <button
                    id="submit-checkout-btn"
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-sage hover:bg-sage/90 text-alabaster text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                  >
                    Confirm & Submit Registration
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
