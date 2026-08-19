import Link from "next/link";
import {
  Stethoscope,
  Store,
  Users,
  ClipboardList,
  ShieldAlert,
  Activity,
  ArrowRight,
  MapPin,
  Sparkles,
  PhoneCall,
  Coins,
  Wifi,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-slate-50 to-stone-100 text-slate-900 pb-16">
      {/* Top Banner */}
      <div className="bg-[#0b5e36] text-emerald-100 text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-emerald-800">
        <MapPin className="w-4 h-4 text-amber-300 animate-bounce" />
        <span>
          <strong>Mailsi Tehsil Pilot (South Punjab)</strong> • Live testing across Mitro, Karampur, Jallah Jeem & Surrounding Villages
        </span>
      </div>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Assisted Phygital Telehealth & Clinic Queue Platform</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight">
          صحت کا آسان نظام — <span className="text-[#0b5e36]">میلسی اور دیہات</span> کے لیے
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Transforming local village medical stores into frontline triage & booking hubs. 
          Connecting rural patients to Mailsi & Multan doctors with <strong>88% Doctor Payout</strong>, 
          <strong> 7% Instant Pharmacy Cut</strong>, and <strong>Zero-Install WhatsApp Rooms</strong>.
        </p>

        {/* Key Model Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm text-slate-700">
            <Coins className="w-4 h-4 text-amber-500" />
            <span>88% Doctor / 7% Store / 5% Platform</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm text-slate-700">
            <PhoneCall className="w-4 h-4 text-emerald-600" />
            <span>1-Click WhatsApp Web Link</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm text-slate-700">
            <Wifi className="w-4 h-4 text-sky-600" />
            <span>Voice-Note Fallback (River Belt)</span>
          </div>
        </div>
      </div>

      {/* Role Navigation Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-10">
        <h2 className="text-xs uppercase tracking-wider font-bold text-slate-400 text-center mb-4">
          Select Portal Role to Experience Pilot Modules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* 1. Pharmacy Agent */}
          <Link
            href="/pharmacy"
            className="group relative bg-white p-5 sm:p-6 rounded-2xl border-2 border-emerald-600/20 hover:border-emerald-600 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
              Primary Hub
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-2">
                <span>Pharmacy Agent Portal</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">میڈیکل اسٹور / ایجنٹ پورٹل</p>
              <p className="text-sm text-slate-600 mt-3 leading-snug">
                60-second patient intake, vitals (BP, Sugar, Temp), instant 7% cash cut ledger, and WhatsApp token generation.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>Al-Madina Store (Mitro)</span>
              <span>Open Portal &rarr;</span>
            </div>
          </Link>

          {/* 2. Doctor Suite */}
          <Link
            href="/doctor"
            className="group relative bg-white p-5 sm:p-6 rounded-2xl border-2 border-slate-200 hover:border-sky-600 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="absolute top-4 right-4 bg-sky-100 text-sky-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
              Clinician View
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors flex items-center gap-2">
                <span>Doctor OPD Suite</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">ڈاکٹر او پی ڈی اور نسخہ پورٹل</p>
              <p className="text-sm text-slate-600 mt-3 leading-snug">
                OPD session toggle, dynamic token caller, triage vitals overview, WebRTC room with voice-note fallback, and hybrid Rx generator.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-sky-700 font-semibold">
              <span>Dr. Tariq (Child Specialist)</span>
              <span>Open Suite &rarr;</span>
            </div>
          </Link>

          {/* 3. Patient Zero-Install */}
          <Link
            href="/c/apt-demo-001"
            className="group relative bg-white p-5 sm:p-6 rounded-2xl border-2 border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="absolute top-4 right-4 bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
              Zero-Install
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors flex items-center gap-2">
                <span>Patient WhatsApp Link</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">مریض کا واٹس ایپ روم (بغیر ایپ ڈاؤنلوڈ)</p>
              <p className="text-sm text-slate-600 mt-3 leading-snug">
                1-click token tracker, live WebRTC video room, river-belt walkie-talkie audio mode, and digital prescription PDF viewer.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 font-semibold">
              <span>Token #1 (Abdul Ghafoor)</span>
              <span>Join Call &rarr;</span>
            </div>
          </Link>

          {/* 4. Clinic Compounder */}
          <Link
            href="/compounder"
            className="group relative bg-white p-5 sm:p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-600 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors flex items-center gap-2">
                <span>Clinic Compounder View</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">کلینک اسسٹنٹ چیک اِن اسکرین</p>
              <p className="text-sm text-slate-600 mt-3 leading-snug">
                Simple mobile check-in screen for physical in-person visits in Mailsi clinics to prevent waiting room chaos.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-700 font-semibold">
              <span>Tariq Child Clinic Mailsi</span>
              <span>Check-in Desk &rarr;</span>
            </div>
          </Link>

          {/* 5. Pilot Ops & Admin */}
          <Link
            href="/admin"
            className="group relative bg-white p-5 sm:p-6 rounded-2xl border-2 border-slate-200 hover:border-purple-600 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="absolute top-4 right-4 bg-purple-100 text-purple-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
              Telemetry
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors flex items-center gap-2">
                <span>Pilot Ops & Inconsistencies</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">پائلٹ اینالیٹکس اور ان کنسسٹینسی ٹریکر</p>
              <p className="text-sm text-slate-600 mt-3 leading-snug">
                Real-time doctor delay flags, call drop logs, pharmacy balance settlements, and evaluator scoring rubrics.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-purple-700 font-semibold">
              <span>Mailsi Pilot Admin</span>
              <span>View Ops &rarr;</span>
            </div>
          </Link>

          {/* 6. Live Architecture Specs */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-5 sm:p-6 rounded-2xl border border-slate-700 text-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Pilot Telemetry Specs</h3>
              <p className="text-xs text-emerald-400 mt-1 font-mono">Status: Ready for Field Testing</p>
              <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Target Area:</span>
                  <span className="font-semibold text-white">Mailsi (25km Radius)</span>
                </div>
                <div className="flex justify-between">
                  <span>Economic Split:</span>
                  <span className="font-semibold text-emerald-400">88% Dr / 7% Store / 5% App</span>
                </div>
                <div className="flex justify-between">
                  <span>Connectivity Protocol:</span>
                  <span className="font-semibold text-amber-300">3-Tier (Video/VoIP/Voice)</span>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-700 text-[11px] text-slate-400">
              Guided by <code className="text-emerald-400">.agents/rules/</code> & skills
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
