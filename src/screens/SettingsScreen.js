import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, LANG_NAMES } from '../utils/theme';
import { useLang, useProgress } from '../hooks/useStorage';

function Row({ icon, label, value, onPress, destructive }) {
  return (
    <TouchableOpacity style={s.row} onPress={onPress}>
      <Ionicons name={icon} size={20} color={destructive ? COLORS.red : COLORS.muted} style={{ width: 28 }} />
      <Text style={[s.rowLabel, destructive && { color: COLORS.red }]}>{label}</Text>
      {value ? <Text style={s.rowValue}>{value}</Text> : null}
      <Ionicons name="chevron-forward" size={14} color={COLORS.muted} />
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const [lang, setLang] = useLang();
  const { progress, resetProgress } = useProgress();

  const totalCards = Object.values(progress).reduce((a, b) => a + (b.total || 0), 0);
  const totalCorrect = Object.values(progress).reduce((a, b) => a + (b.correct || 0), 0);

  function confirmReset() {
    Alert.alert('Reset progress?', 'All study history and statistics will be cleared.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: resetProgress },
    ]);
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Stats summary */}
        <View style={s.statsBox}>
          <Text style={s.statsTitle}>Your study stats</Text>
          <View style={s.statsRow}>
            <View style={s.statCol}><Text style={s.statN}>{totalCards}</Text><Text style={s.statL}>Cards studied</Text></View>
            <View style={s.statCol}><Text style={[s.statN,{color:COLORS.accent}]}>{totalCorrect}</Text><Text style={s.statL}>Correct</Text></View>
            <View style={s.statCol}><Text style={s.statN}>{totalCards ? Math.round(totalCorrect/totalCards*100) : 0}%</Text><Text style={s.statL}>Accuracy</Text></View>
          </View>
        </View>

        {/* Language */}
        <Text style={s.sectionLabel}>Quiz language</Text>
        <View style={s.section}>
          {Object.entries(LANG_NAMES).map(([k, v]) => (
            <TouchableOpacity key={k} style={s.langRow} onPress={() => setLang(k)}>
              <Text style={s.langName}>{v}</Text>
              {lang === k && <Ionicons name="checkmark-circle" size={20} color={COLORS.accent} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* About */}
        <Text style={s.sectionLabel}>About</Text>
        <View style={s.section}>
          <Row icon="information-circle-outline" label="Version" value="1.0.0" onPress={() => {}} />
          <Row icon="globe-outline" label="Languages" value="8" onPress={() => {}} />
          <Row icon="library-outline" label="Built-in terms" value="80" onPress={() => {}} />
        </View>

        {/* Danger */}
        <Text style={s.sectionLabel}>Data</Text>
        <View style={s.section}>
          <Row icon="trash-outline" label="Reset study progress" onPress={confirmReset} destructive />
        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>ਸ਼ਬਦਾਵਲੀ · Punjabi Interpreter Flashcards</Text>
          <Text style={s.footerSub}>Free to use · All data stored on device</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: COLORS.bg },
  scroll:  { padding: 18 },
  statsBox:{ backgroundColor: COLORS.bg2, borderRadius: 16, padding: 18, marginBottom: 24, borderWidth: 0.5, borderColor: COLORS.border },
  statsTitle:{ fontSize: 13, color: COLORS.muted, marginBottom: 14 },
  statsRow:{ flexDirection: 'row' },
  statCol: { flex: 1, alignItems: 'center' },
  statN:   { fontFamily: 'Georgia', fontSize: 22, color: COLORS.text, fontWeight: '700' },
  statL:   { fontSize: 11, color: COLORS.muted, marginTop: 4 },
  sectionLabel: { fontSize: 11, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  section: { backgroundColor: COLORS.bg2, borderRadius: 14, marginBottom: 24, overflow: 'hidden', borderWidth: 0.5, borderColor: COLORS.border },
  row:     { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 0.5, borderBottomColor: COLORS.border },
  rowLabel:{ flex: 1, fontSize: 14, color: COLORS.text, marginLeft: 4 },
  rowValue:{ fontSize: 13, color: COLORS.muted, marginRight: 6 },
  langRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderBottomWidth: 0.5, borderBottomColor: COLORS.border },
  langName:{ fontSize: 15, color: COLORS.text },
  footer:  { alignItems: 'center', paddingTop: 20, paddingBottom: 12 },
  footerText:{ fontSize: 13, color: COLORS.muted },
  footerSub: { fontSize: 11, color: COLORS.bg3, marginTop: 4 },
});
