import React, { useState, useEffect } from 'react';
import { Droplet, PlusCircle, MapPin, Phone, Clock, Loader2, X, AlertCircle } from 'lucide-react';
import { getBloodRequestsApi, createBloodRequestApi } from '../services/bloodRequestService';

const bloodGroups = ['সব', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export default function FeedPage() {
  const [requests, setRequests] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('সব');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // নতুন আবেদন ফর্ম স্টেট
  const [formData, setFormData] = useState({
    patientName: '',
    requesterName: '',
    bloodGroup: 'O+',
    bagsNeeded: 1,
    hospitalName: '',
    district: 'ঢাকা',
    contactNumber: '',
    details: '',
    urgency: 'URGENT'
  });

  // ডেমো ডাটা (ব্যাকএন্ড খালি থাকলে দেখানোর জন্য)
  const initialDemoData = [
    {
      id: 1,
      patientName: 'রহিম উল্লাহ',
      requesterName: 'আরিফ হোসেন',
      bloodGroup: 'O+',
      bagsNeeded: 2,
      hospitalName: 'ঢাকা মেডিকেল কলেজ হাসপাতাল',
      district: 'ঢাকা',
      contactNumber: '01711223344',
      details: 'জরুরি রক্তের প্রয়োজন, আজ সন্ধ্যা ৬টার মধ্যে লাগবে।',
      urgency: 'URGENT',
      status: 'PENDING',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      patientName: 'সাফিয়া বেগম',
      requesterName: 'তানভীর আহমেদ',
      bloodGroup: 'A+',
      bagsNeeded: 1,
      hospitalName: 'স্কয়ার হাসপাতাল, পান্থপথ',
      district: 'ঢাকা',
      contactNumber: '01899887766',
      details: 'আগামীকাল সকালে অপারেশনের জন্য লাগবে।',
      urgency: 'NORMAL',
      status: 'PENDING',
      createdAt: new Date(Date.now() - 7200000).toISOString()
    }
  ];

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await getBloodRequestsApi(selectedGroup);
      setRequests(data.length > 0 ? data : initialDemoData);
    } catch (err) {
      console.error('রিকোয়েস্ট লোড করতে সমস্যা:', err);
      setRequests(initialDemoData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [selectedGroup]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createBloodRequestApi({ ...formData, userId: 1 });
      setIsModalOpen(false);
      setFormData({
        patientName: '',
        requesterName: '',
        bloodGroup: 'O+',
        bagsNeeded: 1,
        hospitalName: '',
        district: 'ঢাকা',
        contactNumber: '',
        details: '',
        urgency: 'URGENT'
      });
      fetchRequests();
    } catch (err) {
      console.error('আবেদন পোস্ট করতে সমস্যা:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 pb-20">
      
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-brand-600 to-rose-700 rounded-3xl p-6 text-white shadow-lg flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black">জরুরি রক্তের আবেদন</h1>
          <p className="text-xs text-rose-100 font-medium mt-1">
            কারো রক্ত প্রয়োজন হলে পোস্ট করুন অথবা সাহায্য করতে এগিয়ে আসুন।
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-brand-600 hover:bg-rose-50 px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-md transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          রক্তের আবেদন করুন
        </button>
      </div>

      {/* Blood Group Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {bloodGroups.map((group) => (
          <button
            key={group}
            onClick={() => setSelectedGroup(group)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
              selectedGroup === group
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center text-slate-400 text-xs font-bold border border-slate-100">
            বর্তমানে এই গ্রুপের কোনো রক্তের আবেদন নেই।
          </div>
        ) : (
          requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                    <span className="text-brand-600 text-sm font-black">{req.bloodGroup}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{req.patientName} (রোগী)</h3>
                    <p className="text-xs text-slate-500 font-medium">আবেদনকারী: {req.requesterName}</p>
                  </div>
                </div>

                {req.urgency === 'URGENT' && (
                  <span className="bg-rose-100 text-brand-600 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> জরুরি
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="truncate">{req.hospitalName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-brand-600" />
                  <span>{req.bagsNeeded} ব্যাগ প্রয়োজন</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2 md:col-span-1">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              {req.details && (
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {req.details}
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-400 font-bold">জেলা: {req.district}</span>
                <a
                  href={`tel:${req.contactNumber}`}
                  className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" /> কল করুন
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal / Popup for New Request */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-black text-slate-900">রক্তের আবেদন ফরম</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">রোগীর নাম</label>
                <input
                  type="text"
                  required
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  placeholder="রোগীর নাম লিখুন"
                  className="w-full mt-1 p-2.5 text-xs border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">রক্তের গ্রুপ</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full mt-1 p-2.5 text-xs border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-600 bg-white"
                  >
                    {bloodGroups.filter(g => g !== 'সব').map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">কত ব্যাগ প্রয়োজন?</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.bagsNeeded}
                    onChange={(e) => setFormData({ ...formData, bagsNeeded: parseInt(e.target.value) })}
                    className="w-full mt-1 p-2.5 text-xs border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">হাসপাতালের নাম ও ঠিকানা</label>
                <input
                  type="text"
                  required
                  value={formData.hospitalName}
                  onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                  placeholder="যেমন: ঢাকা মেডিকেল কলেজ"
                  className="w-full mt-1 p-2.5 text-xs border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">জেলা</label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full mt-1 p-2.5 text-xs border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">মোবাইল নম্বর</label>
                  <input
                    type="tel"
                    required
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    placeholder="017xxxxxxxx"
                    className="w-full mt-1 p-2.5 text-xs border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">আপনার নাম (আবেদনকারী)</label>
                <input
                  type="text"
                  required
                  value={formData.requesterName}
                  onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                  placeholder="আপনার নাম"
                  className="w-full mt-1 p-2.5 text-xs border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">বিস্তারিত (ঐচ্ছিক)</label>
                <textarea
                  rows="2"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="অতিরিক্ত তথ্য..."
                  className="w-full mt-1 p-2.5 text-xs border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-600"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl text-xs transition flex justify-center items-center shadow-md shadow-brand-600/20"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'পোস্ট করুন'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}