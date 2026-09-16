import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Home, Search, PlusCircle, MessageSquare, Bell, User } from 'lucide-react';

import FeedPage from './pages/FeedPage';
import SearchPage from './pages/SearchPage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-brand-600/30">
              B
            </span>
            <span className="font-black text-base text-slate-900 tracking-tight">
              Blood<span className="text-brand-600">Hero</span>
            </span>
          </div>

          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `p-2 rounded-xl transition relative ${
                isActive ? 'bg-rose-50 text-brand-600' : 'text-slate-500 hover:bg-slate-50'
              }`
            }
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-600 rounded-full"></span>
          </NavLink>
        </div>
      </header>

      {/* Main Application Pages */}
      <main>
        <Routes>
          {/* সবার জন্য উম্মুক্ত রুট (Public Routes) */}
          <Route path="/" element={<Navigate to="/feed" replace />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* শুধু লগইন করা ইউজারের জন্য সুরক্ষিত রুট (Protected Routes) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 z-50">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-bold transition ${
                isActive ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'
              }`
            }
          >
            <Home className="w-5 h-5" />
            <span>ফিড</span>
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-bold transition ${
                isActive ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'
              }`
            }
          >
            <Search className="w-5 h-5" />
            <span>সার্চ</span>
          </NavLink>

          {/* Center Action Button */}
          <NavLink
            to="/feed"
            className="w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center -mt-6 shadow-lg shadow-brand-600/40 hover:bg-brand-700 transition"
          >
            <PlusCircle className="w-6 h-6" />
          </NavLink>

          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-bold transition ${
                isActive ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'
              }`
            }
          >
            <MessageSquare className="w-5 h-5" />
            <span>মেসেজ</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-bold transition ${
                isActive ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'
              }`
            }
          >
            <User className="w-5 h-5" />
            <span>প্রোফাইল</span>
          </NavLink>

        </div>
      </nav>

    </div>
  );
}