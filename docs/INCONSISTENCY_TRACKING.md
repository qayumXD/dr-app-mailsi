# Pilot Inconsistency Tracking & Operational Observability

This framework defines the failure modes, telemetry metrics, automated alert triggers, and operational corrective playbooks for the Mailsi pilot launch.

---

## 1. Key Inconsistency Metrics & Automated Triggers

```
┌────────────────────────────────────────────────────────────────────────────────────────────┐
│                                Mailsi Pilot Telemetry Matrix                               │
├───────────────────────┬──────────────────────────┬──────────────────┬──────────────────────┤
│ Inconsistency Metric  │ Measurement Target       │ Alert Threshold  │ Severity Level       │
├───────────────────────┼──────────────────────────┼──────────────────┼──────────────────────┤
│ Doctor Lateness Index │ Scheduled OPD start vs.  │ > 15 mins delay  │ 🟡 High (Auto-SMS    │
│                       │ first patient call time  │ without status   │    to queue)         │
├───────────────────────┼──────────────────────────┼──────────────────┼──────────────────────┤
│ Call Drop / Latency   │ WebRTC packet loss, FPS  │ Packet loss >15% │ 🟠 Medium (Trigger   │
│ Degradation Rate      │ < 10, or > 2 disconnects │ or FPS < 10      │    Voice Fallback)   │
├───────────────────────┼──────────────────────────┼──────────────────┼──────────────────────┤
│ Pharmacy Inactivity   │ Days elapsed since last  │ > 5 days with    │ 🟡 Operational       │
│                       │ triage booking per store │ 0 bookings       │    (Field Visit)     │
├───────────────────────┼──────────────────────────┼──────────────────┼──────────────────────┤
│ Prescription Latency  │ Call end timestamp to    │ > 10 mins        │ 🟠 Clinical          │
│                       │ Rx upload timestamp      │ pending Rx       │    (Doctor Reminder) │
├───────────────────────┼──────────────────────────┼──────────────────┼──────────────────────┤
│ Wallet Settlement Lag │ Unremitted cash balance  │ Balance > Rs 5k  │ 🔴 Financial         │
│                       │ vs. time since cutoff    │ or > 7 days lag  │    (Booking Pause)   │
├───────────────────────┼──────────────────────────┼──────────────────┼──────────────────────┤
│ Pharmacy Loop Closure │ Rx generated vs. marked  │ < 40% dispensing │ 🔵 Business          │
│ (Medicine Dispensing) │ "Dispensed" at village   │ closure          │    (Pharmacy follow) │
└───────────────────────┴──────────────────────────┴──────────────────┴──────────────────────┘
```

---

## 2. Failure Mode Analysis & Corrective Playbooks

### A. Failure Mode 1: Doctor Arrives Late or Cancels OPD Session
* **Root Cause in South Punjab:** Doctors frequently get called into emergency surgery at the THQ hospital or are stuck in private OPD rush.
* **Impact:** Waiting patients get angry; trust in the platform erodes.
* **Automated Mitigation:**
  1. If doctor has not clicked "Start OPD Session" within 10 minutes of scheduled start, system sends an automated WhatsApp prompt: *"Doctor Sahab, OPD start karne ke liye click karein ya 'Delay 15 mins' ka button dabayein."*
  2. If delayed, system automatically notifies all waiting patients on WhatsApp: *"Doctor Sahab emergency ki wajah se 20 minute late hain. Aapka naya andaza waqt 5:40 PM hai."*

---

### B. Failure Mode 2: Network Degradation in River-Belt Villages (Sutlej Area)
* **Root Cause:** 4G base stations near Jallah Jeem, Sargana, and river-bank settlements suffer from high packet loss and signal fading.
* **Impact:** Video call freezes, audio echoes, consultation fails.
* **Automated Mitigation:**
  1. System monitors WebRTC stats (`RTCPeerConnection.getStats()`).
  2. If packet loss exceeds 15% for 8 consecutive seconds, system auto-downgrades video to **VoIP Audio-Only (Opus codec @ 32 kbps)**.
  3. If audio still disconnects, consultation room activates **Interactive Walkie-Talkie Mode**: Doctor and patient exchange 15–30s audio clips with offline caching and auto-retry delivery.

---

### C. Failure Mode 3: Medical Store Collects Cash but Delays Remittance
* **Root Cause:** Small shop owners use collected cash for daily retail inventory purchases.
* **Impact:** Cash flow gap in paying doctors their 88% share within 24 hours.
* **Automated Mitigation:**
  1. **Credit Ceiling:** Hard cap of Rs. 5,000 unremitted balance.
  2. **Automated Remittance Prompt:** At Rs. 4,000 balance, store receives a 1-tap JazzCash/Easypaisa payment link.
  3. **Auto-Gate:** If balance hits Rs. 5,000 without settlement, new booking creation is locked with clear UI: *"Pichla hisab settle karein aur foran naye checkup shuru karein"*.

---

### D. Failure Mode 4: Doctor Forgets to Upload Prescription
* **Root Cause:** Doctor finishes call and immediately jumps to the next patient without clicking "Send Rx".
* **Impact:** Patient cannot buy medicines; village pharmacy cannot prepare order.
* **Automated Mitigation:**
  1. Doctor cannot click "Call Next Token" until a prescription (digital template or photo of handwritten pad) is attached or explicitly skipped with a clinical reason.
  2. Pending prescription alert pinned to doctor's navigation bar.

---

## 3. Weekly Pilot Review Dashboard

Every Sunday during the Mailsi pilot, the ops team reviews:
1. **Total Consultations Completed** (Target: 50+ per week).
2. **Average Doctor Delay Minutes** (Target: < 8 minutes).
3. **Voice-Note Fallback Rate** (Track percentage of calls shifting to voice mode by village).
4. **Pharmacy Leaderboard:** Top 5 performing stores by booking volume and dispensing closure rate.
5. **Net Unit Economics:** Confirm 88% Doctor / 7% Pharmacy / 5% Platform reconciliations match banking statements.
