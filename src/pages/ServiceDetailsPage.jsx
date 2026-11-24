import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Clock, 
  Luggage, 
  Wifi, 
  Coffee, 
  Share2, 
  Heart, 
  Check, 
  ArrowRight,
  Plane,
  Building2,
  Bus,
  Train
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function ServiceDetailsPage() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { allHotels, allFlights, allBuses, allTrains, formatPrice, startBooking } = useBooking();

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedSeatPreference, setSelectedSeatPreference] = useState('Window');

  // Find item by type and id
  let item = null;
  if (type === 'hotel') item = allHotels.find(h => h.id === id) || allHotels[0];
  else if (type === 'flight') item = allFlights.find(f => f.id === id) || allFlights[0];
  else if (type === 'bus') item = allBuses.find(b => b.id === id) || allBuses[0];
  else if (type === 'train') item = allTrains.find(t => t.id === id) || allTrains[0];

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Service Not Found</h2>
        <Link to="/" className="text-secondary font-bold hover:underline">
          Return to Homepage
        </Link>
      </div>
    );
  }

  const handleBookNow = () => {
    startBooking(item, type, {
      selectedRoom: selectedRoom || (item.roomTypes ? item.roomTypes[0] : null),
      seatPreference: selectedSeatPreference
    });
    navigate('/booking/passenger');
  };

  return (
    <div className="min-h-screen bg-surface pb-24">
      
      {/* Top Breadcrumb & Title Bar */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Results</span>
          </button>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-red-500 hover:bg-slate-50 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-secondary hover:bg-slate-50 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Details (Left 2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Title */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-secondary/15 text-secondary uppercase tracking-wider">
                  {type.toUpperCase()}
                </span>
                {item.rating && (
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                    <span className="text-slate-400 font-normal">({item.reviewsCount || 450} verified reviews)</span>
                  </div>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-primary font-sans">
                {item.name || item.airline || item.operator}
              </h1>

              <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span>{item.location || `${item.from} → ${item.to}`}</span>
              </div>
            </div>

            {/* Gallery (for Hotels or Hero Image) */}
            {type === 'hotel' && item.gallery && (
              <div className="space-y-3">
                <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden shadow-card border border-slate-100">
                  <img
                    src={item.gallery[activePhotoIndex]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {item.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activePhotoIndex === idx ? 'border-secondary scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Overview / Description */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 space-y-4">
              <h3 className="text-lg font-bold text-primary font-sans">Overview & Experience</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description || `Enjoy unmatched comfort and seamless travel with ${item.name || item.airline || item.operator}. Featuring premium service, verified schedules, and certified on-time performance.`}
              </p>

              {/* Amenities / Key Features */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Key Amenities & Inclusions
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(item.amenities || item.features || ['Wi-Fi', 'Air Conditioning', 'Sanitized Interior', 'Luggage Assistance']).map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-accent/15 text-accent-dark flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hotel Room Options (If Hotel) */}
            {type === 'hotel' && item.roomTypes && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary font-sans">Available Suites & Rooms</h3>
                <div className="space-y-4">
                  {item.roomTypes.map((room) => {
                    const isSelected = (selectedRoom?.id === room.id) || (!selectedRoom && room.id === item.roomTypes[0].id);
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`bg-white rounded-2xl p-5 border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isSelected
                            ? 'border-secondary ring-2 ring-secondary/20 shadow-md'
                            : 'border-slate-200 hover:border-slate-300 shadow-card'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-primary font-sans">{room.name}</h4>
                            {isSelected && (
                              <span className="text-[10px] font-bold bg-secondary text-white px-2 py-0.5 rounded-full">
                                Selected
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500">
                            {room.bed} · {room.capacity} · {room.size}
                          </p>
                          <span className="inline-block text-[11px] text-emerald-600 font-medium">
                            Free Breakfast Included · Free Cancellation
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-2xl font-black text-primary font-sans block">
                            {formatPrice(room.price)}
                          </span>
                          <span className="text-[11px] text-slate-400">/ night</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Travel Policies */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 space-y-3">
              <h3 className="text-base font-bold text-primary font-sans">Booking Terms & Policies</h3>
              <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
                <li>Instant simulated confirmation with PNR generation and e-ticket voucher.</li>
                <li>Free cancellation up to 24 hours prior to scheduled departure.</li>
                <li>Valid government-issued Photo ID or Passport required at check-in / boarding.</li>
                <li>This is an interactive simulation prototype for demonstration purposes.</li>
              </ul>
            </div>

          </div>

          {/* Booking Summary Sidebar (Right Col) */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-premium border border-slate-100 space-y-6 sticky top-24">
              
              <div className="border-b pb-4">
                <span className="text-xs text-slate-400 font-semibold uppercase block">Total Price</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-primary font-sans">
                    {formatPrice(
                      type === 'hotel' 
                        ? (selectedRoom ? selectedRoom.price : item.pricePerNight) 
                        : (item.price || item.startingPrice)
                    )}
                  </span>
                  <span className="text-xs text-slate-500">
                    {type === 'hotel' ? 'per night' : 'per traveler'}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-600 font-medium">All simulated taxes & fees included</span>
              </div>

              {/* Service Quick Summary */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-primary">{item.name || item.airline || item.operator}</span>
                </div>
                {item.departureTime && (
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Schedule:</span>
                    <span className="font-bold text-primary">{item.departureTime} → {item.arrivalTime}</span>
                  </div>
                )}
                {item.duration && (
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Duration:</span>
                    <span className="font-bold text-primary">{item.duration}</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Availability:</span>
                  <span className="font-bold text-emerald-600">Immediate Confirmation</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleBookNow}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-secondary to-accent hover:from-secondary-dark hover:to-accent-dark text-white font-extrabold text-base shadow-lg shadow-secondary/25 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Passenger Details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Simulated reservation with zero payment risk</span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
