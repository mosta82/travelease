import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Calendar, Users, BedDouble, ShieldCheck, ChevronDown } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function HotelSearchForm() {
  const navigate = useNavigate();
  const { searchParams, updateSearchParam } = useBooking();
  const hotel = searchParams.hotel;
  const [guestDropdown, setGuestDropdown] = useState(false);

  const popularDestinations = ["Cox's Bazar", 'Sylhet', 'Sajek Valley', 'Dhaka', 'Bangkok', 'Dubai', 'Singapore', 'Bali'];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/hotels?destination=${encodeURIComponent(hotel.destination)}&checkIn=${hotel.checkIn}&checkOut=${hotel.checkOut}&guests=${hotel.guests}&rooms=${hotel.rooms}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* Destination City / Hotel */}
        <div className="md:col-span-4 bg-surface p-3 rounded-xl border border-slate-200 hover:border-secondary transition-all">
          <label className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block mb-0.5">
            City or Destination
          </label>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-secondary shrink-0" />
            <select
              value={hotel.destination}
              onChange={(e) => updateSearchParam('hotel', 'destination', e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer"
              required
            >
              {popularDestinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Check-In Date */}
        <div className="md:col-span-3 bg-surface p-3 rounded-xl border border-slate-200 hover:border-secondary transition-all">
          <label className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block mb-0.5">
            Check-in Date
          </label>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-secondary shrink-0" />
            <input
              type="date"
              value={hotel.checkIn}
              onChange={(e) => updateSearchParam('hotel', 'checkIn', e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer"
              required
            />
          </div>
        </div>

        {/* Check-Out Date */}
        <div className="md:col-span-3 bg-surface p-3 rounded-xl border border-slate-200 hover:border-secondary transition-all">
          <label className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block mb-0.5">
            Check-out Date
          </label>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent shrink-0" />
            <input
              type="date"
              value={hotel.checkOut}
              onChange={(e) => updateSearchParam('hotel', 'checkOut', e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer"
              required
            />
          </div>
        </div>

        {/* Rooms & Guests */}
        <div className="md:col-span-2 relative">
          <div
            onClick={() => setGuestDropdown(!guestDropdown)}
            className="bg-surface p-3 rounded-xl border border-slate-200 hover:border-secondary transition-all cursor-pointer"
          >
            <label className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block mb-0.5">
              Rooms & Guests
            </label>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <BedDouble className="w-4 h-4 text-secondary shrink-0" />
                <span className="text-xs font-semibold text-primary truncate">
                  {hotel.rooms}R · {hotel.guests}G
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>
          </div>

          {/* Rooms and Guests popover */}
          {guestDropdown && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-premium p-4 border border-slate-100 z-50 animate-in fade-in space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-primary">Rooms</p>
                  <p className="text-xs text-slate-400">Total bedrooms</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateSearchParam('hotel', 'rooms', Math.max(1, hotel.rooms - 1))}
                    className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="w-5 text-center font-bold text-primary">{hotel.rooms}</span>
                  <button
                    type="button"
                    onClick={() => updateSearchParam('hotel', 'rooms', Math.min(5, hotel.rooms + 1))}
                    className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-primary">Guests</p>
                  <p className="text-xs text-slate-400">Adults & children</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateSearchParam('hotel', 'guests', Math.max(1, hotel.guests - 1))}
                    className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="w-5 text-center font-bold text-primary">{hotel.guests}</span>
                  <button
                    type="button"
                    onClick={() => updateSearchParam('hotel', 'guests', Math.min(10, hotel.guests + 1))}
                    className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setGuestDropdown(false)}
                className="w-full mt-2 py-1.5 text-xs font-semibold rounded-lg bg-secondary text-white hover:bg-secondary-dark transition-colors"
              >
                Apply
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-2">
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span>Pay at Hotel available · Free cancellation on select luxury stays</span>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-secondary to-accent hover:from-secondary-dark hover:to-accent-dark text-white font-bold text-base shadow-lg shadow-secondary/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <span>Search Hotels & Resorts</span>
          <Building2 className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
