---
trigger: always_on
description: Rules for monitoring inconsistencies, doctor delays, call degradations, and pharmacy credit limits.
---

# Pilot Telemetry & Inconsistency Monitoring Rules

To ensure data-driven iterations during the Mailsi pilot, all operational anomalies and inconsistencies MUST be programmatically recorded and surfaced:

---

## 1. Inconsistency Event Categories

Every appointment session MUST record an `InconsistencyLog` entry capturing:
1. **Doctor Delay (Minutes):** $\text{Actual First Call Time} - \text{Scheduled Start Time}$.
   - If delay $> 15\text{ mins}$, flag in yellow on Admin Dashboard and trigger automated WhatsApp pre-alert to patients.
2. **Call Quality & Fallback Usage:**
   - Record total call dropouts, reconnection attempts, and if media was downgraded to `VOIP_AUDIO_ONLY` or `ASYNC_VOICE_NOTES`.
3. **Prescription Latency:**
   - Record minutes elapsed between call completion and prescription delivery.
   - If latency $> 10\text{ mins}$, surface an in-app reminder in the doctor's portal.

---

## 2. Pharmacy Credit & Balance Rules
- Every cash booking increments the medical store's `walletBalance` by:
  $$\text{Increment} = \text{Consultation Fee} \times (1 - 0.07)$$
  *(e.g., Rs. 930 owed to platform/doctor on a Rs. 1,000 consult)*.
- **Credit Limit Ceiling:** Hard stop at **Rs. 5,000**.
  - If `walletBalance >= 5000`, the booking button on the Pharmacy portal is locked with message: *"Limit reached. Please settle pending balance via JazzCash/Easypaisa to resume booking."*
  - Admins can approve remittances in the Admin Portal, instantly resetting the store's balance.
