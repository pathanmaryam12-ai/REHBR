import React from 'react';
import { Instagram, ExternalLink, Sparkles, Video, BookOpen, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

const INSTAGRAM_HANDLE = 'rehbrtalk';
const INSTAGRAM_URL = 'https://www.instagram.com/rehbrtalk';

export default function InstagramFeed() {
  return (
    <section id="instagram-cta-section" className="py-16 sm:py-20 bg-alabaster relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#242D26] via-[#2F3B32] to-[#1C221D] text-white p-8 sm:p-12 lg:p-14 shadow-xl border border-sage/20"
        >
          {/* Subtle Ambient Decorative Circles */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 rounded-full bg-sage/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-left">
            {/* Left Content Area */}
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-pink-200 text-xs font-bold tracking-wider uppercase">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>Join Our Instagram Community</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                Follow REHBR on Instagram
              </h2>

              <p className="text-sage-light/90 text-sm sm:text-base leading-relaxed">
                Connect with our community at <strong className="text-white font-semibold">@{INSTAGRAM_HANDLE}</strong> for daily spiritual reflections, video reminders, practical emotional wellness tools, and upcoming workshop announcements.
              </p>

              {/* Highlight Pillars */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <BookOpen className="w-4 h-4 text-sage-light shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-white">Daily Reflections</span>
                    <span className="block text-[11px] text-sage-light/75">Faith & Muhasabah</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <Video className="w-4 h-4 text-pink-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-white">Video Reels</span>
                    <span className="block text-[11px] text-sage-light/75">Practical Guidance</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <Calendar className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-white">Workshops</span>
                    <span className="block text-[11px] text-sage-light/75">Cohort Updates</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Call To Action Action Card */}
            <div className="w-full md:w-auto shrink-0 flex flex-col items-center sm:items-stretch gap-4 text-center">
              <a
                id="cta-follow-instagram-btn"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:via-pink-500 hover:to-amber-400 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-pink-500/25 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Follow @{INSTAGRAM_HANDLE}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <p className="text-[11px] text-sage-light/70 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3 h-3 text-pink-300" />
                <span>Official REHBR Life Coaching & Counseling Channel</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
