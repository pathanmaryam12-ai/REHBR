import { useState, useEffect, FormEvent } from 'react';
import { 
  Users, Calendar, Clock, MessageCircle, RefreshCw, Search, 
  CheckCircle2, Clock3, AlertCircle, FileText, ChevronRight, 
  Lock, KeyRound, Download, X, Eye, Phone, Mail, Sparkles, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  fetchBookingsFromSupabase, 
  fetchInquiriesFromSupabase, 
  fetchWaitlistFromSupabase, 
  fetchRegistrationsFromSupabase,
  fetchFallbackSubmissionsFromSupabase,
  updateBookingStatusInSupabase 
} from '../lib/supabase';

interface AdminSectionProps {
  onNavigateBooking?: () => void;
}

export default function AdminSection({ onNavigateBooking }: AdminSectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<'bookings' | 'inquiries' | 'waitlist' | 'registrations'>('bookings');
  
  // Data State
  const [bookings, setBookings] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [waitlist, setWaitlist] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Modal State for viewing full questionnaire details
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

  // Load All Data from Supabase & LocalStorage
  const loadDashboardData = async () => {
    setLoading(true);

    try {
      // 1. Fetch from Supabase
      const [sbBookings, sbInquiries, sbWaitlist, sbRegs, sbFallback] = await Promise.all([
        fetchBookingsFromSupabase(),
        fetchInquiriesFromSupabase(),
        fetchWaitlistFromSupabase(),
        fetchRegistrationsFromSupabase(),
        fetchFallbackSubmissionsFromSupabase()
      ]);

      // 2. Fetch from LocalStorage as fallback/merge
      const localBookings = JSON.parse(localStorage.getItem('rehbr_bookings') || '[]');
      const localInquiries = JSON.parse(localStorage.getItem('rehbr_inquiries') || '[]');
      const localWaitlist = JSON.parse(localStorage.getItem('rehbr_waitlist') || '[]');
      const localRegs = JSON.parse(localStorage.getItem('rehbr_registrations') || '[]');

      // Process and merge bookings
      const mergedBookingsMap = new Map();
      
      // First insert local
      localBookings.forEach((b: any) => {
        const key = b.code || b.booking_code || b.id || b.email + b.date;
        mergedBookingsMap.set(key, {
          id: b.id || key,
          booking_code: b.code || b.booking_code || 'RHB-LOCAL',
          name: b.name,
          email: b.email,
          phone: b.phone,
          pathway: b.pathway,
          pathway_title: b.pathwayTitle || b.pathway_title || 'Counseling Session',
          amount: b.amount || '₹499',
          day: b.day || 'Scheduled',
          date: b.date || new Date().toLocaleDateString(),
          slot: b.slot || 'Morning',
          format: b.format || 'Online',
          counseling_questionnaire: b.counselingQuestionnaire || b.counseling_questionnaire,
          dream_questionnaire: b.dreamQuestionnaire || b.dream_questionnaire,
          status: b.status || 'Pending',
          created_at: b.created_at || new Date().toISOString()
        });
      });

      // Override with Supabase records
      sbBookings.forEach((b: any) => {
        const key = b.booking_code || b.id;
        let cQuest = b.counseling_questionnaire;
        if (typeof cQuest === 'string') {
          try { cQuest = JSON.parse(cQuest); } catch (e) {}
        }
        let dQuest = b.dream_questionnaire;
        if (typeof dQuest === 'string') {
          try { dQuest = JSON.parse(dQuest); } catch (e) {}
        }

        mergedBookingsMap.set(key, {
          id: b.id,
          booking_code: b.booking_code || 'RHB-SUPABASE',
          name: b.name,
          email: b.email,
          phone: b.phone,
          pathway: b.pathway,
          pathway_title: b.pathway_title || 'Counseling Session',
          amount: b.amount || '₹499',
          day: b.day,
          date: b.date,
          slot: b.slot,
          format: b.format,
          counseling_questionnaire: cQuest,
          dream_questionnaire: dQuest,
          status: b.status || 'Pending',
          created_at: b.created_at
        });
      });

      // Process fallback submissions if any exist
      sbFallback.forEach((f: any) => {
        if (f.type === 'booking' && f.submission_data) {
          const s = typeof f.submission_data === 'string' ? JSON.parse(f.submission_data) : f.submission_data;
          const key = s.booking_code || f.id;
          if (!mergedBookingsMap.has(key)) {
            mergedBookingsMap.set(key, {
              id: f.id,
              booking_code: s.booking_code || 'RHB-FALLBACK',
              name: f.client_name || s.name,
              email: f.client_email || s.email,
              phone: f.client_phone || s.phone,
              pathway_title: s.pathway_title || 'Counseling Session',
              amount: s.amount || '₹499',
              day: s.day,
              date: s.date,
              slot: s.slot,
              format: s.format,
              counseling_questionnaire: s.counseling_questionnaire,
              dream_questionnaire: s.dream_questionnaire,
              status: 'Pending',
              created_at: f.created_at
            });
          }
        }
      });

      const allBookingsList = Array.from(mergedBookingsMap.values()).sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setBookings(allBookingsList);

      // Merge Inquiries
      const mergedInquiries = [...sbInquiries];
      localInquiries.forEach((l: any) => {
        if (!mergedInquiries.some(i => i.email === l.email && i.name === l.name)) {
          mergedInquiries.push({
            id: l.id || Math.random().toString(),
            name: l.name,
            email: l.email,
            phone: l.phone,
            reason: l.reason,
            preferred_format: l.preferredFormat,
            preferred_time: l.preferredTime,
            created_at: new Date().toISOString()
          });
        }
      });
      setInquiries(mergedInquiries);

      // Merge Waitlists
      const mergedWaitlist = [...sbWaitlist];
      localWaitlist.forEach((l: any) => {
        if (!mergedWaitlist.some(w => w.email === l.email && w.interest === l.interest)) {
          mergedWaitlist.push({
            id: l.id || Math.random().toString(),
            name: l.name,
            email: l.email,
            interest: l.interest,
            created_at: new Date().toISOString()
          });
        }
      });
      setWaitlist(mergedWaitlist);

      // Merge Registrations
      const mergedRegs = [...sbRegs];
      localRegs.forEach((l: any) => {
        if (!mergedRegs.some(r => r.email === l.email && r.course_title === l.courseTitle)) {
          mergedRegs.push({
            id: l.id || Math.random().toString(),
            name: l.name,
            email: l.email,
            phone: l.phone,
            course_title: l.courseTitle,
            fee: l.fee,
            format: l.format,
            created_at: l.date || new Date().toISOString()
          });
        }
      });
      setRegistrations(mergedRegs);

    } catch (err) {
      console.error('Error loading admin portal data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const handlePinSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin.toLowerCase() === 'rehbr') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    // Update local state
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    
    // Update localStorage
    const localBookings = JSON.parse(localStorage.getItem('rehbr_bookings') || '[]');
    const updatedLocal = localBookings.map((b: any) => (b.id === bookingId || b.code === bookingId) ? { ...b, status: newStatus } : b);
    localStorage.setItem('rehbr_bookings', JSON.stringify(updatedLocal));

    // Update Supabase
    await updateBookingStatusInSupabase(bookingId, newStatus);
  };

  const openWhatsAppToClient = (phone: string, name: string, code?: string, date?: string, slot?: string) => {
    const cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '917666669461';
    const message = encodeURIComponent(
      `Assalamu Alaikum ${name},\n\nThis is regarding your REHBR Counseling Booking (${code || 'Ref'})\n` +
      `Date: ${date || 'Scheduled'}\nSlot: ${slot || 'Confirmed'}\n\n` +
      `We look forward to guiding you. Please let us know if you have any questions before the session.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const exportToCSV = () => {
    let dataToExport: any[] = [];
    let filename = `REHBR_${activeTab}_export.csv`;

    if (activeTab === 'bookings') {
      dataToExport = bookings.map(b => ({
        Booking_Code: b.booking_code,
        Client_Name: b.name,
        Email: b.email,
        Phone: b.phone,
        Pathway: b.pathway_title,
        Amount: b.amount,
        Date: b.date,
        Slot: b.slot,
        Format: b.format,
        Status: b.status,
        Created_At: b.created_at
      }));
    } else if (activeTab === 'inquiries') {
      dataToExport = inquiries.map(i => ({
        Name: i.name,
        Email: i.email,
        Phone: i.phone,
        Reason: i.reason,
        Preferred_Time: i.preferred_time,
        Created_At: i.created_at
      }));
    } else if (activeTab === 'waitlist') {
      dataToExport = waitlist.map(w => ({
        Name: w.name,
        Email: w.email,
        Interest: w.interest,
        Created_At: w.created_at
      }));
    } else {
      dataToExport = registrations.map(r => ({
        Name: r.name,
        Email: r.email,
        Phone: r.phone,
        Course: r.course_title,
        Fee: r.fee,
        Created_At: r.created_at
      }));
    }

    if (dataToExport.length === 0) return;

    const headers = Object.keys(dataToExport[0]).join(',');
    const rows = dataToExport.map(row => 
      Object.values(row).map(val => `"${String(val || '').replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    const blob = new Blob([`${headers}\n${rows}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone?.includes(searchQuery) ||
      b.booking_code?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || b.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Pin Auth Modal / Screen
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-6 sm:p-8 bg-white rounded-3xl border border-oat shadow-lg text-left">
        <div className="w-12 h-12 rounded-2xl bg-sage/10 text-sage flex items-center justify-center mb-4">
          <Lock className="w-6 h-6" />
        </div>
        <span className="text-xs font-bold tracking-widest text-sage uppercase block">
          Restricted Portal
        </span>
        <h2 className="font-serif text-2xl font-bold text-charcoal mt-1">
          REHBR Admin Dashboard
        </h2>
        <p className="text-sm text-slate-text mt-2 leading-relaxed">
          Access client bookings, questionnaires, and inquiries recorded via Supabase.
        </p>

        <form onSubmit={handlePinSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Enter Admin Password or PIN
            </label>
            <div className="relative">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter Admin PIN"
                className="w-full px-4 py-3 pl-10 rounded-xl border border-oat bg-alabaster/50 text-charcoal focus:ring-2 focus:ring-sage focus:outline-none text-sm font-mono"
              />
              <KeyRound className="w-4 h-4 text-slate-text absolute left-3.5 top-3.5" />
            </div>
            {pinError && (
              <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" /> Invalid access code. Please try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-sage text-alabaster font-bold rounded-xl hover:bg-sage/90 transition-all cursor-pointer shadow-xs text-sm"
          >
            Unlock Admin Portal
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      {/* Top Banner & Stats */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-oat shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-widest text-sage uppercase">
              Management Portal
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Supabase Sync
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal mt-1">
            Client Bookings & Portal
          </h1>
          <p className="text-sm text-slate-text mt-1">
            Review client consultation requests, pre-consultation questionnaires, and dream details.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadDashboardData}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl border border-oat bg-alabaster hover:bg-oat/30 text-charcoal text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
          >
            <RefreshCw className={`w-4 h-4 text-sage ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={exportToCSV}
            className="px-4 py-2.5 rounded-xl bg-sage text-alabaster hover:bg-sage/90 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-oat shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-charcoal block leading-tight">{bookings.length}</span>
            <span className="text-xs text-slate-text uppercase font-semibold tracking-wider">Total Bookings</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-oat shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Clock3 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-charcoal block leading-tight">
              {bookings.filter(b => b.status?.toLowerCase() === 'pending').length}
            </span>
            <span className="text-xs text-slate-text uppercase font-semibold tracking-wider">Pending Confirmation</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-oat shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-charcoal block leading-tight">
              {bookings.filter(b => b.status?.toLowerCase() === 'confirmed').length}
            </span>
            <span className="text-xs text-slate-text uppercase font-semibold tracking-wider">Confirmed Sessions</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-oat shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-charcoal block leading-tight">
              {inquiries.length + waitlist.length + registrations.length}
            </span>
            <span className="text-xs text-slate-text uppercase font-semibold tracking-wider">Inquiries & Program Leads</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs & Search Controls */}
      <div className="bg-white rounded-3xl p-6 border border-oat shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-oat/60 pb-4">
          {/* Main Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'bookings'
                  ? 'bg-sage text-alabaster shadow-xs'
                  : 'bg-alabaster text-slate-text hover:text-charcoal hover:bg-oat/40'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Bookings ({bookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'inquiries'
                  ? 'bg-sage text-alabaster shadow-xs'
                  : 'bg-alabaster text-slate-text hover:text-charcoal hover:bg-oat/40'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Quick Inquiries ({inquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('waitlist')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'waitlist'
                  ? 'bg-sage text-alabaster shadow-xs'
                  : 'bg-alabaster text-slate-text hover:text-charcoal hover:bg-oat/40'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Program Waitlist ({waitlist.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('registrations')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'registrations'
                  ? 'bg-sage text-alabaster shadow-xs'
                  : 'bg-alabaster text-slate-text hover:text-charcoal hover:bg-oat/40'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Direct Enrollments ({registrations.length})</span>
            </button>
          </div>

          {/* Search & Status Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, phone, email..."
                className="w-full px-3.5 py-2 pl-9 rounded-xl border border-oat bg-alabaster/60 text-xs text-charcoal focus:ring-2 focus:ring-sage focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-text absolute left-3 top-3" />
            </div>

            {activeTab === 'bookings' && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-oat bg-alabaster text-xs text-charcoal font-semibold focus:ring-2 focus:ring-sage focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
              </select>
            )}
          </div>
        </div>

        {/* BOOKINGS TABLE VIEW */}
        {activeTab === 'bookings' && (
          <div className="overflow-x-auto">
            {filteredBookings.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm text-slate-text font-serif italic">No bookings found matching your filter.</p>
                {onNavigateBooking && (
                  <button 
                    onClick={onNavigateBooking}
                    className="text-xs text-sage font-bold hover:underline cursor-pointer"
                  >
                    + Create Test Booking Now
                  </button>
                )}
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-oat text-[11px] font-bold uppercase tracking-wider text-slate-text bg-alabaster/40">
                    <th className="py-3 px-4">Booking Code</th>
                    <th className="py-3 px-4">Client Info</th>
                    <th className="py-3 px-4">Pathway & Format</th>
                    <th className="py-3 px-4">Scheduled Time</th>
                    <th className="py-3 px-4">Questionnaire</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-oat/50 text-xs text-charcoal">
                  {filteredBookings.map((b) => {
                    const hasQuest = b.counseling_questionnaire || b.dream_questionnaire;
                    return (
                      <tr key={b.id || b.booking_code} className="hover:bg-alabaster/50 transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-sage">
                          {b.booking_code}
                        </td>
                        <td className="py-4 px-4 space-y-0.5">
                          <span className="font-bold text-charcoal block">{b.name}</span>
                          <span className="text-slate-text text-[11px] flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {b.email}
                          </span>
                          {b.phone && (
                            <span className="text-slate-text text-[11px] flex items-center gap-1">
                              <Phone className="w-3 h-3 text-emerald-600" /> {b.phone}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 space-y-1">
                          <span className="font-semibold block">{b.pathway_title}</span>
                          <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-oat/30 text-slate-text">
                            {b.format || 'Online'} • {b.amount || '₹499'}
                          </span>
                        </td>
                        <td className="py-4 px-4 space-y-0.5">
                          <span className="font-bold block">{b.date}</span>
                          <span className="text-slate-text text-[11px] block">{b.day} ({b.slot})</span>
                        </td>
                        <td className="py-4 px-4">
                          {hasQuest ? (
                            <button
                              onClick={() => setSelectedRecord(b)}
                              className="px-2.5 py-1 rounded-lg bg-sage/10 text-sage hover:bg-sage/20 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5" /> View Form
                            </button>
                          ) : (
                            <span className="text-slate-400 text-[11px]">Standard</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={b.status || 'Pending'}
                            onChange={(e) => handleStatusChange(b.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border cursor-pointer focus:outline-none ${
                              b.status?.toLowerCase() === 'confirmed'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : b.status?.toLowerCase() === 'completed'
                                ? 'bg-sky-50 text-sky-700 border-sky-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() => openWhatsAppToClient(b.phone, b.name, b.booking_code, b.date, b.slot)}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all cursor-pointer inline-flex items-center gap-1 text-[11px] font-bold"
                            title="Chat with client on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4 fill-emerald-200" /> WhatsApp
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* INQUIRIES TABLE VIEW */}
        {activeTab === 'inquiries' && (
          <div className="overflow-x-auto">
            {inquiries.length === 0 ? (
              <div className="py-16 text-center text-slate-text italic font-serif text-sm">
                No general inquiries submitted yet.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-oat text-[11px] font-bold uppercase tracking-wider text-slate-text bg-alabaster/40">
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Contact Info</th>
                    <th className="py-3 px-4">Reason for Outreach</th>
                    <th className="py-3 px-4">Preferred Time</th>
                    <th className="py-3 px-4 text-right">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-oat/50 text-xs text-charcoal">
                  {inquiries.map((i, idx) => (
                    <tr key={i.id || idx} className="hover:bg-alabaster/50 transition-colors">
                      <td className="py-4 px-4 font-bold">{i.name}</td>
                      <td className="py-4 px-4 space-y-0.5">
                        <span className="block">{i.email}</span>
                        {i.phone && <span className="text-slate-text text-[11px]">{i.phone}</span>}
                      </td>
                      <td className="py-4 px-4 max-w-xs">{i.reason || 'General Counseling Consultation'}</td>
                      <td className="py-4 px-4">{i.preferred_time || i.preferred_format || 'Morning'}</td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => openWhatsAppToClient(i.phone, i.name)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> Message
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* WAITLIST TABLE VIEW */}
        {activeTab === 'waitlist' && (
          <div className="overflow-x-auto">
            {waitlist.length === 0 ? (
              <div className="py-16 text-center text-slate-text italic font-serif text-sm">
                No waitlist entries submitted yet.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-oat text-[11px] font-bold uppercase tracking-wider text-slate-text bg-alabaster/40">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Program Interest</th>
                    <th className="py-3 px-4">Submitted Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-oat/50 text-xs text-charcoal">
                  {waitlist.map((w, idx) => (
                    <tr key={w.id || idx} className="hover:bg-alabaster/50 transition-colors">
                      <td className="py-4 px-4 font-bold">{w.name || 'Anonymous Client'}</td>
                      <td className="py-4 px-4">{w.email}</td>
                      <td className="py-4 px-4 font-semibold text-sage">{w.interest || 'General Workshops'}</td>
                      <td className="py-4 px-4 text-slate-text">{new Date(w.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* REGISTRATIONS TABLE VIEW */}
        {activeTab === 'registrations' && (
          <div className="overflow-x-auto">
            {registrations.length === 0 ? (
              <div className="py-16 text-center text-slate-text italic font-serif text-sm">
                No direct course registrations submitted yet.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-oat text-[11px] font-bold uppercase tracking-wider text-slate-text bg-alabaster/40">
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Email & Phone</th>
                    <th className="py-3 px-4">Course / Program Title</th>
                    <th className="py-3 px-4">Fee Paid</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-oat/50 text-xs text-charcoal">
                  {registrations.map((r, idx) => (
                    <tr key={r.id || idx} className="hover:bg-alabaster/50 transition-colors">
                      <td className="py-4 px-4 font-bold">{r.name}</td>
                      <td className="py-4 px-4 space-y-0.5">
                        <span className="block">{r.email}</span>
                        <span className="text-slate-text text-[11px]">{r.phone}</span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-sage">{r.course_title}</td>
                      <td className="py-4 px-4 font-bold">₹{r.fee}</td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => openWhatsAppToClient(r.phone, r.name)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> Message
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* QUESTIONNAIRE DETAILS MODAL */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto border border-oat shadow-xl text-left space-y-6"
            >
              <div className="flex items-center justify-between border-b border-oat pb-4">
                <div>
                  <span className="text-xs font-bold tracking-widest text-sage uppercase">
                    Questionnaire Response
                  </span>
                  <h3 className="font-serif text-xl font-bold text-charcoal mt-0.5">
                    {selectedRecord.name} ({selectedRecord.booking_code})
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-2 rounded-full hover:bg-oat/30 text-slate-text transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Counseling Questionnaire Answers */}
              {selectedRecord.counseling_questionnaire && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sage border-b border-oat/50 pb-1">
                    Pre-Consultation Questionnaire
                  </h4>

                  <div className="space-y-3 text-xs text-charcoal">
                    <div className="bg-alabaster p-3.5 rounded-xl border border-oat/60">
                      <span className="font-bold text-slate-text block mb-1">What brings you here today?</span>
                      <p className="text-sm font-serif italic text-charcoal">
                        "{selectedRecord.counseling_questionnaire.whatBringsYou || 'Not specified'}"
                      </p>
                    </div>

                    <div className="bg-alabaster p-3.5 rounded-xl border border-oat/60">
                      <span className="font-bold text-slate-text block mb-1">What would you like help with?</span>
                      <p className="text-sm leading-relaxed">
                        {selectedRecord.counseling_questionnaire.whatWouldYouLikeHelpWith || 'Not specified'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-alabaster p-3 rounded-xl border border-oat/60">
                        <span className="font-bold text-slate-text block">Primary Concern:</span>
                        <span>{selectedRecord.counseling_questionnaire.primaryConcern || 'General'}</span>
                      </div>

                      <div className="bg-alabaster p-3 rounded-xl border border-oat/60">
                        <span className="font-bold text-slate-text block">Previous Counseling:</span>
                        <span>{selectedRecord.counseling_questionnaire.previousCounseling || 'No'}</span>
                      </div>

                      <div className="bg-alabaster p-3 rounded-xl border border-oat/60">
                        <span className="font-bold text-slate-text block">Preferred Language:</span>
                        <span>{selectedRecord.counseling_questionnaire.preferredLanguage || 'English'}</span>
                      </div>

                      <div className="bg-alabaster p-3 rounded-xl border border-oat/60">
                        <span className="font-bold text-slate-text block">Format:</span>
                        <span>{selectedRecord.counseling_questionnaire.preferredSession || 'Online'}</span>
                      </div>
                    </div>

                    {selectedRecord.counseling_questionnaire.medicalOrLifeEvents && (
                      <div className="bg-alabaster p-3.5 rounded-xl border border-oat/60">
                        <span className="font-bold text-slate-text block mb-1">Medical Conditions or Life Events:</span>
                        <p>{selectedRecord.counseling_questionnaire.medicalOrLifeEvents}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Dream Questionnaire Answers */}
              {selectedRecord.dream_questionnaire && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sage border-b border-oat/50 pb-1">
                    Khwab Ki Tabeer (Dream Description)
                  </h4>

                  <div className="space-y-3 text-xs text-charcoal">
                    <div className="bg-alabaster p-4 rounded-xl border border-oat/60">
                      <span className="font-bold text-slate-text block mb-1">Dream Description:</span>
                      <p className="text-sm font-serif italic text-charcoal leading-relaxed">
                        "{selectedRecord.dream_questionnaire.dreamDescription || 'Not specified'}"
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-alabaster p-3 rounded-xl border border-oat/60">
                        <span className="font-bold text-slate-text block">When Dream Was Seen:</span>
                        <span>{selectedRecord.dream_questionnaire.whenSeen || 'Not specified'}</span>
                      </div>

                      <div className="bg-alabaster p-3 rounded-xl border border-oat/60">
                        <span className="font-bold text-slate-text block">Is Dream Recurring?:</span>
                        <span>{selectedRecord.dream_questionnaire.isRecurring || 'No'}</span>
                      </div>
                    </div>

                    {selectedRecord.dream_questionnaire.backgroundContext && (
                      <div className="bg-alabaster p-3.5 rounded-xl border border-oat/60">
                        <span className="font-bold text-slate-text block mb-1">Life Background Context:</span>
                        <p>{selectedRecord.dream_questionnaire.backgroundContext}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-oat flex items-center justify-between">
                <button
                  onClick={() => openWhatsAppToClient(selectedRecord.phone, selectedRecord.name, selectedRecord.booking_code, selectedRecord.date, selectedRecord.slot)}
                  className="px-4 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 text-xs flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" /> Message Client on WhatsApp
                </button>

                <button
                  onClick={() => setSelectedRecord(null)}
                  className="px-4 py-2 bg-alabaster border border-oat text-charcoal font-bold rounded-xl text-xs hover:bg-oat/30 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
