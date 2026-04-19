# ਸ਼ਬਦਾਵਲੀ — Interpreter Flashcard Trainer

<p align="center">
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-gold?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Cards-280%2B-darkgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Languages-8-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Free-Always-orange?style=for-the-badge" />
</p>

<p align="center">
  <b>A free, offline-first flashcard trainer for Punjabi community interpreters</b><br/>
  Legal · Social Work · Medical · IRB / Refugee · 8 languages · 3 study modes
</p>

---

## 🌐 Live Web App

**Try it instantly — no install needed:**

> **https://goelsakshi742.github.io/shabdavali-app**

Works on any phone browser. No login. No download. Always free.

---

## 📱 Screenshots

### Home Screen
![Home Screen](docs/screenshots/home.png)
*280 built-in cards across 4 domains · 8 quiz languages · progress bars per domain*

### Multiple Choice Quiz
![Quiz Screen](docs/screenshots/quiz.png)
*3 study modes: Flashcards · Multiple Choice · Identify Term*

### Settings & Progress
![Settings Screen](docs/screenshots/settings.png)
*Per-domain progress tracking · accuracy stats · language switcher*

---

## ✨ Features

| Feature | Detail |
|---|---|
| 📚 280 built-in cards | Legal (80) · Social Work (50) · Medical (110) · IRB/Refugee (40) |
| 🌍 8 quiz languages | Punjabi · Spanish · Arabic · Hindi · French · Mandarin · Dari · Tigrinya |
| 🎯 3 study modes | Flashcards · Multiple Choice · Identify Term |
| 📊 Progress tracking | Per-domain percentage · accuracy · last studied date |
| ✏️ Custom decks | Create your own flashcard decks with any terms |
| 📱 Works offline | All data stored on device — no internet needed after first load |
| 🆓 Free forever | No subscription · No ads · No login required |

---

## 📖 Glossary Sources

| Domain | Source |
|---|---|
| **Legal** | Canadian Legal Dictionary · IRB Punjabi Glossary |
| **Social Work** | CASW Social Work Glossary · IFSW Global Definitions |
| **Medical** | Abbotsford Family Medicine — *A Practical Guide to the Punjabi Language in Medicine* (2019) · CCHI Mini-Glossaries |
| **IRB / Refugee** | Immigration and Refugee Board Glossary (Levels 1–4) · IRPA Terminology |

---

## 📲 How to Access

### Option 1 — Web Browser (easiest, no install)
Open on any device:
```
https://goelsakshi742.github.io/shabdavali-app
```

### Option 2 — Expo Go on iPhone (free)
1. Install **Expo Go** from the App Store
2. Log in or sign up at [expo.dev](https://expo.dev)
3. Find project `@sg0742/shabdavali-flashcards`
4. Tap to open — no laptop needed

### Option 3 — TestFlight (permanent iPhone install)
Requires Apple Developer account ($99/year):
```bash
eas build --platform ios
eas submit --platform ios
```

### Option 4 — Android APK (free, no account needed)
```bash
eas build --platform android --profile preview
```

---

## 🛠 Developer Setup

### Prerequisites
- Node.js (LTS) — [nodejs.org](https://nodejs.org)
- Watchman — `brew install watchman`

### Run locally
```bash
git clone https://github.com/GoelSakshi742/shabdavali-app.git
cd shabdavali-app
npm install
npx expo start --clear
```

Scan the QR code with **Expo Go** on your iPhone.

### Build web version
```bash
npx expo export -p web
mv dist docs
git add docs/
git commit -m "Update web build"
git push
```

---

## ➕ Adding More Flashcards

### In the app (no code needed)
**Decks tab → Create new deck → Add cards**

### In code (built-in decks)
Edit `src/data/cards.js`:

```js
{
  id: 'l81',
  q: 'English Term',
  pa: 'ਪੰਜਾਬੀ (romanization)',
  es: 'Spanish',      // optional
  ar: 'العربية',      // optional
  hi: 'हिन्दी',       // optional
  fr: 'Français',    // optional
  zh: '中文',         // optional
  fa: 'دری',         // optional
  ti: 'ትግርኛ',        // optional
  m: 'English definition.',
},
```

Then push to GitHub — the web version updates automatically on next deploy.

---

## 🗂 Project Structure

```
shabdavali-app/
├── App.js                    ← Root navigator (Study · Decks · Settings tabs)
├── app.json                  ← Expo config
├── ARCHITECTURE.md           ← Technical architecture document
├── docs/                     ← Built web app (served by GitHub Pages)
└── src/
    ├── data/
    │   └── cards.js          ← All 280 built-in flashcards
    ├── hooks/
    │   └── useStorage.js     ← AsyncStorage hooks (progress · decks · language)
    ├── screens/
    │   ├── HomeScreen.js     ← Domain picker · language selector · progress bars
    │   ├── QuizScreen.js     ← Flashcard / MCQ / Identify Term modes
    │   ├── ResultsScreen.js  ← Score · accuracy · retry missed
    │   ├── MyDecksScreen.js  ← List and manage custom decks
    │   ├── CreateDeckScreen.js ← Create new deck with name + colour
    │   ├── AddCardScreen.js  ← Add / remove cards from a deck
    │   └── SettingsScreen.js ← Language · per-domain stats · reset
    └── utils/
        └── theme.js          ← Colors · domain colors · language names
```

---

## 🔄 Update Workflow

After making changes:
```bash
# Save to GitHub
git add .
git commit -m "Describe your change"
git push

# Push live update to Expo (no Mac needed after this)
eas update --branch main --message "Describe your change"

# Rebuild web app
npx expo export -p web && mv dist docs
git add docs/ && git commit -m "Rebuild web" && git push
```

---

## 📄 License

Free to use for educational and community interpreting purposes.

Built with ❤️ for the Calgary community interpreting community.

---

<p align="center">
  <a href="https://goelsakshi742.github.io/shabdavali-app">🌐 Open Web App</a> ·
  <a href="https://github.com/GoelSakshi742/shabdavali-app">📂 GitHub Repo</a> ·
  <a href="https://expo.dev/@sg0742/shabdavali-flashcards">📱 Expo Project</a>
</p>