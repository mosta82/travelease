import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  Trash2, 
  ExternalLink, 
  Download, 
  Plane, 
  Building2, 
  Bus, 
  Train, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  Plus
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function MyBookingsPage() {
  const { bookings, cancelBooking, formatPrice } = useBooking();
  const [filterTab, setFilterTab] = useState('All'); // 'All' | 'Confirmed' | 'Cancelled'
  const [selectedBookingForModal, setSelectedBookingForModal] = useState(null);

  const filteredBookings = bookings.filter(b => {
    if (filterTab === 'All') return true;
    return b.status === filterTab;
  });

  const getServiceIcon = (type) => {
    switch (type) {
      case 'flight': return <Plane className="w-5 h-5 text-secondary" />;
      case 'hotel': return <Building2 className="w-5 h-5 text-accent" />;
      case 'bus': return <Bus className="w-5 h-5 text-secondary" />;
      case 'train': return <Train className="w-5 h-5 text-amber-600" />;
      default: return <Plane className="w-5 h-5 text-secondary" />;
    }
  };

  return (
    <div className="min-h-screen bg-surface pb-24">
      
      {/* Header */}
      <div className="bg-primary text-white py-8 border-b border-primary-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-accent font-bold uppercase tracking-wider block mb-1">
              Travel Portfolio
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-sans">
              My Bookings & Reservations
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Access your simulated boarding passes, hotel vouchers, and cancellation requests.
            </p>
          </div>

          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-dark text-slate-950 font-bold text-xs flex items-center gap-2 self-start sm:self-auto transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Trip</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Prototype Alert Strip */}
        <div className="mb-6 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-secondary shrink-0" />
            <span>All reservations shown are stored in your browser's local state for demonstration.</span>
          </div>
          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
            Auto-Persisted
          </span>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-6">
          {['All', 'Confirmed', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterTab === tab
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab} ({tab === 'All' ? bookings.length : bookings.filter(b => b.status === tab).length})
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all border border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                
                {/* Left Service Info */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                    {getServiceIcon(b.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {b.id}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        b.status === 'Confirmed' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {b.status === 'Confirmed' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {b.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-primary font-sans">
                      {b.serviceName || b.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-secondary" />
                        {b.route}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-secondary" />
                        {b.date}
                      </span>
                      {b.departureTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-secondary" />
                          {b.departureTime}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Amount & Actions */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Fare</span>
                    <span className="text-xl font-black text-primary font-sans block">
                      {formatPrice(b.totalAmount)}
                    </span>
                    <span className="text-[10px] text-slate-400">{b.paymentMethod}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/booking/confirmation/${b.id}`}
                      className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary-dark text-white text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <span>Voucher</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    {b.status === 'Confirmed' && (
                      <button
                        onClick={() => {
                          if (window.confirm(`Simulate cancellation for reservation ${b.id}?`)) {
                            cancelBooking(b.id);
                          }
                        }}
                        className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Cancel Booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center shadow-card border border-slate-100 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
              🧳
            </div>
            <h3 className="text-lg font-bold text-primary font-sans">No Bookings Found</h3>
            <p className="text-xs text-slate-500">
              You don't have any {filterTab !== 'All' ? filterTab.toLowerCase() : ''} bookings at the moment.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 rounded-xl bg-secondary text-white font-bold text-xs shadow-md"
            >
              Start Exploring Destinations
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
