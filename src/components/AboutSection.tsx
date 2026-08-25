import { Award, GraduationCap, ShieldCheck, Heart, Compass, BookOpen, CheckCircle2, Sparkles, Users, RefreshCw } from 'lucide-react';
import { CREDENTIALS, IMAGES, REHBR_INFO, DIFFERENTIATORS } from '../data';
import { motion } from 'motion/react';
import LazyImage from './LazyImage';

export default function AboutSection() {
  return (
    <div id="about-page-root" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 text-left">
      {/* 1. What REHBR Is & Why Created */}
      <section id="about-rehbr-intro" className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest text-sage uppercase block">
            An Educational & Counseling Initiative
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal leading-tight">
            About REHBR
          </h2>
          <p className="text-lg text-slate-text leading-relaxed">
            REHBR is an educational initiative and counseling platform rooted in the <strong>Qur'an and authentic Sunnah</strong>. We exist to help Muslims understand, reflect upon, and practically implement Islamic guidance in everyday life.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-alabaster border border-oat rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-sage-light text-sage flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-sage block">Our Mission</span>
            <h3 className="font-serif text-2xl font-normal text-charcoal">Bridge Learning and Living</h3>
            <p className="text-sm text-slate-text leading-relaxed">
              {REHBR_INFO.mission}
            </p>
          </div>

          <div className="bg-alabaster border border-oat rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-dustyblue-light text-dustyblue flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-dustyblue block">Our Vision</span>
            <h3 className="font-serif text-2xl font-normal text-charcoal">Continuous Spiritual Elevation</h3>
            <p className="text-sm text-slate-text leading-relaxed">
              {REHBR_INFO.vision}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Bio & Lead Counselor */}
      <section id="bio-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6 border-t border-oat/50">
        <div className="lg:col-span-7 space-y-8">
          <span className="text-xs font-bold tracking-widest text-sage uppercase block">
            Lead Counselor & Founder
          </span>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-sage-light/60 border border-sage/30 flex items-center justify-center text-sage shrink-0 shadow-xs">
              <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-sage" />
            </div>
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal leading-tight">
                Prof. Asif
              </h2>
              <p className="text-xs font-bold text-sage uppercase tracking-wider mt-1">
                Lead Counselor & Founder, REHBR
              </p>
            </div>
          </div>

          <div className="text-base text-slate-text space-y-6 leading-relaxed font-sans">
            <p className="text-lg font-medium text-charcoal italic font-serif">
              "REHBR was born out of a deep conviction: learning Islamic guidance should not stop at acquisition of knowledge—it must lead to reflection, action, and character reform."
            </p>
            <p>
              As a Licensed Mental Health Counselor and educator, I work with individuals, couples, and workshop cohorts to bridge the gap between spiritual ideals and practical daily living. In my counseling practice and educational programmes, I provide a safe, warm, and confidential space where you can explore your challenges without judgment.
            </p>
            <p>
              Whether you are dealing with burnout, marital friction, anxiety, or seeking a structured path to improve your relationship with Allah, we work together step-by-step at your pace.
            </p>
          </div>

          {/* Signature Block */}
          <div className="pt-8 border-t border-oat/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-slate-text/70 block">
                Warm regards,
              </span>
              <div id="signature-graphic" className="py-2 text-sage select-none" aria-label="Prof. Asif signature">
                <svg className="w-56 h-16" viewBox="0 0 250 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M 20,45 C 22,25 28,15 32,32 C 34,45 38,58 41,50 C 44,40 48,25 50,38 C 52,48 55,52 58,45 C 61,35 64,28 66,35 C 68,42 70,48 74,45 C 78,40 82,32 86,45 C 90,55 94,50 98,42 C 102,30 110,15 112,30 C 114,42 118,55 122,48 C 126,38 132,10 134,25 C 136,38 140,55 144,48 C 148,38 154,25 158,35 C 162,45 166,52 170,45 C 174,35 180,20 182,32 C 184,42 188,48 192,45 C 196,40 200,32 205,45 C 210,55 215,50 220,40" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="opacity-90"
                  />
                  <path 
                    d="M 15,62 C 60,63 110,61 170,58 C 210,56 230,55 240,58 C 225,60 190,61 160,62 C 120,63 80,63 45,64" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                    className="opacity-70"
                  />
                </svg>
              </div>
              <p className="text-sm font-semibold text-charcoal">Prof. Asif</p>
              <p className="text-xs text-slate-text">Lead Counselor & Founder, REHBR</p>
            </div>

            <div className="flex items-center gap-3 bg-sage-light/40 border border-sage/10 p-3.5 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-sage shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-charcoal">Licensed Professional</p>
                <p className="text-slate-text">NY LMHC #012945</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Growth visual */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-3 rounded-3xl bg-lavender-light/40 rotate-1 -z-10" />
          <div className="bg-alabaster border border-oat rounded-3xl overflow-hidden shadow-md">
            <div className="p-8 pb-4 bg-oat/20 text-center">
              <span className="text-[10px] uppercase tracking-widest font-bold text-lavender block mb-2">Inner Peace & Sakeenah</span>
              <p className="font-serif italic text-sm text-slate-text leading-relaxed">
                "Transformation is a gentle journey of healing, self-reflection, and inner peace—lightening the burdens of the heart through faith."
              </p>
            </div>
            
            <div className="aspect-square bg-alabaster relative flex items-center justify-center p-4">
              <LazyImage 
                src={IMAGES.growth} 
                alt="A single, calm, delicate feather resting peacefully on warm neutral linen symbolizing Sakeenah" 
                referrerPolicy="no-referrer"
                containerClassName="w-full h-full rounded-2xl overflow-hidden"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-6 border-t border-oat/50 bg-oat/10 space-y-2">
              <div className="flex items-center gap-2 text-sage">
                <Heart className="w-4 h-4 fill-sage" />
                <span className="text-xs font-bold uppercase tracking-wider">Reflect • Reform • Return</span>
              </div>
              <p className="text-xs text-slate-text leading-relaxed">
                We believe that every soul possesses the innate capability to reform through sincere self-reflection (Muhasabah) and reliance upon Allah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Islamic Foundation & Non-Sectarian Principles */}
      <section id="islamic-foundation" className="bg-oat/20 border border-oat/60 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold tracking-widest text-sage uppercase block">
            Primary Foundation
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
            Anchored in Qur'an & Authentic Sunnah
          </h3>
          <p className="text-sm text-slate-text leading-relaxed">
            REHBR is based upon the Qur'an and authentic Sunnah. REHBR does not promote any particular sect or organisation. Our sole objective is strengthening one's relationship with Allah, improving character (Akhlaq), and living with divine purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {DIFFERENTIATORS.slice(0, 3).map((item, index) => (
            <div key={index} className="bg-alabaster border border-oat/40 rounded-2xl p-6 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-sage-light text-sage flex items-center justify-center font-bold text-xs mb-3">
                ✓
              </div>
              <h4 className="font-serif font-bold text-charcoal text-base mb-2">{item.title}</h4>
              <p className="text-xs text-slate-text leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Counseling Sanctuary & Environment */}
      <section id="counseling-sanctuary-atmosphere" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-alabaster border border-oat rounded-3xl overflow-hidden p-6 sm:p-10 shadow-sm">
        <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-oat/60">
          <LazyImage
            src={IMAGES.founder}
            alt="REHBR Consultation desk and study atmosphere"
            referrerPolicy="no-referrer"
            containerClassName="w-full h-full"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="lg:col-span-7 space-y-4 text-left">
          <span className="text-xs font-bold tracking-widest text-sage uppercase block">
            A Safe & Thoughtful Space
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
            The REHBR Sanctuary Environment
          </h3>
          <p className="text-sm text-slate-text leading-relaxed">
            Every session, consultation, and workshop is hosted in an atmosphere designed to evoke serenity (Sakeenah), mindfulness, and intellectual clarity. From our study literature to our reflective workbooks, our spaces are intentionally curated to honor your privacy and emotional safety.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-charcoal">
            <div className="flex items-center gap-2 bg-sage-light/30 text-sage px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center gap-2 bg-oat/60 text-slate-text px-3 py-1.5 rounded-full">
              <Compass className="w-4 h-4 text-sage" />
              <span>Qur'an & Sunnah Aligned</span>
            </div>
            <div className="flex items-center gap-2 bg-dustyblue-light/40 text-dustyblue px-3 py-1.5 rounded-full">
              <Heart className="w-4 h-4" />
              <span>Empathetic Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Credentials Block Section */}
      <section id="credentials-section" className="space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-widest text-dustyblue uppercase block mb-1">
            Academic & Professional Standing
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
            Professional Credentials & Licenses
          </h3>
          <p className="text-sm text-slate-text mt-2">
            Clinical competence and authentic Islamic grounding are the cornerstones of psychological and spiritual safety:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {CREDENTIALS.map((block, index) => (
            <div 
              id={`cred-block-${index}`}
              key={index}
              className="bg-white border border-oat rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                {index === 0 && <GraduationCap className="w-5 h-5 text-sage" />}
                {index === 1 && <Award className="w-5 h-5 text-dustyblue" />}
                {index === 2 && <ShieldCheck className="w-5 h-5 text-lavender" />}
                {index === 3 && <Heart className="w-5 h-5 text-sage" />}
                <h4 className="font-serif font-bold text-charcoal text-base">
                  {block.category}
                </h4>
              </div>
              <ul className="space-y-3">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-slate-text leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
