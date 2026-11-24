import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bus, Clock, MapPin, Wifi, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function BusCard({ bus }) {
  const navigate = useNavigate();
  const { formatPrice, startBooking } = useBooking();

  const handleSelect = () => {
    startBooking(bus, 'bus');
    navigate('/booking/passenger');
  };

  return (
    <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-100 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
      
      {/* Bus Details & Times */}
      <div className="flex-1 space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-accent-dark flex items-center justify-center border border-teal-100">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-primary font-sans">
                {bus.operator}
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                {bus.coachType}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 text-xs font-bold text-amber-700">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{bus.rating}</span>
            <span className="text-slate-400 font-normal">({bus.reviewsCount})</span>
          </div>
        </div>

        {/* Schedule */}
        <div className="grid grid-cols-3 items-center text-center sm:text-left gap-2 sm:gap-4 pt-1">
          <div>
            <span className="text-xl sm:text-2xl font-black text-primary font-sans block">
              {bus.departureTime}
            </span>
            <span className="text-xs text-slate-600 font-medium block truncate">{bus.from}</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-accent" />
              {bus.duration}
            </span>
            <div className="w-full flex items-center">
              <div className="h-0.5 flex-1 bg-slate-300"></div>
              <Bus className="w-4 h-4 text-accent mx-1" />
              <div className="h-0.5 flex-1 bg-slate-300"></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1">Direct Express Highway</span>
          </div>

          <div className="text-right">
            <span className="text-xl sm:text-2xl font-black text-primary font-sans block">
              {bus.arrivalTime}
            </span>
            <span className="text-xs text-slate-600 font-medium block truncate ml-auto">{bus.to}</span>
          </div>
        </div>

        {/* Boarding Points & Features */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          {bus.features.slice(0, 3).map((feat, idx) => (
            <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
              {feat}
            </span>
          ))}
          <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold ml-auto">
            {bus.seatsAvailable} seats available
          </span>
        </div>

      </div>

      <div className="hidden md:block w-px bg-slate-100 self-stretch"></div>

      {/* Pricing & CTA */}
      <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
        <div className="text-left md:text-right">
          <span className="text-[11px] text-slate-400 font-semibold uppercase block">Seat Fare</span>
          <span className="text-2xl font-black text-primary font-sans block">
            {formatPrice(bus.startingPrice)}
          </span>
          <span className="text-[10px] text-emerald-600 font-medium">Instant AC seat selection</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/service/bus/${bus.id}`}
            className="px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-secondary hover:bg-slate-50 transition-colors"
          >
            Details
          </Link>
          <button
            onClick={handleSelect}
            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-secondary to-accent hover:from-secondary-dark hover:to-accent-dark text-white shadow-md shadow-secondary/20 transition-all flex items-center gap-1.5"
          >
            <span>Select Seats</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
