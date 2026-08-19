---
name: pharmacy-triage-workflow
description: >-
  Protocol and guidelines for executing the 60-second rapid patient intake, vitals recording, cash collection, instant 7% commission ledger tracking, and WhatsApp token pass generation.
---

# Pharmacy Triage & Agent Intake Workflow

## Overview
This skill guides the implementation, validation, and execution of the **Frontline Medical Store Agent Intake Module**. It enables rural medical store owners in Mailsi to onboard walk-in patients in under 60 seconds.

---

## 60-Second Triage Protocol

### Step 1: Rapid Patient Identity & Location
- Collect:
  - **Full Name** (e.g. "Muhammad Aslam")
  - **Age & Gender** (e.g. "45 / Male")
  - **WhatsApp Phone Number** (e.g. "0300-1234567")
  - **Village / Area Dropdown** (e.g. "Mitro", "Karampur", "Jallah Jeem", "Tibba Sultanpur")

### Step 2: Vitals & Complaint Capture
- Enter basic vitals with automated clinical warning flags:
  - Systolic / Diastolic BP (mmHg)
  - Blood Sugar (mg/dL)
  - Temperature (°F)
  - Pulse Rate (bpm)
- Quick-select complaint chips: `Bukhar`, `Khansi`, `Pait Dard`, `Bachon ki Bemari`, `Khavateen`, `Jild`, `Joron ka Dard`.
- Optional 1-tap voice note recording (Saraiki/Punjabi/Urdu).
- Optional photo upload of past prescription slips or blood tests.

### Step 3: Doctor Selection & Modality Choice
- Select Doctor: Filter by Mailsi local clinics vs. Multan tele-specialists.
- Select Modality:
  - `Remote Online Checkup (From Home)`
  - `In-Clinic Priority Token (Physical Visit)`

### Step 4: Cash Collection & Ledger Update
- Total Consult Fee: e.g. Rs. 1,000.
- Instant 7% Commission Kept: Rs. 70.
- Net Remittance Added to Store Balance: + Rs. 930.
- WhatsApp Token Pass & 1-Click Link automatically dispatched to patient.

---

## Common Pitfalls
1. **Never slow down the pharmacy owner:** Do not make vitals fields strictly mandatory if the patient refuses or the store is too busy. Allow skipping with one click.
2. **Never break the 88-7-5 ledger math:** The ledger entry must be atomic with the appointment creation.
