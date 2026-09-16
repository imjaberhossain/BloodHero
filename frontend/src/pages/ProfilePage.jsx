import React, { useState, useEffect, useRef } from 'react';
import { User, Phone, Compass, Save, Loader2, CheckCircle2, Heart, Calendar, ShieldCheck, ToggleLeft, ToggleRight, Camera } from 'lucide-react';
import { getUserProfile, updateUserProfile } from '../services/userService';

export default function ProfilePage() {
  const userId = 1;
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: 'A+',
    district: 'ঢাকা',
    avatarUrl: '',
    latitude: null,
    longitude: null,
    isAvailable: true,
    lastDonationDate: '',
    totalDonations: 3
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const districts = ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'সিলেট', 'খুলনা', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ'];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(userId);
        setFormData((prev) => ({
          ...prev,
          ...data,
          avatarUrl: data.avatarUrl || '',
          isAvailable: data.isAvailable ?? true,
          totalDonations: data.totalDonations ?? 0,
          lastDonationDate: data.lastDonationDate || ''
        }));
      } catch (err) {
        console.error('প্রোফাইল লোড করতে সমস্যা:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  // ডিভাইস থেকে ছবি সিলেক্ট ও কন্টেন্ট রিড করার ফাংশন
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // ২ Megabyte সাইজ লিমিট
        alert('ছবিটির সাইজ ২ MB এর ছোট হতে হবে!');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatarUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFetchLocation = () => {
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }));
        setGpsLoading(false);
        setSuccess('আপনার বর্তমান GPS লোকেশন সেট হয়েছে!');
        setTimeout(() => setSuccess(''), 3000);
      },
      () => {
        alert('লোকেশেন পারমিশন দেওয়া হয়নি!');
        setGpsLoading(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserProfile(userId, formData);
      setSuccess('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('আপডেট করতে সমস্যা:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-5">
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
        
        {/* Header Avatar Section */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-5">
          <div className="flex items-center gap-4">
            
            <div className="relative group">
              {formData.avatarUrl ? (
                <img
                  src={formData.avatarUrl}
                  alt={formData.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-100 shadow-sm"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-brand-600 font-black text-2xl flex items-center justify-center border border-rose-100 shadow-inner">
                  {formData.bloodGroup}
                </div>
              )}

              {/* Hidden File Picker Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Camera Icon Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="absolute -bottom-1 -right-1 bg-brand-600 hover:bg-brand-700 text-white p-1.5 rounded-xl shadow-md transition"
                title="গ্যালারি থেকে ছবি সিলেক্ট করুন"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-slate-900">{formData.name || 'রক্তদাতা প্রোফাইল'}</h1>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">{formData.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFormData({ ...formData, isAvailable: !formData.isAvailable })}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              formData.isAvailable
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-slate-100 text-slate-500 border border-slate-200'
            }`}
          >
            {formData.isAvailable ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4" />}
            {formData.isAvailable ? 'রক্তদানে প্রস্তুত' : 'এখন অপারগ'}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-rose-50/60 border border-rose-100 p-3 rounded-2xl text-center">
            <Heart className="w-4 h-4 text-brand-600 mx-auto mb-1" />
            <span className="block text-base font-black text-slate-900">{formData.totalDonations} বার</span>
            <span className="text-[10px] font-bold text-slate-500">মোট রক্তদান</span>
          </div>
          <div className="bg-blue-50/60 border border-blue-100 p-3 rounded-2xl text-center">
            <Calendar className="w-4 h-4 text-blue-600 mx-auto mb-1" />
            <span className="block text-xs font-black text-slate-900 mt-1">
              {formData.lastDonationDate ? formData.lastDonationDate : 'তথ্য নেই'}
            </span>
            <span className="text-[10px] font-bold text-slate-500">সর্বশেষ দান</span>
          </div>
          <div className="bg-emerald-50/60 border border-emerald-100 p-3 rounded-2xl text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
            <span className="block text-xs font-black text-slate-900 mt-1">
              {formData.isAvailable ? 'সক্রিয়' : 'বিরতি'}
            </span>
            <span className="text-[10px] font-bold text-slate-500">ডোনার স্ট্যাটাস</span>
          </div>
        </div>

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold p-3 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">পূর্ণ নাম</label>
            <div className="relative">
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brand-600 bg-slate-50"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ফোন নম্বর</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brand-600 bg-slate-50"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">জেলা</label>
              <select
                value={formData.district || 'ঢাকা'}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:border-brand-600 bg-slate-50"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">রক্তের গ্রুপ</label>
              <select
                value={formData.bloodGroup || 'A+'}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:border-brand-600 bg-slate-50"
              >
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">সর্বশেষ রক্তদান</label>
              <input
                type="date"
                value={formData.lastDonationDate || ''}
                onChange={(e) => setFormData({ ...formData, lastDonationDate: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brand-600 bg-slate-50"
              />
            </div>
          </div>

          {/* GPS Tracker */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-slate-800">ম্যাপ জিপিএস লোকেশন</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {formData.latitude && formData.longitude
                    ? `ল্যাটিটিউড: ${Number(formData.latitude).toFixed(4)}, লঙ্গিটিউড: ${Number(formData.longitude).toFixed(4)}`
                    : 'এখনো লোকেশন সেট করা হয়নি'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleFetchLocation}
                disabled={gpsLoading}
                className="bg-rose-100 hover:bg-rose-200 text-brand-700 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0"
              >
                {gpsLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Compass className="w-3.5 h-3.5" />}
                {formData.latitude ? 'আপডেট করুন' : 'সেট করুন'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            প্রোফাইল সেভ করুন
          </button>
        </form>
      </div>
    </div>
  );
}