---
name: doctor-opd-suite
description: >-
  Protocol and guidelines for doctor OPD session management, dynamic rolling token queue caller, triage overview, WebRTC/voice-note consultation, and hybrid prescription generation.
---

# Doctor OPD Consultation Suite & Queue Protocol

## Overview
This skill governs the doctor's workflow, helping them manage their private OPD or remote tele-consultations with zero friction.

---

## Workflow Steps

### Step 1: OPD Session Activation
- Doctor toggles **"Start OPD Session"**.
- System calculates estimated wait times and displays the queued token cards with village names and triage vitals.

### Step 2: Calling Next Patient & Pre-Alert Trigger
- Doctor clicks **"Call Next Patient"** on Token #X.
- System automatically triggers a 5-minute pre-alert WhatsApp notification to Token #X+1 (*"Aapka number aane wala hai, tayyar rahein"*).
- If doctor is delayed, clicking **"Delay 15 Mins"** broadcasts a polite delay notice to all waiting patients.

### Step 3: Clinical Checkup & Telehealth Room
- Doctor reviews triage vitals (BP, Sugar, Temp, Pulse) and listens to pharmacy audio clip before connecting.
- Connects via WebRTC video/audio room.
- If connection drops, doctor uses the interactive voice-note walkie-talkie mode.

### Step 4: Hybrid Prescription Generation & Dispatch
- **Option A (Fast Digital Template):** Select medicines from pre-filled catalog (Panadol, Augmentin, Brufen, etc.), select dosage chips (`1+1+1`, `5 Days`), and click "Deliver".
- **Option B (1-Click Pad Photo Upload):** Write on clinic letterhead, snap photo with phone camera, and click "Deliver".
- On delivery:
  - Patient receives PDF on WhatsApp.
  - Referring village pharmacy receives a copy in their "Incoming Rx" tab to prepare medicine dispensing.
  - Doctor wallet receives **88% net consultation payout**.

---

## Common Pitfalls
1. **Never allow doctor to advance without resolving prescription:** Gating next token ensures patients always get their prescription before the doctor moves on.
2. **Handle clinic compounder synchronization:** For in-person physical OPD, compounder check-ins must reflect in real-time on the doctor's queue.
