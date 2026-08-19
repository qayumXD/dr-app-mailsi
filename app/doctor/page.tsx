"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Users,
  Video,
  Mic,
  PhoneOff,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Camera,
  Coins,
  Send,
  ArrowLeft,
  Volume2,
  Wifi,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Play,
  RotateCcw,
} from "lucide-react";
import {
  evaluateBloodPressure,
  evaluateBloodSugar,
  evaluateTemperature,
  evaluatePulse,
} from "@/lib/vitals";

const INITIAL_QUEUE = [
  {
    id: "apt-1",
    tokenNumber: 1,
    patientName: "Abdul Ghafoor",
    age: 52,
    gender: "Male",
    phone: "0301-1234567",
    village: "Mitro (18 km)",
    pharmacyName: "Al-Madina Medical Store",
    type: "REMOTE_VIDEO",
    vitals: {
      bpSys: 145,
      bpDia: 92,
      sugar: 155,
      temp: 101.4,
      pulse: 88,
    },
    complaints: ["Bukhar / Fever", "Pait Dard / Stomach", "Qay / Vomiting"],
    hasVoiceNote: true,
    status: "CALLING",
  },
  {
    id: "apt-2",
    tokenNumber: 2,
    patientName: "Zain (Child)",
    age: 4,
    gender: "Child",
    phone: "0302-9876543",
    village: "Mitro (18 km)",
    pharmacyName: "Al-Madina Medical Store",
    type: "IN_CLINIC_PHYSICAL",
    vitals: {
      bpSys: undefined,
      bpDia: undefined,
      sugar: undefined,
      temp: 102.1,
      pulse: 110,
    },
    complaints: ["Shadeed Khansi", "Tez Bukhar"],
    hasVoiceNote: true,
    status: "WAITING",
  },
  {
    id: "apt-3",
    tokenNumber: 3,
    patientName: "Muhammad Riaz",
    age: 38,
    gender: "Male",
    phone: "0304-5556677",
    village: "Jallah Jeem (24 km - River Belt)",
    pharmacyName: "Al-Rehman Medical Hall",
    type: "REMOTE_VIDEO",
    vitals: {
      bpSys: 130,
      bpDia: 85,
      sugar: 115,
      temp: 98.6,
      pulse: 74,
    },
    complaints: ["Joron ka Dard / Joints", "Kamzori"],
    hasVoiceNote: false,
    status: "WAITING",
  },
];

const COMMON_MEDICINES = [
  "Panadol 500mg (Paracetamol)",
  "Augmentin 625mg (Amoxicillin/Clavulanate)",
  "Brufen 400mg (Ibuprofen)",
  "Ciproxin 500mg (Ciprofloxacin)",
  "Flagyl 400mg (Metronidazole)",
  "Risek 20mg (Omeprazole)",
  "Arinac Forte (Ibuprofen/Pseudoephedrine)",
  "Hydryllin Syrup (Cough Syrup)",
];

export default function DoctorPortal() {
  const [isOpdActive, setIsOpdActive] = useState(true);
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [activePatientIndex, setActivePatientIndex] = useState(0);

  // Call & Media Mode
  const [inCall, setInCall] = useState(true);
  const [mediaTier, setMediaTier] = useState<"VIDEO" | "VOIP_AUDIO" | "VOICE_NOTES">("VIDEO");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Rx State
  const [rxMode, setRxMode] = useState<"digital" | "pad_photo">("digital");
  const [selectedMeds, setSelectedMeds] = useState<Array<{ name: string; dose: string; days: string }>>([
    { name: "Panadol 500mg (Paracetamol)", dose: "1+1+1 (Subah Sham Dopahar)", days: "3 Din" },
    { name: "Flagyl 400mg (Metronidazole)", dose: "1+0+1 (Subah Sham)", days: "3 Din" },
  ]);
  const [instructions, setInstructions] = useState("Khane ke baad istemal karein. Pani zyada piyein.");
  const [hasPadPhoto, setHasPadPhoto] = useState(false);
  const [rxCompleted, setRxCompleted] = useState(false);

  // Financials (88%)
  const [totalDoctorEarned, setTotalDoctorEarned] = useState(2640); // 3 consults * 880

  const activePatient = queue[activePatientIndex] || queue[0];

  const bpStatus = evaluateBloodPressure(activePatient.vitals.bpSys, activePatient.vitals.bpDia);
  const tempStatus = evaluateTemperature(activePatient.vitals.temp);
  const sugarStatus = evaluateBloodSugar(activePatient.vitals.sugar);
  const pulseStatus = evaluatePulse(activePatient.vitals.pulse);

  const handleCallNextPatient = () => {
    if (activePatientIndex < queue.length - 1) {
      setActivePatientIndex(activePatientIndex + 1);
      setRxCompleted(false);
      setInCall(true);
      setMediaTier("VIDEO");
    } else {
      alert("All queued patients for this OPD session have been completed!");
    }
  };

  const addMedicine = (name: string) => {
    if (!selectedMeds.some((m) => m.name === name)) {
      setSelectedMeds([...selectedMeds, { name, dose: "1+0+1", days: "5 Din" }]);
    }
  };

  const removeMedicine = (index: number) => {
    setSelectedMeds(selectedMeds.filter((_, i) => i !== index));
  };

  const handleDeliverPrescription = () => {
    if (rxMode === "pad_photo" && !hasPadPhoto) {
      alert("Baraye meherbani likhe huay nuskhey ki tasveer upload karein!");
      return;
    }
    if (rxMode === "digital" && selectedMeds.length === 0) {
      alert("Kam az kam aik dawa muntakhib karein!");
      return;
    }

    setRxCompleted(true);
    setTotalDoctorEarned((prev) => prev + 880);
    alert("✅ Prescription signed & sent to Patient WhatsApp and auto-copied to referring Medical Store!");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-12">
      {/* Top Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 py-3 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-emerald-400" />
                <h1 className="font-bold text-base sm:text-lg text-white">Dr. Muhammad Tariq</h1>
                <span className="text-[10px] font-black bg-emerald-950 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded-md">
                  PMDC-45892-P
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Child Specialist & Pediatrician • THQ Hospital Mailsi & Clinic
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-[10px] text-slate-400 uppercase font-bold">88% OPD Earnings</div>
              <div className="text-sm font-black text-amber-400">Rs. {totalDoctorEarned}</div>
            </div>

            <button
              onClick={() => setIsOpdActive(!isOpdActive)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isOpdActive
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40"
                  : "bg-red-600 hover:bg-red-500 text-white"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>{isOpdActive ? "OPD Active (آن لائن)" : "OPD Paused"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto px-4 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COLUMN: LIVE QUEUE & TRIAGE SUMMARY (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Queue Header Card */}
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <h2 className="font-bold text-sm text-white">Live Patient Queue</h2>
              </div>
              <button
                onClick={() => alert("Broadcast sent to all waiting patients: Doctor is running 15 mins delayed due to emergency.")}
                className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Delay 15m</span>
              </button>
            </div>

            {/* Queue List */}
            <div className="space-y-2.5 mt-3">
              {queue.map((item, idx) => {
                const isActive = idx === activePatientIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActivePatientIndex(idx)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isActive
                        ? "bg-emerald-950/60 border-emerald-500 shadow-md"
                        : "bg-slate-900/60 border-slate-700/60 hover:border-slate-600 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black bg-emerald-900/80 text-emerald-200 px-2 py-0.5 rounded-md">
                          Token #{item.tokenNumber}
                        </span>
                        <span className="font-bold text-sm text-white">{item.patientName}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        {item.type === "REMOTE_VIDEO" ? "Video Link" : "In-Clinic"}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
                      <span>{item.village}</span>
                      <span className="text-slate-500">via {item.pharmacyName}</span>
                    </div>

                    {/* Vitals Summary Strip */}
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800 text-[11px]">
                      {item.vitals.temp && (
                        <span className={item.vitals.temp > 100 ? "text-red-400 font-bold" : "text-slate-300"}>
                          🌡 {item.vitals.temp}°F
                        </span>
                      )}
                      {item.vitals.bpSys && (
                        <span className={item.vitals.bpSys >= 140 ? "text-red-400 font-bold" : "text-slate-300"}>
                          🩸 {item.vitals.bpSys}/{item.vitals.bpDia}
                        </span>
                      )}
                      {item.hasVoiceNote && (
                        <span className="text-sky-400 flex items-center gap-0.5">
                          <Mic className="w-3 h-3" /> Audio
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clinical Triage Vitals Card */}
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Pharmacy Intake Vitals ({activePatient.patientName})</span>
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                <div className="text-[10px] text-slate-400">Blood Pressure</div>
                <div className="text-sm font-black text-white mt-0.5">
                  {activePatient.vitals.bpSys ? `${activePatient.vitals.bpSys}/${activePatient.vitals.bpDia}` : "N/A"}
                </div>
                <div className={`text-[9px] mt-1 px-1 py-0.5 rounded text-center font-bold ${bpStatus.badgeClass}`}>
                  {bpStatus.message}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                <div className="text-[10px] text-slate-400">Temperature</div>
                <div className="text-sm font-black text-white mt-0.5">
                  {activePatient.vitals.temp ? `${activePatient.vitals.temp} °F` : "N/A"}
                </div>
                <div className={`text-[9px] mt-1 px-1 py-0.5 rounded text-center font-bold ${tempStatus.badgeClass}`}>
                  {tempStatus.message}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                <div className="text-[10px] text-slate-400">Blood Sugar</div>
                <div className="text-sm font-black text-white mt-0.5">
                  {activePatient.vitals.sugar ? `${activePatient.vitals.sugar} mg/dL` : "N/A"}
                </div>
                <div className={`text-[9px] mt-1 px-1 py-0.5 rounded text-center font-bold ${sugarStatus.badgeClass}`}>
                  {sugarStatus.message}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                <div className="text-[10px] text-slate-400">Pulse Rate</div>
                <div className="text-sm font-black text-white mt-0.5">
                  {activePatient.vitals.pulse ? `${activePatient.vitals.pulse} bpm` : "N/A"}
                </div>
                <div className={`text-[9px] mt-1 px-1 py-0.5 rounded text-center font-bold ${pulseStatus.badgeClass}`}>
                  {pulseStatus.message}
                </div>
              </div>
            </div>

            {/* Complaints Tags */}
            <div className="mt-3">
              <div className="text-[10px] text-slate-400 font-bold uppercase mb-1.5">Complaints Recorded:</div>
              <div className="flex flex-wrap gap-1">
                {activePatient.complaints.map((c, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-slate-700 text-slate-200">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Triage Voice Note */}
            {activePatient.hasVoiceNote && (
              <div className="mt-3 p-2.5 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsPlayingAudio(!isPlayingAudio);
                      setTimeout(() => setIsPlayingAudio(false), 3000);
                    }}
                    className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-500"
                  >
                    <Play className={`w-4 h-4 ${isPlayingAudio ? "animate-spin" : ""}`} />
                  </button>
                  <div>
                    <div className="text-xs font-bold text-white">Pharmacy Triage Audio (15s)</div>
                    <div className="text-[10px] text-slate-400">Patient Voice Note in Saraiki</div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <div className={`w-1 bg-emerald-500 rounded-full ${isPlayingAudio ? "animate-wave-1" : "h-3"}`} />
                  <div className={`w-1 bg-emerald-500 rounded-full ${isPlayingAudio ? "animate-wave-2" : "h-4"}`} />
                  <div className={`w-1 bg-emerald-500 rounded-full ${isPlayingAudio ? "animate-wave-3" : "h-2"}`} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: CONSULTATION ROOM & PRESCRIPTION MAKER (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Active Call / Video Area */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            {/* Consultation Top Bar */}
            <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-bold text-white">
                  Consulting: {activePatient.patientName} (Token #{activePatient.tokenNumber})
                </span>
                <span className="text-xs text-slate-400">• {activePatient.village}</span>
              </div>

              {/* 3-Tier Adaptive Connectivity Switcher */}
              <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setMediaTier("VIDEO")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    mediaTier === "VIDEO" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  HD Video
                </button>
                <button
                  onClick={() => setMediaTier("VOIP_AUDIO")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    mediaTier === "VOIP_AUDIO" ? "bg-sky-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  VoIP Audio
                </button>
                <button
                  onClick={() => setMediaTier("VOICE_NOTES")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    mediaTier === "VOICE_NOTES" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Walkie-Talkie (River Belt)
                </button>
              </div>
            </div>

            {/* Video / Audio Canvas */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center p-4">
              {mediaTier === "VIDEO" && (
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center mx-auto mb-3 border-2 border-emerald-500">
                      <Users className="w-10 h-10" />
                    </div>
                    <h4 className="font-bold text-white text-base">{activePatient.patientName}</h4>
                    <p className="text-xs text-emerald-400 font-mono mt-1">
                      WebRTC Video Connected • 720p @ 30fps (Signal: Good)
                    </p>
                  </div>

                  {/* Doctor Self-View Picture-in-Picture */}
                  <div className="absolute bottom-3 right-3 w-28 h-20 bg-slate-800 rounded-xl border-2 border-slate-700 overflow-hidden flex items-center justify-center">
                    <span className="text-[10px] text-slate-400">Doctor View (Self)</span>
                  </div>
                </div>
              )}

              {mediaTier === "VOIP_AUDIO" && (
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-sky-950 text-sky-300 flex items-center justify-center mx-auto mb-3 border-2 border-sky-500 animate-pulse">
                    <Volume2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-white text-base">{activePatient.patientName}</h4>
                  <p className="text-xs text-sky-400 font-mono mt-1">
                    VoIP Audio Stream (32 kbps Opus Narrowband) • Crystal Clear
                  </p>
                </div>
              )}

              {mediaTier === "VOICE_NOTES" && (
                <div className="text-center max-w-sm">
                  <div className="w-16 h-16 rounded-full bg-amber-950 text-amber-300 flex items-center justify-center mx-auto mb-3 border-2 border-amber-500">
                    <Mic className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-white text-sm">River-Belt Asynchronous Walkie-Talkie Mode</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Signal drops handled automatically. Record audio clip to send directly to patient phone.
                  </p>
                  <button className="mt-3 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs">
                    🎤 Record Doctor Voice Instruction (15s)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Hybrid Prescription Generator */}
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div>
                <h3 className="font-black text-sm text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Hybrid Prescription Generator / نسخہ فارم</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Select digital medicines or snap 1-click photo of your clinic pad
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="flex gap-1 bg-slate-900 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setRxMode("digital")}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    rxMode === "digital" ? "bg-[#0b5e36] text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Digital Catalog
                </button>
                <button
                  type="button"
                  onClick={() => setRxMode("pad_photo")}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    rxMode === "pad_photo" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Pad Camera Upload
                </button>
              </div>
            </div>

            {rxMode === "digital" ? (
              <div className="mt-4 space-y-4">
                {/* Quick Add Chips */}
                <div>
                  <div className="text-[11px] text-slate-400 font-bold uppercase mb-1.5">
                    Quick Add Top Medicines:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {COMMON_MEDICINES.map((med) => (
                      <button
                        key={med}
                        type="button"
                        onClick={() => addMedicine(med)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-700 text-slate-300 border border-slate-700"
                      >
                        + {med.split(" (")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Meds List */}
                <div className="space-y-2">
                  {selectedMeds.map((med, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
                    >
                      <div className="font-bold text-white">{med.name}</div>
                      <div className="flex items-center gap-2">
                        <select
                          value={med.dose}
                          onChange={(e) => {
                            const updated = [...selectedMeds];
                            updated[idx].dose = e.target.value;
                            setSelectedMeds(updated);
                          }}
                          className="bg-slate-800 text-slate-200 border border-slate-700 px-2 py-1 rounded-lg text-xs"
                        >
                          <option value="1+1+1 (Subah Sham Dopahar)">1+1+1 (Subah Sham Dopahar)</option>
                          <option value="1+0+1 (Subah Sham)">1+0+1 (Subah Sham)</option>
                          <option value="0+0+1 (Raat ko)">0+0+1 (Raat ko)</option>
                          <option value="1 Tab Rozana">1 Tab Rozana</option>
                        </select>

                        <select
                          value={med.days}
                          onChange={(e) => {
                            const updated = [...selectedMeds];
                            updated[idx].days = e.target.value;
                            setSelectedMeds(updated);
                          }}
                          className="bg-slate-800 text-slate-200 border border-slate-700 px-2 py-1 rounded-lg text-xs"
                        >
                          <option value="3 Din">3 Din</option>
                          <option value="5 Din">5 Din</option>
                          <option value="7 Din">7 Din</option>
                          <option value="1 Mahina">1 Mahina</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => removeMedicine(idx)}
                          className="text-red-400 hover:text-red-300 text-xs px-1.5"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Instructions */}
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    Special Advice / ہدایات
                  </label>
                  <input
                    type="text"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>
            ) : (
              /* Pad Camera Upload */
              <div className="mt-4 text-center p-6 border-2 border-dashed border-slate-700 rounded-2xl bg-slate-900">
                <Camera className="w-10 h-10 text-indigo-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white">Snap Official Clinic Pad</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Write prescription on your clinic letterhead and snap a photo. We will crop and send it to the patient and medical store.
                </p>
                <button
                  type="button"
                  onClick={() => setHasPadPhoto(true)}
                  className={`mt-3 px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                    hasPadPhoto
                      ? "bg-emerald-600 text-white"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white"
                  }`}
                >
                  {hasPadPhoto ? "✓ Pad Photo Captured (Letterhead.jpg)" : "Open Camera / Upload Photo"}
                </button>
              </div>
            )}

            {/* Delivery Box */}
            <div className="mt-5 pt-4 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-400 text-center sm:text-left">
                <span>Auto-dispatches to: </span>
                <strong className="text-white">Patient WhatsApp</strong> &{" "}
                <strong className="text-emerald-400">{activePatient.pharmacyName}</strong>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleDeliverPrescription}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Sign & Deliver Rx (+ Rs. 880)</span>
                </button>

                <button
                  type="button"
                  onClick={handleCallNextPatient}
                  className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <span>Call Next Token</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
