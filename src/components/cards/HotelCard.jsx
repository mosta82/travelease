import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Wifi, Coffee, Waves, ArrowRight, ShieldCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function HotelCard({ hotel }) {
  const navigate = useNavigate();
  const { formatPrice, startBooking } = useBooking();

  const handleQuickBook = (e) => {
    e.stopPropagation();
    e.preventDefault();
    startBooking(hotel, 'hotel', { selectedRoom: hotel.roomTypes[0] });
    navigate('/booking/passenger');
  };

  return (
    <div className="group rounded-2xl bg-white shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col">
      {/* Hotel Photo */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

        {/* Badge */}
        {hotel.badge && (
          <div className="absolute top-3 left-3 bg-secondary text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
            {hotel.badge}
          </div>
        )}

        {/* Rating Pill */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{hotel.rating}</span>
          <span className="text-slate-400 font-normal">({hotel.reviewsCount})</span>
        </div>

        {/* City Tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white/95 font-medium">
          <MapPin className="w-3.5 h-3.5 text-accent" />
          <span>{hotel.city}</span>
        </div>
      </div>

      {/* Hotel Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold font-sans text-primary group-hover:text-secondary transition-colors line-clamp-1">
            {hotel.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {hotel.location}
          </p>

          {/* Amenities Pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {hotel.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-[11px] font-medium text-slate-400 px-1 py-0.5">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
          <div>
            {hotel.originalPrice && (
              <span className="text-xs text-slate-400 line-through block">
                {formatPrice(hotel.originalPrice)}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-primary">
                {formatPrice(hotel.pricePerNight)}
              </span>
              <span className="text-xs text-slate-500">/ night</span>
            </div>
            <span className="text-[10px] text-accent font-semibold block">Taxes & fees included</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/service/hotel/${hotel.id}`}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-secondary hover:bg-secondary/10 transition-colors"
            >
              View Details
            </Link>
            <button
              onClick={handleQuickBook}
              className="px-3.5 py-2 rounded-lg text-xs font-bold bg-secondary hover:bg-secondary-dark text-white shadow-sm transition-all flex items-center gap-1"
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
