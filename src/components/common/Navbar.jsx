import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Plane, 
  Building2, 
  Bus, 
  Train, 
  CalendarCheck, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  LayoutDashboard, 
  LogOut, 
  DollarSign
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, currency, setCurrency, bookings } = useBooking();

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Compass },
    { name: 'Flights', path: '/flights', icon: Plane },
    { name: 'Hotels', path: '/hotels', icon: Building2 },
    { name: 'Buses', path: '/buses', icon: Bus },
    { name: 'Trains', path: '/trains', icon: Train },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-primary/95 backdrop-blur-md shadow-lg border-b border-primary-light/20 py-2.5' 
        : 'bg-primary text-white py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent to-secondary flex items-center justify-center text-white shadow-md shadow-accent/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white flex items-center gap-1">
                Travel<span className="text-accent">Ease</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-300 font-medium tracking-widest uppercase -mt-1">
                One Platform. Every Journey.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-secondary/40 text-accent font-semibold shadow-inner'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* Currency Switcher */}
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'BDT' : 'USD')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-colors"
              title="Toggle Currency"
            >
              <span>{currency === 'USD' ? '$ USD' : '৳ BDT'}</span>
            </button>

            {/* My Bookings link */}
            <Link
              to="/my-bookings"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors relative"
            >
              <CalendarCheck className="w-4 h-4 text-accent" />
              <span>My Bookings</span>
              {bookings.length > 0 && (
                <span className="bg-accent text-slate-900 text-[11px] font-bold px-1.5 py-0.2 rounded-full leading-tight">
                  {bookings.length}
                </span>
              )}
            </Link>

            {/* Admin Dashboard Quick Link */}
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 border border-slate-700 transition-colors"
              title="Admin Control Center"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-accent" />
              <span>Admin</span>
            </Link>

            {/* User Profile / Auth Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-sm"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-accent"
                  />
                  <span className="font-medium text-white max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-premium py-2 text-slate-800 border border-slate-100 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Signed in as</p>
                      <p className="text-sm font-bold text-primary truncate">{user.name}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-accent/15 text-accent-dark">
                        {user.membershipTier}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-secondary transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>User Profile</span>
                    </Link>

                    <Link
                      to="/my-bookings"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-secondary transition-colors"
                    >
                      <CalendarCheck className="w-4 h-4 text-slate-400" />
                      <span>Booking History</span>
                    </Link>

                    <Link
                      to="/admin"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-secondary transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      <span>Admin Portal</span>
                    </Link>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-sm font-medium text-slate-200 hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-accent text-white hover:bg-accent-dark transition-all shadow-md shadow-accent/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'BDT' : 'USD')}
              className="px-2 py-1 rounded text-xs font-semibold bg-white/10 text-white"
            >
              {currency}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary-dark border-t border-primary-light/30 px-4 pt-4 pb-6 space-y-3 animate-in fade-in duration-200">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                      isActive
                        ? 'bg-secondary text-white font-semibold'
                        : 'text-slate-200 hover:bg-white/10'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-accent" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
            <NavLink
              to="/my-bookings"
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-secondary text-white' : 'text-slate-200 hover:bg-white/10'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-4 h-4 text-accent" />
                <span>My Bookings</span>
              </div>
              {bookings.length > 0 && (
                <span className="bg-accent text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  {bookings.length}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-secondary text-white' : 'text-slate-200 hover:bg-white/10'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4 text-accent" />
              <span>Admin Dashboard</span>
            </NavLink>
          </nav>

          <div className="border-t border-primary-light/30 pt-3">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg">
                  <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/profile"
                    className="text-center py-2 text-xs font-medium bg-white/10 hover:bg-white/20 rounded-lg text-white"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="py-2 text-xs font-medium bg-red-600/30 text-red-300 hover:bg-red-600/40 rounded-lg"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  className="text-center py-2 text-sm font-medium bg-white/10 text-white rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-center py-2 text-sm font-semibold bg-accent text-white rounded-lg shadow"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
