---
trigger: always_on
description: UX, language, and performance rules tailored for South Punjab (Mailsi) and rural Pakistan.
---

# Pakistan & South Punjab UX/UI Localization Rules

When creating or modifying frontend interfaces in this project, you MUST adhere to the following regional and user-experience guidelines:

---

## 1. Language & Terminology
- **Bilingual Core:** All user-facing screens for patients and pharmacy agents must display both clear English and Roman Urdu / Urdu where appropriate.
  - Examples of standard terms:
    - *Token Number* $\rightarrow$ `Token Number / آپ کا ٹوکن نمبر`
    - *Chief Complaint* $\rightarrow$ `Bemari / علامات`
    - *Doctor Queue Status* $\rightarrow$ `Doctor Sahab abhi Token 3 dekh rahe hain`
    - *Prescription* $\rightarrow$ `Nuskha / نسخہ`
    - *Cash Collected* $\rightarrow$ `Naqad Wasool / نقد وصولی`
    - *Commission Kept* $\rightarrow$ `Aapka 7% Commission / آپ کا کمیشن`

---

## 2. Zero-Install Patient Experience
- **NO Mandatory App Downloads:** Never require a patient to install an APK or create an account with a password to attend a doctor consultation or view their queue status.
- **1-Click Web Links:** All patient access is routed via cryptographically signed short URLs delivered via WhatsApp or SMS (e.g. `/c/[token-id]`).
- **One-Handed Mobile UX:** All buttons and call controls must have touch targets of at least `48x48px` with clear visual feedback for older or low-tech users.

---

## 3. Budget Android Performance Constraints
- Target devices are entry-level Android smartphones (Transsion brands like Tecno, Infinix, Itel, and budget Vivo/Oppo/Samsung devices) with 2GB–3GB RAM and modest processors.
- **Rules:**
  - Keep JavaScript bundle size minimal.
  - Avoid heavy 3D animations or complex Canvas renders.
  - Use native HTML elements with Tailwind CSS.
  - Ensure fast initial render ($< 1.5$ seconds on simulated 3G).

---

## 4. 60-Second Pharmacy Triage Constraint
- The **Pharmacy Agent Intake Screen** must allow completing a new patient booking in **under 60 seconds**.
- Use quick-tap chips for common symptoms (`Fever`, `Cough`, `Stomach`, `Pediatric`, `Gynae`, `Joint Pain`, `Skin`).
- Provide a 1-tap **Voice Note Recording Button** and a 1-tap **Camera Upload Button** for past prescription photos.
