import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Building2, Filter, ArrowUpDown, Star, ShieldCheck, RotateCcw } from 'lucide-react';
import HotelCard from '../components/cards/HotelCard';
import BookingSearch from '../components/search/BookingSearch';
import { useBooking } from '../context/BookingContext';

export default function HotelResultsPage() {
  const [urlParams] = useSearchParams();
  const { allHotels, formatPrice, searchParams } = useBooking();

  const [showModifySearch, setShowModifySearch] = useState(false);
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular');

  const destination = urlParams.get('destination') || urlParams.get('city') || searchParams.hotel.destination || "Cox's Bazar";

  const filteredHotels = useMemo(() => {
    return allHotels
      .filter((hotel) => {
        if (hotel.pricePerNight > maxPrice) return false;
        if (selectedRating > 0 && hotel.rating < selectedRating) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
        if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [allHotels, maxPrice, selectedRating, sortBy]);

  const resetFilters = () => {
    setMaxPrice(500);
    setSelectedRating(0);
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen bg-surface pb-20">
      
      {/* Search Header */}
      <div className="bg-primary text-white py-6 border-b border-primary-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium mb-1">
                <Link to="/" className="hover:underline">Home</Link>
                <span>/</span>
                <span className="text-accent">Hotels & Resorts</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-sans flex items-center gap-2">
                <span>Hotels in {destination}</span>
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                {searchParams.hotel.checkIn} to {searchParams.hotel.checkOut} · {searchParams.hotel.rooms} Room(s) · {searchParams.hotel.guests} Guest(s)
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
              <BookingSearch defaultTab="hotels" />
            </div>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
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

              {/* Price Per Night */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                  <span>Price per night</span>
                  <span className="text-secondary font-bold text-sm">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="500"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-secondary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>{formatPrice(60)}</span>
                  <span>{formatPrice(500)}</span>
                </div>
              </div>

              {/* Guest Rating Filter */}
              <div className="border-t pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Minimum Rating
                </h4>
                <div className="space-y-2">
                  {[
                    { label: 'Any Rating', min: 0 },
                    { label: '4.8 & above (Exceptional)', min: 4.8 },
                    { label: '4.6 & above (Wonderful)', min: 4.6 },
                    { label: '4.0 & above (Very Good)', min: 4.0 },
                  ].map((r) => (
                    <label key={r.min} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === r.min}
                        onChange={() => setSelectedRating(r.min)}
                        className="accent-secondary"
                      />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Free Cancellation Badge */}
              <div className="border-t pt-4 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Pay at hotel options available on select partner suites</span>
              </div>

            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl px-5 py-3 shadow-card border border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm font-semibold text-slate-600">
                <strong className="text-primary">{filteredHotels.length}</strong> Properties Found
              </span>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-bold text-primary outline-none"
                >
                  <option value="popular">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Guest Rating</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
