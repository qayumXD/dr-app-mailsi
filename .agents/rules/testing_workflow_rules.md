---
trigger: always_on
description: Testing workflow protocol for simulating village patient journeys, WebRTC degradation, and ledger validation.
---

# Testing Workflow & End-to-End Simulation Protocol

When testing features or running automated/manual verification, developers and agents must execute these standardized test flows:

---

## 1. Test Scenario 1: The Village Walk-In Patient Journey
1. **Actor:** Pharmacy Agent at *Al-Madina Medical Store (Mitro, 18km from Mailsi)*.
2. **Action:** 
   - Walk-in patient arrives with fever & cough.
   - Store owner enters vitals: BP `130/85`, Sugar `110`, Temp `101.5°F`, Pulse `92`.
   - Clicks "Bukhar / Fever" tag, records 15s audio clip in Saraiki/Urdu, and selects Dr. Tariq (Child Specialist, Mailsi).
   - Mode chosen: `Remote Online Checkup`.
   - Store collects Rs. 1,000 cash $\rightarrow$ confirms booking.
3. **Assertions:**
   - [ ] Pharmacy wallet balance increases by Rs. 930.
   - [ ] Pharmacy instant earnings increase by Rs. 70.
   - [ ] WhatsApp token link is generated (`/c/[token-id]`).
   - [ ] Appointment state is `SCHEDULED`.

---

## 2. Test Scenario 2: Doctor OPD Queue & Call Execution
1. **Actor:** Dr. Tariq (Doctor Portal).
2. **Action:**
   - Clicks "Start OPD Session".
   - Views Token #1 (Patient from Mitro with Temp 101.5°F and triage audio).
   - Clicks "Call Next Patient" $\rightarrow$ opens WebRTC room.
   - Connects with patient $\rightarrow$ conducts 4-minute checkup.
   - Generates digital prescription: `Panadol 500mg (1+1+1 for 3 days)` + `Amoxil 250mg (1+0+1 for 5 days)`.
   - Clicks "Sign & Deliver Rx".
3. **Assertions:**
   - [ ] Doctor ledger receives Rs. 880 credit.
   - [ ] Prescription PDF URL generated and visible to patient.
   - [ ] Prescription automatically appears in Al-Madina Medical Store's "Incoming Rx" tab.

---

## 3. Test Scenario 3: River-Belt Network Degradation & Voice Fallback
1. **Action:** Simulate low-bandwidth conditions on patient WebRTC connection (e.g. packet loss 40%, bitrate 15 kbps).
2. **Assertions:**
   - [ ] WebRTC monitor triggers auto-downgrade to audio-only.
   - [ ] If WebRTC fails completely, UI seamlessly switches to "Voice Note Walkie-Talkie".
   - [ ] Patient records 15s voice query $\rightarrow$ Doctor hears audio waveform and replies with 15s voice note.
   - [ ] `InconsistencyLog` records `switchedToVoice = true`.

---

## 4. Test Scenario 4: Credit Limit & Remittance Lockdown
1. **Action:** Medical store accumulates $> \text{Rs. 5,000}$ in unremitted balance (e.g. 6 bookings @ Rs. 930 = Rs. 5,580).
2. **Assertions:**
   - [ ] New booking button is disabled with credit limit alert.
   - [ ] Admin marks Rs. 5,580 remittance as received via JazzCash.
   - [ ] Medical store balance resets to Rs. 0 and booking button unlocks.
