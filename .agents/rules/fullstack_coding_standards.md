---
trigger: always_on
description: Full-stack coding conventions for Next.js App Router, TypeScript, Prisma, WebRTC, and Tailwind.
---

# Full-Stack Engineering & Architecture Standards

When writing code in this repository, you MUST follow these standards:

---

## 1. Next.js App Router & TypeScript
- Use Next.js App Router (`app/` directory).
- All components must be written in strict **TypeScript** (`.tsx`, `.ts`).
- Clearly separate **Server Components** (data fetching, initial render) from **Client Components** (`'use client'` for forms, WebRTC video rooms, interactive queue counters, audio recorders).
- Validate all incoming API request payloads with **Zod** schemas.

---

## 2. Database & Prisma ORM
- Use **Prisma ORM** for all database queries and schema definitions.
- Keep database transactions atomic when executing financial ledger entries (e.g. creating an appointment, updating the pharmacy balance, and writing the ledger row in a single `prisma.$transaction`).
- Always index heavily queried relational foreign keys (`patientId`, `doctorId`, `pharmacyId`, `appointmentDate`, `status`).

---

## 3. WebRTC & Media Lifecycle
- Manage WebRTC peer connections with clean lifecycle hooks (`useEffect` with explicit cleanup of `MediaStream` tracks and `RTCPeerConnection.close()`).
- Attach an audio-level / packet-loss monitor using `peerConnection.getStats()` every 3 seconds to detect network degradation.
- Provide clean fallbacks:
  - Video stream disabled $\rightarrow$ Audio-only stream.
  - WebRTC connection failure $\rightarrow$ Asynchronous voice-note walkie-talkie UI.

---

## 4. Styling & PWA Standards
- Use **Tailwind CSS** with cohesive, accessible color tokens.
- Design for mobile screens first (360px – 420px viewport), scaling up cleanly to tablet/desktop.
- Ensure service worker and PWA manifest are properly configured so medical stores and clinic compounders can install the portal to their home screen as a standalone web app.
