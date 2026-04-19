import React, { useState, useContext } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, DOMAIN_COLORS, DOMAIN_NAMES, LANG_NAMES } from '../utils/theme';
import { BUILT_IN_CARDS } from '../data/cards';
import { useLang, useProgress, useCustomDecks } from '../hooks/useStorage';

export default function HomeScreen({ navigation }) {
  const [lang, setLang] = useLang();
  const { progress } = useProgress();
  const { decks } = useCustomDecks();
  const [selectedDomain, setSelectedDomain] = useState('all');

  const builtInDomains = ['legal','social','medical','irb'];
  const totalCards = builtInDomains.reduce((acc, d) => acc + BUILT_IN_CARDS[d].length, 0);
  const domainCount = (domain) => BUILT_IN_CARDS[domain].length;
  const totalMastered = builtInDomains.reduce((acc, d) => acc + (progress[d]?.correct || 0), 0);

  const domainProgress = (domain) => {
    const p = progress[domain];
    if (!p) return 0;
    const total = BUILT_IN_CARDS[domain].length;
    return Math.min(100, Math.round((p.correct / total) * 100));
  };

  function startQuiz(domain, deckId) {
    let cards = [];
    if (domain === 'all') {
      cards = builtInDomains.flatMap(d => BUILT_IN_CARDS[d].map(c => ({ ...c, domain: d })));
    } else if (domain === 'custom' && deckId) {
      const deck = decks.find(d => d.id === deckId);
      cards = (deck?.cards || []).map(c => ({ ...c, domain: 'custom' }));
    } else {
      cards = BUILT_IN_CARDS[domain].map(c => ({ ...c, domain }));
    }
    cards = cards.sort(() => Math.random() - 0.5);
    navigation.navigate('Quiz', { cards, lang, domain: deckId || domain });
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <View style={s.hero}>
          <View style={s.appIcon}><Text style={s.appIconText}>📚</Text></View>
          <Text style={s.heroTitle}>ਸ਼ਬਦਾਵਲੀ</Text>
          <Text style={s.heroSub}>Interpreter Flashcard Trainer</Text>
        </View>

        {/* Stats */}
        <View style={s.statsRow}>
          <View style={s.statCard}><Text style={s.statN}>{totalCards}</Text><Text style={s.statL}>Built-in</Text></View>
          <View style={s.statCard}><Text style={[s.statN,{color:COLORS.accent}]}>{totalMastered}</Text><Text style={s.statL}>Practiced</Text></View>
          <View style={s.statCard}><Text style={s.statN}>{decks.length}</Text><Text style={s.statL}>My Decks</Text></View>
        </View>

        {/* Language picker */}
        <Text style={s.sectionLabel}>Quiz language</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.langScroll} contentContainerStyle={s.langRow}>
          {Object.entries(LANG_NAMES).map(([k,v]) => (
            <TouchableOpacity key={k} onPress={() => setLang(k)}
              style={[s.langPill, lang===k && s.langPillActive]}>
              <Text style={[s.langPillText, lang===k && s.langPillTextActive]}>{v}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Built-in domains */}
        <Text style={s.sectionLabel}>Built-in domains</Text>
        <View style={s.domainGrid}>
          {builtInDomains.map(d => {
            const pct = domainProgress(d);
            const col = DOMAIN_COLORS[d];
            return (
              <TouchableOpacity key={d} style={s.domainCard} onPress={() => startQuiz(d)}>
                <View style={[s.domainBar, { backgroundColor: col + '22' }]}>
                  <View style={[s.domainBarFill, { width: pct+'%', backgroundColor: col }]} />
                </View>
                <Text style={[s.domainName, { color: col }]}>{DOMAIN_NAMES[d]}</Text>
                <Text style={s.domainCount}>{domainCount(d)} terms · {pct}%</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Start all */}
        <TouchableOpacity style={s.startAll} onPress={() => startQuiz('all')}>
          <Text style={s.startAllText}>Study all {totalCards} terms</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.bg} />
        </TouchableOpacity>

        {/* Custom decks */}
        {decks.length > 0 && (
          <>
            <View style={s.rowBetween}>
              <Text style={s.sectionLabel}>My custom decks</Text>
              <TouchableOpacity onPress={() => navigation.getParent()?.navigate('Decks')}>
                <Text style={s.seeAll}>Manage →</Text>
              </TouchableOpacity>
            </View>
            {decks.map(deck => (
              <TouchableOpacity key={deck.id} style={s.customDeckRow}
                onPress={() => deck.cards?.length ? startQuiz('custom', deck.id) : null}>
                <View style={[s.deckDot, { backgroundColor: COLORS.custom }]} />
                <View style={{ flex: 1 }}>
                  <Text style={s.deckName}>{deck.name}</Text>
                  <Text style={s.deckCount}>{deck.cards?.length || 0} cards</Text>
                </View>
                <Ionicons name={deck.cards?.length ? 'play-circle' : 'add-circle-outline'}
                  size={24} color={deck.cards?.length ? COLORS.accent : COLORS.muted} />
              </TouchableOpacity>
            ))}
          </>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: COLORS.bg },
  scroll: { paddingHorizontal: 18 },
  hero:   { alignItems: 'center', paddingTop: 28, paddingBottom: 20 },
  appIcon:     { width: 72, height: 72, backgroundColor: COLORS.accent, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  appIconText: { fontSize: 32 },
  heroTitle:   { fontFamily: 'Georgia', fontSize: 26, color: COLORS.text, fontWeight: '700' },
  heroSub:     { fontSize: 13, color: COLORS.muted, marginTop: 4 },
  statsRow:    { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statCard:    { flex: 1, backgroundColor: COLORS.bg2, borderRadius: 12, padding: 14, alignItems: 'center' },
  statN:       { fontFamily: 'Georgia', fontSize: 22, color: COLORS.text, fontWeight: '700' },
  statL:       { fontSize: 11, color: COLORS.muted, marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.5 },
  sectionLabel:{ fontSize: 11, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10, marginTop: 4 },
  langScroll:  { marginBottom: 20, marginHorizontal: -18 },
  langRow:     { paddingHorizontal: 18, gap: 8 },
  langPill:    { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(201,168,76,0.30)', backgroundColor: 'rgba(201,168,76,0.18)' },
  langPillActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  langPillText:   { fontSize: 13, color: COLORS.accent },
  langPillTextActive: { color: COLORS.bg, fontWeight: '500' },
  domainGrid:  { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  domainCard:  { width: '47.5%', backgroundColor: COLORS.bg2, borderRadius: 14, padding: 16, borderWidth: 0.5, borderColor: COLORS.border },
  domainBar:   { height: 4, borderRadius: 2, marginBottom: 12, overflow: 'hidden' },
  domainBarFill: { height: 4, borderRadius: 2 },
  domainName:  { fontSize: 14, fontWeight: '500', marginBottom: 3 },
  domainCount: { fontSize: 11, color: COLORS.muted },
  startAll:    { backgroundColor: COLORS.accent, borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 28 },
  startAllText:{ fontSize: 16, fontWeight: '500', color: COLORS.bg },
  rowBetween:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  seeAll:      { fontSize: 12, color: COLORS.accent },
  customDeckRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bg2, borderRadius: 12, padding: 14, marginBottom: 8, gap: 12, borderWidth: 0.5, borderColor: COLORS.border },
  deckDot:     { width: 10, height: 10, borderRadius: 5 },
  deckName:    { fontSize: 14, color: COLORS.text, fontWeight: '500' },
  deckCount:   { fontSize: 12, color: COLORS.muted, marginTop: 2 },
});