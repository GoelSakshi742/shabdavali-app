import React, { useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView,
} from 'react-native';
import { COLORS } from '../utils/theme';
import { useProgress } from '../hooks/useStorage';

export default function ResultsScreen({ route, navigation }) {
  const { score, total, lang, domain } = route.params;
  const { updateProgress } = useProgress();
  const saved = useRef(false);

  const pct = total > 0 ? Math.round((score.right / total) * 100) : 0;
  const tier = pct === 100 ? 4 : pct >= 80 ? 3 : pct >= 60 ? 2 : pct >= 40 ? 1 : 0;
  const titles = ['Keep practising!', 'Good effort!', 'Well done!', 'Excellent!', 'Perfect!'];
  const subs = [
    'Review the missed cards and try again.',
    "You're making progress. Keep going!",
    "You're building strong vocabulary.",
    'Great command of these terms.',
    "You've mastered this deck!",
  ];
  const circleColor = pct >= 80 ? COLORS.greenLight : pct >= 50 ? COLORS.accent : COLORS.red;

  // Save progress when results screen mounts — only once
  useEffect(() => {
    if (saved.current) return;
    saved.current = true;
    if (domain && total > 0) {
      updateProgress(domain, score.right, total);
    }
  }, []);

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={[s.circle, { borderColor: circleColor }]}>
          <Text style={[s.pct, { color: circleColor }]}>{pct}%</Text>
          <Text style={s.pctLabel}>score</Text>
        </View>

        <Text style={s.title}>{titles[tier]}</Text>
        <Text style={s.sub}>{subs[tier]}</Text>

        <View style={s.statsGrid}>
          <View style={s.statBox}>
            <Text style={[s.statN, { color: COLORS.greenLight }]}>{score.right}</Text>
            <Text style={s.statL}>Correct</Text>
          </View>
          <View style={s.statBox}>
            <Text style={[s.statN, { color: COLORS.red }]}>{score.wrong}</Text>
            <Text style={s.statL}>Review</Text>
          </View>
          <View style={s.statBox}>
            <Text style={[s.statN, { color: COLORS.accent }]}>{total}</Text>
            <Text style={s.statL}>Cards Studied</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statN}>{pct}%</Text>
            <Text style={s.statL}>Accuracy</Text>
          </View>
        </View>

        {score.wrongCards.length > 0 && (
          <TouchableOpacity style={s.retryBtn} onPress={() => {
            const shuffled = [...score.wrongCards].sort(() => Math.random() - 0.5);
            navigation.replace('Quiz', { cards: shuffled, lang, domain });
          }}>
            <Text style={s.retryText}>Retry missed cards ({score.wrongCards.length}) →</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={s.homeBtn} onPress={() => navigation.popToTop()}>
          <Text style={s.homeBtnText}>Back to home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:     { flex: 1, backgroundColor: COLORS.bg },
  scroll:   { padding: 24, alignItems: 'center' },
  circle:   { width: 130, height: 130, borderRadius: 65, borderWidth: 3, alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 20 },
  pct:      { fontFamily: 'Georgia', fontSize: 34, fontWeight: '700', lineHeight: 38 },
  pctLabel: { fontSize: 12, color: COLORS.muted },
  title:    { fontSize: 22, fontFamily: 'Georgia', color: COLORS.text, fontWeight: '700', marginBottom: 6 },
  sub:      { fontSize: 14, color: COLORS.muted, textAlign: 'center', lineHeight: 20, marginBottom: 28 },
  statsGrid:{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, width: '100%', marginBottom: 24 },
  statBox:  { width: '47%', backgroundColor: COLORS.bg2, borderRadius: 12, padding: 16, alignItems: 'center' },
  statN:    { fontFamily: 'Georgia', fontSize: 24, fontWeight: '700', color: COLORS.text },
  statL:    { fontSize: 11, color: COLORS.muted, marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  retryBtn: { width: '100%', backgroundColor: COLORS.accent, borderRadius: 14, padding: 16, alignItems: 'center', marginBottom: 10 },
  retryText:{ fontSize: 15, fontWeight: '500', color: COLORS.bg },
  homeBtn:  { width: '100%', borderRadius: 14, padding: 14, alignItems: 'center', borderWidth: 0.5, borderColor: COLORS.border2 },
  homeBtnText: { fontSize: 14, color: COLORS.muted },
});