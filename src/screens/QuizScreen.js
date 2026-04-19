import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { COLORS, DOMAIN_COLORS, DOMAIN_NAMES } from '../utils/theme';
import { BUILT_IN_CARDS } from '../data/cards';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MODES = ['flash', 'mcq', 'type'];
const MODE_LABELS = { flash: 'Flashcards', mcq: 'Multiple Choice', type: 'Identify Term' };

function buildMCQOptions(card, lang) {
  const allCards = Object.values(BUILT_IN_CARDS).flat();
  const correct = card.pa;
  const pool = allCards.filter(c => {
    const val = c[lang] || c.pa;
    return c.id !== card.id && val && val.trim() !== '' && val !== correct;
  });
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const distractors = shuffled.slice(0, 3).map(c => c[lang] || c.pa);
  return [correct, ...distractors].sort(() => Math.random() - 0.5);
}

export default function QuizScreen({ route, navigation }) {
  const { cards: initCards, domain } = route.params;
  const lang = 'pa';
  const [cards] = useState(initCards);
  const [idx, setIdx] = useState(0);
  const [mode, setMode] = useState('flash');
  const [revealed, setRevealed] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [typeVal, setTypeVal] = useState('');
  const [typeResult, setTypeResult] = useState(null);
  const [score, setScore] = useState({ right: 0, wrong: 0, wrongCards: [] });
  const [mcqOpts, setMcqOpts] = useState([]);

  const card = cards[idx];

  useEffect(() => {
    if (card) setMcqOpts(buildMCQOptions(card, 'pa'));
  }, [idx, mode]);

  if (!card) return null;

  const domainColor = DOMAIN_COLORS[card.domain] || COLORS.accent;
  const tr = card.pa || '';
  const pct = Math.round((idx / cards.length) * 100);
  const correct = card.pa;

  async function saveCardResult(isRight) {
    try {
      const raw = await AsyncStorage.getItem('shabdavali_progress');
      const existing = raw ? JSON.parse(raw) : {};
      const prev = existing[domain] || { correct: 0, total: 0 };
      const updated = {
        ...existing,
        [domain]: {
          correct: prev.correct + (isRight ? 1 : 0),
          total: prev.total + 1,
          lastStudied: new Date().toISOString(),
        },
      };
      await AsyncStorage.setItem('shabdavali_progress', JSON.stringify(updated));
    } catch (e) {
      console.log('save error', e);
    }
  }

  function advance(newScore, isRight) {
    setScore(newScore);
    saveCardResult(isRight);
    if (idx + 1 >= cards.length) {
      navigation.replace('Results', { score: newScore, total: cards.length, lang, domain });
    } else {
      setIdx(i => i + 1);
      setRevealed(false);
      setAnswered(false);
      setSelected(null);
      setTypeVal('');
      setTypeResult(null);
    }
  }

  function markRight() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    advance({ ...score, right: score.right + 1 }, true);
  }

  function markWrong() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    advance({ ...score, wrong: score.wrong + 1, wrongCards: [...score.wrongCards, card] }, false);
  }

  function answerMCQ(opt) {
    if (answered) return;
    setAnswered(true);
    setSelected(opt);
    const isRight = opt === correct;
    Haptics.notificationAsync(isRight ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning);
    saveCardResult(isRight);
    if (isRight) setScore(s => ({ ...s, right: s.right + 1 }));
    else setScore(s => ({ ...s, wrong: s.wrong + 1, wrongCards: [...s.wrongCards, card] }));
  }

  function nextMCQ() {
    if (idx + 1 >= cards.length) navigation.replace('Results', { score, total: cards.length, lang, domain });
    else { setIdx(i => i + 1); setAnswered(false); setSelected(null); }
  }

  function checkType() {
    const val = typeVal.trim().toLowerCase();
    const ans = card.q.toLowerCase();
    const ok = val.length > 1 && (ans.includes(val) || val.includes(ans.split(' ')[0]));
    setTypeResult(ok ? 'right' : 'wrong');
    Haptics.notificationAsync(ok ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning);
    saveCardResult(ok);
    if (ok) setScore(s => ({ ...s, right: s.right + 1 }));
    else setScore(s => ({ ...s, wrong: s.wrong + 1, wrongCards: [...s.wrongCards, card] }));
    setTimeout(() => {
      if (idx + 1 >= cards.length) navigation.replace('Results', { score, total: cards.length, lang, domain });
      else { setIdx(i => i + 1); setTypeVal(''); setTypeResult(null); }
    }, 1400);
  }

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.progWrap}>
        <View style={s.progBar}>
          <View style={[s.progFill, { width: pct + '%', backgroundColor: domainColor }]} />
        </View>
        <View style={s.progRow}>
          <Text style={s.progLabel}>Card {idx + 1} of {cards.length}</Text>
          <Text style={[s.progLabel, { color: COLORS.accent }]}>{score.right} correct</Text>
        </View>
      </View>

      <View style={s.modeTabs}>
        {MODES.map(m => (
          <TouchableOpacity key={m}
            style={[s.modeTab, mode === m && s.modeTabActive]}
            onPress={() => { setMode(m); setRevealed(false); setAnswered(false); setSelected(null); setTypeVal(''); setTypeResult(null); }}>
            <Text style={[s.modeTabText, mode === m && s.modeTabTextActive]}>{MODE_LABELS[m]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <View style={[s.domainBadge, { backgroundColor: domainColor + '22' }]}>
          <Text style={[s.domainBadgeText, { color: domainColor }]}>{DOMAIN_NAMES[card.domain] || card.domain}</Text>
        </View>

        {/* FLASHCARD */}
        {mode === 'flash' && (
          <>
            <TouchableOpacity style={[s.card, { borderTopColor: domainColor }]}
              onPress={() => { if (!revealed) { setRevealed(true); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); } }}
              activeOpacity={0.9}>
              <Text style={s.cardQ}>{card.q}</Text>
              {!revealed ? (
                <Text style={s.hint}>Tap to reveal</Text>
              ) : (
                <View style={s.ansBox}>
                  <Text style={s.ansLabel}>ਪੰਜਾਬੀ</Text>
                  <Text style={s.ansPa}>{card.pa}</Text>
                  <View style={s.div} />
                  <Text style={s.ansM}>{card.m}</Text>
                </View>
              )}
            </TouchableOpacity>
            {revealed && (
              <View style={s.actionRow}>
                <TouchableOpacity style={s.wrongBtn} onPress={markWrong}>
                  <Ionicons name="close" size={18} color={COLORS.red} />
                  <Text style={s.wrongText}>Review again</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.rightBtn} onPress={markRight}>
                  <Ionicons name="checkmark" size={18} color={COLORS.greenLight} />
                  <Text style={s.rightText}>Got it!</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {/* MULTIPLE CHOICE */}
        {mode === 'mcq' && (
          <>
            <View style={[s.card, { borderTopColor: domainColor }]}>
              <Text style={s.hint}>What is the Punjabi translation of:</Text>
              <Text style={s.cardQ}>{card.q}</Text>
            </View>
            <View style={s.mcqOpts}>
              {mcqOpts.map((opt, i) => {
                let os = s.mcqOpt, ts = s.mcqT;
                if (answered) {
                  if (opt === correct) { os = s.mcqRight; ts = s.mcqTRight; }
                  else if (opt === selected) { os = s.mcqWrong; ts = s.mcqTWrong; }
                }
                return (
                  <TouchableOpacity key={i} style={os} onPress={() => answerMCQ(opt)} disabled={answered}>
                    <Text style={ts}>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {answered && (
              <>
                <Text style={[s.feedback, { color: selected === correct ? COLORS.greenLight : COLORS.red }]}>
                  {selected === correct ? '✓ Correct!' : `✗ Answer: ${correct}`}
                </Text>
                <TouchableOpacity style={s.nextBtn} onPress={nextMCQ}>
                  <Text style={s.nextT}>{idx + 1 >= cards.length ? 'See results →' : 'Next →'}</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}

        {/* IDENTIFY TERM */}
        {mode === 'type' && (
          <>
            <View style={[s.card, { borderTopColor: domainColor }]}>
              <Text style={s.hint}>What English term matches this?</Text>
              <Text style={[s.ansPa, { fontSize: 20, marginBottom: 6 }]}>{card.pa}</Text>
              <View style={s.div} />
              <Text style={s.ansM}>{card.m}</Text>
            </View>
            <TextInput
              style={[s.typeInput, typeResult === 'right' && s.typeR, typeResult === 'wrong' && s.typeW]}
              placeholder="Type the English term…"
              placeholderTextColor={COLORS.muted}
              value={typeVal}
              onChangeText={setTypeVal}
              onSubmitEditing={checkType}
              returnKeyType="done"
              editable={!typeResult}
              autoCapitalize="none"
            />
            {typeResult ? (
              <Text style={[s.feedback, { color: typeResult === 'right' ? COLORS.greenLight : COLORS.red }]}>
                {typeResult === 'right' ? `✓ "${card.q}"` : `✗ Answer: ${card.q}`}
              </Text>
            ) : (
              <TouchableOpacity style={s.nextBtn} onPress={checkType}>
                <Text style={s.nextT}>Check →</Text>
              </TouchableOpacity>
            )}
          </>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  progWrap: { padding: 16, paddingBottom: 8 },
  progBar: { height: 4, backgroundColor: COLORS.bg3, borderRadius: 2, overflow: 'hidden', marginBottom: 6 },
  progFill: { height: 4, borderRadius: 2 },
  progRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progLabel: { fontSize: 12, color: COLORS.muted },
  modeTabs: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 14 },
  modeTab: { flex: 1, paddingVertical: 9, borderRadius: 10, borderWidth: 0.5, borderColor: COLORS.border2, alignItems: 'center' },
  modeTabActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  modeTabText: { fontSize: 12, color: COLORS.muted },
  modeTabTextActive: { color: COLORS.bg, fontWeight: '500' },
  content: { paddingHorizontal: 16, paddingBottom: 40 },
  domainBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100, marginBottom: 12 },
  domainBadgeText: { fontSize: 10, fontWeight: '500', letterSpacing: 0.6, textTransform: 'uppercase' },
  card: { backgroundColor: COLORS.bg2, borderRadius: 20, padding: 22, borderTopWidth: 3, borderWidth: 0.5, borderColor: COLORS.border, marginBottom: 14, minHeight: 160 },
  cardQ: { fontSize: 22, fontWeight: '500', color: COLORS.text, lineHeight: 30, marginBottom: 12 },
  hint: { fontSize: 13, color: COLORS.muted, marginBottom: 8 },
  ansBox: { backgroundColor: COLORS.bg, borderRadius: 12, padding: 14, marginTop: 4 },
  ansLabel: { fontSize: 10, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 5 },
  ansPa: { fontSize: 17, color: COLORS.accent, fontWeight: '500', marginBottom: 3, lineHeight: 24 },
  ansLang: { fontSize: 13, color: COLORS.muted, marginBottom: 4 },
  div: { height: 0.5, backgroundColor: COLORS.border, marginVertical: 8 },
  ansM: { fontSize: 13, color: COLORS.muted, lineHeight: 19 },
  actionRow: { flexDirection: 'row', gap: 10 },
  wrongBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 14, backgroundColor: 'rgba(226,75,74,0.10)', borderRadius: 12, borderWidth: 0.5, borderColor: 'rgba(226,75,74,0.25)' },
  wrongText: { color: COLORS.red, fontSize: 14, fontWeight: '500' },
  rightBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 14, backgroundColor: 'rgba(99,153,42,0.10)', borderRadius: 12, borderWidth: 0.5, borderColor: 'rgba(99,153,42,0.30)' },
  rightText: { color: COLORS.greenLight, fontSize: 14, fontWeight: '500' },
  mcqOpts: { gap: 10, marginBottom: 10 },
  mcqOpt: { padding: 15, backgroundColor: COLORS.bg2, borderRadius: 12, borderWidth: 0.5, borderColor: COLORS.border2 },
  mcqRight: { padding: 15, backgroundColor: 'rgba(99,153,42,0.13)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(99,153,42,0.45)' },
  mcqWrong: { padding: 15, backgroundColor: 'rgba(226,75,74,0.10)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(226,75,74,0.35)' },
  mcqT: { fontSize: 14, color: COLORS.text },
  mcqTRight: { fontSize: 14, color: COLORS.greenLight, fontWeight: '500' },
  mcqTWrong: { fontSize: 14, color: COLORS.red },
  feedback: { fontSize: 14, textAlign: 'center', fontWeight: '500', marginBottom: 10 },
  nextBtn: { padding: 15, backgroundColor: COLORS.bg2, borderRadius: 12, borderWidth: 0.5, borderColor: COLORS.border2, alignItems: 'center' },
  nextT: { fontSize: 15, color: COLORS.text },
  typeInput: { backgroundColor: COLORS.bg2, borderRadius: 12, borderWidth: 0.5, borderColor: COLORS.border2, padding: 14, fontSize: 15, color: COLORS.text, marginBottom: 10 },
  typeR: { borderColor: 'rgba(99,153,42,0.5)', borderWidth: 1 },
  typeW: { borderColor: 'rgba(226,75,74,0.5)', borderWidth: 1 },
});