import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER, HOTELS, FLIGHTS, BUSES, TRAINS } from '../data/mockData';

const BookingContext = createContext();

const DEFAULT_BOOKINGS = [
  {
    id: 'TE-984210',
    type: 'flight',
    title: 'Dhaka to Cox’s Bazar',
    serviceName: 'Biman Bangladesh Airlines (BG-433)',
    date: '2026-11-28',
    departureTime: '07:30 AM',
    arrivalTime: '08:35 AM',
    route: 'DAC → CXB',
    passengersCount: 2,
    passengers: [
      { name: 'Tanvir Hossain', type: 'Adult', seat: '14A' },
      { name: 'Nusrat Jahan', type: 'Adult', seat: '14B' }
    ],
    status: 'Confirmed',
    totalAmount: 114.40,
    paymentMethod: 'Credit Card (ending 4021)',
    bookingDate: '2026-11-20',
    isSimulated: true,
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TE-984210-SIMULATED'
  },
  {
    id: 'TE-673190',
    type: 'hotel',
    title: 'Sayeman Beach Resort',
    serviceName: 'Infinity Sea View Suite',
    city: "Cox's Bazar",
    checkIn: '2026-11-28',
    checkOut: '2026-12-01',
    guestsCount: 2,
    roomsCount: 1,
    status: 'Confirmed',
    totalAmount: 435.00,
    paymentMethod: 'bKash Mobile Banking',
    bookingDate: '2026-11-21',
    isSimulated: true,
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TE-673190-SIMULATED'
  }
];

export const BookingProvider = ({ children }) => {
  // Search parameters for all services
  const [searchParams, setSearchParams] = useState({
    flight: {
      tripType: 'oneWay', // 'oneWay' | 'roundTrip'
      from: 'Dhaka',
      to: "Cox's Bazar",
      departureDate: '2026-11-28',
      returnDate: '2026-12-02',
      passengers: 1,
      travelClass: 'Economy',
    },
    hotel: {
      destination: "Cox's Bazar",
      checkIn: '2026-11-28',
      checkOut: '2026-12-01',
      rooms: 1,
      guests: 2,
    },
    bus: {
      from: 'Dhaka',
      to: "Cox's Bazar",
      journeyDate: '2026-11-28',
      passengers: 1,
    },
    train: {
      fromStation: 'Dhaka (Kamalapur)',
      toStation: "Cox's Bazar",
      journeyDate: '2026-11-28',
      travelClass: 'Snigdha (AC Chair)',
    }
  });

  // Current booking draft
  const [bookingDraft, setBookingDraft] = useState(null);

  // Applied promotional coupon
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Authenticated user
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('travelease_user');
    return savedUser ? JSON.parse(savedUser) : INITIAL_USER;
  });

  // Bookings list from localStorage
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('travelease_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_BOOKINGS;
      }
    }
    return DEFAULT_BOOKINGS;
  });

  // Currency
  const [currency, setCurrency] = useState('USD'); // USD ($) or BDT (৳)

  // Persist bookings
  useEffect(() => {
    localStorage.setItem('travelease_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Persist user
  useEffect(() => {
    if (user) {
      localStorage.setItem('travelease_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('travelease_user');
    }
  }, [user]);

  // Search setters
  const updateSearchParam = (serviceType, field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [serviceType]: {
        ...prev[serviceType],
        [field]: value
      }
    }));
  };

  // Initiate booking draft
  const startBooking = (item, type, extraOptions = {}) => {
    const draft = {
      id: 'DRAFT-' + Math.floor(100000 + Math.random() * 900000),
      type,
      item,
      extraOptions,
      searchContext: searchParams[type] || {},
      createdAt: new Date().toISOString()
    };
    setBookingDraft(draft);
    return draft;
  };

  // Add confirmed booking
  const confirmBooking = (bookingData) => {
    const newBooking = {
      id: 'TE-' + Math.floor(100000 + Math.random() * 900000),
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      isSimulated: true,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TE-CONFIRMED-${Date.now()}`,
      ...bookingData
    };

    setBookings(prev => [newBooking, ...prev]);
    setBookingDraft(null);
    setAppliedPromo(null);
    setPromoCode('');
    return newBooking;
  };

  // Cancel booking
  const cancelBooking = (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b));
  };

  // Login handler
  const login = (credentials) => {
    const newUser = {
      ...INITIAL_USER,
      email: credentials.email || INITIAL_USER.email,
      name: credentials.name || INITIAL_USER.name,
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  // Currency Formatter
  const formatPrice = (amount) => {
    if (currency === 'BDT') {
      const bdtAmount = Math.round(amount * 120);
      return `৳${bdtAmount.toLocaleString()}`;
    }
    return `$${Number(amount).toFixed(2)}`;
  };

  return (
    <BookingContext.Provider
      value={{
        searchParams,
        updateSearchParam,
        bookingDraft,
        setBookingDraft,
        startBooking,
        confirmBooking,
        cancelBooking,
        bookings,
        user,
        setUser,
        login,
        logout,
        promoCode,
        setPromoCode,
        appliedPromo,
        setAppliedPromo,
        currency,
        setCurrency,
        formatPrice,
        allHotels: HOTELS,
        allFlights: FLIGHTS,
        allBuses: BUSES,
        allTrains: TRAINS,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
