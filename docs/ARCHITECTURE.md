# System Architecture & Technical Specifications

This document defines the architectural blueprint, data flows, fallback strategies, and communication protocols for the Mailsi Telehealth & Clinic Queue Platform.

---

## 1. High-Level Architecture

```
                                  ┌────────────────────────┐
                                  │   WhatsApp Cloud API   │
                                  │   / Local SMS Gateway  │
                                  └───────────┬────────────┘
                                              │ (OTP / Tokens / 1-Click Link / Rx PDF)
                                              ▼
┌───────────────────────┐         ┌────────────────────────┐         ┌───────────────────────┐
│ Pharmacy Agent Portal │         │   Patient Zero-Install │         │ Doctor & Clinic Suite │
│  (Next.js PWA)        │         │   (WebRTC Link Room)   │         │ (Next.js PWA / Web)   │
└───────────┬───────────┘         └───────────┬────────────┘         └───────────┬───────────┘
            │                                 │                                  │
            │ HTTPS / WebSocket               │ WebRTC / Audio Stream            │ HTTPS / WebRTC
            ▼                                 ▼                                  ▼
┌────────────────────────────────────────────────────────────────────────────────────────────┐
│                                Next.js Application Server                                  │
│  • App Router (Role-Based Access: Admin, Doctor, Pharmacy, Compounder, Patient)            │
│  • API Route Handlers (Triage, Appointments, Ledger, Real-time Queue Socket)               │
│  • WebRTC Signaling & Media Session Coordinator                                            │
│  • Voice-Note Transcoding & Audio Fallback Pipeline                                        │
└─────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                              │
                                              ▼
┌────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   Data & Storage Layer                                     │
│  • Prisma ORM (PostgreSQL / SQLite for local development)                                  │
│  • Object Storage (Prescription Letterhead Scans, Voice Note Audio Blobs, Lab Reports)      │
│  • Redis / In-Memory Cache (Live Queue State, Token Counters, Active Doctor Status)        │
└────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Data Models (Prisma Schema Reference)

```prisma
datasource db {
  provider = "postgresql" // or "sqlite" during local dev
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  ADMIN
  DOCTOR
  PHARMACY_AGENT
  CLINIC_STAFF
  PATIENT
}

enum AppointmentType {
  REMOTE_VIDEO
  IN_CLINIC_PHYSICAL
}

enum AppointmentStatus {
  SCHEDULED
  PRE_ALERT_SENT
  IN_PROGRESS
  COMPLETED
  DOCTOR_DELAYED
  CANCELLED
  NO_SHOW
}

enum ConsultationMediaMode {
  VIDEO_WEBRTC
  VOIP_AUDIO_ONLY
  ASYNC_VOICE_NOTES
}

model User {
  id            String         @id @default(cuid())
  phone         String         @unique
  fullName      String
  role          Role           @default(PATIENT)
  passwordHash  String?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  doctorProfile DoctorProfile?
  pharmacy      Pharmacy?
  appointments  Appointment[]  @relation("PatientAppointments")
}

model DoctorProfile {
  id                String         @id @default(cuid())
  userId            String         @unique
  user              User           @relation(fields: [userId], references: [id])
  pmdcNumber        String?
  specialization    String         // e.g. "Child Specialist", "Gynaecologist", "General Physician"
  qualification     String         // e.g. "MBBS, FCPS"
  city              String         // "Mailsi", "Multan", "Vehari"
  hospitalOrClinic  String         // e.g. "THQ Mailsi / Private Clinic", "Fatima Medical Complex Multan"
  consultationFee   Int            // e.g. 1000 (PKR)
  isOnlineForOpd    Boolean        @default(false)
  opdStartTime      String?        // e.g. "17:00"
  opdEndTime        String?        // e.g. "20:00"
  appointments      Appointment[]
}

model Pharmacy {
  id                String         @id @default(cuid())
  userId            String         @unique
  user              User           @relation(fields: [userId], references: [id])
  storeName         String         // e.g. "Al-Madina Medical Store"
  ownerName         String
  locationArea      String         // e.g. "Mitro", "Karampur", "Jallah Jeem", "Mailsi City"
  distanceFromCity  Int            // km from Mailsi center (e.g. 22)
  walletBalance     Float          @default(0.0) // Tracks net balance owed to platform
  totalCommission   Float          @default(0.0) // Cumulative 7% earnings
  creditLimit       Float          @default(5000.0) // Max cash hold limit before settlement
  appointments      Appointment[]  @relation("ReferringPharmacy")
  ledgerEntries     LedgerEntry[]
}

model Appointment {
  id                String                @id @default(cuid())
  tokenNumber       Int
  appointmentDate   DateTime              @default(now())
  type              AppointmentType       @default(REMOTE_VIDEO)
  status            AppointmentStatus     @default(SCHEDULED)
  mediaMode         ConsultationMediaMode @default(VIDEO_WEBRTC)

  // Participants
  patientId         String
  patient           User                  @relation("PatientAppointments", fields: [patientId], references: [id])
  doctorId          String
  doctor            DoctorProfile         @relation(fields: [doctorId], references: [id])
  pharmacyId        String?
  pharmacy          Pharmacy?             @relation("ReferringPharmacy", fields: [pharmacyId], references: [id])

  // Triage & Vitals (Recorded by Pharmacy in < 60s)
  bloodPressureSys  Int?                  // e.g. 120
  bloodPressureDia  Int?                  // e.g. 80
  bloodSugar        Int?                  // e.g. 140 mg/dL
  temperature       Float?                // e.g. 99.4 F
  pulseRate         Int?                  // e.g. 78 bpm
  chiefComplaints   String?               // Tag list: "Fever, Chest congestion"
  voiceNoteUrl      String?               // Audio clip from pharmacy triage
  pastRxImages      String?               // JSON array of past prescription/report photos

  // Fee & Split
  totalFee          Int                   // e.g. 1000
  doctorShare       Int                   // 880 (88%)
  pharmacyShare     Int                   // 70 (7%)
  platformShare     Int                   // 50 (5%)
  isPaidCash        Boolean               @default(true)

  // Post-Consultation Output
  prescription      Prescription?
  inconsistencyLog  InconsistencyLog?

  createdAt         DateTime              @default(now())
  updatedAt         DateTime              @updatedAt
}

model Prescription {
  id                String         @id @default(cuid())
  appointmentId     String         @unique
  appointment       Appointment    @relation(fields: [appointmentId], references: [id])
  isHandwrittenPad  Boolean        @default(false)
  padPhotoUrl       String?        // Photo upload of official pad
  diagnosis         String?
  instructions      String?        // e.g. "Do baar khane ke baad"
  medicinesJson     String?        // Structured JSON list of medicines, dose, duration
  pdfUrl            String?        // Auto-generated printable PDF
  isDispensed       Boolean        @default(false) // Marked by village pharmacy when sold
  createdAt         DateTime       @default(now())
}

model InconsistencyLog {
  id                String         @id @default(cuid())
  appointmentId     String         @unique
  appointment       Appointment    @relation(fields: [appointmentId], references: [id])
  doctorDelayMins   Int            @default(0)
  callDropCount     Int            @default(0)
  switchedToVoice   Boolean        @default(false)
  packetLossAvg     Float?
  notes             String?
  createdAt         DateTime       @default(now())
}

model LedgerEntry {
  id                String         @id @default(cuid())
  pharmacyId        String
  pharmacy          Pharmacy       @relation(fields: [pharmacyId], references: [id])
  amount            Float
  type              String         // "COMMISSION_EARNED", "CASH_COLLECTED", "REMITTANCE_SETTLED"
  description       String
  createdAt         DateTime       @default(now())
}
```

---

## 3. The 3-Tier Adaptive Connectivity Protocol

In rural South Punjab (especially villages near the Sutlej river bank), 4G signals fluctuate heavily. The platform uses an adaptive degradation pipeline:

```
[ Tier 1: WebRTC Video Call ]
         │ (Bitrate > 250 kbps, Packet Loss < 5%)
         ▼
    Good Connection? ──► YES ──► HD Video + 2-Way Audio
         │ NO
         ▼
[ Tier 2: Low-Bitrate VoIP Audio ]
         │ (Bitrate 30-60 kbps, Adaptive Opus Codec)
         ▼
    Audio Clear? ────► YES ──► Crisp Voice-Only Checkup
         │ NO (< 20 kbps or disconnects > 2)
         ▼
[ Tier 3: Asynchronous Voice-Note Thread (Walkie-Talkie Mode) ]
         │
         ▼
    Doctor & Patient exchange recorded audio clips (10-30s)
    with instant waveform player and auto-retry upload.
```

---

## 4. Zero-Install Patient Web Architecture

To ensure 100% accessibility for elderly and low-tech rural users:
- **No App Store Requirement:** Everything runs directly in mobile Chrome/Safari.
- **WhatsApp Web Link:** Sent as `https://dr-app.pk/c/[token-id]`.
- **Pre-Authenticated Secure Token:** Uses a tamper-proof cryptographic token in the URL; patient never has to remember passwords or wait for failing SMS OTPs.
- **Live Queue Polling / WebSocket:** Displays real-time status in Urdu:
  > *"Aapka Token Number 4 hai. Doctor Sahab abhi Token 3 dekh rahe hain. Agla number aapka hai."*
