---
name: low-bandwidth-fallback
description: >-
  3-tier adaptive connectivity protocol for rural areas (e.g. Sutlej river-bank villages), managing WebRTC degradation from HD video down to low-bitrate VoIP audio and interactive voice-note walkie-talkie mode.
---

# Low-Bandwidth Adaptive Connectivity Protocol

## Overview
This skill defines the technical protocol for handling poor 3G/4G connectivity in rural South Punjab (especially river-bank settlements along the Sutlej like Jallah Jeem and Sargana).

---

## 3-Tier Degradation Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Tier 1: WebRTC HD Video + Audio                       │
│ • Bitrate: 250 - 800 kbps                                                   │
│ • Target: Clean 4G / Wi-Fi connections                                      │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (Packet loss > 15% for 8s)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Tier 2: Low-Bitrate VoIP Audio                        │
│ • Bitrate: 32 - 48 kbps (Opus Narrowband Codec)                             │
│ • Disables video tracks to preserve voice clarity                           │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (Connection disconnects > 2 times)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│            Tier 3: Interactive Voice-Note Thread (Walkie-Talkie Mode)       │
│ • 100% resilient asynchronous audio clip exchange                           │
│ • Works over intermittent 2G/EDGE connectivity with auto-retry uploads      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Guidelines

1. **Telemetry Monitoring:** Use `peerConnection.getStats()` every 3000ms:
   ```typescript
   // Pseudo-code for monitoring degradation
   const stats = await peerConnection.getStats();
   stats.forEach(report => {
     if (report.type === 'inbound-rtp' && report.kind === 'video') {
       const packetLoss = report.packetsLost / (report.packetsReceived + report.packetsLost);
       if (packetLoss > 0.15) {
         triggerAudioDowngrade();
       }
     }
   });
   ```
2. **Audio Recorder Safeguards:** Voice notes must record to compressed WebM / Opus audio blobs and cache in IndexedDB before transmitting, ensuring no patient recording is lost if connectivity drops mid-speech.
3. **Inconsistency Logging:** Whenever Tier 2 or Tier 3 is activated, increment the appointment's `InconsistencyLog` to track rural connectivity heatmaps.
