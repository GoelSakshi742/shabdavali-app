# Architecture Document — ਸ਼ਬਦਾਵਲੀ Flashcard App

## Overview

ਸ਼ਬਦਾਵਲੀ is an offline-first React Native / Expo flashcard trainer for Punjabi community interpreters. It supports 8 languages, 3 study modes, and allows users to create fully custom decks. All data is stored locally on the device using AsyncStorage.

---

## Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Framework | Expo SDK 54 + React Native 0.76 | Cross-platform iOS/Android, fast iteration |
| Navigation | React Navigation 6 (Stack + Bottom Tabs) | Standard RN navigation, well-documented |
| Storage | @react-native-async-storage/async-storage | Offline-first, no backend needed |
| Haptics | expo-haptics | Native feedback on correct/wrong answers |
| Icons | @expo/vector-icons (Ionicons) | Built into Expo, no extra install |
| Build / Deploy | EAS Build + TestFlight | Cloud-based iOS builds without Xcode |

---

## Data Architecture

### Built-in Cards (`src/data/cards.js`)

All cards are plain JS objects exported from a single file — no database, no API.

```
Card object:
{
  id: string,          // unique e.g. 'l1', 'm12'
  q: string,           // English question / term
  pa: string,          // Punjabi (Gurmukhi + romanization) — always present
  es?: string,         // Spanish
  ar?: string,         // Arabic
  hi?: string,         // Hindi
  fr?: string,         // French
  zh?: string,         // Mandarin
  fa?: string,         // Dari
  ti?: string,         // Tigrinya
  m: string,           // English meaning / definition
}
```

Organized by domain: `legal` (20), `social` (20), `medical` (30), `irb` (20).

### Custom Decks (AsyncStorage)

Key: `shabdavali_custom_decks`
Value: JSON array of deck objects:

```
Deck object:
{
  id: string,          // 'deck_' + Date.now()
  name: string,
  description?: string,
  color: string,       // hex color for UI
  createdAt: ISO string,
  cards: Card[],       // same shape as built-in cards, no language fields required
}
```

### Progress (AsyncStorage)

Key: `shabdavali_progress`
Value: JSON object keyed by domain:

```
{
  legal:   { correct: number, total: number, lastStudied: ISO string },
  social:  { ... },
  medical: { ... },
  irb:     { ... },
  custom:  { ... },
}
```

### Language Preference (AsyncStorage)

Key: `shabdavali_lang`
Value: language code string — `'pa' | 'es' | 'ar' | 'hi' | 'fr' | 'zh' | 'fa' | 'ti'`

---

## Navigation Structure

```
Root (Bottom Tab Navigator)
├── Study (Stack Navigator)
│   ├── HomeScreen        — domain cards, language pills, start quiz
│   ├── QuizScreen        — active study session (flash/mcq/type)
│   └── ResultsScreen     — score, retry missed cards
├── Decks (Stack Navigator)
│   ├── MyDecksScreen     — list all custom decks
│   ├── CreateDeckScreen  — create new deck (name, colour)
│   └── AddCardScreen     — add / remove cards from a deck
└── Settings (Screen)
    └── SettingsScreen    — language, stats, reset progress
```

---

## Screen Responsibilities

### HomeScreen
- Reads `lang` from AsyncStorage via `useLang()`
- Reads `progress` via `useProgress()` to render domain progress bars
- Reads `decks` via `useCustomDecks()` to show custom deck list
- On domain card tap → navigates to QuizScreen with shuffled cards array

### QuizScreen
- Receives `{ cards, lang, domain }` via route params
- Manages local state: `idx`, `mode`, `score`, `revealed`, `answered`, `mcqOpts`
- `buildMCQOptions(card, lang)` — called via `useEffect([idx, mode])` — generates fresh options each card to fix the stale-options bug
- On finish → navigates to ResultsScreen with final score

### ResultsScreen
- Stateless display — all data from route params
- "Retry missed" button reshuffles `score.wrongCards` and replaces back to QuizScreen

### MyDecksScreen / CreateDeckScreen / AddCardScreen
- All write to AsyncStorage via `useCustomDecks()` hook
- Changes are immediately reflected on HomeScreen via shared hook state

---

## MCQ Bug Fix (v1.1)

**Problem:** MCQ options were generated once with `useState(getMCQOptions)` and never regenerated. When the card index advanced, the options displayed were still from the first card.

**Fix:** Options are now generated inside `useEffect([idx, mode])` and stored with `setMcqOpts()`. This ensures a fresh set of correct + 3 distractor options is built every time the card changes or the mode switches.

```js
useEffect(() => {
  if (card) setMcqOpts(buildMCQOptions(card, lang));
}, [idx, mode]);
```

---

## Language Support

| Code | Language | Script | RTL |
|---|---|---|---|
| pa | Punjabi | Gurmukhi | No |
| es | Spanish | Latin | No |
| ar | Arabic | Arabic | Yes (web only) |
| hi | Hindi | Devanagari | No |
| fr | French | Latin | No |
| zh | Mandarin | Hanzi | No |
| fa | Dari | Perso-Arabic | Yes (web only) |
| ti | Tigrinya | Geez | No |

RTL is handled in the web version. In the native app, translation text renders correctly for all scripts including Gurmukhi, Devanagari, Arabic and Perso-Arabic.

---

## Adding a New Domain

1. Add a new key to `BUILT_IN_CARDS` in `src/data/cards.js`
2. Add the color to `DOMAIN_COLORS` in `src/utils/theme.js`
3. Add the display name to `DOMAIN_NAMES` in `src/utils/theme.js`
4. Add a card to the domain grid in `HomeScreen.js`

---

## Glossary Sources

| Domain | Source |
|---|---|
| Legal | Canadian Legal Dictionary, Criminal Code of Canada |
| Social Work | CASW Code of Ethics, IFSW Global Definitions |
| Medical | CCHI Mini-Glossaries (cchicertification.org), Abbotsford Family Medicine Punjabi Language Guide (2020) |
| IRB / Refugee | Immigration and Refugee Protection Act, IRB Chairperson Guidelines |

---

## Deployment

| Target | Command | Cost |
|---|---|---|
| iPhone via Expo Go | `npx expo start` | Free |
| Expo cloud (shareable link) | `npx expo publish` | Free |
| TestFlight / App Store | `eas build --platform ios` | $99/year (Apple Developer) |
| Android APK | `eas build --platform android --profile preview` | Free |
