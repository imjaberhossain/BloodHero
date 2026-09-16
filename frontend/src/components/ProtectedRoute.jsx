import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  // localStorage থেকে টোকেন বা ইউজার তথ্য চেক
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  // লগইন না থাকলে সরাসরি লগইন পেজে রিডাইরেক্ট করবে
  if (!token && !user) {
    return <Navigate to="/login" replace />;
  }

  // লগইন থাকলে পেজটি রেন্ডার করবে
  return <Outlet />;
}