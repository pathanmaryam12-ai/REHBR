export type ActivePage = 'landing' | 'about' | 'services' | 'workshops' | 'logistics' | 'booking' | 'admin';

export type BookingPathway = 'first_consultation' | 'returning_client' | 'khwab_tabeer';

export interface BookingForm {
  name: string;
  email: string;
  phone: string;
  reason?: string;
  preferredFormat: 'online' | 'in_person';
  preferredTime: 'morning' | 'afternoon' | 'evening';
  preferredLanguage?: string;
  selectedDay?: string;
  selectedSlot?: string;
  pathway?: BookingPathway;
  notes?: string;
}

export interface PreConsultationQuestionnaire {
  whatBringsYou: string;
  whatWouldYouLikeHelpWith: string;
  primaryConcern: string;
  previousCounseling: string;
  medicalOrLifeEvents: string;
  preferredLanguage: string;
  preferredSession: string;
  additionalNotes?: string;
}

export interface DreamQuestionnaire {
  dreamDescription: string;
  whenSeen: string;
  isRecurring: string;
  backgroundContext: string;
  additionalInfo: string;
  preferredLanguage: string;
}

export interface InstagramPost {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | 'REEL';
  timestamp: string;
  likesCount: number;
  commentsCount: number;
  category?: 'reflection' | 'reel' | 'workshop' | string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  focusAreas: string[];
  icon: string;
  image: string;
}

export interface WorkshopStep {
  step: number;
  title: string;
  detail: string;
}

export interface WorkshopSamplePrompt {
  title: string;
  scenario: string;
  guidance: string;
}

export interface Workshop {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  time: string;
  format: string;
  location?: string;
  duration: string;
  seatsTotal: number;
  seatsLeft: number;
  fee: number;
  isFull: boolean;
  image: string;
  whatYoullLearn: string[];
  whatYoullExperience: string[];
  whoThisIsFor: string[];
  whatYoullReceive: string[];
  howYoullLearn: WorkshopStep[];
  samplePrompt: WorkshopSamplePrompt;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modulesCount?: number;
  level?: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location?: string;
  service?: string;
  period?: string;
  category?: 'counseling' | 'marital' | 'workshops' | 'general' | string;
  highlight?: string;
  rating?: number;
}
