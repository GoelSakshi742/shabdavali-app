import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRESS_KEY = 'shabdavali_progress';
const LANG_KEY     = 'shabdavali_lang';
const DECKS_KEY    = 'shabdavali_custom_decks';

// ── Language ──────────────────────────────────────────────────────────────
export function useLang() {
  const [lang, setLangState] = useState('pa');

  useEffect(() => {
    AsyncStorage.getItem(LANG_KEY).then(v => { if (v) setLangState(v); });
  }, []);

  const setLang = useCallback(async (l) => {
    setLangState(l);
    await AsyncStorage.setItem(LANG_KEY, l);
  }, []);

  return [lang, setLang];
}

// ── Custom Decks ──────────────────────────────────────────────────────────
export function useCustomDecks() {
  const [decks, setDecksState] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(DECKS_KEY).then(v => {
      if (v) setDecksState(JSON.parse(v));
    });
  }, []);

  const saveDecks = useCallback(async (newDecks) => {
    setDecksState(newDecks);
    await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(newDecks));
  }, []);

  const addDeck = useCallback(async (deck) => {
    const current = await AsyncStorage.getItem(DECKS_KEY);
    const existing = current ? JSON.parse(current) : [];
    const updated = [...existing, deck];
    await saveDecks(updated);
  }, [saveDecks]);

  const deleteDeck = useCallback(async (id) => {
    const current = await AsyncStorage.getItem(DECKS_KEY);
    const existing = current ? JSON.parse(current) : [];
    await saveDecks(existing.filter(d => d.id !== id));
  }, [saveDecks]);

  const addCardToDeck = useCallback(async (deckId, card) => {
    const current = await AsyncStorage.getItem(DECKS_KEY);
    const existing = current ? JSON.parse(current) : [];
    const updated = existing.map(d =>
      d.id === deckId ? { ...d, cards: [...(d.cards || []), card] } : d
    );
    await saveDecks(updated);
  }, [saveDecks]);

  const removeCardFromDeck = useCallback(async (deckId, cardId) => {
    const current = await AsyncStorage.getItem(DECKS_KEY);
    const existing = current ? JSON.parse(current) : [];
    const updated = existing.map(d =>
      d.id === deckId ? { ...d, cards: d.cards.filter(c => c.id !== cardId) } : d
    );
    await saveDecks(updated);
  }, [saveDecks]);

  return { decks, addDeck, deleteDeck, addCardToDeck, removeCardFromDeck };
}

// ── Progress ──────────────────────────────────────────────────────────────
export function useProgress() {
  const [progress, setProgress] = useState({});

  const loadProgress = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(PROGRESS_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      setProgress(parsed);
      return parsed;
    } catch (e) {
      console.log('loadProgress error', e);
      return {};
    }
  }, []);

  useEffect(() => {
    loadProgress();
  }, []);

  // Always reads fresh from AsyncStorage — no stale state problem
  const updateProgress = useCallback(async (domain, correct, total) => {
    try {
      const raw = await AsyncStorage.getItem(PROGRESS_KEY);
      const existing = raw ? JSON.parse(raw) : {};
      const prev = existing[domain] || { correct: 0, total: 0 };
      const updated = {
        ...existing,
        [domain]: {
          correct:     prev.correct + correct,
          total:       prev.total + total,
          lastStudied: new Date().toISOString(),
        },
      };
      await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
      setProgress(updated);
      console.log('Progress saved:', updated[domain]);
    } catch (e) {
      console.log('updateProgress error', e);
    }
  }, []);

  const resetProgress = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(PROGRESS_KEY);
      setProgress({});
    } catch (e) {
      console.log('resetProgress error', e);
    }
  }, []);

  return { progress, updateProgress, resetProgress, loadProgress };
}