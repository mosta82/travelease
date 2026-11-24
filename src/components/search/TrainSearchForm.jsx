import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Train, Calendar, ShieldCheck, ArrowRightLeft } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function TrainSearchForm() {
  const navigate = useNavigate();
  const { searchParams, updateSearchParam } = useBooking();
  const train = searchParams.train;

  const stations = [
    'Dhaka (Kamalapur)',
    'Dhaka (Biman Bandar)',
    "Cox's Bazar",
    'Chattogram',
    'Sylhet',
    'Rajshahi',
    'Mymensingh',
    'Khulna'
  ];

  const handleSwap = () => {
    const from = train.fromStation;
    const to = train.toStation;
    updateSearchParam('train', 'fromStation', to);
    updateSearchParam('train', 'toStation', from);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/trains?from=${encodeURIComponent(train.fromStation)}&to=${encodeURIComponent(train.toStation)}&date=${train.journeyDate}&class=${encodeURIComponent(train.travelClass)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* From Station */}
        <div className="md:col-span-3 bg-surface p-3 rounded-xl border border-slate-200 hover:border-secondary transition-all">
          <label className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block mb-0.5">
            From Station
          </label>
          <div className="flex items-center gap-2">
            <Train className="w-4 h-4 text-secondary shrink-0" />
            <select
              value={train.fromStation}
              onChange={(e) => updateSearchParam('train', 'fromStation', e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer"
              required
            >
              {stations.map((st) => (
                <option key={st} value={st} disabled={st === train.toStation}>
                  {st}
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

        {/* To Station */}
        <div className="md:col-span-3 bg-surface p-3 rounded-xl border border-slate-200 hover:border-secondary transition-all">
          <label className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block mb-0.5">
            To Station
          </label>
          <div className="flex items-center gap-2">
            <Train className="w-4 h-4 text-accent shrink-0" />
            <select
              value={train.toStation}
              onChange={(e) => updateSearchParam('train', 'toStation', e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer"
              required
            >
              {stations.map((st) => (
                <option key={st} value={st} disabled={st === train.fromStation}>
                  {st}
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
              value={train.journeyDate}
              onChange={(e) => updateSearchParam('train', 'journeyDate', e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer"
              required
            />
          </div>
        </div>

        {/* Travel Class */}
        <div className="md:col-span-2 bg-surface p-3 rounded-xl border border-slate-200 hover:border-secondary transition-all">
          <label className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block mb-0.5">
            Class
          </label>
          <select
            value={train.travelClass}
            onChange={(e) => updateSearchParam('train', 'travelClass', e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer pt-1"
          >
            <option value="Snigdha (AC Chair)">Snigdha (AC Chair)</option>
            <option value="Shovon Chair">Shovon Chair</option>
            <option value="AC Berth (Sleeper)">AC Berth (Sleeper)</option>
            <option value="AC First Class Cabin">AC First Class</option>
          </select>
        </div>

      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-2">
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span>Real-time Intercity seats · Direct Cox's Bazar Express & Suborna Express</span>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-secondary to-accent hover:from-secondary-dark hover:to-accent-dark text-white font-bold text-base shadow-lg shadow-secondary/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <span>Search Trains</span>
          <Train className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
