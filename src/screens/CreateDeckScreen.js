import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Alert,
} from 'react-native';
import { COLORS } from '../utils/theme';
import { useCustomDecks } from '../hooks/useStorage';

const PALETTE = [
  '#378ADD','#7f77dd','#d85a30','#1d9e75',
  '#c9a84c','#d4537e','#63992a','#888680',
];

export default function CreateDeckScreen({ navigation }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [color, setColor] = useState(PALETTE[0]);
  const { addDeck } = useCustomDecks();

  async function create() {
    if (!name.trim()) { Alert.alert('Name required', 'Please enter a deck name.'); return; }
    const deck = {
      id: 'deck_' + Date.now(),
      name: name.trim(),
      description: desc.trim(),
      color,
      cards: [],
      createdAt: new Date().toISOString(),
    };
    await addDeck(deck);
    navigation.replace('AddCard', { deckId: deck.id, deckName: deck.name, isNew: true });
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        <Text style={s.label}>Deck name *</Text>
        <TextInput style={s.input} placeholder="e.g. My Court Terms"
          placeholderTextColor={COLORS.muted} value={name} onChangeText={setName}
          maxLength={50} />

        <Text style={s.label}>Description (optional)</Text>
        <TextInput style={[s.input, s.inputMulti]} placeholder="What's this deck for?"
          placeholderTextColor={COLORS.muted} value={desc} onChangeText={setDesc}
          multiline numberOfLines={3} textAlignVertical="top" maxLength={200} />

        <Text style={s.label}>Colour</Text>
        <View style={s.palette}>
          {PALETTE.map(c => (
            <TouchableOpacity key={c} style={[s.swatch, { backgroundColor: c },
              color === c && s.swatchSelected]} onPress={() => setColor(c)}>
              {color === c && <Text style={s.swatchCheck}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>

        <View style={[s.preview, { borderLeftColor: color }]}>
          <Text style={[s.previewName, { color }]}>{name || 'Deck name'}</Text>
          <Text style={s.previewSub}>{desc || 'Your custom deck'} · 0 cards</Text>
        </View>

        <TouchableOpacity style={s.createBtn} onPress={create}>
          <Text style={s.createBtnText}>Create deck & add cards →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: COLORS.bg },
  scroll:  { padding: 20 },
  label:   { fontSize: 12, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 8, marginTop: 16 },
  input:   { backgroundColor: COLORS.bg2, borderRadius: 12, borderWidth: 0.5, borderColor: COLORS.border2, padding: 14, fontSize: 15, color: COLORS.text },
  inputMulti: { minHeight: 90, paddingTop: 12 },
  palette: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', marginBottom: 24 },
  swatch:  { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  swatchSelected: { borderWidth: 3, borderColor: COLORS.text },
  swatchCheck:{ color: '#fff', fontSize: 16, fontWeight: '700' },
  preview: { backgroundColor: COLORS.bg2, borderRadius: 12, padding: 16, borderLeftWidth: 4, marginBottom: 28 },
  previewName: { fontSize: 16, fontWeight: '500', marginBottom: 4 },
  previewSub:  { fontSize: 13, color: COLORS.muted },
  createBtn: { backgroundColor: COLORS.accent, borderRadius: 14, padding: 16, alignItems: 'center' },
  createBtnText: { fontSize: 16, fontWeight: '500', color: COLORS.bg },
});
