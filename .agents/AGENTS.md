# Mailsi Telehealth & Clinic Queue Platform — Agent Constitution

Welcome to the **Mailsi Telehealth & Clinic Queue Platform** codebase. This file establishes the core architectural laws, clinical constraints, economic models, and testing/evaluation workflows that govern this project.

---

## 1. The Core Philosophy: Assisted Phygital Network

We are building a healthcare access network specifically tailored for **Mailsi Tehsil** (District Vehari, South Punjab) and its surrounding rural catchment areas (20–25 km radius, including river-belt villages along the Sutlej like Mitro, Karampur, Jallah Jeem, Sargana, Tibba Sultanpur).

### Non-Negotiable Tenets:
1. **Never Force Village Patients to Install an App:** Patients must access remote checkups and queue tokens via a **zero-install, 1-click WhatsApp/SMS Web link** (`/c/[token-id]`).
2. **Medical Stores are the Frontline Hubs:** Local village pharmacies are the acquisition and triage engine. They record vitals in `< 60s`, collect cash, retain an instant **7% commission**, and automatically receive the digital prescription post-consultation to dispense medicines.
3. **Doctors are Protected & Prioritized:** Doctors receive **88%** of their consultation fee with pre-triaged vitals and zero administrative burden.
4. **Adaptive 3-Tier Connectivity:** Video calls MUST gracefully downgrade to **VoIP Audio (32 kbps)** and then to **Interactive Asynchronous Voice Notes (Walkie-Talkie Mode)** in low-connectivity river-bank villages.
5. **Dual Consultation Modality:** Support both **Remote Online Consultations** and **In-Clinic Physical Priority Tokens** (managed via the clinic compounder portal).

---

## 2. The 88-7-5 Economic Law

Every transaction in the system strictly adheres to the pilot revenue split:

$$\text{Total Fee (100\%)} = \text{Doctor (88\%)} + \text{Pharmacy Agent (7\%)} + \text{Platform (5\%)}$$

* Example on **Rs. 1,000 Consultation**:
  * **Doctor Share:** Rs. 880 (credited to doctor wallet, disbursed within 24h).
  * **Pharmacy Cut:** Rs. 70 (kept instantly from cash collected from patient).
  * **Platform Fee:** Rs. 50 (covers cloud infra, WhatsApp API, and ops).
* **Credit Limit Enforcement:** Medical stores holding $> \text{Rs. 5,000}$ in unremitted platform/doctor balance cannot issue new tokens until settled via JazzCash/Easypaisa.

---

## 3. Core Development & Agent Workflows

When working on this codebase, you MUST follow these integrated workflows:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Agent Workflow Lifecycle                         │
├───────────────────────┬───────────────────────────┬─────────────────────────┤
│ 1. Coding & UX Rules  │ 2. Testing Workflow       │ 3. Evaluator Workflow   │
│ (.agents/rules/)      │ (.agents/skills/testing)  │ (.agents/skills/eval)   │
├───────────────────────┼───────────────────────────┼─────────────────────────┤
│ • Urdu/PWA standards  │ • Simulate village triage │ • Audit clinical safety │
│ • Vitals boundaries   │ • Test WebRTC fallback    │ • Check 88-7-5 ledger   │
│ • TypeScript / Prisma │ • Verify token progression│ • Assess UX friction    │
└───────────────────────┴───────────────────────────┴─────────────────────────┘
```

1. **Coding Standards:** Follow Next.js App Router conventions, strict TypeScript types, and Tailwind CSS mobile-first styling optimized for budget Android devices (Tecno, Infinix, Vivo).
2. **Testing Workflow:** Run simulations of the complete patient journey (Pharmacy Triage $\rightarrow$ Dynamic Token Queue $\rightarrow$ WebRTC/Voice Consult $\rightarrow$ Hybrid Rx Delivery $\rightarrow$ Pharmacy Dispensing).
3. **Evaluator Workflow:** Periodically run the pilot evaluation suite to score clinical triage safety, doctor lateness index, telemetry dropped-call rates, and financial ledger integrity.
