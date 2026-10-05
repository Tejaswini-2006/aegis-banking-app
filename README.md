# Aegis Banking App

> **Safe & Adaptive Voice Assistant for Rural & Elderly Users**  
> *Official Submission for SBI Hackathon @ GFF 2026 (Track: Digital Adoption)*  
> **Author:** Tejaswini Rakhunde

---

## 📌 Project Overview
**Aegis Banking AI** is an autonomous, multi-agent vernacular banking assistant designed to eliminate digital hesitation among rural, semi-urban, and elderly citizens. Integrated over core banking frameworks, Aegis dynamically adapts cluttered user interfaces based on behavioral cues and actively intercepts device-level fraud threats (such as active AnyDesk/TeamViewer remote screen sharing or vishing phone scams) in real time. It transforms mobile banking from a cold, intimidating interface into a secure, native-language companion.

---

## 🎯 Problem Statement
Digital banking adoption in India faces a dual crisis at the grassroots level:
1. **Cognitive Overload:** Cluttered banking menus, tiny text configurations, complex financial terminology, and endless dropdown forms cause a **45% dropout rate** during digital onboarding among elderly and rural users.
2. **The Trust Deficit:** Proliferating social engineering tactics, phone scams (vishing), and background screen-sharing remote desktop fraud cause absolute digital hesitation.

---

## 💡 Solution
Aegis Banking AI resolves this adoption gap through a privacy-first, **Multi-Agent financial architecture**:
* **UX Morphist Agent:** Senses hesitation and high error rates, dynamically morphing standard, cluttered mobile dashboards into clean, high-contrast layouts with 3 giant accessible buttons and voice-first interaction.
* **Guardian Shield Agent:** Runs secure background environment threat checks during active sessions. If a user is on an active scam call or a malicious remote-desktop app attempts screen-mirroring, Aegis instantly freezes the banking pipeline and triggers an audio/visual override.
* **Wealth Navigator Agent:** Dialect-agnostic voice ecosystem processing natural speech commands across 12+ Indian regional dialects (Hindi, Marathi, Gujarati, Tamil, Telugu, English) with voice audio responses (Web Speech API).

---

## ✨ Features
* 🎙️ **Vernacular Voice Assistant:** Real-time speech-to-text NLU processing voice commands like *"Send ₹500 to Son"* or *"खाता शेष देखें"*.
* 🌐 **Multi-Dialect Selector:** Supports Hindi, Marathi, English, Gujarati, Tamil, and Telugu.
* 🛡️ **Guardian Shield Real-Time Threat Intercept:** Detects active remote screen sharing or scam call threats and locks transactions automatically.
* 📲 **Interactive Money Transfers:** Select saved beneficiaries (Son, Milkman, Daughter, Utilities) or custom UPI IDs with input validation (rejects negative numbers, zero amounts, or overdrafts exceeding available balance).
* 📖 **Digital Passbook & Transaction History:** View live credit/debit records, dates, category badges, and real-time updated balances.
* 👁️ **Balance Visibility Privacy Toggle:** Quick toggle to mask or unmask available balance.
* ⚡ **Quick Demo Voice Chips:** One-click instant voice command prompts for rapid testing.
* ♿ **Elderly Accessibility Tools:** High-contrast mode toggle, text font size scale adjuster (`A-`, `A+`), and full keyboard accessibility.

---

## 🛠️ Tech Stack
* **Frontend:** HTML5, Vanilla JavaScript (ES6+ Modules), Modern Vanilla CSS3 (CSS Variables, Flexbox, CSS Grid, Glassmorphism).
* **Voice Engine:** Web Speech API (`SpeechRecognition` & `SpeechSynthesis`).
* **Core Engine:** `AegisEngine` state management system (`src/aegis-engine.js`).
* **Build System & Dev Server:** Vite 5.x.
* **Testing:** Node.js native test runner (`node --test`).
* **Package Manager:** npm.

---

## 📂 Project Structure
```text
aegis-banking-app/
├── index.html                 # Main application markup & simulator layout
├── styles.css                 # Custom design system, responsive styles, high-contrast theme
├── script.js                  # Application controller & UI interaction handlers
├── src/
│   └── aegis-engine.js        # Core financial engine, multi-agent states, NLU parser
├── test/
│   └── aegis-engine.test.js   # Automated unit tests for financial logic & security
├── dist/                      # Production build output
├── .env.example               # Environment variable templates
├── .gitignore                 # Files excluded from version control
├── package.json               # Node project configuration and dependencies
└── README.md                  # Comprehensive project documentation
```

---

## 📋 Prerequisites
* **Node.js:** v18.0.0 or higher (v22.x recommended).
* **npm:** v9.0.0 or higher.
* Modern web browser (Chrome, Edge, Safari, or Firefox) with mic access enabled for SpeechRecognition features.

---

## 📥 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Tejaswini-2006/aegis-banking-app.git
   cd aegis-banking-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## 🔑 Environment Variables
Create a local `.env` file based on `.env.example`:
```bash
cp .env.example .env
```
Sample `.env.example`:
```env
VITE_APP_TITLE="Aegis Banking AI Simulator"
VITE_DEFAULT_LANGUAGE="hi-IN"
VITE_ENABLE_SPEECH_SYNTHESIS=true
VITE_SIMULATOR_MODE="hackathon-demo"
```
> *Note: Aegis Banking AI operates locally without transmitting real user passwords or private database keys.*

---

## 🚀 How to Run
Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to:
```text
http://localhost:5173
```

---

## 🏗️ Build
To create a production-ready optimized bundle:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 🗄️ Database Setup
* **Current Architecture:** Aegis operates as a client-side banking simulator with an in-memory transactional database (`AegisEngine`).
* **State Persistence:** Balances and transaction history update dynamically during runtime and reset cleanly upon page reload for reproducible hackathon demonstrations.

---

## 🔒 Authentication & Session Security
* **UPI / Security PIN:** All financial transactions require a 4-digit PIN (default demo PIN: `1234`).
* **Session Protection:** In "Phone Scam (AnyDesk)" threat mode, Guardian Shield intercepts session state, disables forms, and blocks speech execution until the threat environment is cleared.

---

## 💳 Banking Features & Financial Integrity
* **Balance Display & Arithmetic:** Real-time Indian currency formatting (`₹1,42,854.32`).
* **Input Validation:** Transfers strictly enforce:
  - `Amount > 0` (rejects 0 or negative values).
  - `Amount <= Available Balance` (prevents overdrafts).
  - Valid numeric format checks.
  - Per-transaction limit caps (₹1,00,000 for voice banking).
* **Transaction Records:** Automatically generates unique transaction IDs (`TXNxxxxxx`), timestamp, category, and status upon execution.

---

## 📡 API Documentation
Aegis exposes internal engine methods via `AegisEngine`:
* `executeTransfer(beneficiaryName, amount, pin)` - Validates and processes funds transfer.
* `parseVoiceCommand(transcript)` - Extracts intent (`CHECK_BALANCE`, `SEND_MONEY`, `GET_HELP`) and entity parameters.
* `setMode(mode)` - Switches between `Normal` and `Aegis` layout modes.
* `setSecurityEnv(env)` - Toggles between `Safe` and `Attack` threat environments.

---

## 🛡️ Security Audit
* ✅ **Zero Hardcoded Credentials:** No exposed secrets, database URLs, or API keys in source code.
* ✅ **Strict Financial Controls:** Prevents arbitrary state mutations and invalid numeric inputs.
* ✅ **Threat Interception Simulator:** Demonstrates defense-in-depth against remote desktop access tools and spliced vishing calls.
* ✅ **Sanitized UI Rendering:** Protects against cross-site scripting (XSS).

---

## 🧪 Testing
Run the automated unit test suite:
```bash
npm run test
```
**Test Coverage Includes:**
- Initial state setup & multi-agent status.
- Financial transfer execution & balance deduction accuracy.
- Zero, negative, and overdraft validation error handling.
- Security threat mode execution blocking.
- Vernacular speech NLU parsing for Hindi & English commands.
- Indian numbering system currency formatting.

---

## ❓ Troubleshooting
* **Microphone Not Listening:** Ensure browser microphone permissions are granted. If using an unsupported browser engine, Aegis seamlessly falls back to interactive modal dialogs and preset voice chips.
* **Build Warning on Script Tag:** Ensure `<script type="module" src="script.js"></script>` is used in `index.html`.

---

## 🔮 Future Improvements
* 🤖 Deep integration with on-device quantized Edge SLMs (e.g., Llama-3-8B / Phi-3) for offline NLU.
* 🎙️ Direct Whisper API WebSocket integration for full offline streaming voice recognition in 22+ official Indian languages.
* 📱 Native Android SDK wrapping via Kotlin / Jetpack Compose for system-level remote desktop process termination.

---

## 👤 Author
**Tejaswini Rakhunde**  
*SBI Hackathon @ GFF 2026 Participant*

---

## 📜 License
This project is licensed under the **MIT License**.
