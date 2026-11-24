import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  Award, 
  Clock, 
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-700/60">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent to-secondary flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-bold font-sans tracking-tight text-white">
                Travel<span className="text-accent">Ease</span>
              </span>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              One Platform. Every Journey. Experience effortless booking across domestic and international flights, luxury beach resorts, express intercity buses, and premier train lines.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span>Gulshan-2 Travel Tower, Level 9, Dhaka 1212</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>+880 (02) 988-3400 · 24/7 Toll Free 16299</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>concierge@travelease.demo</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              {[
                { icon: Facebook, href: '#facebook' },
                { icon: Twitter, href: '#twitter' },
                { icon: Instagram, href: '#instagram' },
                { icon: Linkedin, href: '#linkedin' }
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    className="w-8 h-8 rounded-full bg-slate-800 hover:bg-accent text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                    aria-label="Social Link"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Travel Services */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/flights" className="hover:text-accent transition-colors">Domestic & Intl Flights</Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-accent transition-colors">Resorts & 5-Star Hotels</Link>
              </li>
              <li>
                <Link to="/buses" className="hover:text-accent transition-colors">Luxury AC Sleeper Buses</Link>
              </li>
              <li>
                <Link to="/trains" className="hover:text-accent transition-colors">Express Intercity Trains</Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-accent transition-colors">Check My Bookings</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-accent transition-colors text-accent/80 font-medium">Admin Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Top Destinations
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/hotels?city=Cox%27s%20Bazar" className="hover:text-accent transition-colors">Cox's Bazar Beach</Link>
              </li>
              <li>
                <Link to="/hotels?city=Sylhet" className="hover:text-accent transition-colors">Sylhet Tea Gardens</Link>
              </li>
              <li>
                <Link to="/hotels?city=Sajek%20Valley" className="hover:text-accent transition-colors">Sajek Cloud Valley</Link>
              </li>
              <li>
                <Link to="/flights?to=Bangkok" className="hover:text-accent transition-colors">Bangkok, Thailand</Link>
              </li>
              <li>
                <Link to="/flights?to=Dubai" className="hover:text-accent transition-colors">Dubai, UAE</Link>
              </li>
              <li>
                <Link to="/flights?to=Singapore" className="hover:text-accent transition-colors">Singapore Changi</Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Company & Help
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#about" className="hover:text-accent transition-colors">About TravelEase</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">Contact Concierge</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-accent transition-colors">Help & FAQ Center</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-accent transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#refund" className="hover:text-accent transition-colors">Refund & Cancellation</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Middle Trust Badges */}
        <div className="py-6 border-b border-slate-700/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent" />
              256-Bit SSL Encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-accent" />
              IATA Accredited Agency
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" />
              Instant Booking Confirmations
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Accepted Demo Gateways:</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">VISA</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">MasterCard</span>
            <span className="px-2 py-0.5 rounded bg-pink-900/60 text-pink-300 font-mono text-[11px]">bKash</span>
            <span className="px-2 py-0.5 rounded bg-orange-900/60 text-orange-300 font-mono text-[11px]">Nagad</span>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} TravelEase Technologies Ltd. All rights reserved.
          </p>

          <div className="bg-slate-800/80 px-3.5 py-1.5 rounded-lg border border-slate-700/50 text-[11px] text-slate-300 text-center md:text-right">
            <strong className="text-accent">Prototype Notice:</strong> All bookings, airlines, operators, and payments displayed are simulated demo transactions.
          </div>
        </div>

      </div>
    </footer>
  );
}
