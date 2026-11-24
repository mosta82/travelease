import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Bus, Filter, ArrowUpDown, ShieldCheck, RotateCcw } from 'lucide-react';
import BusCard from '../components/cards/BusCard';
import BookingSearch from '../components/search/BookingSearch';
import { useBooking } from '../context/BookingContext';

export default function BusResultsPage() {
  const [urlParams] = useSearchParams();
  const { allBuses, formatPrice, searchParams } = useBooking();

  const [showModifySearch, setShowModifySearch] = useState(false);
  const [maxPrice, setMaxPrice] = useState(35);
  const [selectedOperators, setSelectedOperators] = useState([]);
  const [sortBy, setSortBy] = useState('price-asc');

  const fromCity = urlParams.get('from') || searchParams.bus.from || 'Dhaka';
  const toCity = urlParams.get('to') || searchParams.bus.to || "Cox's Bazar";

  const operators = useMemo(() => {
    return Array.from(new Set(allBuses.map(b => b.operator)));
  }, [allBuses]);

  const toggleOperator = (op) => {
    setSelectedOperators(prev =>
      prev.includes(op) ? prev.filter(o => o !== op) : [...prev, op]
    );
  };

  const filteredBuses = useMemo(() => {
    return allBuses
      .filter((bus) => {
        if (bus.startingPrice > maxPrice) return false;
        if (selectedOperators.length > 0 && !selectedOperators.includes(bus.operator)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
        if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [allBuses, maxPrice, selectedOperators, sortBy]);

  const resetFilters = () => {
    setMaxPrice(35);
    setSelectedOperators([]);
    setSortBy('price-asc');
  };

  return (
    <div className="min-h-screen bg-surface pb-20">
      
      {/* Header */}
      <div className="bg-primary text-white py-6 border-b border-primary-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium mb-1">
                <Link to="/" className="hover:underline">Home</Link>
                <span>/</span>
                <span className="text-accent">Bus Coaches</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-sans flex items-center gap-2">
                <span>{fromCity}</span>
                <span className="text-accent">➔</span>
                <span>{toCity}</span>
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Date: {searchParams.bus.journeyDate} · {searchParams.bus.passengers} Passenger(s) · AC Express
              </p>
            </div>

            <button
              onClick={() => setShowModifySearch(!showModifySearch)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all self-start md:self-auto"
            >
              {showModifySearch ? 'Close Search Panel' : 'Modify Search'}
            </button>
          </div>

          {showModifySearch && (
            <div className="mt-6 pt-6 border-t border-primary-light/30">
              <BookingSearch defaultTab="buses" />
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 space-y-6">
              
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2 font-bold text-primary text-base">
                  <Filter className="w-4 h-4 text-secondary" />
                  <span>Filters</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs text-secondary hover:underline font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                  <span>Max Fare</span>
                  <span className="text-secondary font-bold text-sm">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="35"
                  step="2"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-secondary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>{formatPrice(10)}</span>
                  <span>{formatPrice(35)}</span>
                </div>
              </div>

              {/* Operators Filter */}
              <div className="border-t pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Bus Operators
                </h4>
                <div className="space-y-2">
                  {operators.map((op) => (
                    <label key={op} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedOperators.includes(op)}
                        onChange={() => toggleOperator(op)}
                        className="rounded accent-secondary"
                      />
                      <span>{op}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Trust Badge */}
              <div className="border-t pt-4 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Real-time GPS Tracking & Verified Boarding Counters</span>
              </div>

            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl px-5 py-3 shadow-card border border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm font-semibold text-slate-600">
                <strong className="text-primary">{filteredBuses.length}</strong> Coaches Available
              </span>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-bold text-primary outline-none"
                >
                  <option value="price-asc">Fare: Low to High</option>
                  <option value="price-desc">Fare: High to Low</option>
                  <option value="rating">Operator Rating</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredBuses.map((bus) => (
                <BusCard key={bus.id} bus={bus} />
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
