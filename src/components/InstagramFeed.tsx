import React, { useState } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Video, Images, BookOpen, Sparkles, X, Share2, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InstagramPost } from '../types';
import LazyImage from './LazyImage';

import realBrand1Img from '../assets/images/real_brand_1.jpg';
import realBrand2Img from '../assets/images/real_brand_2.jpg';
import realBrand3Img from '../assets/images/real_brand_3.jpg';
import realBrand4Img from '../assets/images/real_brand_4.jpg';
import realBrand5Img from '../assets/images/real_brand_5.jpg';
import realBrand6Img from '../assets/images/real_brand_6.jpg';
import realBrand7Img from '../assets/images/real_brand_7.jpg';
import realBrand8Img from '../assets/images/real_brand_8.jpg';
import realBrand9Img from '../assets/images/real_brand_9.jpg';
import realBrand10Img from '../assets/images/real_brand_10.jpg';

const INSTAGRAM_HANDLE = 'rehbrtalk';
const INSTAGRAM_URL = 'https://www.instagram.com/rehbrtalk';

// 10 Real REHBR Brand & Instagram Posts with authentic photography
const REHBR_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    caption: 'You don’t have to carry the weight alone. In moments of emotional exhaustion, remember that turning back to Allah begins with a single soft intention. 🌱 #REHBR #IslamicPsychology #Sakeenah #MentalHealth',
    mediaUrl: realBrand1Img,
    permalink: 'https://www.instagram.com/rehbrtalk',
    mediaType: 'IMAGE',
    timestamp: 'Recent Reflection',
    likesCount: 384,
    commentsCount: 38,
    category: 'reflection'
  },
  {
    id: 'post-2',
    caption: 'Prof. Asif on Lead Counseling & Spiritual Healing: Bridging clinical mental health counseling with authentic Qur\'anic and Sunnah frameworks. 🌿 #REHBR #IslamicCounseling #Tazkiyah',
    mediaUrl: realBrand2Img,
    permalink: 'https://www.instagram.com/rehbrtalk',
    mediaType: 'CAROUSEL_ALBUM',
    timestamp: 'Counselor Profile',
    likesCount: 512,
    commentsCount: 46,
    category: 'reflection'
  },
  {
    id: 'post-3',
    caption: '🗓️ Insaan-e-Kamil Transformation Journey: Exploring self-reflection (Muhasabah) and practical action plans for daily spiritual consistency. #InsaanEKamil #Tazkiyah #IslamicGrowth',
    mediaUrl: realBrand3Img,
    permalink: 'https://www.instagram.com/rehbrtalk',
    mediaType: 'CAROUSEL_ALBUM',
    timestamp: 'Workshop Post',
    likesCount: 475,
    commentsCount: 54,
    category: 'workshop'
  },
  {
    id: 'post-4',
    caption: '🌙 Khwab Ki Tabeer & Counseling Guidance: Understanding dreams and internal states through authentic Islamic wisdom, introspection and humility. #KhwabKiTabeer #IslamicCounseling #REHBR',
    mediaUrl: realBrand4Img,
    permalink: 'https://www.instagram.com/rehbrtalk',
    mediaType: 'IMAGE',
    timestamp: 'Guidance Series',
    likesCount: 398,
    commentsCount: 35,
    category: 'reflection'
  },
  {
    id: 'post-5',
    caption: '🎥 REEL: Parent-Child Connection & Mindful Parenting. How to regulate your own emotional response when your child is overwhelmed. #MindfulParenting #MuslimParents #REHBR',
    mediaUrl: realBrand5Img,
    permalink: 'https://www.instagram.com/rehbrtalk',
    mediaType: 'REEL',
    timestamp: 'Parenting Reel',
    likesCount: 624,
    commentsCount: 67,
    category: 'reel'
  },
  {
    id: 'post-6',
    caption: 'The difference between information and transformation is Muhasabah (self-reflection). Are you auditing your daily habits or just reading about them? #Muhasabah #SelfReform #REHBR',
    mediaUrl: realBrand6Img,
    permalink: 'https://www.instagram.com/rehbrtalk',
    mediaType: 'IMAGE',
    timestamp: 'Daily Thought',
    likesCount: 410,
    commentsCount: 32,
    category: 'reflection'
  },
  {
    id: 'post-7',
    caption: '🎥 REEL: De-escalating Stress & Marital Conflict with Prophetic Adab. Small shifts in active listening yield immense Rahmah in the home. 💖 #MindfulMarriage #SunnahAdab #REHBRTalk',
    mediaUrl: realBrand7Img,
    permalink: 'https://www.instagram.com/rehbrtalk',
    mediaType: 'REEL',
    timestamp: 'Marriage Reel',
    likesCount: 589,
    commentsCount: 62,
    category: 'reel'
  },
  {
    id: 'post-8',
    caption: 'A gentle reminder: Allah does not ask you to fix everything at once. He asks you to make a sincere intention and take one small step toward Him today. ✨ #Tawakkul #HopeInAllah',
    mediaUrl: realBrand8Img,
    permalink: 'https://www.instagram.com/rehbrtalk',
    mediaType: 'IMAGE',
    timestamp: 'Spiritual Reminder',
    likesCount: 530,
    commentsCount: 41,
    category: 'reflection'
  },
  {
    id: 'post-9',
    caption: 'Cultivating Mawaddah & Rahmah: Restoring warmth, compassion, and effective communication in everyday relationships. #RelationshipCounseling #REHBR',
    mediaUrl: realBrand9Img,
    permalink: 'https://www.instagram.com/rehbrtalk',
    mediaType: 'CAROUSEL_ALBUM',
    timestamp: 'Marital Health',
    likesCount: 465,
    commentsCount: 39,
    category: 'reflection'
  },
  {
    id: 'post-10',
    caption: 'Youth & Young Adult Faith Confidence: Overcoming burnout, academic pressure, and overthinking with practical Istiqamah. 🌟 #YouthCounseling #REHBRTalk',
    mediaUrl: realBrand10Img,
    permalink: 'https://www.instagram.com/rehbrtalk',
    mediaType: 'IMAGE',
    timestamp: 'Youth Growth',
    likesCount: 442,
    commentsCount: 36,
    category: 'reflection'
  }
];

export default function InstagramFeed() {
  const [filter, setFilter] = useState<'all' | 'reflection' | 'reel' | 'workshop'>('all');
  const [activeModalPost, setActiveModalPost] = useState<InstagramPost | null>(null);

  const filteredPosts = REHBR_POSTS.filter((post) => {
    if (filter === 'all') return true;
    if (filter === 'reel') return post.mediaType === 'REEL' || post.category === 'reel';
    if (filter === 'workshop') return post.category === 'workshop';
    if (filter === 'reflection') return post.category === 'reflection' || post.mediaType === 'IMAGE';
    return true;
  });

  const getMediaBadge = (post: InstagramPost) => {
    if (post.mediaType === 'REEL' || post.category === 'reel') {
      return (
        <span className="inline-flex items-center gap-1 bg-purple-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
          <Video className="w-3 h-3 text-purple-200" />
          <span>Reel</span>
        </span>
      );
    }
    if (post.mediaType === 'CAROUSEL_ALBUM' || post.category === 'workshop') {
      return (
        <span className="inline-flex items-center gap-1 bg-[#3E4A41] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
          <Images className="w-3 h-3 text-sage-light" />
          <span>Carousel</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 bg-charcoal text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
        <BookOpen className="w-3 h-3 text-sage-light" />
        <span>Reflection</span>
      </span>
    );
  };

  return (
    <section id="instagram-feed-section" className="py-16 sm:py-20 bg-alabaster relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-oat/70 pb-8 text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/70 border border-pink-200/80 text-pink-900 text-xs font-bold tracking-wider uppercase">
              <Instagram className="w-3.5 h-3.5 text-pink-700" />
              <span>Real Brand & Instagram Community</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal">
              Inside REHBR on Instagram
            </h2>
            <p className="text-slate-text text-sm sm:text-base leading-relaxed">
              Real brand photography, workshop moments, and daily reflections from our official channel <strong className="text-charcoal font-semibold">@{INSTAGRAM_HANDLE}</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              id="follow-instagram-primary-btn"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-700 via-pink-600 to-amber-500 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer group"
            >
              <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Follow @{INSTAGRAM_HANDLE}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All 10 Real Posts' },
              { id: 'reflection', label: 'Reflections' },
              { id: 'reel', label: 'Reels & Videos' },
              { id: 'workshop', label: 'Workshops' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-charcoal text-alabaster shadow-xs scale-102'
                    : 'bg-oat/50 text-slate-text hover:bg-oat/90 hover:text-charcoal'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-pink-700 hover:text-pink-900 font-semibold flex items-center gap-1 transition-colors"
          >
            <span>Open @{INSTAGRAM_HANDLE} feed</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <motion.div
              id={`insta-card-${post.id}`}
              key={post.id}
              onClick={() => setActiveModalPost(post)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group bg-white border border-oat/90 hover:border-pink-300/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left cursor-pointer"
            >
              <div>
                {/* Media Container */}
                <div className="relative aspect-[4/3] bg-charcoal/5 overflow-hidden">
                  <LazyImage
                    src={post.mediaUrl}
                    alt="REHBR Instagram Post"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    {getMediaBadge(post)}
                    <span className="text-[10px] font-semibold text-white bg-black/70 px-2.5 py-0.5 rounded-full">
                      {post.timestamp}
                    </span>
                  </div>

                  {/* Handle & Instagram Icon */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 flex items-center justify-center p-0.5 shadow-2xs">
                        <Instagram className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs font-bold tracking-tight">@{INSTAGRAM_HANDLE}</span>
                    </div>
                    <span className="text-[10px] bg-white/20 backdrop-blur-xs text-white px-2 py-0.5 rounded-full">
                      Tap to view
                    </span>
                  </div>
                </div>

                {/* Caption Excerpt */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-charcoal/90 leading-relaxed font-sans line-clamp-3">
                    {post.caption}
                  </p>
                </div>
              </div>

              {/* Footer Stats & CTA */}
              <div className="px-5 pb-5 pt-2 border-t border-oat/50 flex items-center justify-between text-xs text-slate-text font-medium">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-pink-700/80">
                    <Heart className="w-3.5 h-3.5 fill-pink-100 text-pink-600" />
                    <span>{post.likesCount}</span>
                  </span>
                  <span className="flex items-center gap-1 text-slate-text">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.commentsCount}</span>
                  </span>
                </div>

                <span className="text-[11px] font-bold text-sage group-hover:underline flex items-center gap-1">
                  <span>Read Reflection</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Lightbox for Instagram Post */}
        <AnimatePresence>
          {activeModalPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-oat relative flex flex-col max-h-[90vh]"
              >
                <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-charcoal/10 overflow-hidden">
                  <LazyImage
                    src={activeModalPost.mediaUrl}
                    alt="REHBR Instagram Post"
                    referrerPolicy="no-referrer"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setActiveModalPost(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors shadow-md z-10"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 left-4 bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-semibold">
                    @{INSTAGRAM_HANDLE}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4 overflow-y-auto text-left flex-1">
                  <div className="flex items-center justify-between gap-4 border-b border-oat/60 pb-3">
                    <div className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-pink-600" />
                      <span className="text-xs font-bold text-charcoal uppercase tracking-wider">
                        Official Post • {activeModalPost.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-text">
                      <span className="flex items-center gap-1 text-pink-700">
                        <Heart className="w-3.5 h-3.5 fill-pink-100" />
                        <span>{activeModalPost.likesCount}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{activeModalPost.commentsCount}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-charcoal leading-relaxed font-sans whitespace-pre-line">
                    {activeModalPost.caption}
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <a
                      href={activeModalPost.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-700 via-pink-600 to-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>View on Instagram</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setActiveModalPost(null)}
                      className="px-6 py-3 rounded-full bg-oat text-charcoal font-semibold text-xs uppercase tracking-wider hover:bg-oat/80 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-[#2C2C2C] via-[#3E4A41] to-[#546457] rounded-3xl p-8 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5 text-pink-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-pink-200">
                Join our Instagram Community
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Follow REHBR on Instagram
            </h3>
            <p className="text-xs sm:text-sm text-sage-light/90 leading-relaxed">
              Stay connected for weekly workshop announcements, short video reminders, and practical insights on Islamic emotional well-being.
            </p>
          </div>

          <a
            id="follow-rehbr-footer-cta"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-8 py-4 rounded-full bg-alabaster text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-white active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-pink-600" />
            <span>Follow @{INSTAGRAM_HANDLE}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
