import React, { useState } from 'react';
import { Plane, Building2, Bus, Train, Sparkles } from 'lucide-react';
import FlightSearchForm from './FlightSearchForm';
import HotelSearchForm from './HotelSearchForm';
import BusSearchForm from './BusSearchForm';
import TrainSearchForm from './TrainSearchForm';

export default function BookingSearch({ defaultTab = 'flights' }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane, badge: 'Low Fares' },
    { id: 'hotels', label: 'Hotels', icon: Building2, badge: 'Up to 25% Off' },
    { id: 'buses', label: 'Buses', icon: Bus, badge: 'Instant AC' },
    { id: 'trains', label: 'Trains', icon: Train, badge: 'Official Partner' },
  ];

  return (
    <div className="w-full bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden">
      
      {/* Service Tabs Navigation */}
      <div className="flex border-b border-slate-100 bg-slate-50/70 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[130px] sm:min-w-[160px] py-4 px-4 flex items-center justify-center gap-2.5 text-sm font-semibold transition-all relative ${
                isActive
                  ? 'bg-white text-secondary shadow-sm'
                  : 'text-slate-600 hover:text-primary hover:bg-slate-100/60'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-secondary/10 text-secondary' : 'bg-slate-200/60 text-slate-500'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-base tracking-tight">{tab.label}</span>
              {tab.badge && (
                <span className={`hidden md:inline-block text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                  isActive ? 'bg-accent/15 text-accent-dark' : 'bg-slate-200 text-slate-500'
                }`}>
                  {tab.badge}
                </span>
              )}

              {/* Active Tab Indicator Bar */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-accent"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Form Content */}
      <div className="p-5 sm:p-6 lg:p-7">
        {activeTab === 'flights' && <FlightSearchForm />}
        {activeTab === 'hotels' && <HotelSearchForm />}
        {activeTab === 'buses' && <BusSearchForm />}
        {activeTab === 'trains' && <TrainSearchForm />}
      </div>

    </div>
  );
}
