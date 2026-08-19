"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Store,
  UserPlus,
  Activity,
  Mic,
  Camera,
  Coins,
  Send,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Pill,
  ChevronRight,
  ArrowLeft,
  RefreshCw,
  Phone,
  ShieldCheck,
  Share2,
} from "lucide-react";
import {
  evaluateBloodPressure,
  evaluateBloodSugar,
  evaluateTemperature,
  evaluatePulse,
} from "@/lib/vitals";

// Mock Doctors for selection
const DOCTORS = [
  {
    id: "doc-1",
    name: "Dr. Muhammad Tariq",
    specialization: "Child Specialist & Pediatrician",
    city: "Mailsi",
    hospital: "THQ Hospital Mailsi & Tariq Clinic",
    fee: 1000,
    isOnline: true,
  },
  {
    id: "doc-2",
    name: "Dr. Farzana Kausar",
    specialization: "Gynecologist & Obstetrician",
    city: "Mailsi",
    hospital: "Mailsi Maternity Hospital",
    fee: 1200,
    isOnline: false,
  },
  {
    id: "doc-3",
    name: "Dr. Shahzad Ahmad",
    specialization: "General Physician & Diabetologist",
    city: "Mailsi",
    hospital: "Shifa Clinic Mailsi",
    fee: 800,
    isOnline: true,
  },
  {
    id: "doc-4",
    name: "Dr. Kamran Malik",
    specialization: "Consultant Cardiologist (Dil ke Mahir)",
    city: "Multan",
    hospital: "Fatima Medical Complex Multan",
    fee: 2000,
    isOnline: true,
  },
];

const VILLAGES = [
  "Mitro (18 km)",
  "Karampur (22 km)",
  "Jallah Jeem (24 km - River Belt)",
  "Tibba Sultanpur (26 km)",
  "Sargana (20 km)",
  "Mailsi City",
];

const COMPLAINT_TAGS = [
  "Bukhar / Fever",
  "Khansi / Cough",
  "Pait Dard / Stomach",
  "Bachon ki Bemari / Pediatric",
  "Khavateen / Gynae",
  "Jild / Skin Rash",
  "Joron ka Dard / Joints",
  "Sugar / Diabetes Check",
  "Blood Pressure Check",
];

export default function PharmacyPortal() {
  const [activeTab, setActiveTab] = useState<"intake" | "dispensing" | "ledger">("intake");

  // Form State
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("Male");
  const [patientPhone, setPatientPhone] = useState("");
  const [village, setVillage] = useState(VILLAGES[0]);

  // Vitals
  const [bpSys, setBpSys] = useState<number | undefined>(undefined);
  const [bpDia, setBpDia] = useState<number | undefined>(undefined);
  const [sugar, setSugar] = useState<number | undefined>(undefined);
  const [temp, setTemp] = useState<number | undefined>(undefined);
  const [pulse, setPulse] = useState<number | undefined>(undefined);

  // Complaints & Media
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [hasRxPhoto, setHasRxPhoto] = useState(false);

  // Doctor & Mode
  const [selectedDoctorId, setSelectedDoctorId] = useState(DOCTORS[0].id);
  const [consultType, setConsultType] = useState<"REMOTE_VIDEO" | "IN_CLINIC_PHYSICAL">("REMOTE_VIDEO");

  // Wallet & Success
  const [walletBalance, setWalletBalance] = useState(1860); // Owed to platform
  const [todayCommission, setTodayCommission] = useState(140); // Earned cash
  const [issuedToken, setIssuedToken] = useState<any>(null);

  // Mock Incoming Prescriptions to dispense
  const [prescriptions, setPrescriptions] = useState([
    {
      id: "rx-1",
      token: 1,
      patientName: "Abdul Ghafoor",
      doctorName: "Dr. Muhammad Tariq",
      village: "Mitro",
      medicines: [
        { name: "Panadol 500mg (Tab)", dose: "1+1+1 (3 Din)", available: true },
        { name: "Amoxil 250mg (Cap)", dose: "1+0+1 (5 Din)", available: true },
        { name: "Flagyl 400mg (Tab)", dose: "1+0+1 (3 Din)", available: true },
      ],
      dispensed: false,
    },
  ]);

  const selectedDoctor = DOCTORS.find((d) => d.id === selectedDoctorId) || DOCTORS[0];

  // Fee calculation (88-7-5)
  const totalFee = selectedDoctor.fee;
  const storeCut = Math.round(totalFee * 0.07);
  const doctorCut = Math.round(totalFee * 0.88);
  const platformCut = totalFee - storeCut - doctorCut;

  const bpStatus = evaluateBloodPressure(bpSys, bpDia);
  const sugarStatus = evaluateBloodSugar(sugar);
  const tempStatus = evaluateTemperature(temp);
  const pulseStatus = evaluatePulse(pulse);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) {
      alert("Baraye meherbani Mareez ka Naam aur Phone number darj karein!");
      return;
    }

    const tokenNumber = Math.floor(Math.random() * 20) + 1;
    const newToken = {
      tokenId: `apt-token-${Date.now().toString().slice(-4)}`,
      tokenNumber,
      patientName,
      patientPhone,
      village,
      doctorName: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      fee: totalFee,
      storeCut,
      consultType,
      date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Update wallet
    setWalletBalance((prev) => prev + (totalFee - storeCut));
    setTodayCommission((prev) => prev + storeCut);
    setIssuedToken(newToken);
  };

  const resetForm = () => {
    setPatientName("");
    setPatientAge("");
    setPatientPhone("");
    setBpSys(undefined);
    setBpDia(undefined);
    setSugar(undefined);
    setTemp(undefined);
    setPulse(undefined);
    setSelectedTags([]);
    setHasVoiceNote(false);
    setHasRxPhoto(false);
    setIssuedToken(null);
  };

  const toggleDispensed = (rxId: string) => {
    setPrescriptions((prev) =>
      prev.map((rx) => (rx.id === rxId ? { ...rx, dispensed: !rx.dispensed } : rx))
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-[#0b5e36] text-white px-4 py-3 shadow-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-amber-300" />
                <h1 className="font-black text-base sm:text-lg tracking-tight">Al-Madina Medical Store</h1>
              </div>
              <p className="text-[11px] text-emerald-200 font-medium">
                Mitro Village (18 km from Mailsi) • Agent Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-900/70 border border-emerald-700 px-3 py-1.5 rounded-xl text-right">
            <div>
              <div className="text-[10px] text-emerald-300 font-bold uppercase">Today&apos;s Cut (نقد کمیشن)</div>
              <div className="text-sm font-black text-amber-300">Rs. {todayCommission}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 mt-4">
        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm mb-4">
          <button
            onClick={() => { setActiveTab("intake"); setIssuedToken(null); }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "intake"
                ? "bg-[#0b5e36] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>New Intake (نیا مریض)</span>
          </button>

          <button
            onClick={() => setActiveTab("dispensing")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "dispensing"
                ? "bg-[#0b5e36] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Pill className="w-4 h-4" />
            <span>Prescriptions (نسخے)</span>
            <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {prescriptions.filter(p => !p.dispensed).length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("ledger")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "ledger"
                ? "bg-[#0b5e36] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Cash Wallet (حساب)</span>
          </button>
        </div>

        {/* TAB 1: INTAKE & TRIAGE FORM */}
        {activeTab === "intake" && (
          <div>
            {!issuedToken ? (
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-600" />
                      <span>60-Second Rapid Patient Triage</span>
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      بنیادی معلومات اور علامات درج کر کے فوری ٹوکن جاری کریں
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-900 px-2 py-1 rounded-md">
                      Instant 7% Cut: Rs. {storeCut}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  {/* Step 1: Patient Identity */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      1. Patient Details / مریض کی تفصیلات
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Full Name (نام) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Muhammad Aslam"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className="w-full text-sm px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50 font-medium"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Age (عمر) & Gender *
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            required
                            placeholder="Age"
                            value={patientAge}
                            onChange={(e) => setPatientAge(e.target.value)}
                            className="w-20 text-sm px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50 font-medium"
                          />
                          <select
                            value={patientGender}
                            onChange={(e) => setPatientGender(e.target.value)}
                            className="flex-1 text-sm px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50 font-medium"
                          >
                            <option value="Male">Male (مرد)</option>
                            <option value="Female">Female (عورت)</option>
                            <option value="Child">Child (بچہ)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          WhatsApp / Mobile *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="0300-1234567"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          className="w-full text-sm px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50 font-medium"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Village (گاؤں / علاقہ)
                        </label>
                        <select
                          value={village}
                          onChange={(e) => setVillage(e.target.value)}
                          className="w-full text-sm px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50 font-medium"
                        >
                          {VILLAGES.map((v) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Vitals Matrix */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-emerald-600" />
                        <span>2. Basic Vitals (بلڈ پریشر اور نبض) — Optional</span>
                      </h3>
                      <span className="text-[11px] text-slate-500">Auto-evaluates clinical danger signs</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          Blood Pressure (BP)
                        </label>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            placeholder="Sys 120"
                            value={bpSys ?? ""}
                            onChange={(e) => setBpSys(e.target.value ? Number(e.target.value) : undefined)}
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                          />
                          <span>/</span>
                          <input
                            type="number"
                            placeholder="Dia 80"
                            value={bpDia ?? ""}
                            onChange={(e) => setBpDia(e.target.value ? Number(e.target.value) : undefined)}
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                          />
                        </div>
                        {bpSys && (
                          <div className={`mt-1 text-[10px] px-1.5 py-0.5 rounded border ${bpStatus.badgeClass}`}>
                            {bpStatus.message}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          Blood Sugar (mg/dL)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 140"
                          value={sugar ?? ""}
                          onChange={(e) => setSugar(e.target.value ? Number(e.target.value) : undefined)}
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                        {sugar && (
                          <div className={`mt-1 text-[10px] px-1.5 py-0.5 rounded border ${sugarStatus.badgeClass}`}>
                            {sugarStatus.message}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          Temperature (°F)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="e.g. 99.4"
                          value={temp ?? ""}
                          onChange={(e) => setTemp(e.target.value ? Number(e.target.value) : undefined)}
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                        {temp && (
                          <div className={`mt-1 text-[10px] px-1.5 py-0.5 rounded border ${tempStatus.badgeClass}`}>
                            {tempStatus.message}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          Pulse Rate (bpm)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 78"
                          value={pulse ?? ""}
                          onChange={(e) => setPulse(e.target.value ? Number(e.target.value) : undefined)}
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                        {pulse && (
                          <div className={`mt-1 text-[10px] px-1.5 py-0.5 rounded border ${pulseStatus.badgeClass}`}>
                            {pulseStatus.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Quick Complaint Tags & Voice Note */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      3. Complaints & Voice Note / علامات اور آڈیو
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {COMPLAINT_TAGS.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all ${
                              isSelected
                                ? "bg-emerald-800 text-white border-emerald-900 shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsRecordingVoice(true);
                          setTimeout(() => {
                            setIsRecordingVoice(false);
                            setHasVoiceNote(true);
                          }, 1500);
                        }}
                        className={`flex items-center gap-2 text-xs px-3.5 py-2 rounded-xl border font-semibold transition-all ${
                          hasVoiceNote
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : isRecordingVoice
                            ? "bg-red-100 text-red-700 border-red-300 animate-pulse"
                            : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <Mic className={`w-4 h-4 ${isRecordingVoice ? "text-red-600 animate-bounce" : "text-emerald-700"}`} />
                        <span>{hasVoiceNote ? "✓ Voice Note Recorded (15s)" : isRecordingVoice ? "Recording Audio..." : "Record Voice Note (وائس نوٹ)"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setHasRxPhoto(true)}
                        className={`flex items-center gap-2 text-xs px-3.5 py-2 rounded-xl border font-semibold transition-all ${
                          hasRxPhoto
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <Camera className="w-4 h-4 text-sky-600" />
                        <span>{hasRxPhoto ? "✓ Old Prescription Photo Attached" : "Snap Old Rx / Lab Report"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Step 4: Doctor Selection & Modality */}
                  <div className="border-t border-slate-200 pt-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      4. Doctor Selection & Modality / ڈاکٹر اور چیک اپ موڈ
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {DOCTORS.map((doc) => {
                        const isSelected = selectedDoctorId === doc.id;
                        return (
                          <div
                            key={doc.id}
                            onClick={() => setSelectedDoctorId(doc.id)}
                            className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                              isSelected
                                ? "border-emerald-600 bg-emerald-50/50 shadow-sm"
                                : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="font-bold text-sm text-slate-900">{doc.name}</div>
                              <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                                Rs. {doc.fee}
                              </span>
                            </div>
                            <div className="text-xs text-slate-600 mt-0.5">{doc.specialization}</div>
                            <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                              <span>{doc.hospital}</span>
                              <span className={`font-semibold ${doc.isOnline ? "text-emerald-600" : "text-amber-600"}`}>
                                {doc.isOnline ? "• Available Today" : "• Tomorrow Slot"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="flex-1 w-full flex rounded-xl border border-slate-300 p-1 bg-slate-50">
                        <button
                          type="button"
                          onClick={() => setConsultType("REMOTE_VIDEO")}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                            consultType === "REMOTE_VIDEO"
                              ? "bg-emerald-700 text-white shadow-sm"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          Remote Online Checkup (گھر سے ویڈیو کال)
                        </button>
                        <button
                          type="button"
                          onClick={() => setConsultType("IN_CLINIC_PHYSICAL")}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                            consultType === "IN_CLINIC_PHYSICAL"
                              ? "bg-indigo-700 text-white shadow-sm"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          In-Clinic Priority Token (میلسی کلینک وزٹ)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Submission Box */}
                  <div className="bg-emerald-950 text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <div className="text-xs text-emerald-300 font-medium">Cash to Collect from Patient:</div>
                      <div className="text-2xl font-black text-amber-300">Rs. {totalFee}</div>
                      <div className="text-xs text-emerald-200 mt-0.5 flex items-center gap-2">
                        <span>Your 7% Cut: <strong>Rs. {storeCut}</strong> (Keep instantly)</span>
                        <span>•</span>
                        <span>Dr: <strong>Rs. {doctorCut}</strong></span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
                    >
                      <Send className="w-4 h-4" />
                      <span>Confirm & Send WhatsApp Token (ٹوکن جاری کریں)</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* SUCCESS TOKEN PASS CARD */
              <div className="bg-white rounded-2xl p-6 border-2 border-emerald-600 shadow-md text-center max-w-lg mx-auto">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-black text-slate-900">Token Generated Successfully!</h2>
                <p className="text-xs text-slate-500 mt-0.5">ٹوکن نمبر مریض کو واٹس ایپ پر ارسال کر دیا گیا ہے</p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 my-4 text-left space-y-2 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="font-bold text-slate-500">TOKEN NUMBER:</span>
                    <span className="text-2xl font-black text-emerald-800">#{issuedToken.tokenNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Patient Name:</span>
                    <span className="font-bold text-slate-800">{issuedToken.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Doctor:</span>
                    <span className="font-bold text-slate-800">{issuedToken.doctorName} ({issuedToken.specialization})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Village:</span>
                    <span className="font-bold text-slate-800">{issuedToken.village}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Checkup Mode:</span>
                    <span className="font-bold text-emerald-700">
                      {issuedToken.consultType === "REMOTE_VIDEO" ? "Remote Video Link" : "In-Clinic Priority Token"}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 font-bold">
                    <span className="text-slate-500">Cash Wasool:</span>
                    <span className="text-amber-800">Rs. {issuedToken.fee} (7% Cut: Rs. {issuedToken.storeCut} Kept)</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Link
                    href={`/c/${issuedToken.tokenId}`}
                    className="w-full py-2.5 rounded-xl bg-[#0b5e36] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-700"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Open Patient 1-Click WhatsApp Room</span>
                  </Link>

                  <button
                    onClick={resetForm}
                    className="w-full py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                  >
                    + Book Another Patient (اگلا مریض)
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INCOMING PRESCRIPTIONS & DISPENSING */}
        {activeTab === "dispensing" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Pill className="w-5 h-5 text-emerald-600" />
                  <span>Incoming Doctor Prescriptions for Dispensing</span>
                </h2>
                <p className="text-xs text-slate-500">
                  ڈاکٹرز کے جاری کردہ نسخے — دوائیاں تیار کر کے مریض کو دیں اور منافع کمائیں
                </p>
              </div>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg">
                Auto-Copied to Store
              </span>
            </div>

            {prescriptions.map((rx) => (
              <div
                key={rx.id}
                className={`bg-white rounded-2xl p-5 border-2 transition-all ${
                  rx.dispensed ? "border-slate-200 opacity-75" : "border-emerald-600 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md">
                        Token #{rx.token}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base">{rx.patientName}</h3>
                      <span className="text-xs text-slate-500">({rx.village})</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">Prescribed by {rx.doctorName}</p>
                  </div>

                  <button
                    onClick={() => toggleDispensed(rx.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      rx.dispensed
                        ? "bg-slate-200 text-slate-700"
                        : "bg-[#0b5e36] text-white hover:bg-emerald-700 shadow-sm"
                    }`}
                  >
                    {rx.dispensed ? "✓ Dispensed & Handed Over" : "Mark as Dispensed (دوا دے دی)"}
                  </button>
                </div>

                <div className="mt-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Medication List (دوا کی تفصیل)
                  </div>
                  <div className="space-y-2">
                    {rx.medicines.map((med, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="font-bold text-slate-800">{med.name}</span>
                          <span className="text-slate-500">— {med.dose}</span>
                        </div>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          In Stock (دستیاب)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: CASH WALLET & REMITTANCE LEDGER */}
        {activeTab === "ledger" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Unremitted Balance</div>
                <div className="text-2xl font-black text-slate-900 mt-1">Rs. {walletBalance}</div>
                <p className="text-[11px] text-slate-500 mt-1">Platform/Doctor cash held by store</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total 7% Cut Kept</div>
                <div className="text-2xl font-black text-emerald-700 mt-1">Rs. {todayCommission}</div>
                <p className="text-[11px] text-slate-500 mt-1">Direct cash in hand earnings</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Credit Limit Meter</div>
                <div className="text-2xl font-black text-indigo-700 mt-1">
                  {Math.round((walletBalance / 5000) * 100)}%
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${Math.min((walletBalance / 5000) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Max Ceiling: Rs. 5,000 before lock</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-slate-600" />
                <span>1-Click Weekly Settlement via JazzCash / Easypaisa</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                You can remit the accumulated platform/doctor balance to the central Mailsi Pilot Account via JazzCash/Easypaisa to clear your credit meter.
              </p>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-emerald-950">Mailsi Pilot Escrow Raast / JazzCash:</div>
                  <div className="font-mono text-emerald-800 text-sm font-black">0300-0000000 (Title: Mailsi Telehealth Ops)</div>
                </div>
                <button
                  onClick={() => {
                    setWalletBalance(0);
                    alert("✅ Settlement request submitted! Admin will verify and reset balance.");
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0b5e36] text-white font-bold text-xs hover:bg-emerald-700"
                >
                  Simulate Settlement (حساب کلیئر کریں)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
