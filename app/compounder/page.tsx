"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  UserCheck,
  Search,
  ArrowLeft,
  Store,
  MapPin,
  RefreshCw,
  Users,
} from "lucide-react";

export default function CompounderScreen() {
  const [tokens, setTokens] = useState([
    {
      id: "t-1",
      tokenNumber: 1,
      patientName: "Abdul Ghafoor",
      phone: "0301-1234567",
      village: "Mitro (18 km)",
      pharmacy: "Al-Madina Store",
      doctorName: "Dr. Muhammad Tariq",
      time: "5:00 PM",
      status: "WITH_DOCTOR",
    },
    {
      id: "t-2",
      tokenNumber: 2,
      patientName: "Zain (Child)",
      phone: "0302-9876543",
      village: "Mitro (18 km)",
      pharmacy: "Al-Madina Store",
      doctorName: "Dr. Muhammad Tariq",
      time: "5:15 PM",
      status: "IN_WAITING_ROOM",
    },
    {
      id: "t-3",
      tokenNumber: 3,
      patientName: "Rashid Ali",
      phone: "0300-4445566",
      village: "Karampur (22 km)",
      pharmacy: "Bismillah Pharmacy",
      doctorName: "Dr. Muhammad Tariq",
      time: "5:30 PM",
      status: "EXPECTED",
    },
    {
      id: "t-4",
      tokenNumber: 4,
      patientName: "Muhammad Farooq",
      phone: "0303-7778899",
      village: "Tibba Sultanpur",
      pharmacy: "Qadri Medical Store",
      doctorName: "Dr. Muhammad Tariq",
      time: "5:45 PM",
      status: "EXPECTED",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const updateStatus = (id: string, newStatus: string) => {
    setTokens((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const filtered = tokens.filter(
    (t) =>
      t.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tokenNumber.toString().includes(searchQuery) ||
      t.village.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-indigo-900 text-white px-4 py-3 shadow-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-1.5 rounded-lg bg-indigo-800 hover:bg-indigo-700 text-indigo-200">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-indigo-300" />
                <h1 className="font-bold text-base sm:text-lg">Clinic Check-in Desk (کمپاؤنڈر)</h1>
              </div>
              <p className="text-[11px] text-indigo-200">
                Dr. Tariq Child Clinic • Mailsi Town
              </p>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="text-indigo-300">Today&apos;s Physical App Tokens: </span>
            <strong className="text-white font-black">{tokens.length}</strong>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 mt-4 space-y-4">
        {/* Search & Quick Filter */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
          <Search className="w-5 h-5 text-slate-400 ml-2" />
          <input
            type="text"
            placeholder="Search by Token #, Patient Name, or Village (e.g. Mitro)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm px-2 py-1.5 bg-transparent focus:outline-none font-medium"
          />
        </div>

        {/* Token List */}
        <div className="space-y-3">
          {filtered.map((t) => (
            <div
              key={t.id}
              className={`bg-white rounded-2xl p-4 sm:p-5 border-2 transition-all shadow-sm ${
                t.status === "WITH_DOCTOR"
                  ? "border-emerald-600 bg-emerald-50/40"
                  : t.status === "IN_WAITING_ROOM"
                  ? "border-amber-500 bg-amber-50/30"
                  : "border-slate-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-900 font-black text-lg flex items-center justify-center flex-shrink-0 border border-indigo-200">
                    #{t.tokenNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{t.patientName}</h3>
                    <div className="text-xs text-slate-600 mt-0.5 flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {t.village}
                      </span>
                      <span>•</span>
                      <span className="text-slate-500 font-medium">via {t.pharmacy}</span>
                    </div>
                  </div>
                </div>

                {/* Status Switcher Buttons */}
                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  <button
                    onClick={() => updateStatus(t.id, "IN_WAITING_ROOM")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      t.status === "IN_WAITING_ROOM"
                        ? "bg-amber-500 text-amber-950 shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Arrived / Waiting Room
                  </button>

                  <button
                    onClick={() => updateStatus(t.id, "WITH_DOCTOR")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      t.status === "WITH_DOCTOR"
                        ? "bg-[#0b5e36] text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Inside With Doctor
                  </button>

                  <button
                    onClick={() => updateStatus(t.id, "COMPLETED")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      t.status === "COMPLETED"
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
