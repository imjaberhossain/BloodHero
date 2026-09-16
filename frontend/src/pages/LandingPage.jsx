import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageSquare, LayoutDashboard, ShieldCheck, Siren, Smartphone } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/40 via-white to-slate-50 text-slate-800">
      
      {/* --- NAVBAR --- */}
      <header className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-rose-100/50">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold shadow-md shadow-brand-600/30">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
            </svg>
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight">BloodHero</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-brand-600 transition">ফিচার</a>
          <a href="#how-it-works" className="hover:text-brand-600 transition">কিভাবে কাজ করে</a>
          <a href="#stats" className="hover:text-brand-600 transition">পরিসংখ্যান</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-bold text-slate-700 hover:text-brand-600 px-4 py-2 transition">
            লগইন
          </Link>
          <Link to="/register" className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-brand-600/30 transition transform active:scale-95">
            সাইন আপ
          </Link>
        </div>
      </header>

      {/* --- HERO SECTION (IMAGE 1 MATCHING) --- */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 bg-rose-100/80 text-brand-700 text-xs font-bold px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
            আপনার এক ফোঁটা রক্ত বাঁচাতে পারে একটি জীবন
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
            রক্ত দিন, <span className="text-brand-600">জীবন বাঁচান</span> <br />
            — সহজে ও দ্রুত
          </h1>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-lg font-medium">
            Blood Hero একটি আধুনিক প্ল্যাটফর্ম যেখানে আপনি মুহূর্তেই রক্তদাতা খুঁজে পাবেন, জরুরি অনুরোধ পোস্ট করতে পারবেন এবং সরাসরি চ্যাটে যোগাযোগ করতে পারবেন।
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/register" className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-xl shadow-brand-600/30 transition transform active:scale-95">
              এখনই শুরু করুন
            </Link>
            <a href="#how-it-works" className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm px-6 py-3.5 rounded-full transition">
              কিভাবে কাজ করে?
            </a>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-rose-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-rose-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-rose-600 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-brand-700 border-2 border-white"></div>
            </div>
            <span className="text-xs font-bold text-slate-500">10+ মানুষ ইতিমধ্যে যুক্ত হয়েছেন</span>
          </div>
        </div>

        {/* Right Hero Image Card */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1000&auto=format&fit=crop" 
              alt="Blood Donation" 
              className="w-full h-[380px] object-cover"
            />
          </div>

          {/* Floating Live Card */}
          <div className="absolute -bottom-6 -left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-rose-100 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-brand-600 flex items-center justify-center font-bold">
              🩸
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">O+ প্রয়োজন</p>
              <p className="text-[11px] text-slate-500 font-medium">ঢাকা মেডিকেল কলেজ</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION (IMAGE 2 MATCHING) --- */}
      <section id="stats" className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-brand-600">10+</h3>
            <p className="text-xs md:text-sm font-bold text-slate-500 mt-1">নিবন্ধিত রক্তদাতা</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-brand-600">2+</h3>
            <p className="text-xs md:text-sm font-bold text-slate-500 mt-1">রক্তের অনুরোধ</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-brand-600">৬৪</h3>
            <p className="text-xs md:text-sm font-bold text-slate-500 mt-1">জেলা কাভারেজ</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-brand-600">8</h3>
            <p className="text-xs md:text-sm font-bold text-slate-500 mt-1">রক্তের গ্রুপ</p>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION (IMAGE 3 MATCHING) --- */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-20 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            যা কিছু থাকছে <span className="text-brand-600">Blood Hero</span>-তে
          </h2>
          <p className="text-slate-500 text-sm font-medium">রক্তদাতা ও গ্রহীতাদের জন্য প্রয়োজনীয় সব ফিচার এক প্ল্যাটফর্মে।</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-brand-600 flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">স্মার্ট ব্লাড সার্চ</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
              রক্তের গ্রুপ ও জেলা অনুযায়ী মুহূর্তেই কাছাকাছি রক্তদাতা খুঁজে বের করুন।
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-brand-600 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">রিয়েল-টাইম চ্যাট</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
              হোয়াটসঅ্যাপের মতো সহজ মেসেজিং দিয়ে রক্তদাতার সাথে সরাসরি যোগাযোগ করুন।
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-brand-600 flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">ব্যক্তিগত ড্যাশবোর্ড</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
              আপনার দান, অনুরোধ এবং কার্যক্রম এক জায়গা থেকে নিয়ন্ত্রণ করুন।
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-brand-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">নিরাপদ ও গোপনীয়</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
              এনক্রিপ্টেড পাসওয়ার্ড ও সুরক্ষিত সেশনের মাধ্যমে আপনার তথ্য সুরক্ষিত থাকে।
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-brand-600 flex items-center justify-center">
              <Siren className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">জরুরি অনুরোধ</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
              জরুরি প্রয়োজনে দ্রুত রক্তের অনুরোধ পোস্ট করুন এবং নিকটস্থ দাতাদের জানান।
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-brand-600 flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">ইমেইল অথবা ফোন</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
              ইমেইল অথবা মোবাইল নম্বর — যেকোনো একটি দিয়েই সহজে অ্যাকাউন্ট খুলুন।
            </p>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (IMAGE 4 MATCHING) --- */}
      <section id="how-it-works" className="bg-rose-50/50 py-20 border-t border-rose-100/60">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">কিভাবে কাজ করে</h2>
            <p className="text-slate-500 text-sm font-medium">মাত্র তিনটি ধাপে যুক্ত হয়ে যান আমাদের রক্তদান কমিউনিটিতে।</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl text-center space-y-3 border border-slate-100 shadow-sm">
              <span className="text-3xl font-black text-rose-200">০১</span>
              <h3 className="text-base font-black text-slate-900">অ্যাকোউন্ট তৈরি করুন</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                ইমেইল বা ফোন নম্বর দিয়ে কয়েক সেকেন্ডে সাইন আপ করুন।
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl text-center space-y-3 border border-slate-100 shadow-sm">
              <span className="text-3xl font-black text-rose-200">০২</span>
              <h3 className="text-base font-black text-slate-900">প্রোফাইল সম্পন্ন করুন</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                আপনার রক্তের গ্রুপ, জেলা ও প্রাপ্যতা যোগ করুন।
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl text-center space-y-3 border border-slate-100 shadow-sm">
              <span className="text-3xl font-black text-rose-200">০৩</span>
              <h3 className="text-base font-black text-slate-900">খুঁজুন ও যোগাযোগ করুন</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                রক্তদাতা খুঁজুন অথবা অনুরোধ পোস্ট করে সরাসরি চ্যাট করুন।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION (CTA BANNER - IMAGE 4 MATCHING) --- */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-brand-600 via-rose-600 to-rose-700 rounded-3xl p-10 md:p-14 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-black">আজই একজন হিরো হয়ে উঠুন</h2>
          <p className="text-rose-100 text-xs md:text-sm max-w-lg mx-auto font-medium">
            রক্ত দিয়ে বাঁচান একটি জীবন। বিনামূল্যে অ্যাকাউন্ট খুলুন এবং কমিউনিটিতে যুক্ত হন।
          </p>
          <div className="pt-2">
            <Link to="/register" className="bg-white text-brand-700 hover:bg-rose-50 font-black text-sm px-8 py-3.5 rounded-full shadow-lg transition inline-block">
              ফ্রি অ্যাকাউন্ট খুলুন
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="max-w-6xl mx-auto px-4 py-8 border-t border-slate-200/80 flex justify-between items-center text-xs text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
            🩸
          </div>
          <span className="font-bold text-slate-700">BloodHero</span>
        </div>
        <p>© 2026 BloodHero. সর্বস্বত্ব সংরক্ষিত।</p>
      </footer>

    </div>
  );
}