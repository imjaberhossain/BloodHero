import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, MessageSquare, User } from 'lucide-react';

export default function FloatingNavbar() {
  const location = useLocation();

  // ল্যান্ডিং, লগইন ও রেজিস্টার পেজে নেভিগেশন বার লুকিয়ে থাকবে
  const hideOnPages = ['/', '/login', '/register'];
  if (hideOnPages.includes(location.pathname)) {
    return null;
  }

  const navItems = [
    { path: '/feed', icon: Home, label: 'ফিড' },
    { path: '/search', icon: Search, label: 'সার্চ' },
    { path: '/create-post', icon: PlusCircle, label: 'পোস্ট', isHighlight: true },
    { path: '/messages', icon: MessageSquare, label: 'মেসেজ' },
    { path: '/profile', icon: User, label: 'প্রোফাইল' },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-auto max-w-md">
      <nav className="bg-white/80 backdrop-blur-xl border border-rose-100 shadow-2xl rounded-full px-5 py-2.5 flex items-center gap-4 md:gap-7 transition-all">
        {navItems.map((item) => {
          const Icon = item.icon;
          if (item.isHighlight) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="bg-brand-600 hover:bg-brand-700 text-white p-3 rounded-full shadow-lg shadow-brand-600/30 transform hover:scale-110 active:scale-95 transition"
                title={item.label}
              >
                <Icon className="w-5 h-5" />
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-2 py-1 text-xs font-bold transition-all rounded-full ${
                  isActive 
                    ? 'text-brand-600 scale-105' 
                    : 'text-slate-400 hover:text-slate-600'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}