import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Calendar, Users, ArrowRightLeft, ShieldCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function BusSearchForm() {
  const navigate = useNavigate();
  const { searchParams, updateSearchParam } = useBooking();
  const bus = searchParams.bus;

  const popularRoutes = ['Dhaka', "Cox's Bazar", 'Sylhet', 'Chittagong', 'Rajshahi', 'Khulna', 'Rangpur', 'Barisal'];

  const handleSwap = () => {
    const from = bus.from;
    const to = bus.to;
    updateSearchParam('bus', 'from', to);
    updateSearchParam('bus', 'to', from);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/buses?from=${encodeURIComponent(bus.from)}&to=${encodeURIComponent(bus.to)}&date=${bus.journeyDate}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* From City */}
        <div className="md:col-span-3 bg-surface p-3 rounded-xl border border-slate-200 hover:border-secondary transition-all">
          <label className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block mb-0.5">
            Boarding From
          </label>
          <div className="flex items-center gap-2">
            <Bus className="w-4 h-4 text-secondary shrink-0" />
            <select
              value={bus.from}
              onChange={(e) => updateSearchParam('bus', 'from', e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer"
              required
            >
              {popularRoutes.map((city) => (
                <option key={city} value={city} disabled={city === bus.to}>
                  {city}
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
            Destination City
          </label>
          <div className="flex items-center gap-2">
            <Bus className="w-4 h-4 text-accent shrink-0" />
            <select
              value={bus.to}
              onChange={(e) => updateSearchParam('bus', 'to', e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer"
              required
            >
              {popularRoutes.map((city) => (
                <option key={city} value={city} disabled={city === bus.from}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Journey Date */}
        <div className="md:col-span-3 bg-surface p-3 rounded-xl border border-slate-200 hover:border-secondary transition-all">
          <label className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block mb-0.5">
            Journey Date
          </label>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-secondary shrink-0" />
            <input
              type="date"
              value={bus.journeyDate}
              onChange={(e) => updateSearchParam('bus', 'journeyDate', e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer"
              required
            />
          </div>
        </div>

        {/* Passengers */}
        <div className="md:col-span-2 bg-surface p-3 rounded-xl border border-slate-200 hover:border-secondary transition-all">
          <label className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block mb-0.5">
            Passengers
          </label>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-secondary shrink-0" />
            <select
              value={bus.passengers}
              onChange={(e) => updateSearchParam('bus', 'passengers', Number(e.target.value))}
              className="w-full bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Seat' : 'Seats'}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-2">
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span>Scania Multi-Axle, Hyundai Universe AC, and Sleeper Coaches</span>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-secondary to-accent hover:from-secondary-dark hover:to-accent-dark text-white font-bold text-base shadow-lg shadow-secondary/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <span>Search Buses</span>
          <Bus className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
