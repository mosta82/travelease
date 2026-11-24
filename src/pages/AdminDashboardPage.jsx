import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  CalendarCheck, 
  DollarSign, 
  Plane, 
  Building2, 
  Bus, 
  Train, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Eye,
  Plus,
  ShieldCheck,
  Search
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function AdminDashboardPage() {
  const { bookings, cancelBooking, formatPrice, allFlights, allHotels, allBuses, allTrains } = useBooking();
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'inventory'
  const [searchFilter, setSearchFilter] = useState('');

  // Calculate statistics
  const totalBookingsCount = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
  const cancelledCount = bookings.filter(b => b.status === 'Cancelled').length;

  const filteredBookings = bookings.filter(b => 
    b.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
    b.serviceName?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    b.route?.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-surface pb-24">
      
      {/* Top Admin Header */}
      <div className="bg-primary text-white py-8 border-b border-primary-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-accent font-bold uppercase tracking-wider">
                Management Portal
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-sans">
              TravelEase Operations Center
            </h1>
            <p className="text-xs text-slate-300">
              Simulated booking orchestration, inventory monitoring, and operational analytics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'bookings' ? 'bg-secondary text-white' : 'bg-white/10 text-slate-300 hover:text-white'
              }`}
            >
              Simulated Bookings
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'inventory' ? 'bg-secondary text-white' : 'bg-white/10 text-slate-300 hover:text-white'
              }`}
            >
              Inventory Fleet
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Simulated Volume</span>
              <h3 className="text-2xl font-black text-primary font-sans mt-1">
                {formatPrice(totalRevenue)}
              </h3>
              <span className="text-[10px] text-emerald-600 font-semibold">+18.4% this week</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bookings</span>
              <h3 className="text-2xl font-black text-primary font-sans mt-1">
                {totalBookingsCount} Trips
              </h3>
              <span className="text-[10px] text-slate-500 font-semibold">{confirmedCount} confirmed</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Fleet</span>
              <h3 className="text-2xl font-black text-primary font-sans mt-1">
                {allFlights.length + allHotels.length + allBuses.length + allTrains.length} Services
              </h3>
              <span className="text-[10px] text-accent-dark font-semibold">4 Modalities Live</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/15 text-accent-dark flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cancellations</span>
              <h3 className="text-2xl font-black text-primary font-sans mt-1">
                {cancelledCount}
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold">Zero cancellation fee</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
              <XCircle className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Tab 1: Bookings Management */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden space-y-4 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <h3 className="text-lg font-bold text-primary font-sans">
                  Recent Simulated Bookings
                </h3>
                <p className="text-xs text-slate-500">Real-time mock transactions recorded from the booking widget.</p>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter by ID or route..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold outline-none focus:border-secondary"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Booking ID</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Route / City</th>
                    <th className="py-3 px-4">Travel Date</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-primary">{b.id}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">{b.serviceName}</td>
                      <td className="py-3.5 px-4 text-slate-600">{b.route}</td>
                      <td className="py-3.5 px-4 text-slate-600">{b.date}</td>
                      <td className="py-3.5 px-4 font-bold text-secondary">{formatPrice(b.totalAmount)}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        {b.status === 'Confirmed' && (
                          <button
                            onClick={() => cancelBooking(b.id)}
                            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 font-semibold text-[11px] transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Inventory Overview */}
        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-secondary font-bold text-base">
                <Plane className="w-5 h-5" />
                <span>Flights ({allFlights.length})</span>
              </div>
              <div className="space-y-2 text-xs">
                {allFlights.map(f => (
                  <div key={f.id} className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="font-bold text-primary">{f.flightNumber} · {f.airline}</p>
                      <p className="text-slate-400">{f.fromCode} → {f.toCode}</p>
                    </div>
                    <span className="text-emerald-600 font-bold">{formatPrice(f.price)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-accent-dark font-bold text-base">
                <Building2 className="w-5 h-5" />
                <span>Hotels & Resorts ({allHotels.length})</span>
              </div>
              <div className="space-y-2 text-xs">
                {allHotels.map(h => (
                  <div key={h.id} className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="font-bold text-primary truncate max-w-[130px]">{h.name}</p>
                      <p className="text-slate-400">{h.city}</p>
                    </div>
                    <span className="text-emerald-600 font-bold">{formatPrice(h.pricePerNight)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-secondary font-bold text-base">
                <Bus className="w-5 h-5" />
                <span>Buses ({allBuses.length})</span>
              </div>
              <div className="space-y-2 text-xs">
                {allBuses.map(b => (
                  <div key={b.id} className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="font-bold text-primary truncate max-w-[130px]">{b.operator}</p>
                      <p className="text-slate-400">{b.duration}</p>
                    </div>
                    <span className="text-emerald-600 font-bold">{formatPrice(b.startingPrice)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-base">
                <Train className="w-5 h-5" />
                <span>Trains ({allTrains.length})</span>
              </div>
              <div className="space-y-2 text-xs">
                {allTrains.map(t => (
                  <div key={t.id} className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="font-bold text-primary">{t.name}</p>
                      <p className="text-slate-400">{t.trainNumber}</p>
                    </div>
                    <span className="text-emerald-600 font-bold">{formatPrice(t.startingPrice)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
