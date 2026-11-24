import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Train, Clock, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function TrainCard({ train }) {
  const navigate = useNavigate();
  const { formatPrice, startBooking } = useBooking();
  const [selectedClass, setSelectedClass] = useState(train.classes[0]);

  const handleBook = () => {
    startBooking(train, 'train', { selectedClass });
    navigate('/booking/passenger');
  };

  return (
    <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-100 p-5 sm:p-6 space-y-5">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
            <Train className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-primary font-sans">
                {train.name}
              </h4>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-bold">
                {train.trainNumber}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Intercity Express Train · Priority Track
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
          <span>Stops: {train.stops?.length || 3} stations</span>
          <span className="text-accent font-bold">★ {train.rating}</span>
        </div>
      </div>

      {/* Timing Schedule */}
      <div className="grid grid-cols-3 items-center text-center sm:text-left gap-2 sm:gap-4 bg-slate-50 p-4 rounded-xl">
        <div>
          <span className="text-xl sm:text-2xl font-black text-primary font-sans block">
            {train.departureTime}
          </span>
          <span className="text-xs text-slate-600 font-medium block truncate">{train.from}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-600" />
            {train.duration}
          </span>
          <div className="w-full flex items-center">
            <div className="h-0.5 flex-1 bg-slate-300"></div>
            <Train className="w-4 h-4 text-amber-600 mx-1" />
            <div className="h-0.5 flex-1 bg-slate-300"></div>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1">On-Time Regularity 98%</span>
        </div>

        <div className="text-right">
          <span className="text-xl sm:text-2xl font-black text-primary font-sans block">
            {train.arrivalTime}
          </span>
          <span className="text-xs text-slate-600 font-medium block truncate ml-auto">{train.to}</span>
        </div>
      </div>

      {/* Class Selection Options */}
      <div>
        <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
          Select Travel Class:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {train.classes.map((cls, idx) => {
            const isSelected = selectedClass.type === cls.type;
            return (
              <div
                key={idx}
                onClick={() => setSelectedClass(cls)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-secondary bg-secondary/5 ring-2 ring-secondary/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-primary">{cls.type}</span>
                  {isSelected && <Check className="w-4 h-4 text-secondary stroke-[2.5]" />}
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-base font-extrabold text-secondary">
                    {formatPrice(cls.fare)}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600">
                    {cls.availableSeats} available
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs text-slate-500">
          Selected: <strong className="text-primary">{selectedClass.type}</strong> ({formatPrice(selectedClass.fare)})
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/service/train/${train.id}`}
            className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-secondary"
          >
            Train Schedule
          </Link>
          <button
            onClick={handleBook}
            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-secondary to-accent hover:from-secondary-dark hover:to-accent-dark text-white shadow-md shadow-secondary/20 transition-all flex items-center gap-1.5"
          >
            <span>Book Seat</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
