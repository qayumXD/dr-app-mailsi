# Product Specifications & User Interface Guide

This document defines the functional requirements, user interfaces, field validations, and screen workflows across all 5 platform modules.

---

## 1. Module 1: Pharmacy Agent Portal

### A. 60-Second Rapid Triage & Intake Form
* **Goal:** Enable a busy village medical store owner to onboard a walk-in patient in under 60 seconds.
* **Fields:**
  - **Patient Identity:** Full Name, Age (years), Gender (Male / Female / Other), WhatsApp / Mobile Number.
  - **Location Tag:** Village dropdown/search (e.g., Mitro, Karampur, Jallah Jeem, Sargana, Tibba Sultanpur, Mailsi City).
  - **Vitals Matrix (Optional but encouraged):**
    - Blood Pressure: Systolic / Diastolic (e.g. 120/80 mmHg).
    - Blood Sugar: Fasting or Random (mg/dL).
    - Temperature: (°F).
    - Pulse Rate: (bpm).
  - **Quick Complaint Tag Selector:** 1-tap chips (`Bukhar / Fever`, `Khansi / Cough`, `Pait Dard / Stomach`, `Joron ka Dard / Joints`, `Bachon ki Bemari / Pediatric`, `Khavateen / Gynae`, `Jild / Skin`, `Dil / Cardiology`).
  - **Voice Note & Media Capture:**
    - 1-Tap Mic button: Records 15–30s audio of patient describing symptoms in Punjabi / Saraiki / Urdu.
    - Camera upload: Up to 3 photos of old prescriptions, lab blood reports, or skin symptoms.
  - **Doctor & Slot Selection:**
    - Choose Doctor (filtered by specialty and location: Mailsi vs Multan).
    - Choose Mode: `Remote Online Checkup (From Home)` or `In-Clinic Priority Token (Physical Visit)`.
  - **Cash & Token Confirmation:**
    - Shows Total Fee (e.g. Rs. 1,000).
    - Shows Store's Instant Commission (+ Rs. 70).
    - 1-Tap "Confirm Booking & Send WhatsApp Token" button.

### B. Store Wallet & Balance Ledger
* Displays:
  - **Instant Earnings Today:** Total 7% commission earned in cash.
  - **Unremitted Platform Balance:** Cash collected on behalf of doctors/platform.
  - **Credit Limit Meter:** Progress bar showing balance vs Rs. 5,000 credit ceiling.
  - **1-Click Settlement Prompt:** Instructions to remit balance via JazzCash/Easypaisa/Raast with transaction ID submission.

### C. Pharmacy Dispensing / Incoming Rx Tab
* When a consultation completes, the prescription appears with patient name and medication list.
* Medical store owner checks boxes for medicines in stock, prepares packet, and clicks "Mark Dispensed".

---

## 2. Module 2: Doctor Consultation Suite

### A. Dynamic OPD Queue Manager
* **Session Switch:** "Start OPD Session" / "End Session".
* **Live Patient Queue:** Shows list of booked patients with token numbers, village name, and vitals summary.
* **Action Buttons:**
  - **"Call Next Patient":** Triggers 5-minute pre-alert WhatsApp/SMS to patient with 1-click room link.
  - **"Doctor Delayed 15 Mins":** One-click broadcast to all waiting patients in queue with revised estimated time.

### B. Pre-Call Patient Clinical Triage Card
* Displays:
  - Vitals strip (BP, Sugar, Temp, Pulse) with color-coded warning flags (e.g., BP > 140 highlighted in yellow/red).
  - Audio player for triage voice note recorded by the pharmacy.
  - Interactive image lightbox for previous prescription/lab report photos.

### C. Adaptive Consultation Room
* **Video/Audio View:** Real-time WebRTC stream with self-view and remote patient feed.
* **Signal Quality Indicator:** Shows connection quality (Green = Good, Yellow = Low Bandwidth, Red = Unstable).
* **Auto-Fallback Controls:**
  - "Switch to VoIP Audio Only" button.
  - "Switch to Voice-Note Thread" (Walkie-Talkie mode) for poor network connections.

### D. Hybrid Prescription Generator
* **Mode 1 (1-Click Pad Camera Upload):** Doctor writes by hand on standard clinic pad, snaps a photo with their phone/webcam, and clicks "Send Rx".
* **Mode 2 (Fast Digital Generator):**
  - Search medicine name (auto-complete top Pakistani brands: Panadol, Augmentin, Ciproxin, Brufen, Omeprazole, etc.).
  - Dosage presets: `1+0+1`, `1+1+1`, `0+0+1`, `Before Food`, `After Food`.
  - Duration presets: `3 Days`, `5 Days`, `7 Days`, `1 Month`.
  - 1-Tap "Sign & Deliver Rx": Automatically compiles PDF, sends to Patient WhatsApp, and copies to referring village pharmacy.

---

## 3. Module 3: Patient Zero-Install Experience

* **Access URL:** Unique cryptographic link received via WhatsApp/SMS (`/c/[token-id]`).
* **Zero-Friction Features:**
  - No account creation, password, or app store download required.
  - Bilingual interface (Urdu + English).
  - Live Queue Counter: *"Aapka Token: #4 | Abhi Chal Raha Hai: #3"*.
  - Call Join Screen: 1-Tap "Doctor se Baat Karein" button when called.
  - Interactive Voice-Note fallback if 4G video fails.
  - "Mera Nuskha / My Prescription" tab to view or download digital prescription PDF.

---

## 4. Module 4: Clinic Compounder Mobile Screen

* Designed for clinic receptionists / compounders at physical Mailsi clinics.
* Simple mobile-first list showing:
  - Token #, Patient Name, Referring Village Store, Booking Time.
  - Status toggle: "Not Arrived" $\rightarrow$ "In Waiting Room" $\rightarrow$ "With Doctor" $\rightarrow$ "Done".
  - Eliminates disputes between app-booked patients and walk-in parchi holders.

---

## 5. Module 5: Central Pilot Inconsistency & Ops Dashboard

* **Real-Time Anomaly Feed:**
  - Doctor delay alerts (>15 minutes late).
  - WebRTC call degradation logs and voice-note fallback rates.
  - Unresolved prescriptions (>10 minutes pending post-call).
* **Pharmacy Agent Leaderboard:**
  - Bookings per store, conversion rates, and wallet settlement status.
* **Financial Ledger Reconciliation:**
  - 88% Doctor / 7% Store / 5% Platform breakdown with exportable reports.
