import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function DestinationCard({ destination }) {
  const { formatPrice } = useBooking();

  return (
    <Link
      to={`/hotels?destination=${encodeURIComponent(destination.name)}`}
      className="group relative rounded-2xl overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col cursor-pointer border border-slate-100"
    >
      {/* Destination Image with Zoom on Hover */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        {/* Subtle Dark Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-primary shadow-sm uppercase tracking-wider">
          {destination.category}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-primary/80 backdrop-blur-md px-2 py-0.5 rounded-lg text-xs font-bold text-amber-300 flex items-center gap-1">
          <span>★</span>
          <span>{destination.rating}</span>
        </div>

        {/* Bottom Destination Title & Country */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1 text-xs text-slate-300 font-medium">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span>{destination.country}</span>
          </div>
          <h3 className="text-xl font-bold font-sans text-white group-hover:text-cyan-300 transition-colors">
            {destination.name}
          </h3>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div className="space-y-1.5">
          <p className="text-xs text-slate-500 font-medium line-clamp-1">
            {destination.popularFor}
          </p>
          <p className="text-[11px] text-slate-400 font-medium">
            {destination.servicesCount}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">From</span>
            <span className="text-lg font-extrabold text-secondary">
              {formatPrice(destination.startingPrice)}
            </span>
          </div>

          <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-secondary group-hover:text-white text-slate-600 flex items-center justify-center transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
