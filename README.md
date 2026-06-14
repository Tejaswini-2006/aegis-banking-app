# Aegis Banking AI: Safe & Adaptive Voice Assistant for Rural & Elderly Users

### 🏆 SBI Hackathon @ GFF 2026 Submission
**Track:** Digital Adoption  
**Target Demographic:** Rural, Semi-Urban, and Elderly Citizens  
**Submission Type:** Individual Participant  
**Submitted by:** Tejaswini Vitthal Rakhunde  

---


## 📌 Executive Summary & The Problem

Digital banking adoption in India faces a dual crisis at the grassroots level:
1. **Cognitive Overload:** Cluttered menus, tiny text configurations, and complex financial terminology cause a **45% dropout rate** during digital onboarding among elderly and rural segments.
2. **The Trust Deficit:** Proliferating social engineering tactics, vishing (phone scams), and unauthorized background screen-sharing fraud cause absolute digital hesitation.

**Aegis Banking AI** resolves this adoption gap by acting as an autonomous, **Multi-Agent financial companion**. Integrated directly over core banking frameworks, it dynamically morphs user interfaces based on behavioral cues and actively intercepts device-level fraud threats in real-time. It transforms mobile banking from a cold, intimidating layout into a helpful, secure, native-language companion.

---

## 🛠️ Core Features & Capabilities

* **Dynamic UI Morphing (UX Morphist Agent):** Continuously senses user hesitation, high tap-error rates, or confusion. It seamlessly transitions a standard, cluttered dashboard into a clean, high-contrast, text-lite layout featuring giant, accessible control panels.
* **Proactive Scam Interception (Guardian Shield Agent):** Runs secure background environment checks during an active transaction session. If a user is on an active scam call or a malicious remote-desktop app (e.g., AnyDesk, TeamViewer) attempts execution, Aegis freezes the pipeline instantly and triggers an audio override: *"Scam detected. Transaction locked for your safety."*
* **Dialect-Agnostic Voice Engine (Wealth Navigator Agent):** Features a voice-first ecosystem calibrated via localized Whisper APIs and quantized Edge Small Language Models (SLMs) to process transaction commands securely in over 12+ regional Indian dialects without compromising user privacy.

---

## 📐 System Architecture & Tech Stack

Aegis is engineered using a robust, modular, and privacy-first multi-agent framework designed to interface directly with core banking infrastructure securely.

```text
  [ USER INTERFACE ] 
          │
          ▼
   [ VOICE ENGINE ] ──────► [ CORE ORCHESTRATION ] ──────► [ EDGE SLM INFRASTRUCTURE ]
   (Whisper API Engine)      (LangGraph / CrewAI Framework)   (Quantized Llama-3 / Phi-3)
          │                                 │                          │
          ▼                                 ▼                          ▼
  [ UX MORPHIST AGENT ]          [ GUARDIAN SHIELD AGENT ]   [ WEALTH NAVIGATOR AGENT ]
  (Dynamic UI Adaptation)       (Background Threat Sensor)   (Vernacular Micro-Advice)
          │                                 │                          │
          └─────────────────────────────────┼──────────────────────────┘
                                            ▼
                                  [ CORE BANKING API ]
