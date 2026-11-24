import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Mail, Lock, Sparkles, ArrowRight, Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useBooking();

  const [email, setEmail] = useState('tanvir@travelease.demo');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, name: 'Tanvir Hossain' });
    navigate('/');
  };

  const handleDemoLogin = () => {
    login({ email: 'tanvir@travelease.demo', name: 'Tanvir Hossain' });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent to-secondary flex items-center justify-center text-white shadow-md">
            <Compass className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold font-sans tracking-tight text-primary">
            Travel<span className="text-accent">Ease</span>
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-sans">
          Sign In to Your Account
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Access your simulated bookings, saved travelers, and VIP deals.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-premium rounded-3xl border border-slate-100 space-y-6">
          
          {/* Quick Demo Login Pill */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-accent/15 to-secondary/15 border border-accent/40 hover:border-accent text-primary font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span>1-Click Demo Guest Sign-In (Tanvir)</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] uppercase font-bold text-slate-400 relative">Or use credentials</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm font-semibold outline-none focus:border-secondary"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm font-semibold outline-none focus:border-secondary"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                <input type="checkbox" defaultChecked className="accent-secondary" />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="font-bold text-secondary hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-secondary hover:underline">
              Sign up for free
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
