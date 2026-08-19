---
name: pilot-testing-workflow
description: >-
  End-to-end testing suite and scenario runner for simulating village patient bookings, doctor OPD checkups, WebRTC network degradation, and financial ledger reconciliations.
---

# Pilot Testing & Simulation Workflow

## Overview
This skill provides automated and manual test scenarios to simulate the full South Punjab healthcare loop: from a walk-in patient at a village pharmacy in Mitro or Karampur, to doctor consultation in Mailsi, to prescription delivery and financial ledger reconciliation.

---

## Standard Test Scenarios

### Scenario A: Village Pharmacy Walk-In & Triage
1. Navigate to `/pharmacy` as agent at *Al-Madina Medical Store (Mitro)*.
2. Fill patient intake form:
   - Name: `Abdul Ghafoor`, Age: `52`, Gender: `Male`, WhatsApp: `0301-2345678`, Village: `Mitro`.
   - Vitals: BP `145/95` (verifies yellow/red warning badge), Sugar `160`, Temp `100.2°F`, Pulse `84`.
   - Select tags: `Bukhar`, `Pait Dard`.
   - Select Doctor: `Dr. Tariq (Mailsi THQ / Private Clinic)`, Modality: `Remote Online Checkup`.
   - Fee: `Rs. 1,000`.
3. Submit booking and verify:
   - Pharmacy ledger increments balance by `+ Rs. 930`.
   - Pharmacy instant commission increments by `+ Rs. 70`.
   - WhatsApp token link is generated: `/c/[token-id]`.

### Scenario B: Doctor Queue Management & Consult Execution
1. Open `/doctor` as `Dr. Tariq`.
2. Click "Start OPD Session".
3. Verify patient `Abdul Ghafoor` appears as Token #1 with BP warning badge `145/95`.
4. Click "Call Next Patient" $\rightarrow$ join consultation room.
5. Prescribe: `Ciproxin 500mg (1+0+1 for 5 days)` + `Flagyl 400mg (1+1+1 for 3 days)`.
6. Click "Sign & Deliver Rx".
7. Verify:
   - Doctor ledger increments by `+ Rs. 880`.
   - Prescription PDF is accessible on `/c/[token-id]`.
   - Prescription appears in Al-Madina Medical Store's `/pharmacy/dispensing` list.

### Scenario C: River-Belt Network Fallback Test
1. While in consultation room `/c/[token-id]`, simulate WebRTC connection drop or high packet loss.
2. Verify:
   - UI automatically presents "Voice-Note Walkie-Talkie" mode.
   - Doctor and patient can record, play, and exchange audio clips.
   - `InconsistencyLog` records `switchedToVoice = true`.

### Scenario D: Financial Credit Limit Stress Test
1. Create 6 consecutive bookings of Rs. 1,000 at a single medical store.
2. Verify total unremitted balance reaches `Rs. 5,580` ($> \text{Rs. 5,000}$ limit).
3. Verify new booking button is disabled with credit limit warning.
4. Simulate admin settlement approval in `/admin`.
5. Verify balance resets to `Rs. 0` and booking button is re-enabled.
