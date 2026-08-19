# Mailsi Telehealth & Clinic Queue Platform

> **Empowering Rural Healthcare in South Punjab Through Assisted Telehealth & Smart Clinic Queues**

An assisted-telehealth and clinic queue management ecosystem designed specifically for peri-urban and rural Pakistan, starting with a pilot launch in **Mailsi Tehsil** (District Vehari, South Punjab) before expanding across South Punjab.

---

## 🌟 The Core Idea

In rural Pakistan, patients living 20–25 km away from city centers face massive barriers:
- **Travel Cost & Time:** Spending Rs. 4,000–10,000 and an entire day traveling to Multan or waiting 3–4 hours in chaotic local clinic queues ("Parchi system").
- **Low Tech Literacy:** Village patients struggle with complex mobile apps, OTP logins, and app store downloads.
- **Connectivity Gaps:** Weak 3G/4G signals (especially in Sutlej river-belt villages) cause video calls to stutter and fail.

### The Solution: The Assisted "Phygital" Network
Instead of forcing village patients to install an app, our platform turns **trusted local village medical stores and small pharmacies into frontline healthcare access hubs**:

1. **60-Second Triage at Local Pharmacy:** Store owner records vitals (Blood Pressure, Sugar, Temp, Pulse), notes complaints, records an audio note or snaps old prescription photos, and collects cash.
2. **Instant 7% Cut & Medicine Dispensing:** The medical store keeps an instant 7% commission from cash in hand, schedules the appointment, and automatically receives a digital copy of the doctor's prescription post-consultation to dispense the prescribed medicines.
3. **Doctor Focus:** Doctor receives 88% of the consultation fee with pre-triaged vitals and zero administrative burden.
4. **Zero-Friction Patient Experience:** Patients return home and join via a **1-click WhatsApp web link** (no app install needed) with automatic **Voice-Note Fallback** if video connectivity is weak.
5. **In-Clinic Priority Tokens:** For physical visits, clinic compounders use a 1-tap mobile check-in screen to eliminate waiting room chaos.

---

## 💰 Economic Model (Pilot Stage)

```
┌───────────────────────────────────────────────────────────┐
│              Rs. 1,000 Consultation Fee                   │
├───────────────────┬───────────────────┬───────────────────┤
│ Doctor: 88%       │ Medical Store: 7% │ Platform: 5%      │
│ (Rs. 880)         │ (Rs. 70)          │ (Rs. 50)          │
│ • Net fee payout  │ • Kept in cash    │ • Cloud infra     │
│ • Zero admin work │ • Rx retail margin│ • WhatsApp / SMS  │
└───────────────────┴───────────────────┴───────────────────┘
```

---

## 🏗️ Platform Modules

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                              Platform Portals                                 │
├───────────────────┬───────────────────┬───────────────────┬───────────────────┤
│ 1. Pharmacy Agent │ 2. Doctor Suite   │ 3. Patient Portal │ 4. Admin & Ops    │
│    (PWA)          │    (PWA / Web)    │    (Zero-Install) │    Dashboard      │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│ • 60s Triage Form │ • OPD Session on/ │ • 1-click WhatsApp│ • Real-time doctor│
│ • Vitals Capture  │   off toggle      │   video room      │   delay alerts    │
│ • Cash & Ledger   │ • Token caller    │ • Auto voice note │ • Pharmacy leader-│
│ • Incoming Rx view│ • Hybrid Rx Maker │   fallback        │   board & ledger  │
│   for dispensing  │ • 88% Payout view │ • Digital Rx PDF  │ • Call drop logs  │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
```

---

## 🗺️ Documentation Directory

Comprehensive documentation is available in the [`docs/`](./docs) folder:

- 📘 [**Architecture Overview**](./docs/ARCHITECTURE.md): Technical architecture, data flow, WebRTC & voice-note fallback mechanics, and Prisma database schema.
- 🎯 [**Pilot Strategy & Roadmap**](./docs/PILOT_STRATEGY.md): Mailsi launch operations, village catchment hubs, doctor onboarding, and South Punjab expansion playbook.
- 📋 [**Product Specifications**](./docs/PRODUCT_SPEC.md): Complete functional requirements for all 5 portal interfaces.
- 🔍 [**Inconsistency Tracking & Metrics**](./docs/INCONSISTENCY_TRACKING.md): Framework for monitoring failure modes, doctor lateness, call dropouts, and pharmacy balances.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, TypeScript)
- **Styling:** Tailwind CSS & Lucide Icons (Responsive PWA)
- **Database & ORM:** PostgreSQL / SQLite with [Prisma](https://www.prisma.io/)
- **Real-Time & Video:** WebRTC / LiveKit with adaptive bitrate and voice-note audio engine
- **Communications:** WhatsApp Business Cloud API & Pakistan SMS Gateway integration
- **Deployment:** Vercel / Node.js container with PWA install support

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/<username>/Dr_app.git

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run database migrations & seed
npx prisma migrate dev
npx prisma db seed

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📍 Target Geography & Expansion Phases

1. **Phase 1 (Pilot):** Mailsi Tehsil & surrounding union councils (Mitro, Karampur, Jallah Jeem, Tibba Sultanpur, Sargana).
2. **Phase 2 (District):** Vehari City & Burewala.
3. **Phase 3 (Tertiary Hubs):** Multan & Bahawalpur specialist network integration.
4. **Phase 4 (Regional):** Khanewal, Lodhran, and Muzaffargarh.
