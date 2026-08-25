import { useState, FormEvent } from 'react';
import { Calendar, Clock, Check, CheckCircle, Sparkles, Lock, ArrowLeft, Moon, UserCheck, UserPlus, HeartHandshake, ShieldCheck, GraduationCap, ArrowRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BookingForm, PreConsultationQuestionnaire, DreamQuestionnaire, BookingPathway, ActivePage } from '../types';
import { saveBookingToSupabase, saveInquiryToSupabase } from '../lib/supabase';
import { IMAGES } from '../data';
import LazyImage from './LazyImage';

interface BookingSectionProps {
  initialPathway?: BookingPathway;
  onNavigate?: (page: ActivePage) => void;
}

export default function BookingSection({ initialPathway = 'first_consultation', onNavigate }: BookingSectionProps) {
  const [activePathway, setActivePathway] = useState<BookingPathway>(initialPathway);
  const [bookingStep, setBookingStep] = useState<'slot_selection' | 'questionnaire' | 'confirmation'>('slot_selection');

  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    reason: '',
    preferredFormat: 'online',
    preferredTime: 'morning',
  });

  const [counselingQuestionnaire, setCounselingQuestionnaire] = useState<PreConsultationQuestionnaire>({
    whatBringsYou: 'Personal Growth',
    whatWouldYouLikeHelpWith: 'Gaining Mental Clarity',
    primaryConcern: 'Stress & Overwhelm',
    previousCounseling: 'No, first time',
    medicalOrLifeEvents: 'None',
    preferredLanguage: 'English',
    preferredSession: 'Online Session',
    additionalNotes: '',
  });

  const [dreamQuestionnaire, setDreamQuestionnaire] = useState<DreamQuestionnaire>({
    dreamDescription: '',
    whenSeen: 'Within the past week',
    isRecurring: 'No, I saw it once',
    backgroundContext: '',
    additionalInfo: '',
    preferredLanguage: 'English',
  });

  const [selectedDay, setSelectedDay] = useState<string | null>('mon');
  const [selectedSlot, setSelectedSlot] = useState<string | null>('10:15 AM');
  const [bookedDetails, setBookedDetails] = useState<any>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const weekdays = [
    { id: 'mon', name: 'Monday', date: 'August 10, 2026' },
    { id: 'tue', name: 'Tuesday', date: 'August 11, 2026' },
    { id: 'wed', name: 'Wednesday', date: 'August 12, 2026' },
    { id: 'thu', name: 'Thursday', date: 'August 13, 2026' },
    { id: 'fri', name: 'Friday', date: 'August 14, 2026' },
  ];

  const slots = {
    morning: ['09:30 AM', '10:15 AM', '11:00 AM'],
    afternoon: ['01:30 PM', '02:15 PM', '03:00 PM'],
    evening: ['04:30 PM', '05:15 PM'],
  };

  const getPathwayInfo = (pathway: BookingPathway) => {
    switch (pathway) {
      case 'first_consultation':
        return {
          title: 'Book Your First Consultation',
          feeText: '₹499',
          subtitle: 'New to REHBR? Start your journey with a one-on-one consultation.',
          badge: 'First Consultation',
          icon: <UserPlus className="w-5 h-5 text-sage shrink-0" />
        };
      case 'returning_client':
        return {
          title: 'Already Consulted? Book Your Next Session',
          feeText: '₹1,499',
          subtitle: 'Continue your journey by booking your next counseling session.',
          badge: 'Returning Client',
          icon: <UserCheck className="w-5 h-5 text-dustyblue shrink-0" />
        };
      case 'khwab_tabeer':
        return {
          title: '🌙 Khwab Ki Tabeer (Islamic Dream Guidance)',
          feeText: '₹999',
          subtitle: 'Understand your dreams through the light of authentic Islamic teachings.',
          badge: 'Dream Guidance',
          icon: <Moon className="w-5 h-5 text-sage shrink-0" />
        };
    }
  };

  const currentPathwayInfo = getPathwayInfo(activePathway);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    const existingInquiries = JSON.parse(localStorage.getItem('rehbr_inquiries') || '[]');
    const newInquiry = {
      ...formData,
      pathway: activePathway,
      id: Date.now(),
      date: new Date().toISOString()
    };
    existingInquiries.push(newInquiry);
    localStorage.setItem('rehbr_inquiries', JSON.stringify(existingInquiries));

    // Save client inquiry to Supabase
    saveInquiryToSupabase(newInquiry);

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        reason: '',
        preferredFormat: 'online',
        preferredTime: 'morning',
      });
    }, 5000);
  };

  const handleProceedToQuestionnaire = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please enter your Name, Email, and Phone number first.");
      return;
    }
    if (!selectedDay || !selectedSlot) {
      alert("Please select a preferred day and time slot on the calendar.");
      return;
    }

    setBookingStep('questionnaire');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleFinalBookingSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (activePathway === 'khwab_tabeer' && !dreamQuestionnaire.dreamDescription.trim()) {
      alert("Please describe your dream so our counselor can provide authentic guidance.");
      return;
    }

    const dayObj = weekdays.find(w => w.id === selectedDay);
    const details = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      day: dayObj?.name,
      date: dayObj?.date,
      slot: selectedSlot,
      format: formData.preferredFormat === 'online' ? 'Online Session' : 'In-Person Session',
      amount: currentPathwayInfo.feeText,
      pathwayTitle: currentPathwayInfo.title,
      code: `REHBR-${Math.floor(100000 + Math.random() * 900000)}`,
      counselingQuestionnaire: activePathway !== 'khwab_tabeer' ? { ...counselingQuestionnaire } : null,
      dreamQuestionnaire: activePathway === 'khwab_tabeer' ? { ...dreamQuestionnaire } : null,
      pathway: activePathway
    };

    const existingBookings = JSON.parse(localStorage.getItem('rehbr_bookings') || '[]');
    existingBookings.push(details);
    localStorage.setItem('rehbr_bookings', JSON.stringify(existingBookings));

    // Save final booking details to Supabase
    saveBookingToSupabase(details);

    setBookedDetails(details);
    setBookingStep('confirmation');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div id="booking-page-root" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left">
      {/* Intro Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-sage uppercase bg-sage-light/50 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>REHBR Appointment Booking</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal">
          Take the Next Step Toward Healing & Guidance
        </h2>
        <p className="text-sm sm:text-base text-slate-text leading-relaxed">
          Select your session type below to book your appointment. Every session is conducted with complete confidentiality, warmth, and Islamic adab.
        </p>
      </div>

      {/* Pathway Selection Header / Tabs */}
      {bookingStep === 'slot_selection' && (
        <div className="space-y-4 border-b border-oat/70 pb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal block">
              Select Your Consultation Option
            </span>
            {onNavigate && (
              <button
                type="button"
                id="direct-workshop-link-btn"
                onClick={() => onNavigate('workshops')}
                className="text-xs font-semibold text-sage hover:text-sage/80 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Looking for Workshops & Courses instead?</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pathway 1: First Consultation */}
            <button
              type="button"
              id="pathway-first-consultation"
              onClick={() => {
                setActivePathway('first_consultation');
                setSelectedSlot('10:15 AM');
              }}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                activePathway === 'first_consultation'
                  ? 'bg-sage-light/40 border-sage shadow-md ring-1 ring-sage/30'
                  : 'bg-white border-oat hover:border-sage/50 hover:bg-oat/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                  activePathway === 'first_consultation' ? 'bg-sage text-alabaster' : 'bg-oat text-charcoal'
                }`}>
                  First Time
                </span>
                <span className="font-serif font-bold text-lg text-sage">₹499</span>
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-charcoal">
                  Book Your First Consultation
                </h4>
                <p className="text-xs text-slate-text leading-relaxed mt-1">
                  New to REHBR? Start your journey with a one-on-one consultation.
                </p>
              </div>
            </button>

            {/* Pathway 2: Returning Client */}
            <button
              type="button"
              id="pathway-returning-client"
              onClick={() => {
                setActivePathway('returning_client');
                setSelectedSlot('10:15 AM');
              }}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                activePathway === 'returning_client'
                  ? 'bg-dustyblue-light/40 border-dustyblue shadow-md ring-1 ring-dustyblue/30'
                  : 'bg-white border-oat hover:border-dustyblue/50 hover:bg-oat/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                  activePathway === 'returning_client' ? 'bg-dustyblue text-alabaster' : 'bg-oat text-charcoal'
                }`}>
                  Returning Client
                </span>
                <span className="font-serif font-bold text-lg text-dustyblue">₹1,499</span>
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-charcoal">
                  Already Consulted? Book Next Session
                </h4>
                <p className="text-xs text-slate-text leading-relaxed mt-1">
                  Continue your journey by booking your next counseling session.
                </p>
              </div>
            </button>

            {/* Pathway 3: Khwab Ki Tabeer */}
            <button
              type="button"
              id="pathway-khwab-tabeer"
              onClick={() => {
                setActivePathway('khwab_tabeer');
                setSelectedSlot('10:15 AM');
              }}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                activePathway === 'khwab_tabeer'
                  ? 'bg-sage-light/40 border-sage shadow-md ring-1 ring-sage/30'
                  : 'bg-white border-oat hover:border-sage/50 hover:bg-oat/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                  activePathway === 'khwab_tabeer' ? 'bg-sage text-alabaster' : 'bg-oat text-charcoal'
                }`}>
                  Dream Guidance
                </span>
                <span className="font-serif font-bold text-lg text-sage">₹999</span>
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-charcoal flex items-center gap-1.5">
                  <span>🌙 Khwab Ki Tabeer</span>
                </h4>
                <p className="text-xs text-slate-text leading-relaxed mt-1">
                  Understand your dreams through authentic Islamic teachings.
                </p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CONFIRMATION RECEIPT */}
      {bookingStep === 'confirmation' && bookedDetails && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-alabaster border border-sage/30 rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto text-center space-y-8 shadow-sm"
        >
          <div className="w-16 h-16 rounded-full bg-sage-light text-sage flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
              {bookedDetails.pathway === 'khwab_tabeer' ? 'Khwab Ki Tabeer Session Confirmed' : 'Consultation Confirmed'}
            </h3>
            <p className="text-sm text-slate-text max-w-md mx-auto leading-relaxed">
              Assalamu Alaikum <strong>{bookedDetails.name}</strong>, your session with Lead Counselor Prof. Asif is booked.
            </p>
          </div>

          <div className="bg-oat/20 border border-oat rounded-2xl p-6 text-left space-y-4 max-w-md mx-auto shadow-2xs">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-text font-semibold uppercase block">Date</span>
                <span className="font-serif font-bold text-charcoal text-sm">{bookedDetails.day}, {bookedDetails.date}</span>
              </div>
              <div>
                <span className="text-slate-text font-semibold uppercase block">Reserved Time</span>
                <span className="font-serif font-bold text-charcoal text-sm">{bookedDetails.slot} IST</span>
              </div>
              <div>
                <span className="text-slate-text font-semibold uppercase block">Session Format</span>
                <span className="font-sans font-bold text-charcoal text-sm">{bookedDetails.format}</span>
              </div>
              <div>
                <span className="text-slate-text font-semibold uppercase block">Fee</span>
                <span className="font-mono font-bold text-sage text-sm">{bookedDetails.amount} Reserved</span>
              </div>
            </div>

            <div className="border-t border-oat/50 pt-3 text-[11px] text-slate-text/90 leading-relaxed">
              We will reach out to you at <strong>{bookedDetails.phone}</strong> or send secure session credentials to <strong>{bookedDetails.email}</strong>.
            </div>

            {/* Khwab Ki Tabeer Summary */}
            {bookedDetails.dreamQuestionnaire && (
              <div className="border-t border-oat/50 pt-3 space-y-2 text-xs">
                <p className="font-bold text-charcoal flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-sage" />
                  <span>Dream Details Summary:</span>
                </p>
                <div className="bg-alabaster p-3 rounded-lg border border-oat/40 space-y-1 text-slate-text text-[11px]">
                  <p><strong>Timeline:</strong> {bookedDetails.dreamQuestionnaire.whenSeen}</p>
                  <p><strong>Frequency:</strong> {bookedDetails.dreamQuestionnaire.isRecurring}</p>
                  <p className="line-clamp-2"><strong>Description:</strong> {bookedDetails.dreamQuestionnaire.dreamDescription}</p>
                </div>
                <p className="text-[10px] text-slate-text/70 pt-1">
                  🔒 Strictly Confidential: Your dream notes are shared only with the interpreter and handled with Islamic adab.
                </p>
              </div>
            )}

            {/* Standard Counseling Summary */}
            {bookedDetails.counselingQuestionnaire && (
              <div className="border-t border-oat/50 pt-3 space-y-1 text-xs">
                <p className="font-bold text-charcoal">Pre-Consultation Summary:</p>
                <p className="text-slate-text italic bg-alabaster p-2.5 rounded-lg border border-oat/40">
                  Topic: {bookedDetails.counselingQuestionnaire.whatBringsYou} • Language: {bookedDetails.counselingQuestionnaire.preferredLanguage}
                </p>
                <p className="text-[10px] text-slate-text/70 pt-1">
                  🔒 Confidentiality Assured: Your details are encrypted and shared only with your therapist.
                </p>
              </div>
            )}
          </div>

          <button
            id="book-another-btn"
            onClick={() => {
              setBookingStep('slot_selection');
              setBookedDetails(null);
            }}
            className="px-6 py-2.5 rounded-full bg-sage text-alabaster text-xs font-bold hover:bg-sage/90 transition-all cursor-pointer"
          >
            Book Another Appointment
          </button>
        </motion.div>
      )}

      {/* STEP 2: QUESTIONNAIRE */}
      {bookingStep === 'questionnaire' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-alabaster border border-oat p-6 sm:p-10 rounded-3xl shadow-sm space-y-8 text-left"
        >
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between border-b border-oat/60 pb-4">
            <button
              onClick={() => setBookingStep('slot_selection')}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-text hover:text-sage transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Slot Selection</span>
            </button>
            <span className="text-[10px] font-bold uppercase tracking-widest text-sage bg-sage-light px-3 py-1 rounded-full flex items-center gap-1">
              {activePathway === 'khwab_tabeer' ? (
                <>
                  <Moon className="w-3 h-3" />
                  <span>Dream Questionnaire</span>
                </>
              ) : (
                <span>Pre-Consultation Details</span>
              )}
            </span>
          </div>

          {/* Privacy Reassurance Banner */}
          <div className="bg-sage-light/30 border border-sage/20 p-5 rounded-2xl flex items-start gap-3 text-left">
            <ShieldCheck className="w-5 h-5 text-sage shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-charcoal font-medium leading-relaxed">
                <strong>100% Private & Confidential.</strong> Everything you share is handled strictly between you and your counselor with Islamic adab.
              </p>
              <p className="text-xs text-slate-text">
                After you submit the inquiry, we’ll contact you. Payment is required only after that, so there’s no need to pay now.
              </p>
            </div>
          </div>

          {/* QUESTIONNAIRE A: KHWAB KI TABEER (DREAM QUESTIONNAIRE) */}
          {activePathway === 'khwab_tabeer' ? (
            <form onSubmit={handleFinalBookingSubmit} className="space-y-6">
              {/* Dream Guidance Reassurance Callout */}
              <div className="bg-amber-50/60 border border-amber-200/80 p-4 rounded-xl text-xs text-charcoal space-y-1">
                <p className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-amber-800" />
                  <span>Authentic Islamic Dream Guidance</span>
                </p>
                <p className="text-slate-text leading-relaxed">
                  Our approach is rooted in the Qur'an, authentic Sunnah, and classical Islamic scholarship. Not fortune-telling, astrology, or superstition.
                </p>
              </div>

              {/* 1. Please describe your dream */}
              <div className="space-y-2">
                <label htmlFor="dream-desc" className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                  1. Please describe your dream in detail *
                </label>
                <textarea
                  id="dream-desc"
                  rows={4}
                  required
                  placeholder="Describe key symbols, feelings, people, or events you experienced in the dream..."
                  value={dreamQuestionnaire.dreamDescription}
                  onChange={(e) => setDreamQuestionnaire({ ...dreamQuestionnaire, dreamDescription: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-oat bg-alabaster text-sm focus:outline-none focus:border-sage resize-none"
                />
              </div>

              {/* 2. Approximately when did you see it? */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                  2. Approximately when did you see it?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'Within the past week',
                    'A few weeks ago',
                    '1-3 months ago',
                    'Over 6 months ago',
                    'Before Tahajjud / Fajr',
                    'Daytime nap'
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setDreamQuestionnaire({ ...dreamQuestionnaire, whenSeen: item })}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        dreamQuestionnaire.whenSeen === item
                          ? 'bg-sage text-alabaster font-bold border-sage shadow-2xs'
                          : 'bg-oat/15 border-oat text-slate-text hover:bg-oat/40 hover:text-charcoal'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Has this dream occurred more than once? */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                  3. Has this dream occurred more than once?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'No, I saw it once',
                    'Yes, it is recurring',
                    'Unsure / Similar themes'
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setDreamQuestionnaire({ ...dreamQuestionnaire, isRecurring: opt })}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                        dreamQuestionnaire.isRecurring === opt
                          ? 'bg-sage text-alabaster font-bold border-sage'
                          : 'bg-oat/15 border-oat text-slate-text hover:bg-oat/40'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Background or context */}
              <div className="space-y-2">
                <label htmlFor="dream-context" className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                  4. Is there any background or context you would like to share?
                </label>
                <textarea
                  id="dream-context"
                  rows={2}
                  placeholder="e.g., current life decisions, emotional state, or spiritual reflections when waking up..."
                  value={dreamQuestionnaire.backgroundContext}
                  onChange={(e) => setDreamQuestionnaire({ ...dreamQuestionnaire, backgroundContext: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-oat bg-alabaster text-sm focus:outline-none focus:border-sage resize-none"
                />
              </div>

              {/* 5. Anything else + Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="dream-additional" className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                    5. Anything else you would like us to know? <span className="text-[10px] text-slate-text/70 lowercase font-normal">(optional)</span>
                  </label>
                  <input
                    id="dream-additional"
                    type="text"
                    placeholder="Any specific questions..."
                    value={dreamQuestionnaire.additionalInfo}
                    onChange={(e) => setDreamQuestionnaire({ ...dreamQuestionnaire, additionalInfo: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-oat bg-alabaster text-sm focus:outline-none focus:border-sage"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                    Preferred Language
                  </label>
                  <div className="flex gap-2">
                    {(['English', 'Urdu'] as const).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setDreamQuestionnaire({ ...dreamQuestionnaire, preferredLanguage: lang })}
                        className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          dreamQuestionnaire.preferredLanguage === lang
                            ? 'bg-sage text-alabaster border-sage'
                            : 'bg-oat/15 border-oat text-slate-text'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-oat/60">
                <button
                  type="button"
                  onClick={() => setBookingStep('slot_selection')}
                  className="text-xs text-slate-text hover:text-charcoal font-semibold cursor-pointer underline"
                >
                  ← Return to Slot Selection
                </button>

                <button
                  id="submit-dream-questionnaire-btn"
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-sage hover:bg-sage/90 text-alabaster font-bold text-xs uppercase tracking-wider transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-xs"
                >
                  <Moon className="w-4 h-4 text-alabaster" />
                  <span>Confirm Dream Guidance (₹999)</span>
                </button>
              </div>
            </form>
          ) : (
            /* QUESTIONNAIRE B: STANDARD COUNSELING QUESTIONNAIRE */
            <form onSubmit={handleFinalBookingSubmit} className="space-y-6">
              {/* 1. What brings you here today? */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                  1. What brings you here today?
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Personal Growth',
                    'Emotional Wellbeing',
                    'Anxiety / Stress / Burnout',
                    'Marital & Relationship Concerns',
                    'Parenting & Family Support',
                    'Spiritual Exhaustion',
                    'Youth / Young Adult Counseling'
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCounselingQuestionnaire({ ...counselingQuestionnaire, whatBringsYou: item })}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        counselingQuestionnaire.whatBringsYou === item
                          ? 'bg-sage text-alabaster border-sage font-bold shadow-2xs'
                          : 'bg-oat/15 border-oat text-slate-text hover:bg-oat/40 hover:text-charcoal'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. What would you like help with? */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                  2. What would you like help with?
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Gaining Mental Clarity',
                    'Emotional Healing',
                    'Conflict Resolution',
                    'Building Sunnah Habits',
                    'Overcoming Burnout',
                    'Strengthening Faith',
                    'Better Parenting Skills'
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCounselingQuestionnaire({ ...counselingQuestionnaire, whatWouldYouLikeHelpWith: item })}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        counselingQuestionnaire.whatWouldYouLikeHelpWith === item
                          ? 'bg-sage text-alabaster border-sage font-bold shadow-2xs'
                          : 'bg-oat/15 border-oat text-slate-text hover:bg-oat/40 hover:text-charcoal'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Primary Concern */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                  3. Primary Concern
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Stress & Overwhelm',
                    'Relationship Friction',
                    'Faith & Identity Doubts',
                    'Life Transition / Career',
                    'Emotional Regulation'
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCounselingQuestionnaire({ ...counselingQuestionnaire, primaryConcern: item })}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        counselingQuestionnaire.primaryConcern === item
                          ? 'bg-sage text-alabaster font-bold border-sage shadow-2xs'
                          : 'bg-oat/15 border-oat text-slate-text hover:bg-oat/40'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Previous counseling */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                  4. Previous counseling or therapy?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['No, first time', 'Yes, previously', 'Currently in counseling'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setCounselingQuestionnaire({ ...counselingQuestionnaire, previousCounseling: opt })}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                        counselingQuestionnaire.previousCounseling === opt
                          ? 'bg-sage text-alabaster font-bold border-sage'
                          : 'bg-oat/15 border-oat text-slate-text hover:bg-oat/40'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Medical / Life events */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                  5. Any surgeries, major medical conditions, or significant life events?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['None', 'Recent major life event', 'Medical condition / Surgery'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setCounselingQuestionnaire({ ...counselingQuestionnaire, medicalOrLifeEvents: opt })}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                        counselingQuestionnaire.medicalOrLifeEvents === opt
                          ? 'bg-sage text-alabaster font-bold border-sage'
                          : 'bg-oat/15 border-oat text-slate-text hover:bg-oat/40'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6 & 7. Language & Session */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                    6. Preferred Language
                  </label>
                  <div className="flex gap-2">
                    {(['English', 'Urdu'] as const).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setCounselingQuestionnaire({ ...counselingQuestionnaire, preferredLanguage: lang })}
                        className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          counselingQuestionnaire.preferredLanguage === lang
                            ? 'bg-sage text-alabaster border-sage'
                            : 'bg-oat/15 border-oat text-slate-text'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                    7. Preferred Session
                  </label>
                  <div className="flex gap-2">
                    {(['Online Session', 'In-Person Counseling'] as const).map((sess) => (
                      <button
                        key={sess}
                        type="button"
                        onClick={() => setCounselingQuestionnaire({ ...counselingQuestionnaire, preferredSession: sess })}
                        className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          counselingQuestionnaire.preferredSession === sess
                            ? 'bg-sage text-alabaster border-sage'
                            : 'bg-oat/15 border-oat text-slate-text'
                        }`}
                      >
                        {sess}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 8. Additional Notes */}
              <div className="space-y-1 pt-2">
                <label htmlFor="q-notes" className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                  Is there anything else you'd like us to know? <span className="text-[10px] text-slate-text/70 lowercase font-normal">(optional)</span>
                </label>
                <textarea
                  id="q-notes"
                  rows={3}
                  placeholder="Share any additional details or specific questions..."
                  value={counselingQuestionnaire.additionalNotes || ''}
                  onChange={(e) => setCounselingQuestionnaire({ ...counselingQuestionnaire, additionalNotes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-oat bg-alabaster text-sm focus:outline-none focus:border-sage resize-none"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-oat/60">
                <button
                  type="button"
                  onClick={() => setBookingStep('slot_selection')}
                  className="text-xs text-slate-text hover:text-charcoal font-semibold cursor-pointer underline"
                >
                  ← Return to Slot Selection
                </button>

                <button
                  id="submit-questionnaire-btn"
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-sage hover:bg-sage/90 text-alabaster font-bold text-xs uppercase tracking-wider transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Appointment ({currentPathwayInfo.feeText})</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      )}

      {/* STEP 1: CONTACT FORM & SCHEDULER */}
      {bookingStep === 'slot_selection' && (
        <div className="space-y-8">
          {/* Calming Sanctuary Reassurance Card */}
          <div className="bg-alabaster border border-oat/90 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm overflow-hidden">
            <div className="w-full md:w-48 h-32 md:h-28 rounded-2xl overflow-hidden shrink-0 relative bg-oat/30 border border-oat/50">
              <LazyImage
                src={IMAGES.counselingNook}
                alt="A tranquil and welcoming counseling nook"
                referrerPolicy="no-referrer"
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2 flex-1 text-left">
              <div className="flex items-center gap-2 text-sage">
                <Heart className="w-4 h-4 fill-sage" />
                <span className="text-xs font-bold uppercase tracking-wider">A Safe, Warm & Peaceful Space</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-text leading-relaxed">
                Every consultation is conducted in an atmosphere of warmth, respect, and unconditional confidentiality. Whether you join online from home or in person, your comfort and privacy are strictly safeguarded.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-charcoal bg-sage-light/30 px-3.5 py-2 rounded-full border border-sage/20 shrink-0">
              <ShieldCheck className="w-4 h-4 text-sage" />
              <span>100% Confidential</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Column 1: Contact Details Form */}
          <div className="lg:col-span-6 bg-alabaster border border-oat p-8 rounded-3xl shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sage bg-sage-light px-2.5 py-1 rounded-full">
                Step 1 of 2
              </span>
              <h3 className="font-serif text-xl font-medium text-charcoal">Enter Your Details</h3>
              <p className="text-xs text-slate-text">Fill in your information to schedule your {currentPathwayInfo.feeText} session:</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="form-name" className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                    Full Name *
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    placeholder="e.g. Ahmed Khan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-oat bg-alabaster text-sm focus:outline-none focus:border-sage"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="form-phone" className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                    Phone (WhatsApp) *
                  </label>
                  <input
                    id="form-phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-oat bg-alabaster text-sm focus:outline-none focus:border-sage"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="form-email" className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                  Email Address *
                </label>
                <input
                  id="form-email"
                  type="email"
                  required
                  placeholder="e.g. 123@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-oat bg-alabaster text-sm focus:outline-none focus:border-sage"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="form-format" className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                    Preferred Format
                  </label>
                  <select
                    id="form-format"
                    value={formData.preferredFormat}
                    onChange={(e) => setFormData({ ...formData, preferredFormat: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border border-oat bg-alabaster text-sm focus:outline-none focus:border-sage cursor-pointer"
                  >
                    <option value="online">Online Session</option>
                    <option value="in-person">In-Person Counseling</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="form-time" className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                    Preferred Time
                  </label>
                  <select
                    id="form-time"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border border-oat bg-alabaster text-sm focus:outline-none focus:border-sage cursor-pointer"
                  >
                    <option value="morning">Morning (09:30 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (01:30 PM - 04:00 PM)</option>
                    <option value="evening">Late Afternoon (04:30 PM - 06:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="form-reason" className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                  Brief Note <span className="text-[10px] text-slate-text/70 lowercase font-normal">(optional)</span>
                </label>
                <textarea
                  id="form-reason"
                  rows={2}
                  placeholder="Any brief message for the counselor..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-oat bg-alabaster text-sm focus:outline-none focus:border-sage resize-none"
                />
              </div>

              <button
                id="submit-inquiry-btn"
                type="submit"
                className="w-full py-3 rounded-full bg-oat/30 hover:bg-oat/60 text-charcoal font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 border border-oat"
              >
                <span>Send General Inquiry</span>
              </button>
            </form>

            <AnimatePresence>
              {formSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-sage-light border border-sage/20 text-sage text-xs font-semibold rounded-xl flex items-center gap-2"
                >
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Your message has been received! We will respond promptly.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Column 2: Interactive Scheduling & Consultation Card */}
          <div className="lg:col-span-6 bg-alabaster border border-oat p-8 rounded-3xl shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-dustyblue bg-dustyblue-light px-2.5 py-1 rounded-full">
                Step 2 of 2
              </span>
              <h3 className="font-serif text-xl font-medium text-charcoal flex items-center gap-2">
                <Calendar className="w-5 h-5 text-dustyblue" />
                Select Slot – {currentPathwayInfo.feeText}
              </h3>
              <p className="text-xs text-slate-text">
                Schedule your appointment with Lead Counselor Prof. Asif:
              </p>
            </div>

            {/* Interactive Day Selection */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-text block">1. Select Preferred Day</span>
              <div className="grid grid-cols-5 gap-2">
                {weekdays.map((day) => {
                  const isSelected = selectedDay === day.id;
                  return (
                    <button
                      id={`day-select-${day.id}`}
                      key={day.id}
                      onClick={() => {
                        setSelectedDay(day.id);
                        setSelectedSlot(null);
                      }}
                      className={`py-3 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-dustyblue border-dustyblue text-alabaster font-bold shadow-xs'
                          : 'border-oat bg-oat/15 text-slate-text hover:bg-oat/40 hover:text-charcoal'
                      }`}
                    >
                      <span className="text-xs block font-semibold">{day.name.substring(0, 3)}</span>
                      <span className="text-[10px] opacity-80 block mt-1">{day.date.split(',')[0].split(' ')[1]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Time Slot Selection */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-text block">
                2. Select Available Slot
              </span>

              {selectedDay ? (
                <div className="grid grid-cols-3 gap-2">
                  {slots[formData.preferredTime as keyof typeof slots]?.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        id={`slot-select-${slot.replace(' ', '-').replace(':', '')}`}
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-3 rounded-lg border text-center text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-sage border-sage text-alabaster font-bold'
                            : 'border-oat bg-alabaster text-slate-text hover:bg-oat/20'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="border border-dashed border-oat rounded-xl p-6 text-center text-xs text-slate-text/75 italic">
                  Select a day above to view available consultation slots.
                </div>
              )}
            </div>

            {/* Selected Booking review card */}
            <div className="bg-oat/20 border border-oat/60 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-text">Selected Option Fee:</span>
                <span className="font-serif font-bold text-charcoal text-base">{currentPathwayInfo.feeText}</span>
              </div>

              <p className="text-[11px] text-slate-text leading-relaxed bg-white/60 p-2.5 rounded-xl border border-oat/40">
                <ShieldCheck className="w-3.5 h-3.5 text-sage inline mr-1" />
                After you submit the inquiry, we’ll contact you. Payment is required only after that, so there’s no need to pay now.
              </p>

              {selectedDay && selectedSlot && (
                <div className="border-t border-oat/40 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs w-full sm:w-auto">
                    <p className="text-[10px] text-slate-text/70 uppercase">Reserved Time</p>
                    <p className="font-serif font-medium text-charcoal text-sm mt-0.5">
                      {weekdays.find(w => w.id === selectedDay)?.name}, {selectedSlot} IST
                    </p>
                  </div>
                  <button
                    id="proceed-questionnaire-btn"
                    onClick={handleProceedToQuestionnaire}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-sage hover:bg-sage/90 text-alabaster text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>Proceed to Questionnaire</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
