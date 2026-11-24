import React, { useState } from 'react';
import { Tag, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function OfferBanner({ offer }) {
  const [copied, setCopied] = useState(false);
  const { setPromoCode } = useBooking();

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code);
    setPromoCode(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-2xl bg-gradient-to-br ${offer.color} text-white p-6 shadow-card hover:shadow-card-hover transition-all duration-300 relative overflow-hidden flex flex-col justify-between`}>
      {/* Background Decorative Rings */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
      <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-white/10 blur-lg pointer-events-none"></div>

      {/* Top Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase text-white">
            <Sparkles className="w-3 h-3 text-amber-300" />
            {offer.category}
          </span>
          <span className="text-xs text-white/80 font-medium">
            Valid until {offer.validUntil}
          </span>
        </div>

        <h3 className="text-2xl font-black tracking-tight font-sans text-white mb-1">
          {offer.discount}
        </h3>
        <h4 className="text-sm font-bold text-white/95 mb-1">
          {offer.title}
        </h4>
        <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
          {offer.description}
        </p>
      </div>

      {/* Bottom Promo Code Copy Box */}
      <div className="relative z-10 pt-4 mt-4 border-t border-white/20 flex items-center justify-between gap-3">
        <div className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/25 flex items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-amber-300" />
          <span className="font-mono text-xs font-black tracking-widest text-white">
            {offer.code}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-white/90 shadow transition-all flex items-center gap-1.5 active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-700" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
