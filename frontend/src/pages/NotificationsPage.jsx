import React, { useState, useEffect } from 'react';
import { Bell, HeartHandshake, MessageSquare, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { getNotificationsApi, markAsReadApi } from '../services/notificationService';

export default function NotificationsPage() {
  const userId = 1;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ডেমো ডাটা (ব্যাকএন্ড খালি থাকলে দেখানোর জন্য)
  const initialDemoData = [
    {
      id: 1,
      title: 'জরুরি রক্তের প্রয়োজন!',
      message: 'ঢাকা মেডিকেল কলেজে O+ রক্তের অত্যন্ত প্রয়োজন। কাছে থাকলে সাড়া দিন।',
      type: 'BLOOD_REQUEST',
      isRead: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'নতুন বার্তা এসেছে',
      message: 'তানভীর আহমেদ আপনাকে একটি মেসেজ পাঠিয়েছেন।',
      type: 'MESSAGE',
      isRead: false,
      createdAt: new Date(Date.now() - 3600000).toISOString()
    }
  ];

  const fetchNotifications = async () => {
    try {
      const data = await getNotificationsApi(userId);
      setNotifications(data.length > 0 ? data : initialDemoData);
    } catch (err) {
      console.error('নোটিফিকেশন লোড করতে সমস্যা:', err);
      setNotifications(initialDemoData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  const handleMarkAsRead = async (id) => {
    try {
      await markAsReadApi(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'BLOOD_REQUEST':
        return <HeartHandshake className="w-5 h-5 text-brand-600" />;
      case 'MESSAGE':
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-4">
      <div className="flex items-center justify-between bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-50 text-brand-600 rounded-2xl">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900">নোটিফিকেশন</h1>
            <p className="text-xs text-slate-400 font-bold">সকল বার্তা ও অ্যালার্ট</p>
          </div>
        </div>

        <span className="bg-brand-600 text-white text-xs font-black px-3 py-1 rounded-full">
          {notifications.filter((n) => !n.isRead).length} টি নতুন
        </span>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 text-brand-600 animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center text-slate-400 text-xs font-bold border border-slate-100">
            কোনো নোটিফিকেশন নেই
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMarkAsRead(item.id)}
              className={`p-4 rounded-3xl border transition cursor-pointer flex items-start justify-between gap-3 ${
                item.isRead
                  ? 'bg-white border-slate-100 opacity-75'
                  : 'bg-rose-50/40 border-rose-100 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-white rounded-2xl shadow-sm shrink-0">
                  {getIcon(item.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-black text-slate-900">{item.title}</h3>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-brand-600"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-slate-400 font-bold block pt-1">
                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {item.isRead && (
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}