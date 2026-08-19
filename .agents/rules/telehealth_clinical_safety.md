---
trigger: always_on
description: Clinical safety guidelines, PMDC regulations, vitals boundary checks, and prescription integrity.
---

# Telehealth Clinical Safety & Prescription Integrity Rules

When developing clinical features, triage forms, doctor consultation views, or prescription generators, you MUST strictly enforce the following safety rules:

---

## 1. Vitals Validation & Warning Thresholds

When vitals are entered by the village medical store, validate inputs against clinical ranges and display clear visual alerts:

| Vital Sign | Normal Range | Yellow Alert (Caution) | Red Alert (Emergency) |
| :--- | :--- | :--- | :--- |
| **Systolic BP** | $90 - 120\text{ mmHg}$ | $121 - 139\text{ mmHg}$ | $\ge 140\text{ or } < 85\text{ mmHg}$ |
| **Diastolic BP**| $60 - 80\text{ mmHg}$  | $81 - 89\text{ mmHg}$   | $\ge 90\text{ or } < 50\text{ mmHg}$ |
| **Blood Sugar (Random)** | $80 - 140\text{ mg/dL}$ | $141 - 199\text{ mg/dL}$| $\ge 200\text{ or } < 70\text{ mg/dL}$ |
| **Temperature** | $97.0 - 99.0^\circ\text{F}$ | $99.1 - 101.0^\circ\text{F}$ | $\ge 101.1^\circ\text{F}$ |
| **Pulse Rate**  | $60 - 100\text{ bpm}$ | $50 - 59\text{ or } 101 - 110\text{ bpm}$ | $> 110\text{ or } < 50\text{ bpm}$ |

- If any vital triggers a **Red Alert**, highlight in red on both the Pharmacy screen and Doctor Triage card.

---

## 2. Prescription Safety & Doctor Authentication
1. **Mandatory Prescription Loop:** A doctor cannot mark a consultation as "Completed" or advance to the next token without either:
   - Generating a digital prescription with dosage instructions.
   - Uploading a clear photo of their signed handwritten letterhead pad.
   - Explicitly checking a "No Medication Required / General Advice Only" checkbox with written reasoning.
2. **Controlled Drugs Policy:** In compliance with PMDC (Pakistan Medical and Dental Council) and Drug Regulatory Authority of Pakistan (DRAP) guidelines, Schedule IV controlled narcotics/benzodiazepines cannot be prescribed via remote video consultations without in-person verification.
3. **Prescription Immutability:** Once signed and dispatched to the patient/pharmacy, a prescription cannot be edited in place. Any change requires issuing a revised "Addendum / Amendment" timestamped by the doctor.

---

## 3. Emergency Medical Disclaimer
- Every patient consultation room and booking token must clearly state:
  > *"Emergency surat mein foran qareebi THQ Hospital Mailsi ya Emergency Ward tashreef le jayein. Yeh platform emergency khidmaat ke liye nahi hai."*
