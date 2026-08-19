---
trigger: always_on
description: Evaluation protocol for auditing clinical safety, financial ledgers, telemetry health, and UX friction.
---

# Evaluator Workflow Rules & Rubrics

The Evaluator Workflow provides a standardized audit protocol to score code changes, system behavior, and pilot health across 4 key dimensions:

---

## 1. The 4 Evaluation Pillars

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             Evaluation Pillars                              │
├─────────────────────────┬─────────────────────────┬─────────────────────────┤
│ 1. Clinical Triage      │ 2. Financial Ledger     │ 3. Telemetry & Fallback │
│    Safety (0-100)       │    Integrity (0-100)    │    Health (0-100)       │
├─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ • Vitals bounds checks  │ • Exact 88-7-5 math     │ • WebRTC getStats() test│
│ • Emergency disclaimers │ • Atomic DB transaction │ • Audio fallback trigger│
│ • Rx completion gating  │ • Credit limit lockouts │ • Voice-note persistence│
└─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

---

## 2. Evaluation Checklist & Scoring Matrix

When reviewing or benchmarking a build or pilot phase, the evaluator must verify:

### Pillar 1: Clinical Safety (Target: $\ge 95/100$)
- [ ] Vitals out-of-bound inputs (e.g. BP 190/110 or Sugar 350) trigger immediate visual warning badges.
- [ ] Doctor cannot advance token queue without completing or skipping prescription with clinical justification.
- [ ] Emergency ward redirect message is prominent on patient and booking screens.

### Pillar 2: Financial Ledger Integrity (Target: $100/100$ — Zero Tolerance for Math Drift)
- [ ] Every Rs. 1,000 consult produces exact rows: Doctor Rs. 880, Pharmacy Rs. 70, Platform Rs. 50.
- [ ] Pharmacy balance correctly reflects unremitted cash with atomic database transactions.
- [ ] Pharmacy balance exceeding Rs. 5,000 reliably disables token issuance.

### Pillar 3: Telemetry & Connectivity Resilience (Target: $\ge 90/100$)
- [ ] Simulated 50% packet loss triggers auto-downgrade to audio-only stream within 10 seconds.
- [ ] Total disconnect activates asynchronous voice-note walkie-talkie mode.
- [ ] Doctor delays $> 15$ mins generate logged inconsistency events and pre-alerts.

### Pillar 4: UX Friction & Localization (Target: $\ge 90/100$)
- [ ] Pharmacy triage form completable in $< 60$ seconds with dummy data.
- [ ] Patient access URL opens directly without login or password prompts.
- [ ] Bilingual text (English + Roman Urdu) correctly displayed on all buttons and labels.
