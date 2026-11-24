import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Printer, 
  Download, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  Plane, 
  Building2, 
  Bus, 
  Train, 
  Share2,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function BookingConfirmationPage() {
  const { bookingId } = useParams();
  const { bookings, formatPrice } = useBooking();

  const booking = bookings.find(b => b.id === bookingId) || bookings[0];

  if (!booking) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Booking Not Found</h2>
        <Link to="/" className="text-secondary font-bold hover:underline">
          Return to Homepage
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const getServiceIcon = () => {
    switch (booking.type) {
      case 'flight': return <Plane className="w-5 h-5 text-secondary" />;
      case 'hotel': return <Building2 className="w-5 h-5 text-accent" />;
      case 'bus': return <Bus className="w-5 h-5 text-secondary" />;
      case 'train': return <Train className="w-5 h-5 text-amber-600" />;
      default: return <Plane className="w-5 h-5 text-secondary" />;
    }
  };

  return (
    <div className="min-h-screen bg-surface pb-24 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Success Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Simulated Reservation Confirmed
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-primary font-sans">
            Pack Your Bags! You're Going On A Trip.
          </h1>

          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Your simulated reservation is confirmed. We have issued your e-ticket voucher with reference ID <strong className="text-primary">{booking.id}</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Voucher</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary-dark text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Ticket</span>
            </button>
          </div>
        </div>

        {/* Digital E-Ticket Card */}
        <div className="bg-white rounded-3xl shadow-premium border border-slate-100 overflow-hidden relative">
          
          {/* Top Notch Bar */}
          <div className="bg-primary text-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                {getServiceIcon()}
              </div>
              <div>
                <span className="text-xs text-accent font-bold uppercase tracking-wider">
                  Official TravelEase e-Voucher
                </span>
                <h3 className="text-xl font-bold font-sans text-white">
                  {booking.serviceName}
                </h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 block uppercase">Booking Reference</span>
              <span className="text-xl font-mono font-black text-accent tracking-widest">
                {booking.id}
              </span>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Route & Times */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center border-b pb-6">
              <div>
                <span className="text-xs font-semibold text-slate-400 block uppercase">Departure / Check-In</span>
                <span className="text-xl font-black text-primary font-sans block mt-1">
                  {booking.departureTime}
                </span>
                <p className="text-xs text-slate-600 font-medium">{booking.date}</p>
                <p className="text-xs text-slate-400 mt-0.5">{booking.route?.split('→')[0] || booking.route}</p>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full mb-1">
                  Confirmed
                </span>
                <div className="w-24 h-0.5 bg-slate-200"></div>
                <span className="text-[10px] text-slate-400 mt-1">Non-stop Scheduled</span>
              </div>

              <div className="sm:text-right">
                <span className="text-xs font-semibold text-slate-400 block uppercase">Arrival / Check-Out</span>
                <span className="text-xl font-black text-primary font-sans block mt-1">
                  {booking.arrivalTime}
                </span>
                <p className="text-xs text-slate-600 font-medium">{booking.date}</p>
                <p className="text-xs text-slate-400 mt-0.5">{booking.route?.split('→')[1] || booking.route}</p>
              </div>
            </div>

            {/* Passenger & QR Code */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              
              <div className="sm:col-span-2 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Passenger(s) Manifest
                </h4>

                {(booking.passengers || [booking.passengers?.[0]]).map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">{p?.name || 'Tanvir Hossain'}</p>
                        <p className="text-xs text-slate-500">Seat / Unit: {p?.seat || '12A'}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border">
                      Standard PNR
                    </span>
                  </div>
                ))}

                <div className="pt-2 text-xs text-slate-500 space-y-1">
                  <p>• Paid Amount: <strong className="text-primary">{formatPrice(booking.totalAmount)}</strong> via {booking.paymentMethod}</p>
                  <p>• Issued on: {booking.bookingDate}</p>
                </div>
              </div>

              {/* QR Verification Code */}
              <div className="flex flex-col items-center justify-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <img
                  src={booking.qrCode}
                  alt="Boarding QR Code"
                  className="w-32 h-32 rounded-lg mix-blend-multiply"
                />
                <span className="text-[10px] font-mono text-slate-400 uppercase mt-2">
                  Scan for Simulated Gate Access
                </span>
              </div>

            </div>

          </div>

          {/* Prototype Notice Footer Strip */}
          <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 text-center text-xs text-slate-500">
            <strong>Prototype Demo:</strong> This simulated document does not confer real travel rights with operating carriers.
          </div>

        </div>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <Link
            to="/my-bookings"
            className="text-sm font-bold text-secondary hover:underline flex items-center gap-1.5"
          >
            <span>View All My Bookings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-light transition-colors"
          >
            Book Another Journey
          </Link>
        </div>

      </div>
    </div>
  );
}
