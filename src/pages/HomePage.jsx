import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Clock, 
  Award, 
  SearchCheck, 
  BadgePercent, 
  Smartphone,
  Star,
  CheckCircle2,
  TrendingUp,
  MapPin
} from 'lucide-react';
import HeroSection from '../components/search/HeroSection';
import DestinationCard from '../components/cards/DestinationCard';
import HotelCard from '../components/cards/HotelCard';
import RouteCard from '../components/cards/RouteCard';
import OfferBanner from '../components/cards/OfferBanner';
import { 
  DESTINATIONS, 
  HOTELS, 
  POPULAR_ROUTES, 
  SPECIAL_OFFERS, 
  WHY_CHOOSE_US 
} from '../data/mockData';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Beach', 'Nature', 'Hills', 'City', 'International'];

  const filteredDestinations = selectedCategory === 'All' 
    ? DESTINATIONS 
    : DESTINATIONS.filter(d => d.category === selectedCategory);

  const featuredHotels = HOTELS.filter(h => h.featured);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero Section with Tabbed Search Widget */}
      <HeroSection />

      {/* 2. Special Offers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-xs tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Exclusive Member Deals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-sans">
              Limited-Time Travel Offers
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Apply these promo codes during simulated checkout to save up to 25%.
            </p>
          </div>
          <Link
            to="/flights"
            className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-secondary-dark transition-colors"
          >
            <span>Explore All Fares</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIAL_OFFERS.map((offer) => (
            <OfferBanner key={offer.id} offer={offer} />
          ))}
        </div>
      </section>

      {/* 3. Popular Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-semibold text-xs tracking-wider uppercase mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Trending Getaways</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-sans">
              Popular Destinations
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              From the pristine beaches of Cox’s Bazar to the futuristic skylines of Dubai and Bangkok.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.slice(0, 8).map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* 4. Featured Hotels Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-xs tracking-wider uppercase mb-2">
              <Star className="w-3.5 h-3.5 fill-accent" />
              <span>Handpicked Accommodations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-sans">
              Featured Luxury Resorts & Hotels
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Selected for exceptional service, scenic locations, and premium guest ratings.
            </p>
          </div>
          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-secondary-dark transition-colors"
          >
            <span>View All Hotels</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* 5. Popular Routes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-semibold text-xs tracking-wider uppercase mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Frequent Corridors</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-sans">
              Popular Travel Routes
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Daily scheduled flights, high-speed trains, and luxury sleeper coaches.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_ROUTES.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </section>

      {/* 6. Why Choose TravelEase */}
      <section className="bg-white py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-2">
              The TravelEase Advantage
            </span>
            <h2 className="text-3xl font-black text-primary font-sans">
              Why Travelers Choose TravelEase
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Combining world-class engineering, transparent pricing, and 24/7 personalized care into one unified portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_US.map((item, idx) => {
              const icons = [SearchCheck, ShieldCheck, BadgePercent, Clock];
              const Icon = icons[idx] || SearchCheck;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-surface hover:bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-card transition-all duration-300 space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold text-primary font-sans">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Mobile App / Loyalty Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-primary via-primary-light to-secondary text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-premium">
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TravelEase Rewards Club</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-sans">
              Earn 5x Loyalty Points on Every Journey
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Unlock free hotel room upgrades, priority airport lounge passes, and instant discounts across flights, trains, and coaches.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/register"
                className="px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-dark text-slate-950 font-extrabold text-sm shadow-lg shadow-accent/25 transition-all"
              >
                Join Free & Earn 1,000 Pts
              </Link>
              <Link
                to="/my-bookings"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
              >
                Track Existing Trips
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="hidden lg:block absolute right-12 bottom-0 w-80 translate-y-12 opacity-90 pointer-events-none">
            <div className="relative w-72 h-96 bg-white/10 rounded-t-3xl border-4 border-white/20 p-4 backdrop-blur-md shadow-2xl">
              <div className="w-full h-full bg-white rounded-2xl p-4 text-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs font-bold text-primary">TravelEase App</span>
                  <span className="text-[10px] bg-accent/20 text-accent-dark font-bold px-1.5 py-0.5 rounded">e-Boarding</span>
                </div>
                <div className="bg-slate-100 p-2 rounded-lg text-center">
                  <p className="text-[10px] text-slate-400">FLIGHT BG-433</p>
                  <p className="text-base font-black text-primary">DAC ➔ CXB</p>
                  <p className="text-[10px] text-emerald-600 font-bold">GATE 04 · ON TIME</p>
                </div>
                <div className="flex justify-center pt-2">
                  <div className="w-24 h-24 bg-slate-900 rounded-lg p-1.5 flex items-center justify-center text-white text-[10px] text-center font-mono">
                    [QR PASS]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
