import React, { useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';

export default function SimulationBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-primary-dark/95 text-xs text-slate-200 py-1.5 px-4 border-b border-primary-light/30 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-accent/20 text-accent font-semibold text-[10px] uppercase tracking-wider">
            Prototype Demo
          </span>
          <p className="hidden sm:inline">
            All tickets, hotels, routes, and checkout payments on TravelEase are fully simulated interactive demonstrations.
          </p>
          <p className="sm:hidden">
            TravelEase Demo · Simulated prototype.
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-slate-400 hover:text-white transition-colors p-0.5"
          title="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
