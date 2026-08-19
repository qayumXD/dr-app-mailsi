"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  Video,
  Mic,
  Volume2,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowLeft,
  Download,
  Share2,
  MapPin,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

export default function PatientRoom({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"call" | "prescription" | "vitals">("call");
  const [isCalling, setIsCalling] = useState(false);
  const [mediaMode, setMediaMode] = useState<"VIDEO" | "AUDIO" | "VOICE_NOTES">("VIDEO");
  const [isRecordingNote, setIsRecordingNote] = useState(false);
  const [sentVoiceNotes, setSentVoiceNotes] = useState<Array<{ sender: string; duration: string; text: string }>>([
    { sender: "Doctor Tariq", duration: "12s", text: "Assalam o Alaikum, aapki BP report theek hai, pait dard ka bataiye." },
  ]);

  return (
    <div className="min-h-screen bg-emerald-950 text-slate-100 flex flex-col justify-between pb-8">
      {/* Top Bar */}
      <header className="bg-emerald-900/90 border-b border-emerald-800 p-4 sticky top-0 z-30">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-emerald-200">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black bg-amber-400 text-amber-950 px-2 py-0.5 rounded-md">
                  Token #1
                </span>
                <h1 className="font-bold text-sm sm:text-base text-white">Abdul Ghafoor</h1>
              </div>
              <p className="text-[11px] text-emerald-200">
                Mitro Village • Booking via Al-Madina Medical Store
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block mr-1.5 animate-pulse" />
            <span className="text-xs font-bold text-emerald-300">Doctor Live</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-lg mx-auto w-full px-4 mt-4 flex-1">
        {/* Navigation Switcher */}
        <div className="grid grid-cols-3 bg-emerald-900/60 p-1 rounded-2xl border border-emerald-800 mb-4">
          <button
            onClick={() => setActiveTab("call")}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "call" ? "bg-emerald-500 text-emerald-950 shadow-md font-black" : "text-emerald-300"
            }`}
          >
            Video / Audio Room
          </button>
          <button
            onClick={() => setActiveTab("prescription")}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "prescription" ? "bg-emerald-500 text-emerald-950 shadow-md font-black" : "text-emerald-300"
            }`}
          >
            Nuskha / نسخہ
          </button>
          <button
            onClick={() => setActiveTab("vitals")}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "vitals" ? "bg-emerald-500 text-emerald-950 shadow-md font-black" : "text-emerald-300"
            }`}
          >
            Vitals / علامات
          </button>
        </div>

        {/* TAB 1: CALL ROOM */}
        {activeTab === "call" && (
          <div className="space-y-4">
            {/* Live Queue Banner */}
            <div className="bg-emerald-900/80 border border-emerald-700 p-4 rounded-2xl text-center">
              <div className="text-xs text-emerald-300 font-medium">ڈاکٹر کا لائیو او پی ڈی سیشن</div>
              <h2 className="text-lg font-black text-amber-300 mt-0.5">
                ڈاکٹر محمد طارق آپ کا چیک اپ کر رہے ہیں
              </h2>
              <p className="text-xs text-emerald-200 mt-1">
                Child Specialist & Pediatrician • THQ Hospital Mailsi
              </p>
            </div>

            {/* Video / Call Container */}
            <div className="bg-slate-900 rounded-2xl border border-emerald-800 aspect-video flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
              {mediaMode === "VIDEO" && (
                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-900 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-3 animate-pulse">
                    <Stethoscope className="w-8 h-8 text-emerald-300" />
                  </div>
                  <h3 className="font-bold text-white text-base">Dr. Muhammad Tariq</h3>
                  <p className="text-xs text-emerald-400 font-mono mt-1">
                    {isCalling ? "● Live 720p HD Video Connected" : "Ready to Connect with Doctor"}
                  </p>
                </div>
              )}

              {mediaMode === "AUDIO" && (
                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-sky-900 border-2 border-sky-400 flex items-center justify-center mx-auto mb-3 animate-pulse">
                    <Volume2 className="w-8 h-8 text-sky-300" />
                  </div>
                  <h3 className="font-bold text-white text-base">Low-Bandwidth Voice Call</h3>
                  <p className="text-xs text-sky-400 font-mono mt-1">32 kbps Clean Voice Mode</p>
                </div>
              )}

              {mediaMode === "VOICE_NOTES" && (
                <div className="text-center p-4 max-w-xs">
                  <div className="w-14 h-14 rounded-full bg-amber-900 border-2 border-amber-400 flex items-center justify-center mx-auto mb-2">
                    <Mic className="w-7 h-7 text-amber-300" />
                  </div>
                  <h3 className="font-bold text-white text-sm">River-Belt Voice Note Mode</h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Weak 4G? Record 15-second voice notes directly to the doctor.
                  </p>
                </div>
              )}

              {/* Mode Badges */}
              <div className="absolute bottom-3 flex gap-1.5 bg-slate-950/80 p-1 rounded-xl">
                <button
                  onClick={() => setMediaMode("VIDEO")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                    mediaMode === "VIDEO" ? "bg-emerald-600 text-white" : "text-slate-400"
                  }`}
                >
                  Video
                </button>
                <button
                  onClick={() => setMediaMode("AUDIO")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                    mediaMode === "AUDIO" ? "bg-sky-600 text-white" : "text-slate-400"
                  }`}
                >
                  Audio Only
                </button>
                <button
                  onClick={() => setMediaMode("VOICE_NOTES")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                    mediaMode === "VOICE_NOTES" ? "bg-amber-600 text-white" : "text-slate-400"
                  }`}
                >
                  Walkie-Talkie
                </button>
              </div>
            </div>

            {/* Big Action Buttons */}
            {mediaMode !== "VOICE_NOTES" ? (
              <button
                onClick={() => setIsCalling(!isCalling)}
                className={`w-full py-4 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-105 ${
                  isCalling
                    ? "bg-red-600 hover:bg-red-500 text-white"
                    : "bg-emerald-500 hover:bg-emerald-400 text-emerald-950"
                }`}
              >
                <PhoneCall className="w-5 h-5 animate-bounce" />
                <span>{isCalling ? "End Call (کال ختم کریں)" : "Doctor se Video Call Karein (کال شروع کریں)"}</span>
              </button>
            ) : (
              /* Walkie Talkie Thread */
              <div className="space-y-3">
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Audio Messages:</div>
                  {sentVoiceNotes.map((note, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs">
                      <div className="flex justify-between text-[10px] text-emerald-300 font-bold">
                        <span>{note.sender}</span>
                        <span>{note.duration}</span>
                      </div>
                      <p className="text-slate-200 mt-1">{note.text}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setIsRecordingNote(true);
                    setTimeout(() => {
                      setIsRecordingNote(false);
                      setSentVoiceNotes((prev) => [
                        ...prev,
                        { sender: "Abdul Ghafoor (You)", duration: "10s", text: "Doctor Sahab, bukhar 2 din se tez hai." },
                      ]);
                    }, 1500);
                  }}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all ${
                    isRecordingNote
                      ? "bg-red-600 text-white animate-pulse"
                      : "bg-amber-500 hover:bg-amber-400 text-amber-950"
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>{isRecordingNote ? "Recording Voice Note..." : "Hold / Tap to Record Voice Note (وائس نوٹ)"}</span>
                </button>
              </div>
            )}

            {/* Emergency Notice */}
            <div className="bg-red-950/60 border border-red-800/80 p-3 rounded-xl text-center text-xs text-red-200">
              <span className="font-bold">⚠️ ایمرجنسی وارننگ: </span>
              شدید ایمرجنسی کی صورت میں فوری تحصیل ہیڈ کوارٹر ہسپتال میلسی تشریف لے جائیں۔
            </div>
          </div>
        )}

        {/* TAB 2: PRESCRIPTION PASS */}
        {activeTab === "prescription" && (
          <div className="bg-white text-slate-900 rounded-2xl p-5 border-2 border-emerald-600 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-black text-base text-slate-900">Dr. Muhammad Tariq</h3>
                <p className="text-xs text-slate-600">MBBS, FCPS • THQ Hospital Mailsi</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-black bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md">
                  Rx #9842
                </span>
                <div className="text-[10px] text-slate-500 mt-0.5">Date: Today</div>
              </div>
            </div>

            {/* Patient Header */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-500">Patient: </span>
                <span className="font-bold text-slate-800">Abdul Ghafoor (52y / M)</span>
              </div>
              <div>
                <span className="text-slate-500">Village: </span>
                <span className="font-bold text-slate-800">Mitro</span>
              </div>
            </div>

            {/* Medicines List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Prescribed Medicines (ادویات)
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-slate-900">1. Panadol 500mg Tablet</div>
                    <div className="text-slate-600 text-[11px]">1 گولی صبح، دوپہر، شام (3 دن)</div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                    Bukhar
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-slate-900">2. Flagyl 400mg Tablet</div>
                    <div className="text-slate-600 text-[11px]">1 گولی صبح اور شام کھانے کے بعد (3 دن)</div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                    Pait Dard
                  </span>
                </div>
              </div>
            </div>

            {/* Pharmacy Fulfillment Notice */}
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>دوا حاصل کرنے کی جگہ:</span>
              </div>
              <p className="text-emerald-800 text-[11px] mt-1">
                یہ نسخہ خودکار طور پر <strong>المدینہ میڈیکل اسٹور (مترو)</strong> کے پاس پہنچ چکا ہے۔ آپ واپسی پر وہیں سے دوائیاں لے سکتے ہیں۔
              </p>
            </div>

            <button
              onClick={() => alert("Prescription PDF downloaded to phone!")}
              className="w-full py-3 rounded-xl bg-[#0b5e36] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-700"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Prescription PDF</span>
            </button>
          </div>
        )}

        {/* TAB 3: VITALS */}
        {activeTab === "vitals" && (
          <div className="bg-emerald-900/80 rounded-2xl p-5 border border-emerald-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Vitals Recorded at Mitro Pharmacy</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Blood Pressure</div>
                <div className="text-lg font-black text-amber-300">145 / 92</div>
                <div className="text-[10px] text-amber-400">Elevated</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Temperature</div>
                <div className="text-lg font-black text-red-400">101.4 °F</div>
                <div className="text-[10px] text-red-400">Bukhar (Fever)</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Blood Sugar</div>
                <div className="text-lg font-black text-emerald-400">155 mg/dL</div>
                <div className="text-[10px] text-emerald-400">Random</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Pulse Rate</div>
                <div className="text-lg font-black text-emerald-400">88 bpm</div>
                <div className="text-[10px] text-emerald-400">Normal</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-[11px] text-emerald-400/80 mt-6">
        Mailsi Telehealth • Zero-Install Web Experience
      </footer>
    </div>
  );
}
