import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  ShieldCheck, 
  Tag, 
  Check, 
  Lock, 
  Sparkles, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { 
    bookingDraft, 
    confirmBooking, 
    formatPrice, 
    promoCode, 
    setPromoCode, 
    appliedPromo, 
    setAppliedPromo 
  } = useBooking();

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'mobile' | 'netbanking' | 'sandbox'
  const [mobileOperator, setMobileOperator] = useState('bKash');
  const [mobileNumber, setMobileNumber] = useState('01712345678');
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponInput, setCouponInput] = useState(promoCode || '');
  const [couponError, setCouponError] = useState('');

  if (!bookingDraft || !bookingDraft.calculatedFare) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">No Booking Details Found</h2>
        <Link to="/" className="px-6 py-3 rounded-xl bg-secondary text-white font-bold text-sm">
          Return to Home
        </Link>
      </div>
    );
  }

  const { item, type, passenger, calculatedFare, extraOptions } = bookingDraft;
  const { grandTotal } = calculatedFare;

  // Calculate discount if promo applied
  let discountAmount = 0;
  if (appliedPromo) {
    discountAmount = grandTotal * (appliedPromo.percent / 100);
  }
  const finalPayable = Math.max(0, grandTotal - discountAmount);

  // Apply Coupon
  const handleApplyPromo = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();

    if (code === 'EASEFLY15') {
      setAppliedPromo({ code, percent: 15, desc: '15% Flight Discount' });
    } else if (code === 'HOTELESCAPE25') {
      setAppliedPromo({ code, percent: 25, desc: '25% Luxury Hotel Discount' });
    } else if (code === 'TRAINGO10') {
      setAppliedPromo({ code, percent: 10, desc: '10% Train Ticket Discount' });
    } else if (code === 'FIRSTJOURNEY') {
      setAppliedPromo({ code, percent: 12, desc: 'Welcome Discount' });
    } else {
      setCouponError('Invalid promo code. Try EASEFLY15 or HOTELESCAPE25');
    }
  };

  const handlePayAndConfirm = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const confirmed = confirmBooking({
        type,
        title: item.name || `${item.from} to ${item.to}`,
        serviceName: item.airline ? `${item.airline} (${item.flightNumber})` : (item.name || item.operator),
        route: item.from && item.to ? `${item.from} → ${item.to}` : (item.city || item.location),
        date: bookingDraft.searchContext?.departureDate || bookingDraft.searchContext?.journeyDate || bookingDraft.searchContext?.checkIn || '2026-11-28',
        departureTime: item.departureTime || 'Check-in 02:00 PM',
        arrivalTime: item.arrivalTime || 'Check-out 12:00 PM',
        passengersCount: 1,
        passengers: [
          {
            name: `${passenger.firstName} ${passenger.lastName}`,
            seat: type === 'flight' ? '12A' : (type === 'train' ? 'S-32' : (type === 'bus' ? 'A2' : 'Suite 402')),
            type: 'Adult',
            email: passenger.email,
            phone: passenger.phone
          }
        ],
        totalAmount: finalPayable,
        paymentMethod: paymentMethod === 'card' 
          ? 'Credit Card (Visa ending 4242)' 
          : (paymentMethod === 'mobile' ? `${mobileOperator} Mobile Banking` : 'Simulated Instant Pay'),
        appliedPromoCode: appliedPromo?.code || null,
      });

      setIsProcessing(false);
      navigate(`/booking/confirmation/${confirmed.id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface pb-24">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-1">
                Step 2 of 2: Simulated Checkout
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-primary font-sans">
                Payment & Reservation
              </h1>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-xs font-bold">
              <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 1. Passenger Info
              </span>
              <span className="text-slate-300">➔</span>
              <span className="px-3 py-1.5 rounded-full bg-secondary text-white">
                2. Checkout & Payment
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Prototype Alert Notice */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Interactive Prototype Demonstration:</strong>
            <p className="mt-0.5 text-amber-800">
              No real bank card or mobile wallet will be billed. You can use any test credentials or use the 1-Click Sandbox Test Pay button below to complete the full reservation flow.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-card border border-slate-100 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-lg font-bold text-primary font-sans">
                  Select Payment Method
                </h3>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-accent" />
                  Simulated 256-Bit SSL
                </span>
              </div>

              {/* Method Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'mobile', label: 'bKash / Nagad', icon: Smartphone },
                  { id: 'netbanking', label: 'Net Banking', icon: Building },
                  { id: 'sandbox', label: '1-Click Test', icon: Sparkles, badge: 'Instant' },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-secondary bg-secondary/5 ring-2 ring-secondary/20 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-secondary' : 'text-slate-400'}`} />
                        {m.badge && (
                          <span className="text-[9px] font-bold bg-accent/20 text-accent-dark px-1.5 py-0.2 rounded">
                            {m.badge}
                          </span>
                        )}
                      </div>
                      <span className={`text-xs font-bold ${isSelected ? 'text-secondary' : 'text-slate-700'}`}>
                        {m.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Form for Credit Card */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4242 •••• •••• 4242"
                      defaultValue="4242 8810 9920 4021"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono font-semibold outline-none focus:border-secondary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Expiration (MM/YY)</label>
                      <input
                        type="text"
                        placeholder="12/28"
                        defaultValue="10/29"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono font-semibold outline-none focus:border-secondary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">CVC / CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        defaultValue="892"
                        maxLength="4"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono font-semibold outline-none focus:border-secondary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      defaultValue={`${passenger.firstName} ${passenger.lastName}`}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:border-secondary"
                    />
                  </div>
                </div>
              )}

              {/* Form for Mobile Banking */}
              {paymentMethod === 'mobile' && (
                <div className="space-y-4 pt-2">
                  <div className="flex gap-3">
                    {['bKash', 'Nagad', 'Rocket'].map((wallet) => (
                      <button
                        key={wallet}
                        type="button"
                        onClick={() => setMobileOperator(wallet)}
                        className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                          mobileOperator === wallet
                            ? 'border-secondary bg-secondary text-white shadow-sm'
                            : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        {wallet}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      {mobileOperator} Account Number
                    </label>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono font-semibold outline-none focus:border-secondary"
                    />
                  </div>

                  <p className="text-[11px] text-slate-500">
                    A simulated one-time authentication code (OTP) will be verified automatically upon confirmation.
                  </p>
                </div>
              )}

              {/* Form for Net Banking */}
              {paymentMethod === 'netbanking' && (
                <div className="space-y-3 pt-2 text-xs text-slate-600">
                  <label className="text-xs font-semibold text-slate-600 block">Select Banking Partner</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none">
                    <option>Standard Chartered Internet Banking</option>
                    <option>City Touch (The City Bank)</option>
                    <option>BRAC Bank Online</option>
                    <option>Eastern Bank EBL Skybanking</option>
                  </select>
                </div>
              )}

              {/* Sandbox 1-Click Pay */}
              {paymentMethod === 'sandbox' && (
                <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-xs text-slate-700 space-y-2">
                  <span className="font-bold text-accent-dark flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> 1-Click Developer Sandbox Mode
                  </span>
                  <p>
                    Bypass entering card or wallet digits. Clicking the button below will immediately confirm the reservation, generate a simulated PNR voucher, and store it in your browser's history.
                  </p>
                </div>
              )}

            </div>

            {/* Traveler Recap Card */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase block">Passenger</span>
                <span className="text-sm font-bold text-primary">
                  {passenger.title} {passenger.firstName} {passenger.lastName}
                </span>
                <p className="text-xs text-slate-500">{passenger.email} · {passenger.phone}</p>
              </div>

              <Link
                to="/booking/passenger"
                className="text-xs font-bold text-secondary hover:underline"
              >
                Edit Info
              </Link>
            </div>

          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="space-y-6">
            
            {/* Promo Code Box */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Have a Promo Voucher?
              </h4>

              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. EASEFLY15"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold uppercase outline-none focus:border-secondary"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-light transition-colors"
                >
                  Apply
                </button>
              </form>

              {couponError && (
                <p className="text-[11px] text-red-500 font-medium">{couponError}</p>
              )}

              {appliedPromo && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    {appliedPromo.code} applied (-{appliedPromo.percent}%)
                  </span>
                  <button
                    onClick={() => setAppliedPromo(null)}
                    className="text-emerald-700 hover:text-emerald-950 font-bold"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Total Fare Card */}
            <div className="bg-white rounded-2xl p-6 shadow-premium border border-slate-100 space-y-6">
              <h3 className="text-base font-bold text-primary font-sans border-b pb-3">
                Total Payment Due
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-primary truncate max-w-[170px]">
                    {item.name || item.airline || item.operator}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Base Fare:</span>
                  <span className="font-bold text-primary">{formatPrice(calculatedFare.basePrice)}</span>
                </div>
                {calculatedFare.insuranceFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Protection Cover:</span>
                    <span className="font-bold text-primary">{formatPrice(calculatedFare.insuranceFee)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Taxes & Fees:</span>
                  <span className="font-bold text-primary">{formatPrice(calculatedFare.taxesFee)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Promo Discount:</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-primary">Total Payable:</span>
                  <span className="text-3xl font-black text-secondary font-sans">
                    {formatPrice(finalPayable)}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePayAndConfirm}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-secondary to-accent hover:from-secondary-dark hover:to-accent-dark text-white font-black text-base shadow-lg shadow-secondary/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Simulating Payment & PNR...
                  </span>
                ) : (
                  <>
                    <span>Confirm & Pay {formatPrice(finalPayable)}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>Simulated Demo Flow · Instant Voucher Creation</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
