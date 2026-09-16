import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, MessageSquare, CheckCircle, XCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchDonorsApi } from '../services/userService';

const bloodGroups = ['সব', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const districts = ['সব', 'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'সিলেট', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ', 'গাজীপুর', 'নারায়ণগঞ্জ'];

export default function SearchPage() {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState('সব');
  const [selectedDistrict, setSelectedDistrict] = useState('সব');
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  // ডেমো ডাটা (ব্যাকএন্ড কানেক্টেড না থাকলে বা ডাটা না থাকলে দেখানোর জন্য)
  const initialDemoDonors = [
    {
      id: 2,
      name: 'রাকিব হাসান',
      bloodGroup: 'A+',
      district: 'ঢাকা',
      area: 'মিরপুর-১০',
      phone: '01712345678',
      isAvailable: true,
      lastDonated: '৩ মাস আগে',
      totalDonations: 4,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
    },
    {
      id: 3,
      name: 'তানভীর আহমেদ',
      bloodGroup: 'O+',
      district: 'ঢাকা',
      area: 'উত্তরা',
      phone: '01812345678',
      isAvailable: true,
      lastDonated: '৫ মাস আগে',
      totalDonations: 7,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
    },
    {
      id: 4,
      name: 'জাহিদ হাসান',
      bloodGroup: 'B+',
      district: 'গাজীপুর',
      area: 'চৌরাস্তা',
      phone: '01912345678',
      isAvailable: false,
      lastDonated: '১ মাস আগে',
      totalDonations: 2,
      avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150'
    }
  ];

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchDonorsApi(selectedGroup, selectedDistrict);
      if (data && data.length > 0) {
        setDonors(data);
      } else {
        // ফিল্টার অনুযায়ী ডেমো ফিল্টারিং
        const filteredDemo = initialDemoDonors.filter((d) => {
          const matchGroup = selectedGroup === 'সব' || d.bloodGroup === selectedGroup;
          const matchDistrict = selectedDistrict === 'সব' || d.district === selectedDistrict;
          return matchGroup && matchDistrict;
        });
        setDonors(filteredDemo);
      }
    } catch (err) {
      console.error('ডোনার সার্চ করতে সমস্যা:', err);
      // এরর হলে ডেমো ফিল্টার প্রদর্শন
      const filteredDemo = initialDemoDonors.filter((d) => {
        const matchGroup = selectedGroup === 'সব' || d.bloodGroup === selectedGroup;
        const matchDistrict = selectedDistrict === 'সব' || d.district === selectedDistrict;
        return matchGroup && matchDistrict;
      });
      setDonors(filteredDemo);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [selectedGroup, selectedDistrict]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 pb-24">
      
      {/* Search Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-50 text-brand-600 rounded-2xl">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900">রক্তদাতা খুঁজুন</h1>
            <p className="text-xs text-slate-400 font-bold">গ্রুপ এবং এলাকা নির্বাচন করে দ্রুত রক্তদাতা খুঁজুন</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Blood Group Select */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">রক্তের গ্রুপ</label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {bloodGroups.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                    selectedGroup === group
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          {/* District Select */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">জেলা নির্বাচন করুন</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-brand-600"
            >
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Donors Results Count & List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black text-slate-700">
            রক্তদাতা পাওয়া গেছে ({donors.length} জন)
          </h3>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
          </div>
        ) : donors.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center text-slate-400 text-xs font-bold border border-slate-100">
            নির্বাচিত গ্রুপের কোনো রক্তদাতা পাওয়া যায়নি।
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {donors.map((donor) => (
              <div
                key={donor.id}
                className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={donor.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                        alt={donor.name}
                        className="w-12 h-12 rounded-2xl object-cover"
                      />
                      <span className="absolute -bottom-1 -right-1 bg-brand-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md border-2 border-white">
                        {donor.bloodGroup}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-black text-slate-900">{donor.name}</h4>
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      </div>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {donor.area ? `${donor.area}, ${donor.district}` : donor.district}
                      </p>
                    </div>
                  </div>

                  {/* Availability Badge */}
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1 ${
                      donor.isAvailable
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {donor.isAvailable ? (
                      <>
                        <CheckCircle className="w-3 h-3" /> রক্ত দিতে ইচ্ছুক
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" /> এখন অনুপযোগী
                      </>
                    )}
                  </span>
                </div>

                {/* Info Stats */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-2xl text-[11px] font-semibold text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[10px]">সর্বশেষ রক্তদান</span>
                    <span>{donor.lastDonated || 'নতুন রক্তদাতা'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">মোট দান</span>
                    <span>{donor.totalDonations || 0} বার</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={`tel:${donor.phone}`}
                    className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" /> কল করুন
                  </a>
                  <button
                    onClick={() => navigate('/messages', { state: { recipient: donor } })}
                    className="flex-1 bg-rose-50 text-brand-600 hover:bg-rose-100 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> মেসেজ দিন
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}