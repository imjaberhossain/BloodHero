import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm px-4 md:px-8 py-3.5 flex justify-between items-center">
      <Link to="/dashboard" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
          🩸
        </div>
        <span className="text-xl font-black tracking-tight text-red-700">Blood Hero</span>
      </Link>
      
      {/* লোকেশন ও নোটিফিকেশন আইকন */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-gray-100 text-red-600 transition">
          📍
        </button>
      </div>
    </header>
  );
}