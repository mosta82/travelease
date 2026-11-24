# TravelEase – Premium Multi-Service Travel Booking Platform

> **"One Platform. Every Journey."**

A modern, responsive, high-fidelity multi-service travel booking website engineered with **React 18**, **Vite**, **Tailwind CSS**, and **Lucide React**.

---

## 🌟 Key Features

### 1. Unified Multi-Service Search Engine
- **Flights**: One-way & Round-trip searches, class selection (Economy, Business, First), passenger counter, airport codes, baggage allowance, refundable filter.
- **Hotels**: City/destination selection, check-in & check-out dates, room & guest counter popover, star rating, verified reviews, and amenity tags.
- **Buses**: Boarding & drop-off locations, journey date, passenger count, luxury coach types (Scania Multi-Axle, Sleeper, Hyundai Universe AC).
- **Trains**: Station-to-station routing, travel class filters (Snigdha AC Chair, Shovon Chair, AC Berth Sleeper), real-time seat availability, and train numbers.

### 2. Comprehensive Booking Pipeline
1. **Interactive Search & Results**: Filter by price slider, operators/airlines, ratings, and sort by price, rating, or duration.
2. **Detailed Service Page (`/service/:type/:id`)**: High-res photo gallery, room/seat tiers, inclusions, luggage policies, and cancellation terms.
3. **Passenger Details Form (`/booking/passenger`)**: Traveler title, full name, contact info, date of birth, passport/NID, seat and meal preferences, and optional travel protection add-on.
4. **Checkout & Payment (`/booking/checkout`)**: Multi-channel payment options (Credit Card, bKash / Nagad Mobile Banking, Net Banking, and **1-Click Developer Sandbox**), coupon code support (`EASEFLY15`, `HOTELESCAPE25`, `TRAINGO10`, `FIRSTJOURNEY`).
5. **Confirmation & e-Ticket (`/booking/confirmation/:bookingId`)**: Official digital voucher with PNR reference code, QR code for simulated gate check-in, passenger manifest, printable view, and PDF download action.
6. **My Bookings (`/my-bookings`)**: Fully interactive portfolio persisted in `localStorage`. Cancel, filter, or re-open any voucher at any time.

### 3. Operations & User Management
- **User Authentication (`/login`, `/register`)**: Simulated auth with a convenient 1-Click Guest Sign-In.
- **Profile Hub (`/profile`)**: Manage personal passport information, view VIP Loyalty status (Platinum Club points), and manage saved co-travelers.
- **Admin Dashboard (`/admin`)**: Operations center tracking simulated revenue, total booking volume, cancellation metrics, live fleet distribution, and booking statuses.

---

## 🎨 Design System & Color Palette

- **Primary**: Deep Navy Blue (`#102A43`)
- **Secondary**: Corporate Blue (`#1769AA`)
- **Accent**: Vibrant Teal (`#19A7A0`)
- **Surface**: Clean Light Grey (`#F4F7FA`)
- **Card**: Pure White (`#FFFFFF`) with soft multi-layered shadows
- **Typography**: Inter & Poppins via Google Fonts

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Server preview runs at `http://localhost:5173/`.

---

## 🛡️ Prototype Notice
*All bookings, payment transactions, flights, hotel rooms, train seats, and bus tickets in this application are simulated demonstrations for interactive UX prototype testing. No real financial charges or real-world reservations occur.*
