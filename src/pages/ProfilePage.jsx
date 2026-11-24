import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Award, ShieldCheck, Plus, Trash2, Edit2, Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function ProfilePage() {
  const { user, setUser } = useBooking();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Tanvir Hossain',
    email: user?.email || 'tanvir@travelease.demo',
    phone: user?.phone || '+880 1712-345678',
    country: user?.country || 'Bangladesh',
    passportNumber: user?.passportNumber || 'A08942157',
  });

  const [savedPassengers, setSavedPassengers] = useState(user?.savedPassengers || []);
  const [newPassengerName, setNewPassengerName] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      ...formData,
      savedPassengers
    }));
    setIsEditing(false);
  };

  const handleAddPassenger = () => {
    if (!newPassengerName.trim()) return;
    const newP = {
      name: newPassengerName.trim(),
      type: 'Adult',
      gender: 'Male',
      dob: '1996-01-01',
      nidOrPassport: 'C' + Math.floor(10000000 + Math.random() * 90000000)
    };
    setSavedPassengers([...savedPassengers, newP]);
    setNewPassengerName('');
  };

  const handleRemovePassenger = (index) => {
    setSavedPassengers(savedPassengers.filter((_, idx) => idx !== index));
  };

  return (
    <div className="min-h-screen bg-surface pb-24">
      
      {/* Header Profile Cover */}
      <div className="bg-primary text-white py-12 border-b border-primary-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-2xl object-cover border-4 border-accent shadow-xl"
          />

          <div className="space-y-1 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-sans">
                {user?.name || 'Tanvir Hossain'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent/20 text-accent">
                {user?.membershipTier || 'Platinum Club'}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {user?.email || 'tanvir@travelease.demo'} · {user?.phone || '+880 1712-345678'}
            </p>
            <p className="text-xs text-emerald-400 font-semibold pt-1">
              ★ {user?.loyaltyPoints || 3450} TravelEase Reward Points available
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-lg font-bold text-primary font-sans">
                  Personal Information
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs font-bold text-secondary hover:underline flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-semibold outline-none focus:border-secondary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-semibold outline-none focus:border-secondary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-semibold outline-none focus:border-secondary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Passport / NID No.</label>
                      <input
                        type="text"
                        value={formData.passportNumber}
                        onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-semibold outline-none focus:border-secondary uppercase"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-secondary text-white font-bold text-xs shadow transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block uppercase">Full Name</span>
                    <span className="text-sm font-bold text-primary">{formData.name}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block uppercase">Email</span>
                    <span className="text-sm font-bold text-primary">{formData.email}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block uppercase">Mobile Phone</span>
                    <span className="text-sm font-bold text-primary">{formData.phone}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block uppercase">Passport / NID</span>
                    <span className="text-sm font-bold text-primary">{formData.passportNumber}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Saved Passengers Manifest */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-lg font-bold text-primary font-sans">
                    Saved Co-Travelers
                  </h3>
                  <p className="text-xs text-slate-500">Auto-fill companions during booking checkout.</p>
                </div>
              </div>

              {/* Add Companion Form */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Companion Full Name"
                  value={newPassengerName}
                  onChange={(e) => setNewPassengerName(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-secondary"
                />
                <button
                  type="button"
                  onClick={handleAddPassenger}
                  className="px-4 py-2 rounded-xl bg-secondary text-white text-xs font-bold hover:bg-secondary-dark transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {/* Companions List */}
              <div className="space-y-3">
                {savedPassengers.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div>
                      <span className="font-bold text-primary block">{p.name}</span>
                      <span className="text-slate-400">{p.type} · ID: {p.nidOrPassport}</span>
                    </div>
                    <button
                      onClick={() => handleRemovePassenger(idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove Companion"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Loyalty & Stats */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary via-primary-light to-secondary text-white rounded-3xl p-6 shadow-premium space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-accent">VIP Loyalty Tier</span>
                <Award className="w-6 h-6 text-amber-300" />
              </div>

              <div>
                <h4 className="text-3xl font-black font-sans text-white">Platinum Member</h4>
                <p className="text-xs text-slate-300 mt-1">3,450 points available for redemption</p>
              </div>

              <div className="space-y-2 text-xs text-slate-200 border-t border-white/20 pt-4">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                  <span>Priority check-in & boarding</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                  <span>Free cancellation on select flights</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                  <span>5% cashback credited as TravelEase points</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
