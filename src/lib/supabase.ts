import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to save booking
export async function saveBookingToSupabase(bookingData: any) {
  try {
    const existing = JSON.parse(localStorage.getItem('rehbr_bookings') || '[]');
    existing.unshift({ ...bookingData, id: bookingData.id || Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem('rehbr_bookings', JSON.stringify(existing));

    if (supabase) {
      const { data, error } = await supabase.from('bookings').insert([bookingData]);
      if (error) console.warn('Supabase booking insert warning:', error);
      return data;
    }
  } catch (err) {
    console.error('Error saving booking:', err);
  }
  return null;
}

// Helper to save inquiry
export async function saveInquiryToSupabase(inquiryData: any) {
  try {
    const existing = JSON.parse(localStorage.getItem('rehbr_inquiries') || '[]');
    existing.unshift({ ...inquiryData, id: inquiryData.id || Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem('rehbr_inquiries', JSON.stringify(existing));

    if (supabase) {
      const { data, error } = await supabase.from('inquiries').insert([inquiryData]);
      if (error) console.warn('Supabase inquiry insert warning:', error);
      return data;
    }
  } catch (err) {
    console.error('Error saving inquiry:', err);
  }
  return null;
}

// Helper to save waitlist
export async function saveWaitlistToSupabase(waitlistData: any) {
  try {
    const existing = JSON.parse(localStorage.getItem('rehbr_waitlist') || '[]');
    existing.unshift({ ...waitlistData, id: waitlistData.id || Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem('rehbr_waitlist', JSON.stringify(existing));

    if (supabase) {
      const { data, error } = await supabase.from('waitlist').insert([waitlistData]);
      if (error) console.warn('Supabase waitlist insert warning:', error);
      return data;
    }
  } catch (err) {
    console.error('Error saving waitlist:', err);
  }
  return null;
}

// Helper to save workshop registration
export async function saveRegistrationToSupabase(registrationData: any) {
  try {
    const existing = JSON.parse(localStorage.getItem('rehbr_registrations') || '[]');
    existing.unshift({ ...registrationData, id: registrationData.id || Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem('rehbr_registrations', JSON.stringify(existing));

    if (supabase) {
      const { data, error } = await supabase.from('registrations').insert([registrationData]);
      if (error) console.warn('Supabase registration insert warning:', error);
      return data;
    }
  } catch (err) {
    console.error('Error saving registration:', err);
  }
  return null;
}

// Helper to fetch bookings
export async function fetchBookingsFromSupabase() {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Supabase fetch error, using local data:', err);
  }
  return JSON.parse(localStorage.getItem('rehbr_bookings') || '[]');
}

// Helper to fetch inquiries
export async function fetchInquiriesFromSupabase() {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Supabase fetch error, using local data:', err);
  }
  return JSON.parse(localStorage.getItem('rehbr_inquiries') || '[]');
}

// Helper to fetch waitlist
export async function fetchWaitlistFromSupabase() {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('waitlist').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Supabase fetch error, using local data:', err);
  }
  return JSON.parse(localStorage.getItem('rehbr_waitlist') || '[]');
}

// Helper to fetch registrations
export async function fetchRegistrationsFromSupabase() {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Supabase fetch error, using local data:', err);
  }
  return JSON.parse(localStorage.getItem('rehbr_registrations') || '[]');
}

// Helper to fetch fallback submissions
export async function fetchFallbackSubmissionsFromSupabase() {
  const localBookings = JSON.parse(localStorage.getItem('rehbr_bookings') || '[]');
  const localInquiries = JSON.parse(localStorage.getItem('rehbr_inquiries') || '[]');
  return [...localBookings, ...localInquiries];
}

// Helper to update booking status
export async function updateBookingStatusInSupabase(id: string | number, status: string) {
  try {
    const existing = JSON.parse(localStorage.getItem('rehbr_bookings') || '[]');
    const updated = existing.map((b: any) => (b.id === id ? { ...b, status } : b));
    localStorage.setItem('rehbr_bookings', JSON.stringify(updated));

    if (supabase) {
      const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
      if (error) console.warn('Supabase booking status update warning:', error);
    }
    return true;
  } catch (err) {
    console.error('Error updating status:', err);
    return false;
  }
}
