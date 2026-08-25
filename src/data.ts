import { ServiceCategory, Workshop, Course, FAQItem, Testimonial } from './types';

// Relaxing & Calming AI Generated Sanctuary & Reflection Imagery
import sereneHeroSanctuaryImg from './assets/images/serene_hero_sanctuary_1787662792399.jpg';
import calmCounselingNookImg from './assets/images/calm_counseling_nook_1787662810765.jpg';
import sereneSpiritualStudyImg from './assets/images/serene_spiritual_study_1787662827036.jpg';
import mindfulGrowthLeafImg from './assets/images/mindful_growth_leaf_1787662851108.jpg';
import sereneReflectionDeskImg from './assets/images/serene_reflection_desk_1787662866771.jpg';
import calmMaritalHarmonyImg from './assets/images/calm_marital_harmony_1787671424842.jpg';
import mindfulParentingSanctuaryImg from './assets/images/mindful_parenting_sanctuary_1787671439599.jpg';
import sereneCalmFeatherImg from './assets/images/serene_calm_feather_1787671619622.jpg';

// Authentic Brand Photography Assets
import realBrand1Img from './assets/images/real_brand_1.jpg';
import realBrand2Img from './assets/images/real_brand_2.jpg';
import realBrand3Img from './assets/images/real_brand_3.jpg';
import realBrand4Img from './assets/images/real_brand_4.jpg';
import realBrand5Img from './assets/images/real_brand_5.jpg';
import realBrand6Img from './assets/images/real_brand_6.jpg';
import realBrand7Img from './assets/images/real_brand_7.jpg';
import realBrand8Img from './assets/images/real_brand_8.jpg';
import realBrand9Img from './assets/images/real_brand_9.jpg';
import realBrand10Img from './assets/images/real_brand_10.jpg';

export const REAL_BRAND_IMAGES = [
  {
    id: 'brand-1',
    src: realBrand1Img,
    title: 'Mindful Reflection & Sacred Balance',
    category: "Mindful Reflection",
    description: 'A moment of stillness grounding thoughts in divine remembrance, emotional patience, and holistic self-reflection.',
    tag: '#RehbrReflections'
  },
  {
    id: 'brand-2',
    src: realBrand2Img,
    title: 'The Path of Tazkiyah & Inner Purification',
    category: 'Spiritual Growth',
    description: 'Exploring the heart’s states through authentic Islamic psychology frameworks and gentle accountability.',
    tag: '#Tazkiyah'
  },
  {
    id: 'brand-3',
    src: realBrand3Img,
    title: 'Insaan-e-Kamil Cohort & Community',
    category: 'Workshops',
    description: 'Transformational cohort discussions on character reform, emotional mastery, and intentional daily routines.',
    tag: '#InsaanEKamil'
  },
  {
    id: 'brand-4',
    src: realBrand4Img,
    title: 'Qur’anic Anchors in Everyday Living',
    category: "Spiritual Guidance",
    description: 'Bridging timeless spiritual principles with modern psychological clarity and practical mindfulness.',
    tag: '#QuranicWisdom'
  },
  {
    id: 'brand-5',
    src: realBrand5Img,
    title: 'Prophetic Parenting & Emotional Connection',
    category: 'Family & Home',
    description: 'Guiding parents to nurture Sunnah values with deep emotional regulation, gentleness, and mutual respect.',
    tag: '#MindfulParenting'
  },
  {
    id: 'brand-6',
    src: realBrand6Img,
    title: 'Overcoming Inner Friction & Overthinking',
    category: 'Mental Health',
    description: 'Practical cognitive reframing rooted in Tawakkul to disarm anxiety and cultivate deep inner peace (Sakeenah).',
    tag: '#Sakeenah'
  },
  {
    id: 'brand-7',
    src: realBrand7Img,
    title: 'Cultivating Mawaddah (Love) & Rahmah (Mercy)',
    category: 'Marital Care',
    description: 'Fostering empathetic listening and authentic Islamic adab to heal relationships and restore peace in the home.',
    tag: '#Mawaddah'
  },
  {
    id: 'brand-8',
    src: realBrand8Img,
    title: 'Youth Mentorship & Faith Resilience',
    category: 'Youth Growth',
    description: 'Equipping young Muslims with confidence, emotional resilience, and grounded faith identity.',
    tag: '#FaithIdentity'
  },
  {
    id: 'brand-9',
    src: realBrand9Img,
    title: 'Daily Muhasabah: Small Consistent Steps',
    category: "Self-Audit & Habits",
    description: 'Self-audit worksheets and daily journaling prompts that transform fleeting thoughts into enduring habits.',
    tag: '#Muhasabah'
  },
  {
    id: 'brand-10',
    src: realBrand10Img,
    title: 'The Journey of Returning to Allah',
    category: 'Spiritual Renewal',
    description: 'Honoring every step of returning to Allah with sincere repentance, hope, and unwavering reliance on His Mercy.',
    tag: '#Tawakkul'
  }
];

export const IMAGES = {
  hero: sereneHeroSanctuaryImg,
  office: sereneHeroSanctuaryImg,
  founder: sereneReflectionDeskImg,
  growth: sereneCalmFeatherImg,
  feather: sereneCalmFeatherImg,
  workshop: sereneSpiritualStudyImg,
  counseling: calmCounselingNookImg,
  parenting: mindfulParentingSanctuaryImg,
  couples: calmMaritalHarmonyImg,
  youth: sereneReflectionDeskImg,
  dream: sereneSpiritualStudyImg,
  sereneStudy: sereneSpiritualStudyImg,
  reflectionDesk: sereneReflectionDeskImg,
  counselingNook: calmCounselingNookImg,
  growthLeaf: mindfulGrowthLeafImg,
  maritalHarmony: calmMaritalHarmonyImg,
  parentingSanctuary: mindfulParentingSanctuaryImg,
  reflection1: mindfulGrowthLeafImg,
  reflection2: calmMaritalHarmonyImg,
  reflection3: sereneReflectionDeskImg,
  reflection4: sereneSpiritualStudyImg,
  reflection5: mindfulGrowthLeafImg,
  aboutRehbr: sereneReflectionDeskImg,
  compassionatePromise: calmCounselingNookImg,
  brand1: realBrand1Img,
  brand2: realBrand2Img,
  brand3: realBrand3Img,
  brand4: realBrand4Img,
  brand5: realBrand5Img,
  brand6: realBrand6Img,
  brand7: realBrand7Img,
  brand8: realBrand8Img,
  brand9: realBrand9Img,
  brand10: realBrand10Img,
};

export const REHBR_INFO = {
  name: 'REHBR',
  tagline: 'Reflect • Reform • Return',
  subtitle: 'Islamic Counseling, Workshops & Educational Platform',
  founder: 'Prof. Asif',
  aboutBrief: 'REHBR is an educational and counseling initiative rooted in the Qur\'an and authentic Sunnah. We bridge the gap between learning Islamic guidance and practically living it in daily life.',
  mission: 'To provide authentic Islamic education, counseling, and practical frameworks that bridge the gap between learning and living, nurturing healthier individuals, families, and communities.',
  vision: 'To cultivate a global community of Muslims who continuously reflect, reform, and return to Allah—leading purposeful, emotionally grounded, and spiritually fulfilled lives.'
};

export const REHBR_PHILOSOPHY = [
  { step: '01', title: 'Reflect (Muhasabah)', description: 'Pause, look inward with honesty, and evaluate our heart, thoughts, and actions in the light of Islamic guidance.' },
  { step: '02', title: 'Reform (Islaah)', description: 'Develop structured, practical action plans to address shortcomings, build positive habits, and purify character.' },
  { step: '03', title: 'Return (Inaabah)', description: 'Turn back to Allah with sincere repentance, trust (Tawakkul), and continuous devotion in every chapter of life.' }
];

export const WHY_REHBR = [
  {
    title: 'Bridge Learning & Living',
    description: 'Information is available everywhere today, but implementation remains the true challenge. REHBR exists to translate authentic knowledge into daily action.'
  },
  {
    title: 'Focus on Transformation',
    description: 'We measure true success not by how much information you gain, but by genuine, lasting positive change in your character, relationships, and worship.'
  },
  {
    title: 'Structured Action Plans',
    description: 'Our programmes move beyond theory, providing clear step-by-step implementation frameworks, reflective exercises, and habit-building tools.'
  },
  {
    title: 'Rooted in Qur\'an & Sunnah',
    description: 'Every lesson, workshop, and counseling framework is firmly anchored in authentic Islamic sources, free from sectarian bias or commercial hype.'
  }
];

export const METHODOLOGY_STEPS = [
  {
    phase: 'Knowledge (I\'lm)',
    detail: 'Grounded firmly in the Qur\'an and authentic Sunnah as the foundational source of all truth and guidance.'
  },
  {
    phase: 'Reflection (Tafakkur)',
    detail: 'Engaging in deep self-examination (Muhasabah) to understand personal patterns, emotional blocks, and spiritual needs.'
  },
  {
    phase: 'Action (\'Amal)',
    detail: 'Building concrete, realistic action plans rather than relying on temporary emotional motivation.'
  },
  {
    phase: 'Consistent Growth (Istiqamah)',
    detail: 'Cultivating small, sustainable daily habits that build long-term character and emotional stability.'
  },
  {
    phase: 'Transformation (Tazkiyah)',
    detail: 'Experiencing gradual spiritual elevation, inner peace, healthier relationships, and closeness to Allah.'
  }
];

export const DIFFERENTIATORS = [
  {
    title: 'Implementation Over Information',
    description: 'Rather than overwhelming you with lecture slides, we guide you through practical exercises so you leave knowing exactly what to change and how to begin.'
  },
  {
    title: 'Evidence-Based Supporting Tools',
    description: 'Insights from Psychology, Behavioral Science, Neuroscience, and NLP are utilized carefully as supporting tools only where they fully align with Islamic principles.'
  },
  {
    title: 'Personalized & Small-Group Settings',
    description: 'We deliberately limit group sizes in our workshops to ensure meaningful discussion, individual attention, and a supportive learning environment.'
  },
  {
    title: 'Compassionate & Confidential',
    description: 'Whether in counseling or workshops, you enter a safe, non-judgmental space where you can speak openly and be supported with warmth.'
  }
];

export const WHO_ITS_FOR = [
  {
    title: 'Beginning the Journey',
    description: 'Muslims seeking a clear, practical, and gentle path to understand Islamic guidance and build foundational habits.'
  },
  {
    title: 'Returning to Allah',
    description: 'Individuals overcoming guilt, burnout, or past missteps, seeking sincere repentance, healing, and spiritual renewal.'
  },
  {
    title: 'Seeking Personal Growth',
    description: 'Professionals, students, and seekers looking to master emotional regulation, time stewardship, and character development.'
  },
  {
    title: 'Strengthening Relationships',
    description: 'Couples and parents wanting to cultivate Mawaddah (love), Rahmah (mercy), and conscious, Islamically grounded parenting.'
  }
];

export const SERVICES: ServiceCategory[] = [
  {
    id: 'khwab-ki-tabeer',
    title: '🌙 Khwab Ki Tabeer (Islamic Dream Guidance)',
    subtitle: 'Authentic understanding rooted in Qur\'an & Sunnah',
    description: 'Understand your dreams through the light of authentic Islamic teachings. Not every dream has a meaning, and not every dream requires interpretation. Our approach is rooted in the Qur\'an, authentic Sunnah, and classical Islamic understanding with sincerity, wisdom, and humility while recognizing that Allah alone has complete knowledge of the unseen.',
    focusAreas: [
      'Grounded in Qur\'an & Sunnah',
      'Classical Islamic Understanding',
      'Not Fortune-Telling or Superstition',
      'No Exaggerated Interpretations',
      'Confidential & Thoughtful Guidance'
    ],
    icon: 'Moon',
    image: sereneSpiritualStudyImg
  },
  {
    id: 'individual',
    title: 'Individual Counseling & Spiritual Guidance',
    subtitle: 'Healing, clarity, and personal expansion',
    description: 'One-on-one confidential sessions integrating clinical counseling techniques with Islamic spiritual wisdom. Together, we work to untangle emotional pain, regulate anxiety, overcome burnout, and build sustainable habits rooted in faith.',
    focusAreas: ['Anxiety & Panic Regulation', 'Burnout & Spiritual Exhaustion', 'Grief & Life Transitions', 'Identity & Self-Worth', 'Emotional Self-Mastery'],
    icon: 'User',
    image: calmCounselingNookImg
  },
  {
    id: 'couples',
    title: 'Marital & Couples Counseling',
    subtitle: 'Cultivating Mawaddah (Love) & Rahmah (Mercy)',
    description: 'A safe, neutral environment for Muslim spouses to de-escalate circular arguments, rebuild emotional trust, align on shared spiritual goals, and learn Islamic etiquette for communication and conflict resolution.',
    focusAreas: ['De-escalating Conflict', 'Communication & Adab', 'Rebuilding Trust', 'Navigating Major Life Shifts', 'Family & In-Law Dynamics'],
    icon: 'Users',
    image: calmMaritalHarmonyImg
  },
  {
    id: 'youth',
    title: 'Youth & Young Adult Counseling',
    subtitle: 'Navigating modern identity with confidence',
    description: 'Empathetic, non-judgmental support for young Muslims (ages 14-25) dealing with academic pressure, social anxiety, spiritual doubts, identity struggles, and emotional regulation in today\'s fast-paced world.',
    focusAreas: ['Identity & Faith Confidence', 'Academic & Career Stress', 'Peer Dynamics & Boundaries', 'Emotional Regulation', 'Overcoming Doubts'],
    icon: 'Sparkles',
    image: sereneReflectionDeskImg
  }
];

export const SPECIALTIES = [
  {
    title: 'Anxiety & Emotional Regulation',
    description: 'Transforming an overactive nervous system into grounded tranquility (Sakeenah) using sensory grounding and Islamic mindfulness (Muraqabah).'
  },
  {
    title: 'Burnout & Spiritual Exhaustion',
    description: 'Reclaiming mental and physical energy by aligning daily routines with divine purpose, healthy boundaries, and authentic Tawakkul.'
  },
  {
    title: 'Character Reform (Tazkiyah)',
    description: 'Identifying unhealthy behavioral cycles, purifying intentions (Niyyah), and cultivating patience (Sabr), gratitude (Shukr), and humility.'
  },
  {
    title: 'Relational Health & Family',
    description: 'Fostering compassion, empathy, and constructive communication in marriages and parenting according to the Sunnah.'
  }
];

export const METHODOLOGY = [
  {
    name: 'Qur\'anic & Prophetic Foundation',
    description: 'All core concepts are directly derived from authentic Islamic texts, ensuring spiritual purity and alignment with divine wisdom.'
  },
  {
    name: 'Self-Reflection & Account (Muhasabah)',
    description: 'Structured journaling and reflective exercises that encourage honest self-appraisal without self-flagellation.'
  },
  {
    name: 'Cognitive & Behavioral Tools (CBT / ACT)',
    description: 'Cognitive reframing and value-committed actions applied strictly as supporting tools compatible with Islamic values.'
  },
  {
    name: 'Practical Habit Building (Istiqamah)',
    description: 'Micro-habits and daily action blueprints designed to create sustainable, permanent character growth over time.'
  }
];

export const WORKSHOPS: Workshop[] = [
  {
    id: 'insaan-e-kamil',
    title: 'Insaan-e-Kamil: The Structured Transformation Journey',
    subtitle: 'Flagship Reflection & Self-Reform Workshop',
    description: 'Our flagship transformation programme. Rooted in the Qur\'an and Sunnah, this reflection-based, highly practical workshop is NOT a motivational lecture. You will engage in deep Muhasabah, map out your personal growth areas, and leave with a clear, realistic action plan.',
    date: 'Saturday, August 29, 2026',
    time: '10:00 AM - 2:00 PM IST',
    format: 'Virtual',
    duration: '4.0 Hours',
    seatsTotal: 15,
    seatsLeft: 3,
    fee: 2499,
    isFull: false,
    image: sereneSpiritualStudyImg,
    whatYoullLearn: [
      'Core principles of Islamic character reform (Tazkiyah) & self-accounting (Muhasabah)',
      'How to identify root causes of emotional triggers and spiritual inertia',
      'Practical frameworks to replace unhealthy cognitive patterns with Prophetic wisdom',
      'Daily action blueprints for building sustainable spiritual habits (Istiqamah)'
    ],
    whatYoullExperience: [
      'Guided reflective journaling and honest self-assessment without shame or self-judgment',
      'Interactive group discussions in a safe, respectful, and confidential environment',
      'Live Q&A and practical case studies with Lead Counselor Prof. Asif'
    ],
    whoThisIsFor: [
      'Individuals seeking structured self-reform and emotional clarity',
      'Anyone feeling spiritually stuck, overwhelmed by daily habits, or seeking deeper purpose',
      'Muslims looking for practical, non-judgmental Islamic self-development'
    ],
    whatYoullReceive: [
      'Live Interactive Sessions (4.0 Hours)',
      'Practical Exercises & Guided Muhasabah Reflections',
      'Participant Workbook (PDF & Fillable Format)',
      'Q&A Sessions with Prof. Asif',
      'Certificate of Completion',
      'Supportive & Privacy-Honored Learning Environment'
    ],
    howYoullLearn: [
      { step: 1, title: 'Pre-Workshop Muhasabah Journaling', detail: 'Receive your fillable 20-page reflection workbook upon registration to identify your current emotional and spiritual baseline.' },
      { step: 2, title: 'Live Interactive Session (4 Hours)', detail: 'Engage in a structured live virtual cohort led directly by Prof. Asif with real-time slides, concepts, and guided pauses for journaling.' },
      { step: 3, title: 'Real Case Study Breakouts', detail: 'Analyze anonymized real-world behavioral patterns and practice applying Prophetic character reform frameworks.' },
      { step: 4, title: 'Personal Istiqamah Action Plan', detail: 'Walk away with a customized 30-day spiritual habit tracker and concrete de-escalation steps for emotional triggers.' }
    ],
    samplePrompt: {
      title: 'Sample Reflection: The Anger & Habit Audit',
      scenario: 'When you feel sudden frustration or spiritual fatigue during your daily routine...',
      guidance: 'Instead of judging yourself harshly, ask: What unmet emotional need or cognitive trigger preceded this reaction? How did the Prophet (ﷺ) handle moments of agitation?'
    }
  },
  {
    id: 'mindful-parenting',
    title: 'Mindful Parenting: Raising Confident Muslim Children',
    subtitle: 'Islamically Grounded Parenting Blueprint',
    description: 'A conscious, Islamically grounded parenting workshop. Learn practical skills for emotional regulation, compassionate discipline, and nurturing authentic Islamic identity in your children amidst modern cultural challenges.',
    date: 'Saturday, September 19, 2026',
    time: '11:00 AM - 2:00 PM IST',
    format: 'Virtual',
    duration: '3.0 Hours',
    seatsTotal: 15,
    seatsLeft: 5,
    fee: 1999,
    isFull: false,
    image: mindfulParentingSanctuaryImg,
    whatYoullLearn: [
      'Prophetic principles of gentle firmness, empathy, and emotional connection in parenting',
      'How to handle tantrums, rebellion, and screen addiction without losing your composure',
      'Strategies for instilling authentic Islamic identity and love for Allah in young minds',
      'De-escalation scripts for high-stress parenting moments'
    ],
    whatYoullExperience: [
      'Real-world scenario breakdowns and compassionate discipline exercises',
      'Supportive peer sharing with other Muslim parents navigating similar challenges',
      'Practical Q&A with Lead Counselor Prof. Asif'
    ],
    whoThisIsFor: [
      'Parents of young children, pre-teens, and teenagers seeking an Islamically grounded approach',
      'Expectant parents or couples wanting to align on parenting values',
      'Anyone looking to foster warmth, respect, and Rahmah in their household'
    ],
    whatYoullReceive: [
      'Live Interactive Sessions (3.0 Hours)',
      'Mindful Parenting De-escalation Scripts & Reflection Prompts',
      'Participant Action Plan & Family Blueprint',
      'Q&A Sessions with Prof. Asif',
      'Certificate of Completion',
      'Supportive & Empathetic Learning Community'
    ],
    howYoullLearn: [
      { step: 1, title: 'Parenting Trigger Self-Assessment', detail: 'Complete an online self-assessment to pinpoint your personal parenting triggers and communication habits.' },
      { step: 2, title: 'Interactive Masterclass (3 Hours)', detail: 'Learn practical Prophetic parenting techniques, non-punitive discipline methods, and active listening skills.' },
      { step: 3, title: 'Live De-Escalation Roleplays', detail: 'Practice real verbal scripts for handling screen time limits, sibling conflict, and emotional meltdowns.' },
      { step: 4, title: 'Household Rahmah Blueprint', detail: 'Build a customized home routine and family communication agreement with guidance from Prof. Asif.' }
    ],
    samplePrompt: {
      title: 'Sample Script: De-Escalating Screen Time Resistance',
      scenario: 'When your child resists turning off electronics and starts crying or shouting...',
      guidance: 'Acknowledge the emotion first: "I see you were having fun and it is hard to stop." State the boundary gently: "Screen time is finished for today, but I am here to help you transition."'
    }
  }
];

export const COURSES: Course[] = [];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'What is REHBR and what is its primary foundation?',
    answer: 'REHBR is an educational initiative and counseling platform rooted in the Qur\'an and authentic Sunnah. We help Muslims understand, reflect upon, and practically implement Islamic guidance in daily life. REHBR does not promote any particular sect or organisation; our objective is solely to strengthen one\'s relationship with Allah, improve character, and live with purpose.'
  },
  {
    id: 'faq-2',
    category: 'general',
    question: 'How does REHBR integrate psychological tools?',
    answer: 'The Qur\'an and authentic Sunnah remain the primary foundation of every REHBR programme. Relevant insights from Psychology, Behavioral Science, Neuroscience, and NLP are utilized carefully ONLY as supporting, practical tools where they fully align with authentic Islamic principles.'
  },
  {
    id: 'faq-3',
    category: 'process',
    question: 'Why are workshop seats strictly limited?',
    answer: 'We limit seats deliberately—not to create artificial hype, but to ensure high-quality learning, personal attention, meaningful group interaction, and tailored guidance. Small groups allow every participant to ask questions and work through their reflection exercises effectively.'
  },
  {
    id: 'faq-4',
    category: 'process',
    question: 'Are certificates provided for REHBR programmes?',
    answer: 'Certificates of completion are available for selected flagship programmes (such as Insaan-e-Kamil and digital courses). However, we emphasize that REHBR\'s primary goal is true personal reflection, practical action, and spiritual transformation—not merely collecting paper credentials.'
  },
  {
    id: 'faq-5',
    category: 'fees',
    question: 'How does confidential Islamic counseling work?',
    answer: 'Our counseling sessions offer a safe, warm, and strictly confidential environment led by Mohamad Asif Khan. We combine clinical counseling expertise with Islamic spiritual understanding to help you address anxiety, marital challenges, burnout, and life transitions at your own pace.'
  },
  {
    id: 'faq-6',
    category: 'process',
    question: 'Is REHBR suitable for someone returning to Allah or starting fresh?',
    answer: 'Absolutely. REHBR welcomes every Muslim who sincerely desires to improve—whether you are just beginning your practice, returning to Allah after a difficult period, or seeking deeper spiritual and emotional growth. We approach every seeker with warmth, compassion, and non-judgmental support.'
  }
];

export const CREDENTIALS = [
  { category: 'Lead Counselor & Founder', items: ['Mohamad Asif Khan', 'Licensed Mental Health Counselor & Educator'] },
  { category: 'Education & Standing', items: ['M.S. in Clinical Mental Health Counseling', 'B.A. in Psychology, Magna Cum Laude', 'Board Certified Telemental Health Provider (BC-TMH)'] },
  { category: 'Specialized Training', items: ['Islamic Counseling & Character Integration', 'Certified Anxiety Treatment Specialist', 'Cognitive Behavioral & Acceptance-Based Modalities'] },
  { category: 'Islamic Foundation', items: ['Grounded in authentic Qur\'anic and Sunnah studies', 'Non-sectarian, community-focused educational approach'] }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: 'Honestly, I was very hesitant before booking. But Brother Mohamad made me feel so comfortable right from the first call. I was dealing with severe panic and burnout from work. The spiritual perspectives combined with practical grounding techniques changed everything for me. Alhamdulillah, I feel so much lighter today.',
    author: 'Ahmed Khan',
    period: 'Individual Counseling Client',
    category: 'counseling',
    highlight: 'Peace of Mind & Relief from Anxiety'
  },
  {
    id: 't2',
    quote: 'My husband and I were constantly arguing over the smallest things and it was affecting our peace at home. Imran and I decided to try couples counseling at REHBR. Prof. Asif taught us how to listen without getting defensive. It brought back the warmth and Rahmah in our marriage. JazakAllah Khair!',
    author: 'Fatima & Imran Shaikh',
    period: 'Couples Counseling Clients',
    category: 'marital',
    highlight: 'Restored Communication & Harmony'
  },
  {
    id: 't3',
    quote: 'The Insaan-e-Kamil workshop was a turning point for me. Most Islamic lectures motivate you for two days and then you go back to old habits. But this workshop gave us a real action plan and daily reflection tracker. It helped me rebuild my Tahajjud and daily Salah consistency.',
    author: 'Faizan Ansari',
    period: 'Insaan-e-Kamil Workshop Participant',
    category: 'workshops',
    highlight: 'Lasting Daily Spiritual Habits'
  },
  {
    id: 't4',
    quote: 'As a university student, I felt completely lost, overwhelmed by expectations and struggling with my focus and prayer. The youth counseling sessions gave me clarity and confidence. I stopped overthinking everything and learned how to build good habits step by step.',
    author: 'Ayaan Khan',
    period: 'Young Adult Client',
    category: 'counseling',
    highlight: 'Clarity & Faith Confidence'
  },
  {
    id: 't5',
    quote: 'Mindful Parenting shifted our whole home environment. Ahmed and I used to lose our temper with the kids when stressed. Learning how to regulate ourselves first using Prophetic character helped us handle tantrums with so much more patience.',
    author: 'Ayesha & Ahmed Khan',
    period: 'Mindful Parenting Attendees',
    category: 'workshops',
    highlight: 'Calmer Home & Patient Parenting'
  },
  {
    id: 't6',
    quote: 'I had been carrying so much emotional weight and guilt for years. In my sessions with Prof. Asif, I never felt judged even once. He helped me understand Allah\'s immense mercy and taught me how to forgive myself.',
    author: 'Maryam Ansari',
    period: 'Individual Counseling Client',
    category: 'counseling',
    highlight: 'Emotional Healing & Hope'
  },
  {
    id: 't7',
    quote: 'We booked the ₹499 consultation first just to see how it works. That 15-minute call gave us so much direction! The therapist recommended the right counseling framework for us. Best decision we made for our family wellbeing.',
    author: 'Mohammed Arif & Family',
    period: 'Consultation & Family Client',
    category: 'general',
    highlight: 'Smooth & Reassuring First Step'
  }
];
