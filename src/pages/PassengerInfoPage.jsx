import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, ShieldCheck, ArrowRight, ArrowLeft, Luggage, Utensils, Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function PassengerInfoPage() {
  const navigate = useNavigate();
  const { bookingDraft, setBookingDraft, user, formatPrice } = useBooking();

  // If no draft exists, redirect
  if (!bookingDraft) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">No Active Booking Selected</h2>
        <p className="text-sm text-slate-500 mb-6">Please select a flight, hotel, bus, or train to begin booking.</p>
        <Link to="/" className="px-6 py-3 rounded-xl bg-secondary text-white font-bold text-sm">
          Browse Travel Services
        </Link>
      </div>
    );
  }

  const { item, type, extraOptions } = bookingDraft;

  // Passenger form state
  const [passenger, setPassenger] = useState({
    title: 'Mr',
    firstName: user?.name ? user.name.split(' ')[0] : 'Tanvir',
    lastName: user?.name ? user.name.split(' ')[1] || 'Hossain' : 'Hossain',
    email: user?.email || 'tanvir@travelease.demo',
    phone: user?.phone || '+880 1712-345678',
    gender: 'Male',
    dob: '1992-05-14',
    passportOrNid: user?.passportNumber || 'A08942157',
    nationality: 'Bangladesh',
    mealPreference: 'Standard Halal',
    seatPreference: 'Window',
    addInsurance: true,
  });

  const basePrice = type === 'hotel' 
    ? (extraOptions?.selectedRoom ? extraOptions.selectedRoom.price : item.pricePerNight)
    : (extraOptions?.selectedClass ? extraOptions.selectedClass.fare : (item.price || item.startingPrice));

  const insuranceFee = passenger.addInsurance ? 8.00 : 0.00;
  const taxesFee = basePrice * 0.10;
  const grandTotal = basePrice + insuranceFee + taxesFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingDraft(prev => ({
      ...prev,
      passenger,
      calculatedFare: {
        basePrice,
        insuranceFee,
        taxesFee,
        grandTotal
      }
    }));
    navigate('/booking/checkout');
  };

  return (
    <div className="min-h-screen bg-surface pb-24">
      
      {/* Header Stepper */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-1">
                Step 1 of 2: Guest & Traveler Information
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-primary font-sans">
                Passenger & Contact Details
              </h1>
            </div>

            {/* Step Pills */}
            <div className="hidden sm:flex items-center gap-3 text-xs font-bold">
              <span className="px-3 py-1.5 rounded-full bg-secondary text-white">
                1. Passenger Info
              </span>
              <span className="text-slate-300">➔</span>
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-500">
                2. Checkout & Payment
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Left 2 Cols */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Primary Traveler Info */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-card border border-slate-100 space-y-5">
              <div className="flex items-center gap-2 border-b pb-3">
                <User className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-bold text-primary font-sans">
                  Primary Traveler (Lead Passenger)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Title</label>
                  <select
                    value={passenger.title}
                    onChange={(e) => setPassenger({ ...passenger, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-semibold outline-none focus:border-secondary"
                  >
                    <option value="Mr">Mr.</option>
                    <option value="Mrs">Mrs.</option>
                    <option value="Ms">Ms.</option>
                    <option value="Dr">Dr.</option>
                  </select>
                </div>

                {/* First Name */}
                <div className="sm:col-span-5">
                  <label className="text-xs font-semibold text-slate-600 block mb-1">First Name (as on ID)</label>
                  <input
                    type="text"
                    required
                    value={passenger.firstName}
                    onChange={(e) => setPassenger({ ...passenger, firstName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-semibold outline-none focus:border-secondary"
                  />
                </div>

                {/* Last Name */}
                <div className="sm:col-span-5">
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Last / Family Name</label>
                  <input
                    type="text"
                    required
                    value={passenger.lastName}
                    onChange={(e) => setPassenger({ ...passenger, lastName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-semibold outline-none focus:border-secondary"
                  />
                </div>

                {/* Gender */}
                <div className="sm:col-span-4">
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Gender</label>
                  <select
                    value={passenger.gender}
                    onChange={(e) => setPassenger({ ...passenger, gender: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-semibold outline-none focus:border-secondary"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div className="sm:col-span-4">
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={passenger.dob}
                    onChange={(e) => setPassenger({ ...passenger, dob: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-semibold outline-none focus:border-secondary"
                  />
                </div>

                {/* Passport / NID */}
                <div className="sm:col-span-4">
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Passport / NID No.</label>
                  <input
                    type="text"
                    required
                    value={passenger.passportOrNid}
                    onChange={(e) => setPassenger({ ...passenger, passportOrNid: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-semibold outline-none focus:border-secondary uppercase"
                  />
                </div>

              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-card border border-slate-100 space-y-5">
              <div className="flex items-center gap-2 border-b pb-3">
                <Mail className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-bold text-primary font-sans">
                  Booking Confirmation Recipient
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Email Address (for e-Tickets)</label>
                  <input
                    type="email"
                    required
                    value={passenger.email}
                    onChange={(e) => setPassenger({ ...passenger, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-semibold outline-none focus:border-secondary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Mobile Number (SMS updates)</label>
                  <input
                    type="tel"
                    required
                    value={passenger.phone}
                    onChange={(e) => setPassenger({ ...passenger, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-semibold outline-none focus:border-secondary"
                  />
                </div>
              </div>
            </div>

            {/* Seat & Meal Preferences */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-card border border-slate-100 space-y-5">
              <h3 className="text-lg font-bold text-primary font-sans">
                Traveler Preferences
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Seat Preference</label>
                  <select
                    value={passenger.seatPreference}
                    onChange={(e) => setPassenger({ ...passenger, seatPreference: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-semibold outline-none focus:border-secondary"
                  >
                    <option value="Window">Window Seat</option>
                    <option value="Aisle">Aisle Seat</option>
                    <option value="Front Row">Front Row / Quiet Area</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Meal Selection</label>
                  <select
                    value={passenger.mealPreference}
                    onChange={(e) => setPassenger({ ...passenger, mealPreference: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-semibold outline-none focus:border-secondary"
                  >
                    <option value="Standard Halal">Standard Halal Meal</option>
                    <option value="Vegetarian">Vegetarian Delight</option>
                    <option value="Fruit Platter">Fruit Platter</option>
                    <option value="Kids Meal">Kids Meal</option>
                  </select>
                </div>
              </div>

              {/* Travel Insurance Add-on */}
              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-secondary/30 bg-secondary/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={passenger.addInsurance}
                    onChange={(e) => setPassenger({ ...passenger, addInsurance: e.target.checked })}
                    className="accent-secondary w-5 h-5 mt-0.5"
                  />
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">Add TravelEase Comprehensive Cover (+{formatPrice(8)})</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Includes simulated flight delay cover, emergency medical support, and baggage protection.
                    </p>
                  </div>
                </label>
              </div>

            </div>

          </div>

          {/* Fare Summary Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-premium border border-slate-100 space-y-6 sticky top-24">
              <h3 className="text-base font-bold text-primary font-sans border-b pb-3">
                Fare Breakdown
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-primary truncate max-w-[170px]">
                    {item.name || item.airline || item.operator}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Base Fare:</span>
                  <span className="font-bold text-primary">{formatPrice(basePrice)}</span>
                </div>
                {passenger.addInsurance && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Travel Protection:</span>
                    <span className="font-bold text-primary">{formatPrice(insuranceFee)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Taxes & Surcharges (10%):</span>
                  <span className="font-bold text-primary">{formatPrice(taxesFee)}</span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-primary">Estimated Total:</span>
                  <span className="text-2xl font-black text-secondary font-sans">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-secondary to-accent hover:from-secondary-dark hover:to-accent-dark text-white font-extrabold text-base shadow-lg shadow-secondary/25 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Continue to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Zero real financial transactions · Simulated testing</span>
              </div>
            </div>
          </div>

        </form>
      </div>

    </div>
  );
}
