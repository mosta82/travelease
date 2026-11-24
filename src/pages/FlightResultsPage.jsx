import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Plane, Filter, SlidersHorizontal, ArrowUpDown, ShieldCheck, RotateCcw } from 'lucide-react';
import FlightCard from '../components/cards/FlightCard';
import BookingSearch from '../components/search/BookingSearch';
import { useBooking } from '../context/BookingContext';

export default function FlightResultsPage() {
  const [urlParams] = useSearchParams();
  const { allFlights, formatPrice, searchParams } = useBooking();

  const [showModifySearch, setShowModifySearch] = useState(false);
  const [maxPrice, setMaxPrice] = useState(600);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [onlyRefundable, setOnlyRefundable] = useState(false);
  const [sortBy, setSortBy] = useState('price-asc');

  const fromCity = urlParams.get('from') || searchParams.flight.from || 'Dhaka';
  const toCity = urlParams.get('to') || searchParams.flight.to || "Cox's Bazar";

  // Distinct airlines for filter
  const airlines = useMemo(() => {
    return Array.from(new Set(allFlights.map(f => f.airline)));
  }, [allFlights]);

  const toggleAirline = (airline) => {
    setSelectedAirlines(prev => 
      prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]
    );
  };

  const filteredFlights = useMemo(() => {
    return allFlights
      .filter((flight) => {
        // Price filter
        if (flight.price > maxPrice) return false;
        // Airline filter
        if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline)) return false;
        // Refundable filter
        if (onlyRefundable && !flight.refundable) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [allFlights, maxPrice, selectedAirlines, onlyRefundable, sortBy]);

  const resetFilters = () => {
    setMaxPrice(600);
    setSelectedAirlines([]);
    setOnlyRefundable(false);
    setSortBy('price-asc');
  };

  return (
    <div className="min-h-screen bg-surface pb-20">
      
      {/* Top Search Bar Summary */}
      <div className="bg-primary text-white py-6 border-b border-primary-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium mb-1">
                <Link to="/" className="hover:underline">Home</Link>
                <span>/</span>
                <span className="text-accent">Flight Search</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-sans flex items-center gap-2">
                <span>{fromCity}</span>
                <span className="text-accent">➔</span>
                <span>{toCity}</span>
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Showing live fares · {searchParams.flight.travelClass} Class · {searchParams.flight.passengers} Traveler(s)
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
              <BookingSearch defaultTab="flights" />
            </div>
          )}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Filters Sidebar */}
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
                  min="40"
                  max="600"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-secondary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>{formatPrice(40)}</span>
                  <span>{formatPrice(600)}</span>
                </div>
              </div>

              {/* Airlines Checkboxes */}
              <div className="border-t pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Airlines
                </h4>
                <div className="space-y-2">
                  {airlines.map((airline) => (
                    <label key={airline} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAirlines.includes(airline)}
                        onChange={() => toggleAirline(airline)}
                        className="rounded accent-secondary"
                      />
                      <span>{airline}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Refundable Toggle */}
              <div className="border-t pt-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-slate-700">Refundable Only</span>
                  <input
                    type="checkbox"
                    checked={onlyRefundable}
                    onChange={(e) => setOnlyRefundable(e.target.checked)}
                    className="accent-secondary w-4 h-4"
                  />
                </label>
              </div>

              {/* Trust Badge */}
              <div className="border-t pt-4 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Simulated airline seats with instant e-ticket issuing</span>
              </div>

            </div>
          </div>

          {/* Right Results Column */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Sorting & Result Counts Bar */}
            <div className="bg-white rounded-2xl px-5 py-3 shadow-card border border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm font-semibold text-slate-600">
                <strong className="text-primary">{filteredFlights.length}</strong> Flights Available
              </span>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-bold text-primary outline-none"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated Airline</option>
                </select>
              </div>
            </div>

            {/* Flights List */}
            {filteredFlights.length > 0 ? (
              <div className="space-y-4">
                {filteredFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-card border border-slate-100 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                  ✈️
                </div>
                <h3 className="text-lg font-bold text-primary">No Flights Match Your Criteria</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting the maximum price slider or clear airline filters to discover more available flight schedules.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl bg-secondary text-white text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
