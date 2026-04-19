import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, DOMAIN_NAMES, DOMAIN_COLORS } from '../utils/theme';
import { useProgress } from '../hooks/useStorage';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BUILT_IN_CARDS } from '../data/cards';

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
  const { resetProgress } = useProgress();
  const [progress, setProgress] = useState({});

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('shabdavali_progress').then(raw => {
        setProgress(raw ? JSON.parse(raw) : {});
      }).catch(() => setProgress({}));
    }, [])
  );

  const builtInDomains = ['legal', 'social', 'medical', 'irb'];

  // Accurate stats from stored progress
  const totalStudied  = builtInDomains.reduce((a, d) => a + (progress[d]?.total   || 0), 0);
  const totalCorrect  = builtInDomains.reduce((a, d) => a + (progress[d]?.correct || 0), 0);
  const accuracy      = totalStudied > 0 ? Math.round((totalCorrect / totalStudied) * 100) : 0;

  function confirmReset() {
    Alert.alert(
      'Reset progress?',
      'All study history and statistics will be cleared.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: resetProgress },
      ]
    );
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Overall stats */}
        <View style={s.statsBox}>
          <Text style={s.statsTitle}>Your study stats</Text>
          <View style={s.statsRow}>
            <View style={s.statCol}>
              <Text style={s.statN}>{totalStudied}</Text>
              <Text style={s.statL}>Cards studied</Text>
            </View>
            <View style={s.statCol}>
              <Text style={[s.statN, { color: COLORS.greenLight }]}>{totalCorrect}</Text>
              <Text style={s.statL}>Correct</Text>
            </View>
            <View style={s.statCol}>
              <Text style={[s.statN, { color: COLORS.accent }]}>{accuracy}%</Text>
              <Text style={s.statL}>Accuracy</Text>
            </View>
          </View>
        </View>

        {/* Per-domain progress */}
        <Text style={s.sectionLabel}>Progress by domain</Text>
        <View style={s.section}>
          {builtInDomains.map(d => {
            const p          = progress[d];
            const studied    = p?.total   || 0;
            const correct    = p?.correct || 0;
            const domainSize = BUILT_IN_CARDS[d].length;
            const pct        = domainSize > 0 ? Math.min(100, Math.round((correct / domainSize) * 100)) : 0;
            const col        = DOMAIN_COLORS[d];
            const lastDate   = p?.lastStudied
              ? new Date(p.lastStudied).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })
              : 'Not yet studied';
            return (
              <View key={d} style={s.domainRow}>
                <View style={{ flex: 1 }}>
                  <View style={s.domainHeader}>
                    <Text style={[s.domainName, { color: col }]}>{DOMAIN_NAMES[d]}</Text>
                    <Text style={s.domainMeta}>{correct}/{domainSize} · {lastDate}</Text>
                  </View>
                  <View style={s.barBg}>
                    <View style={[s.barFill, { width: pct + '%', backgroundColor: col }]} />
                  </View>
                </View>
                <Text style={[s.domainPct, { color: col }]}>{pct}%</Text>
              </View>
            );
          })}
        </View>



        {/* About */}
        <Text style={s.sectionLabel}>About</Text>
        <View style={s.section}>
          <Row icon="information-circle-outline" label="Version" value="1.1.0" onPress={() => {}} />
          <Row icon="globe-outline" label="Languages" value="8" onPress={() => {}} />
          <Row icon="library-outline" label="Built-in terms"
            value={`${builtInDomains.reduce((a, d) => a + BUILT_IN_CARDS[d].length, 0)}`}
            onPress={() => {}} />
        </View>

        {/* Reset */}
        <Text style={s.sectionLabel}>Data</Text>
        <View style={s.section}>
          <Row icon="trash-outline" label="Reset study progress" onPress={confirmReset} destructive />
        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>ਸ਼ਬਦਾਵਲੀ · Interpreter Flashcards</Text>
          <Text style={s.footerSub}>Free · All data stored on device</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: COLORS.bg },
  scroll:     { padding: 18 },
  statsBox:   { backgroundColor: COLORS.bg2, borderRadius: 16, padding: 18, marginBottom: 24, borderWidth: 0.5, borderColor: COLORS.border },
  statsTitle: { fontSize: 12, color: COLORS.muted, marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.6 },
  statsRow:   { flexDirection: 'row' },
  statCol:    { flex: 1, alignItems: 'center' },
  statN:      { fontFamily: 'Georgia', fontSize: 22, color: COLORS.text, fontWeight: '700' },
  statL:      { fontSize: 11, color: COLORS.muted, marginTop: 4, textAlign: 'center' },
  sectionLabel: { fontSize: 11, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  section:    { backgroundColor: COLORS.bg2, borderRadius: 14, marginBottom: 24, overflow: 'hidden', borderWidth: 0.5, borderColor: COLORS.border },
  domainRow:  { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 0.5, borderBottomColor: COLORS.border, gap: 12 },
  domainHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  domainName: { fontSize: 13, fontWeight: '500' },
  domainMeta: { fontSize: 11, color: COLORS.muted },
  barBg:      { height: 4, backgroundColor: COLORS.bg3, borderRadius: 2, overflow: 'hidden' },
  barFill:    { height: 4, borderRadius: 2 },
  domainPct:  { fontSize: 13, fontWeight: '500', minWidth: 36, textAlign: 'right' },
  row:        { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 0.5, borderBottomColor: COLORS.border },
  rowLabel:   { flex: 1, fontSize: 14, color: COLORS.text, marginLeft: 4 },
  rowValue:   { fontSize: 13, color: COLORS.muted, marginRight: 6 },
  footer:     { alignItems: 'center', paddingTop: 20, paddingBottom: 12 },
  footerText: { fontSize: 13, color: COLORS.muted },
  footerSub:  { fontSize: 11, color: COLORS.bg3, marginTop: 4 },
});