import React from 'react';
import { ShieldCheck, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import BookingSearch from './BookingSearch';

export default function HeroSection() {
  return (
    <section className="relative pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden bg-primary">
      {/* Background Hero Image with Deep Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
          alt="Tropical ocean panorama"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse duration-[10000ms]"
        />
        {/* Multi-layered Dark Gradient for maximum text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary"></div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-primary/60 to-primary opacity-80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent font-semibold text-xs tracking-wider uppercase mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>One Platform. Every Journey.</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 drop-shadow-sm font-sans">
            Explore the World, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-300 to-white">Your Way.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto">
            Discover, compare and book flights, hotels, express buses, and trains with guaranteed best prices and zero booking friction.
          </p>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              Verified Operators
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              4.9/5 Average Rating
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent" />
              Simulated Instant Ticket Issuance
            </span>
          </div>
        </div>

        {/* Multi-Service Booking Search Widget */}
        <div className="max-w-5xl mx-auto">
          <BookingSearch defaultTab="flights" />
        </div>

      </div>

      {/* Decorative Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-surface transform translate-y-px" style={{ clipPath: 'ellipse(60% 100% at 50% 100%)' }}></div>
    </section>
  );
}
