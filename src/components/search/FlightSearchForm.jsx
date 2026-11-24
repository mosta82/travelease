import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Calendar, Users, ArrowRightLeft, ShieldCheck, ChevronDown } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function FlightSearchForm() {
  const navigate = useNavigate();
  const { searchParams, updateSearchParam } = useBooking();
  const flight = searchParams.flight;

  const [tripType, setTripType] = useState(flight.tripType || 'oneWay');
  const [passengerDropdown, setPassengerDropdown] = useState(false);

  const popularCities = ['Dhaka', "Cox's Bazar", 'Sylhet', 'Chittagong', 'Bangkok', 'Dubai', 'Singapore'];

  const handleSwap = () => {
    const currentFrom = flight.from;
    const currentTo = flight.to;
    updateSearchParam('flight', 'from', currentTo);
    updateSearchParam('flight', 'to', currentFrom);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSearchParam('flight', 'tripType', tripType);
    navigate(`/flights?from=${encodeURIComponent(flight.from)}&to=${encodeURIComponent(flight.to)}&date=${flight.departureDate}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Trip Type & Class selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm pb-2 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
            <input
              type="radio"
              name="tripType"
              value="oneWay"
              checked={tripType === 'oneWay'}
              onChange={() => setTripType('oneWay')}
              className="accent-secondary"
            />
            <span>One Way</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
            <input
              type="radio"
              name="tripType"
              value="roundTrip"
              checked={tripType === 'roundTrip'}
              onChange={() => setTripType('roundTrip')}
              className="accent-secondary"
            />
            <span>Round Trip</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={flight.travelClass}
            onChange={(e) => updateSearchParam('flight', 'travelClass', e.target.value)}
            className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-secondary"
          >
            <option value="Economy">Economy</option>
            <option value="Premium Economy">Premium Economy</option>
            <option value="Business">Business Class</option>
            <option value="First Class">First Class</option>
          </select>
        </div>
      </div>

      {/* Main Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* From City */}
        <div className="md:col-span-3 bg-surface p-3 rounded-xl border border-slate-200 hover:border-secondary transition-all">
          <label className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block mb-0.5">
            Flying From
          </label>
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-secondary shrink-0" />
            <select
              value={flight.from}
              onChange={(e) => updateSearchParam('flight', 'from', e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer"
              required
            >
              {popularCities.map((city) => (
                <option key={city} value={city} disabled={city === flight.to}>
                  {city} (DAC/Air)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex justify-center -my-2 md:my-0">
          <button
            type="button"
            onClick={handleSwap}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-secondary hover:border-secondary hover:shadow-sm flex items-center justify-center transition-all z-10"
            title="Swap Origin and Destination"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* To City */}
        <div className="md:col-span-3 bg-surface p-3 rounded-xl border border-slate-200 hover:border-secondary transition-all">
          <label className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block mb-0.5">
            Flying To
          </label>
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-accent rotate-90 shrink-0" />
            <select
              value={flight.to}
              onChange={(e) => updateSearchParam('flight', 'to', e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer"
              required
            >
              {popularCities.map((city) => (
                <option key={city} value={city} disabled={city === flight.from}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className={`${tripType === 'roundTrip' ? 'md:col-span-3' : 'md:col-span-3'} bg-surface p-3 rounded-xl border border-slate-200 hover:border-secondary transition-all`}>
          <label className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block mb-0.5">
            {tripType === 'roundTrip' ? 'Departure & Return' : 'Departure Date'}
          </label>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-secondary shrink-0" />
            <input
              type="date"
              value={flight.departureDate}
              onChange={(e) => updateSearchParam('flight', 'departureDate', e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer"
              required
            />
            {tripType === 'roundTrip' && (
              <input
                type="date"
                value={flight.returnDate}
                onChange={(e) => updateSearchParam('flight', 'returnDate', e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer border-l border-slate-300 pl-2"
                required
              />
            )}
          </div>
        </div>

        {/* Passengers Dropdown */}
        <div className="md:col-span-2 relative">
          <div 
            onClick={() => setPassengerDropdown(!passengerDropdown)}
            className="bg-surface p-3 rounded-xl border border-slate-200 hover:border-secondary transition-all cursor-pointer"
          >
            <label className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block mb-0.5">
              Passengers
            </label>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-secondary shrink-0" />
                <span className="text-sm font-semibold text-primary">
                  {flight.passengers} {flight.passengers === 1 ? 'Adult' : 'Travelers'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Passenger count selector popover */}
          {passengerDropdown && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-premium p-4 border border-slate-100 z-50 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-primary">Travelers</p>
                  <p className="text-xs text-slate-400">Age 12+ years</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateSearchParam('flight', 'passengers', Math.max(1, flight.passengers - 1))}
                    className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="w-5 text-center font-bold text-primary">{flight.passengers}</span>
                  <button
                    type="button"
                    onClick={() => updateSearchParam('flight', 'passengers', Math.min(9, flight.passengers + 1))}
                    className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPassengerDropdown(false)}
                className="w-full mt-3 py-1.5 text-xs font-semibold rounded-lg bg-secondary text-white hover:bg-secondary-dark transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-2">
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span>Instant e-ticket generation · Official airline partner rates</span>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-secondary to-accent hover:from-secondary-dark hover:to-accent-dark text-white font-bold text-base shadow-lg shadow-secondary/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <span>Search Flights</span>
          <Plane className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
