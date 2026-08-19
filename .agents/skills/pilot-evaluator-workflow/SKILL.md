---
name: pilot-evaluator-workflow
description: >-
  Evaluation engine and audit protocol for scoring clinical safety, financial ledger consistency, telemetry health, and UX localization across pilot iterations.
---

# Pilot Evaluator Workflow

## Overview
This skill provides a systematic audit framework to evaluate the technical, operational, and clinical performance of the Mailsi Telehealth platform before and during live pilot deployments.

---

## Evaluation Scoring Framework

When conducting an evaluation audit, run through the following 4 pillars and produce an **Evaluation Audit Card (0–100%)**:

```markdown
# Pilot Evaluation Audit Card

## 1. Clinical Safety Score: [__ / 100]
- [ ] Vitals out-of-range inputs trigger clear yellow/red warning indicators.
- [ ] Emergency redirect disclaimers are prominent on patient entry screens.
- [ ] Doctor queue advancement requires prescription completion or documented skip.
- [ ] Controlled narcotics / Schedule IV drugs are restricted in digital Rx templates.

## 2. Financial Ledger Integrity: [__ / 100]
- [ ] Exact 88% Doctor / 7% Pharmacy / 5% Platform split across all fee tiers.
- [ ] Atomic database transaction wraps appointment creation and ledger updates.
- [ ] Rs. 5,000 credit limit ceiling locks booking button when exceeded.
- [ ] Settlement approval resets store balance and unblocks booking.

## 3. Telemetry & Fallback Resilience: [__ / 100]
- [ ] Packet loss > 15% cleanly transitions video to VoIP audio.
- [ ] Total WebRTC failure activates voice-note walkie-talkie mode.
- [ ] Doctor delays > 15 mins log inconsistency record and trigger queue notifications.

## 4. UX & Localization Friction: [__ / 100]
- [ ] Pharmacy triage intake completes in < 60 seconds with test inputs.
- [ ] Patient access works via 1-click token link without login or password.
- [ ] Bilingual text (English + Roman Urdu) correctly rendered on buttons and labels.
- [ ] Mobile responsive layout scales smoothly on 360px viewport (budget Android).
```

---

## Evaluation Execution Protocol
1. Run automated test scenarios from `pilot-testing-workflow`.
2. Inspect telemetry logs and database ledger entries.
3. Compute the weighted overall score:
   $$\text{Overall Pilot Health} = 0.35(\text{Clinical}) + 0.30(\text{Financial}) + 0.20(\text{Telemetry}) + 0.15(\text{UX})$$
4. If score is $< 90\%$, block release to pilot doctors/pharmacies until regressions are fixed.
