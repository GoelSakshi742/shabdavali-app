import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  LANG:        'shabdavali_lang',
  CUSTOM_DECKS:'shabdavali_custom_decks',
  PROGRESS:    'shabdavali_progress',
  SETTINGS:    'shabdavali_settings',
};

export function useLang() {
  const [lang, setLangState] = useState('pa');

  useEffect(() => {
    AsyncStorage.getItem(KEYS.LANG).then(v => { if (v) setLangState(v); });
  }, []);

  const setLang = useCallback(async (l) => {
    setLangState(l);
    await AsyncStorage.setItem(KEYS.LANG, l);
  }, []);

  return [lang, setLang];
}

export function useCustomDecks() {
  const [decks, setDecksState] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(KEYS.CUSTOM_DECKS).then(v => {
      if (v) setDecksState(JSON.parse(v));
    });
  }, []);

  const saveDecks = useCallback(async (newDecks) => {
    setDecksState(newDecks);
    await AsyncStorage.setItem(KEYS.CUSTOM_DECKS, JSON.stringify(newDecks));
  }, []);

  const addDeck = useCallback(async (deck) => {
    const updated = [...decks, deck];
    await saveDecks(updated);
  }, [decks, saveDecks]);

  const updateDeck = useCallback(async (id, updates) => {
    const updated = decks.map(d => d.id === id ? { ...d, ...updates } : d);
    await saveDecks(updated);
  }, [decks, saveDecks]);

  const deleteDeck = useCallback(async (id) => {
    const updated = decks.filter(d => d.id !== id);
    await saveDecks(updated);
  }, [decks, saveDecks]);

  const addCardToDeck = useCallback(async (deckId, card) => {
    const updated = decks.map(d => {
      if (d.id !== deckId) return d;
      return { ...d, cards: [...(d.cards || []), card] };
    });
    await saveDecks(updated);
  }, [decks, saveDecks]);

  const removeCardFromDeck = useCallback(async (deckId, cardId) => {
    const updated = decks.map(d => {
      if (d.id !== deckId) return d;
      return { ...d, cards: d.cards.filter(c => c.id !== cardId) };
    });
    await saveDecks(updated);
  }, [decks, saveDecks]);

  return { decks, addDeck, updateDeck, deleteDeck, addCardToDeck, removeCardFromDeck };
}

export function useProgress() {
  const [progress, setProgressState] = useState({});

  useEffect(() => {
    AsyncStorage.getItem(KEYS.PROGRESS).then(v => {
      if (v) setProgressState(JSON.parse(v));
    });
  }, []);

  const updateProgress = useCallback(async (domain, correct, total) => {
    const updated = {
      ...progress,
      [domain]: {
        correct: (progress[domain]?.correct || 0) + correct,
        total:   (progress[domain]?.total   || 0) + total,
        lastStudied: new Date().toISOString(),
      }
    };
    setProgressState(updated);
    await AsyncStorage.setItem(KEYS.PROGRESS, JSON.stringify(updated));
  }, [progress]);

  const resetProgress = useCallback(async () => {
    setProgressState({});
    await AsyncStorage.removeItem(KEYS.PROGRESS);
  }, []);

  return { progress, updateProgress, resetProgress };
}
