"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Activity,
  Users,
  Store,
  Coins,
  Clock,
  Wifi,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Award,
  TrendingUp,
  FileCheck,
  Zap,
} from "lucide-react";

export default function AdminDashboard() {
  const [stores, setStores] = useState([
    {
      id: "store-1",
      name: "Al-Madina Medical Store",
      owner: "Muhammad Aslam",
      village: "Mitro (18 km)",
      totalBookings: 28,
      commissionEarned: 1960, // 28 * 70
      unremittedBalance: 1860,
      creditLimit: 5000,
      status: "ACTIVE",
    },
    {
      id: "store-2",
      name: "Bismillah Pharmacy & Clinic",
      owner: "Hafiz Rashid",
      village: "Karampur (22 km)",
      totalBookings: 19,
      commissionEarned: 1330,
      unremittedBalance: 930,
      creditLimit: 5000,
      status: "ACTIVE",
    },
    {
      id: "store-3",
      name: "Al-Rehman Medical Hall",
      owner: "Tariq Mehmood",
      village: "Jallah Jeem (River Belt)",
      totalBookings: 14,
      commissionEarned: 980,
      unremittedBalance: 0,
      creditLimit: 5000,
      status: "ACTIVE",
    },
    {
      id: "store-4",
      name: "Qadri Medical Store",
      owner: "Bilal Qadri",
      village: "Tibba Sultanpur (26 km)",
      totalBookings: 22,
      commissionEarned: 1540,
      unremittedBalance: 4650, // Close to limit!
      creditLimit: 5000,
      status: "NEAR_LIMIT",
    },
  ]);

  const [inconsistencies, setInconsistencies] = useState([
    {
      id: "inc-1",
      type: "VOICE_FALLBACK",
      location: "Jallah Jeem (River Belt)",
      details: "High packet loss (22%) on 4G. Call auto-downgraded to 32kbps Walkie-Talkie Mode.",
      severity: "MEDIUM",
      time: "12 mins ago",
    },
    {
      id: "inc-2",
      type: "DOCTOR_DELAY",
      location: "THQ Mailsi / Tariq Clinic",
      details: "Doctor OPD session started 18 minutes late due to emergency caesarean section. Automated SMS pre-alert sent to 4 waiting patients.",
      severity: "HIGH",
      time: "1 hour ago",
    },
    {
      id: "inc-3",
      type: "CREDIT_THRESHOLD",
      location: "Tibba Sultanpur (Qadri Medical)",
      details: "Unremitted balance reached Rs. 4,650 (93% of credit ceiling). 1-tap JazzCash settlement link dispatched.",
      severity: "WARNING",
      time: "2 hours ago",
    },
  ]);

  const approveSettlement = (storeId: string) => {
    setStores((prev) =>
      prev.map((s) => (s.id === storeId ? { ...s, unremittedBalance: 0, status: "ACTIVE" } : s))
    );
    alert("✅ JazzCash remittance approved! Medical store credit meter reset to 0%.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-12">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-purple-400" />
                <h1 className="font-bold text-base sm:text-lg text-white">
                  Mailsi Pilot Ops & Inconsistency Telemetry
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                South Punjab Healthcare Observation Engine • Guided by .agents/rules/
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-purple-950 text-purple-300 border border-purple-800 px-3 py-1 rounded-xl font-bold">
              Tehsil Pilot: Phase 1
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 mt-4 space-y-5">
        {/* Top KPI Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 uppercase font-bold">Total Consultations</div>
            <div className="text-2xl font-black text-white mt-1">83</div>
            <p className="text-[11px] text-emerald-400 mt-1">Target: 300 in Mailsi</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 uppercase font-bold">Active Village Hubs</div>
            <div className="text-2xl font-black text-amber-400 mt-1">4 Stores</div>
            <p className="text-[11px] text-slate-400 mt-1">Mitro, Karampur, Jallah, Tibba</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 uppercase font-bold">Avg Doctor Delay</div>
            <div className="text-2xl font-black text-sky-400 mt-1">7.4 min</div>
            <p className="text-[11px] text-emerald-400 mt-1">Target: &lt; 10 min</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 uppercase font-bold">River-Belt Voice Mode</div>
            <div className="text-2xl font-black text-indigo-400 mt-1">16.8%</div>
            <p className="text-[11px] text-slate-400 mt-1">Sutlej edge fallback rate</p>
          </div>
        </div>

        {/* Evaluator Card (Guided by .agents/skills/pilot-evaluator-workflow) */}
        <div className="bg-gradient-to-r from-purple-950/70 via-slate-900 to-slate-900 p-5 rounded-2xl border border-purple-800/80 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <h2 className="font-bold text-sm sm:text-base text-white">
                Pilot Evaluator Audit Card (Overall Score: 95.8%)
              </h2>
            </div>
            <span className="text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-700 px-2.5 py-0.5 rounded-lg self-start sm:self-auto">
              ✓ Ready for South Punjab Scale
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400">Clinical Safety</div>
              <div className="text-lg font-black text-emerald-400 mt-0.5">97 / 100</div>
              <p className="text-[10px] text-slate-500">Vitals validation & Rx gating</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400">Ledger Integrity</div>
              <div className="text-lg font-black text-emerald-400 mt-0.5">100 / 100</div>
              <p className="text-[10px] text-slate-500">Exact 88-7-5 atomic split</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400">Telemetry Health</div>
              <div className="text-lg font-black text-amber-400 mt-0.5">93 / 100</div>
              <p className="text-[10px] text-slate-500">3-Tier WebRTC fallback</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400">UX & Localization</div>
              <div className="text-lg font-black text-emerald-400 mt-0.5">95 / 100</div>
              <p className="text-[10px] text-slate-500">60s triage & zero-install</p>
            </div>
          </div>
        </div>

        {/* Live Inconsistency Feed */}
        <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Live Telemetry & Inconsistency Log Stream</span>
          </h3>

          <div className="space-y-2.5">
            {inconsistencies.map((inc) => (
              <div
                key={inc.id}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase flex-shrink-0 mt-0.5 ${
                      inc.severity === "HIGH"
                        ? "bg-red-950 text-red-300 border border-red-800"
                        : inc.severity === "WARNING"
                        ? "bg-amber-950 text-amber-300 border border-amber-800"
                        : "bg-sky-950 text-sky-300 border border-sky-800"
                    }`}
                  >
                    {inc.type}
                  </span>
                  <div>
                    <div className="font-bold text-white">{inc.location}</div>
                    <div className="text-slate-400 mt-0.5 leading-snug">{inc.details}</div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 font-mono self-end sm:self-center flex-shrink-0">
                  {inc.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pharmacy Agent Leaderboard & Cash Reconciliation */}
        <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Store className="w-4 h-4 text-emerald-400" />
            <span>Pharmacy Agent Leaderboard & Cash Remittance Approvals</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                  <th className="py-2.5 px-3">Medical Store & Location</th>
                  <th className="py-2.5 px-3">Bookings</th>
                  <th className="py-2.5 px-3">7% Cut Kept</th>
                  <th className="py-2.5 px-3">Unremitted Cash</th>
                  <th className="py-2.5 px-3">Credit Meter</th>
                  <th className="py-2.5 px-3 text-right">Settlement Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {stores.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-850">
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{s.name}</div>
                      <div className="text-[11px] text-slate-500">{s.owner} • {s.village}</div>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-200">{s.totalBookings}</td>
                    <td className="py-3 px-3 font-bold text-emerald-400">Rs. {s.commissionEarned}</td>
                    <td className="py-3 px-3 font-bold text-amber-300">Rs. {s.unremittedBalance}</td>
                    <td className="py-3 px-3">
                      <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            s.unremittedBalance > 4000 ? "bg-red-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${Math.min((s.unremittedBalance / s.creditLimit) * 100, 100)}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {s.unremittedBalance > 0 ? (
                        <button
                          onClick={() => approveSettlement(s.id)}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]"
                        >
                          Approve JazzCash
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-400 font-bold">✓ Settled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
