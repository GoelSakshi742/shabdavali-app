# ਸ਼ਬਦਾਵਲੀ — Interpreter Flashcard App

A free, offline-first flashcard trainer for Punjabi community interpreters working in legal, social work, medical and refugee contexts in Canada.

---

## Quick Start

```bash
# 1. Install Node.js from https://nodejs.org (LTS)
# 2. Install Watchman (prevents file-watch errors on Mac)
brew install watchman

# 3. Enter project and install
cd shabdavali-app
npm install

# 4. Run on your iPhone via Expo Go (free, no Apple account needed)
npx expo start --clear
```

Install **Expo Go** from the App Store → scan the QR code → app opens on your phone.

---

## Upload to GitHub

```bash
cd shabdavali-app
git init
git branch -M main
git add .
git commit -m "Initial commit: Shabdavali flashcard app"
git remote add origin https://github.com/GoelSakshi742/shabdavali-app.git
git push -u origin main
```

Future updates:
```bash
git add .
git commit -m "Describe your changes"
git push
```

---

## Get the App on Your iPhone — Free Options

### Option 1: Expo Go (easiest, instant, free)
- Run `npx expo start` on your Mac
- Scan QR code with Expo Go app
- Works as long as your Mac is on and on the same WiFi
- Best for: daily practice while at home

### Option 2: Expo Publish (free, no Mac needed after)
```bash
npx expo login       # create free account at expo.dev
npx expo publish
```
- Get a permanent link like `exp://exp.host/@yourname/shabdavali`
- Open in Expo Go from anywhere — no Mac running required
- Best for: sharing with colleagues, using on the go

### Option 3: EAS Build + TestFlight ($99/year Apple Developer account)
```bash
npm install -g eas-cli
npx expo login
eas build --platform ios
eas submit --platform ios
```
- Fully installed app on your iPhone like any App Store app
- No Expo Go needed, works offline
- Best for: permanent personal use and sharing via TestFlight

### Option 4: Android APK (free, no developer account)
```bash
eas build --platform android --profile preview
```
- Builds a `.apk` file you can install on any Android phone
- Free, no Google Play account needed
- Best for: Android users or sharing with colleagues

---

## Adding More Flashcards

### In the app (no code needed):
Tap **Decks tab → Create new deck → Add cards**

### In code (built-in decks):
Edit `src/data/cards.js` and add to any array:

```js
{
  id: 'l21',              // unique ID — increment last number
  q: 'English Term',
  pa: 'ਪੰਜਾਬੀ (romanization)',
  es: 'Spanish',          // optional
  ar: 'العربية',          // optional
  hi: 'हिन्दी',           // optional
  fr: 'Français',         // optional
  zh: '中文',             // optional
  fa: 'دری',              // optional
  ti: 'ትግርኛ',            // optional
  m: 'English meaning/definition.',
},
```

Then save the file — the app reloads automatically.

---

## Glossary Sources

Terms sourced from:
- **Canadian Legal Dictionary** — criminal, civil, family and property law
- **CCHI Mini-Glossaries** — cchicertification.org/cchi-mini-glossaries (cardiovascular, respiratory, maternal)
- **Abbotsford Family Medicine Punjabi Language Guide** — body parts, symptoms, common conditions
- **IRB Terminology** — Immigration and Refugee Board of Canada
- **Social Work Practice** — CASW/IFSW definitions

---

## Project Structure

```
shabdavali-app/
├── App.js                        ← Root navigator (tabs: Study, Decks, Settings)
├── app.json                      ← Expo config
├── package.json                  ← Dependencies
├── babel.config.js
├── eas.json                      ← EAS Build / TestFlight config
├── ARCHITECTURE.md               ← Technical architecture document
└── src/
    ├── data/
    │   └── cards.js              ← All built-in flashcards (80+ terms, 8 languages)
    ├── hooks/
    │   └── useStorage.js         ← AsyncStorage hooks (lang, decks, progress)
    ├── screens/
    │   ├── HomeScreen.js         ← Domain picker, language selector, progress bars
    │   ├── QuizScreen.js         ← Flashcard / MCQ / Identify Term modes
    │   ├── ResultsScreen.js      ← Score, accuracy, retry missed cards
    │   ├── MyDecksScreen.js      ← List and manage custom decks
    │   ├── CreateDeckScreen.js   ← Create new deck with name + colour
    │   ├── AddCardScreen.js      ← Add / remove cards from a deck
    │   └── SettingsScreen.js     ← Language switcher, stats, reset
    └── utils/
        └── theme.js              ← Colors, domain colors, language names
```
