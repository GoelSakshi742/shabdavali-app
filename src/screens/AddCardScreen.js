import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, LANG_NAMES } from '../utils/theme';
import { useCustomDecks } from '../hooks/useStorage';

export default function AddCardScreen({ route, navigation }) {
  const { deckId, deckName, isNew } = route.params;
  const { decks, addCardToDeck, removeCardFromDeck } = useCustomDecks();
  const deck = decks.find(d => d.id === deckId);

  const [english, setEnglish] = useState('');
  const [meaning, setMeaning] = useState('');
  const [translations, setTranslations] = useState({ pa:'',es:'',ar:'',hi:'',fr:'',zh:'',fa:'',ti:'' });
  const [expandTr, setExpandTr] = useState(false);

  async function save() {
    if (!english.trim() || !meaning.trim()) {
      Alert.alert('Required fields', 'Please enter the English term and meaning.'); return;
    }
    const card = {
      id: 'card_' + Date.now(),
      q: english.trim(),
      m: meaning.trim(),
      ...Object.fromEntries(
        Object.entries(translations).filter(([, v]) => v.trim()).map(([k,v]) => [k, v.trim()])
      ),
    };
    await addCardToDeck(deckId, card);
    setEnglish(''); setMeaning('');
    setTranslations({ pa:'',es:'',ar:'',hi:'',fr:'',zh:'',fa:'',ti:'' });
    Alert.alert('Card added!', `"${card.q}" added to ${deckName}.`);
  }

  if (!deck) return (
    <SafeAreaView style={s.safe}>
      <Text style={[s.label, { padding: 20 }]}>Deck not found.</Text>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">

        {isNew && (
          <View style={s.welcome}>
            <Text style={s.welcomeTitle}>Deck created!</Text>
            <Text style={s.welcomeSub}>Now add some cards to "{deckName}"</Text>
          </View>
        )}

        <View style={s.deckTag}>
          <View style={[s.dot, { backgroundColor: deck.color || COLORS.custom }]} />
          <Text style={s.deckTagText}>{deckName} · {deck.cards?.length || 0} cards</Text>
        </View>

        <Text style={s.sectionHead}>New card</Text>

        <Text style={s.label}>English term *</Text>
        <TextInput style={s.input} placeholder="e.g. Habeas Corpus"
          placeholderTextColor={COLORS.muted} value={english} onChangeText={setEnglish} />

        <Text style={s.label}>Meaning / definition *</Text>
        <TextInput style={[s.input, s.inputMulti]} placeholder="What does this term mean?"
          placeholderTextColor={COLORS.muted} value={meaning} onChangeText={setMeaning}
          multiline numberOfLines={3} textAlignVertical="top" />

        <TouchableOpacity style={s.expandRow} onPress={() => setExpandTr(!expandTr)}>
          <Text style={s.expandText}>Translations (optional)</Text>
          <Ionicons name={expandTr ? 'chevron-up' : 'chevron-down'} size={16} color={COLORS.muted} />
        </TouchableOpacity>

        {expandTr && Object.entries(LANG_NAMES).map(([k, langName]) => (
          <View key={k}>
            <Text style={s.label}>{langName}</Text>
            <TextInput style={s.input}
              placeholder={`Translation in ${langName}…`}
              placeholderTextColor={COLORS.muted}
              value={translations[k]}
              onChangeText={v => setTranslations(t => ({ ...t, [k]: v }))} />
          </View>
        ))}

        <TouchableOpacity style={s.saveBtn} onPress={save}>
          <Ionicons name="add-circle" size={20} color={COLORS.bg} />
          <Text style={s.saveBtnText}>Add this card</Text>
        </TouchableOpacity>

        {/* Existing cards */}
        {deck.cards?.length > 0 && (
          <>
            <Text style={[s.sectionHead, { marginTop: 28 }]}>Cards in this deck ({deck.cards.length})</Text>
            {deck.cards.map(c => (
              <View key={c.id} style={s.existingCard}>
                <View style={{ flex: 1 }}>
                  <Text style={s.existingQ}>{c.q}</Text>
                  {c.pa && <Text style={s.existingTr}>{c.pa}</Text>}
                  <Text style={s.existingM} numberOfLines={2}>{c.m}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                  Alert.alert('Remove card?', `Remove "${c.q}" from this deck?`, [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Remove', style: 'destructive', onPress: () => removeCardFromDeck(deckId, c.id) },
                  ]);
                }}>
                  <Ionicons name="trash-outline" size={18} color={COLORS.muted} />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        {deck.cards?.length > 0 && (
          <TouchableOpacity style={s.studyBtn} onPress={() => navigation.getParent()?.navigate('Study')}>
            <Text style={s.studyBtnText}>Go study this deck →</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: COLORS.bg },
  scroll:  { padding: 18 },
  welcome: { backgroundColor: 'rgba(201,168,76,0.12)', borderRadius: 14, padding: 16, marginBottom: 16, borderWidth: 0.5, borderColor: 'rgba(201,168,76,0.3)' },
  welcomeTitle: { fontSize: 16, color: COLORS.accent, fontWeight: '500', marginBottom: 4 },
  welcomeSub:   { fontSize: 13, color: COLORS.muted },
  deckTag: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  dot:     { width: 10, height: 10, borderRadius: 5 },
  deckTagText: { fontSize: 13, color: COLORS.muted },
  sectionHead: { fontSize: 14, fontWeight: '500', color: COLORS.text, marginBottom: 12 },
  label:   { fontSize: 11, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 7, marginTop: 12 },
  input:   { backgroundColor: COLORS.bg2, borderRadius: 12, borderWidth: 0.5, borderColor: COLORS.border2, padding: 13, fontSize: 14, color: COLORS.text },
  inputMulti: { minHeight: 80, paddingTop: 11, textAlignVertical: 'top' },
  expandRow:{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, marginTop: 8, borderTopWidth: 0.5, borderTopColor: COLORS.border },
  expandText:{ fontSize: 13, color: COLORS.muted },
  saveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.accent, borderRadius: 14, padding: 15, marginTop: 20 },
  saveBtnText: { fontSize: 15, fontWeight: '500', color: COLORS.bg },
  existingCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: COLORS.bg2, borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 0.5, borderColor: COLORS.border },
  existingQ: { fontSize: 14, color: COLORS.text, fontWeight: '500', marginBottom: 3 },
  existingTr:{ fontSize: 12, color: COLORS.accent, marginBottom: 3 },
  existingM: { fontSize: 12, color: COLORS.muted, lineHeight: 17 },
  studyBtn:{ backgroundColor: COLORS.bg2, borderRadius: 14, padding: 14, alignItems: 'center', marginTop: 16, borderWidth: 0.5, borderColor: COLORS.border2 },
  studyBtnText:{ fontSize: 14, color: COLORS.muted },
});
