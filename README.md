<p align="center">
  <img src="./assets/images/icon.png" alt="AutiCare Logo" width="120" />
</p>

<h1 align="center">AutiCare</h1>

<p align="center">
  <strong>A compassionate mobile companion for parents navigating the autism spectrum journey</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-SDK_54-000020?logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-green" alt="Platform" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License" />
</p>

---

## 📌 Problem Statement

Approximately **1 in 36 children** in the United States is diagnosed with Autism Spectrum Disorder (ASD). Yet many parents:

- Struggle to identify early developmental indicators in their children.
- Feel overwhelmed and lack accessible, judgment-free guidance.
- Have limited access to affordable specialists, especially in rural or underserved areas.
- Need practical day-to-day strategies but don't know where to start.

Early identification and informed parenting can dramatically improve outcomes, but **the gap between concern and professional help can be months or even years**.

## 💡 Solution

**AutiCare** bridges that gap by putting supportive tools directly in parents' hands — on their phone, available anytime, completely offline.

The app offers an **AI-powered parenting assistant**, a **validated screening questionnaire** (inspired by M-CHAT-R), a **visual communication board (AAC)**, and a **specialist locator** — all wrapped in a calming, accessible interface designed for stressed parents.

> ⚠️ **AutiCare is not a diagnostic tool.** It is designed to educate, support, and empower parents while encouraging professional consultation.

---

## ✨ Key Features

### 🤖 AI Parenting Assistant
A fully **offline, keyword-based** assistant that analyses a parent's description of their child's behavior and returns **structured, evidence-informed guidance** — including:
- Understanding the Behavior
- Possible Causes
- Suggested Strategies
- When to Seek Professional Help

Covers **12 behavior categories** with **400+ keyword variations**, including:
| Category | Examples |
|---|---|
| Eye Contact | "avoids eye contact", "won't look at me" |
| Speech & Language | "not talking", "echolalia", "nonverbal" |
| Repetitive Behaviors | "hand flapping", "stimming", "lines up toys" |
| Sensory Sensitivity | "covers ears", "hates loud noises", "clothing sensitivity" |
| Social Interaction | "plays alone", "no friends", "misses social cues" |
| Meltdowns | "emotional outburst", "self harm", "can't calm down" |
| Routine & Transitions | "hates change", "rigid", "won't try new things" |
| Eating / Picky Eating | "picky eater", "food texture", "gagging food" |
| Sleep Problems | "won't sleep", "night terrors", "bedtime battle" |
| Toilet Training | "potty training", "afraid of toilet" |
| Anxiety & Fears | "separation anxiety", "school refusal", "panic" |
| Name Response | "doesn't respond to name", "in their own world" |

### 📋 Autism Risk Screening (M-CHAT-R Inspired)
- 20 developmental questions with weighted scoring (Never → Always)
- Calculates risk level: **Low**, **Moderate**, or **High**
- Results screen with clear breakdown and medical disclaimer

### 🗣️ Communication Board (AAC)
- Image-based Augmentative & Alternative Communication tiles
- Categorized by: Common, Feelings, Needs, Actions, Places
- Text-to-Speech support for non-verbal children
- Parents can add **custom tiles** with their own images

### 🔍 Expert Connect
- Locates autism specialists near the parent using **Google Places API**
- Displays clinic name, address, and rating
- Graceful fallback to demo data if offline

### 👶 Child & Parent Profiles
- Track child details, developmental milestones, and preferences
- Maintain parent profile for personalized experience

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React Native 0.81 + Expo SDK 54 |
| **Language** | TypeScript 5.9 |
| **Routing** | Expo Router (file-based) |
| **Animations** | React Native Reanimated 4 |
| **Fonts** | Nunito (via `@expo-google-fonts`) |
| **Icons** | Ionicons (`@expo/vector-icons`) |
| **Location** | Expo Location |
| **Speech** | Expo Speech (TTS for AAC board) |
| **Image Picking** | Expo Image Picker |
| **AI Assistant** | Local keyword-matching engine (fully offline) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — installed globally or use `npx`
- [Expo Go](https://expo.dev/go) app on your phone (iOS / Android)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/AutiCare.git
cd AutiCare

# 2. Install dependencies
npm install

# 3. (Optional) Create a .env file for the Expert Connect feature
#    Get a Google Places API key from https://console.cloud.google.com
echo "EXPO_PUBLIC_GEMINI_API_KEY=your_google_places_key_here" > .env

# 4. Start the development server
npx expo start
```

### Running on Your Device
1. Scan the QR code shown in the terminal with **Expo Go** (Android) or **Camera app** (iOS).
2. The app will load on your phone over your local network.

### Running on Emulator
```bash
# Android
npx expo start --android

# iOS (macOS only)
npx expo start --ios
```

---

## 📁 Project Structure

```
AutiCare/
├── app/                    # Screens (file-based routing)
│   ├── index.tsx           # Home / Onboarding
│   ├── select.tsx          # Feature selection hub
│   ├── assistant.tsx       # AI Parenting Assistant chat
│   ├── questionnaire.tsx   # Autism screening questionnaire
│   ├── questionnaire-results.tsx
│   ├── child.tsx           # Child profile & milestones
│   ├── parent.tsx          # Parent profile
│   └── experts.tsx         # Expert Connect (Places API)
├── components/
│   └── ui/                 # Reusable UI components
│       ├── Theme.ts        # Design tokens (colors, typography)
│       ├── CalmBackground.tsx
│       ├── AnimatedButton.tsx
│       └── AbstractPuzzle*.tsx
├── utils/
│   └── gemini.ts           # Keyword-based AI assistant engine
├── assets/images/          # App icons, splash screen
├── app.json                # Expo configuration
├── package.json
└── tsconfig.json
```

---

## 🔮 Future Improvements

- [ ] **Multi-language support** — Hindi, Gujarati, Spanish, and more
- [ ] **Progress tracking dashboard** — visual graphs of developmental milestones over time
- [ ] **Therapist appointment booking** — in-app scheduling with local specialists
- [ ] **Community forum** — safe, moderated space for parents to share experiences
- [ ] **Push notifications** — daily tips and activity reminders
- [ ] **Offline screening history** — save past questionnaire results locally
- [ ] **Dark mode** — for late-night reading comfort
- [ ] **Export reports** — generate PDF reports to share with healthcare providers

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

**AutiCare is not a medical or diagnostic tool.** It provides general parenting guidance based on well-known developmental indicators. The screening questionnaire offers awareness, not diagnosis. Always consult qualified healthcare professionals — including developmental pediatricians, child psychologists, and speech-language pathologists — for clinical evaluation and treatment.

---

<p align="center">
  Made with 💙 for families navigating the autism journey
</p>
