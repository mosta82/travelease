import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import SimulationBanner from './components/common/SimulationBanner';

import HomePage from './pages/HomePage';
import FlightResultsPage from './pages/FlightResultsPage';
import HotelResultsPage from './pages/HotelResultsPage';
import BusResultsPage from './pages/BusResultsPage';
import TrainResultsPage from './pages/TrainResultsPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import PassengerInfoPage from './pages/PassengerInfoPage';
import CheckoutPage from './pages/CheckoutPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import MyBookingsPage from './pages/MyBookingsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Scroll to top upon route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <ScrollToTop />
      <SimulationBanner />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flights" element={<FlightResultsPage />} />
          <Route path="/hotels" element={<HotelResultsPage />} />
          <Route path="/buses" element={<BusResultsPage />} />
          <Route path="/trains" element={<TrainResultsPage />} />
          <Route path="/service/:type/:id" element={<ServiceDetailsPage />} />
          <Route path="/booking/passenger" element={<PassengerInfoPage />} />
          <Route path="/booking/checkout" element={<CheckoutPage />} />
          <Route path="/booking/confirmation/:bookingId" element={<BookingConfirmationPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
