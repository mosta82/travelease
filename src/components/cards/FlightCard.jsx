import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, Clock, Luggage, ShieldCheck, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function FlightCard({ flight }) {
  const navigate = useNavigate();
  const { formatPrice, startBooking } = useBooking();

  const handleSelect = () => {
    startBooking(flight, 'flight');
    navigate('/booking/passenger');
  };

  return (
    <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-100 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
      
      {/* Airline Info & Times */}
      <div className="flex-1 space-y-4">
        
        {/* Airline Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl font-bold border border-slate-200">
              {flight.airlineLogo || '✈️'}
            </div>
            <div>
              <h4 className="text-base font-bold text-primary font-sans">
                {flight.airline}
              </h4>
              <p className="text-xs text-slate-400">
                Flight {flight.flightNumber} · {flight.aircraft}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {flight.refundable ? (
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Refundable
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                Non-Refundable
              </span>
            )}
            <span className="text-xs font-bold text-primary bg-slate-100 px-2 py-0.5 rounded-md">
              {flight.cabinClass}
            </span>
          </div>
        </div>

        {/* Flight Time Schedule Graphic */}
        <div className="grid grid-cols-3 items-center text-center sm:text-left gap-2 sm:gap-4 pt-2">
          
          {/* Departure */}
          <div>
            <span className="text-xl sm:text-2xl font-black text-primary font-sans block">
              {flight.departureTime}
            </span>
            <span className="text-xs font-bold text-slate-700">{flight.fromCode}</span>
            <p className="text-[11px] text-slate-400 truncate max-w-[130px]">{flight.from}</p>
          </div>

          {/* Graphic Middle */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-secondary" />
              {flight.duration}
            </span>
            <div className="w-full flex items-center">
              <div className="h-0.5 flex-1 bg-slate-300"></div>
              <Plane className="w-4 h-4 text-secondary mx-1 rotate-90" />
              <div className="h-0.5 flex-1 bg-slate-300"></div>
            </div>
            <span className="text-[10px] font-semibold text-emerald-600 mt-1">
              {flight.stopText}
            </span>
          </div>

          {/* Arrival */}
          <div className="text-right">
            <span className="text-xl sm:text-2xl font-black text-primary font-sans block">
              {flight.arrivalTime}
            </span>
            <span className="text-xs font-bold text-slate-700">{flight.toCode}</span>
            <p className="text-[11px] text-slate-400 truncate max-w-[130px] ml-auto">{flight.to}</p>
          </div>

        </div>

        {/* Perks / Baggage */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5">
            <Luggage className="w-3.5 h-3.5 text-secondary" />
            {flight.baggage}
          </span>
          {flight.mealsIncluded && (
            <span className="flex items-center gap-1.5">
              <span>🍽️</span>
              Complimentary Meal Included
            </span>
          )}
          <span className="text-amber-600 font-medium">
            🔥 Only {flight.seatsLeft} seats left at this fare
          </span>
        </div>

      </div>

      {/* Divider on MD */}
      <div className="hidden md:block w-px bg-slate-100 self-stretch"></div>

      {/* Price & Selection CTA */}
      <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
        <div className="text-left md:text-right">
          <span className="text-[11px] text-slate-400 font-semibold uppercase block">Per Passenger</span>
          <span className="text-2xl font-black text-primary font-sans block">
            {formatPrice(flight.price)}
          </span>
          <span className="text-[10px] text-emerald-600 font-medium">Includes taxes & surcharges</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/service/flight/${flight.id}`}
            className="px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-secondary hover:bg-slate-50 transition-colors"
          >
            Details
          </Link>
          <button
            onClick={handleSelect}
            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-secondary to-accent hover:from-secondary-dark hover:to-accent-dark text-white shadow-md shadow-secondary/20 transition-all flex items-center gap-1.5"
          >
            <span>Book Flight</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
