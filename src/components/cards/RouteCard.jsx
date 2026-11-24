import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Train, Bus, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function RouteCard({ route }) {
  const { formatPrice } = useBooking();

  const getIcon = () => {
    switch (route.serviceType) {
      case 'flight':
        return <Plane className="w-4 h-4 text-secondary" />;
      case 'train':
        return <Train className="w-4 h-4 text-amber-600" />;
      case 'bus':
        return <Bus className="w-4 h-4 text-accent" />;
      default:
        return <Plane className="w-4 h-4 text-secondary" />;
    }
  };

  const getTargetLink = () => {
    switch (route.serviceType) {
      case 'flight':
        return `/flights?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`;
      case 'train':
        return `/trains?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`;
      case 'bus':
        return `/buses?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`;
      default:
        return '/';
    }
  };

  return (
    <Link
      to={getTargetLink()}
      className="group bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-100 flex flex-col justify-between hover:-translate-y-0.5"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-secondary/10 transition-colors">
              {getIcon()}
            </div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {route.serviceLabel}
            </span>
          </div>

          {route.badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/15 text-accent-dark">
              {route.badge}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <h4 className="text-base font-bold text-primary group-hover:text-secondary transition-colors font-sans flex items-center gap-2">
            <span>{route.from}</span>
            <span className="text-slate-400">→</span>
            <span>{route.to}</span>
          </h4>
          <p className="text-xs text-slate-400">
            {route.frequency} · Duration: {route.time}
          </p>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Fares starting</span>
          <span className="text-lg font-extrabold text-secondary">
            {formatPrice(route.startingPrice)}
          </span>
        </div>

        <span className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-secondary group-hover:text-white text-slate-400 flex items-center justify-center transition-colors">
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
