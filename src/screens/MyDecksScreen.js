import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/theme';
import { useCustomDecks } from '../hooks/useStorage';

export default function MyDecksScreen({ navigation }) {
  const { decks, deleteDeck } = useCustomDecks();

  function confirmDelete(id, name) {
    Alert.alert('Delete deck?', `"${name}" and all its cards will be removed.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteDeck(id) },
    ]);
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Create new deck button */}
        <TouchableOpacity style={s.createBtn} onPress={() => navigation.navigate('CreateDeck')}>
          <View style={s.createIcon}><Ionicons name="add" size={22} color={COLORS.bg} /></View>
          <View style={{ flex: 1 }}>
            <Text style={s.createTitle}>Create new deck</Text>
            <Text style={s.createSub}>Add your own terms and translations</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
        </TouchableOpacity>

        {/* Tips */}
        <View style={s.tipBox}>
          <Text style={s.tipTitle}>How to use custom decks</Text>
          <Text style={s.tipText}>1. Create a deck with a name and colour{'\n'}2. Add cards — just type English term + meaning{'\n'}3. Study it from the Study tab like any built-in deck{'\n'}4. All cards are saved on your device</Text>
        </View>

        {/* Existing decks */}
        {decks.length === 0 ? (
          <View style={s.empty}>
            <Text style={s.emptyIcon}>🗂</Text>
            <Text style={s.emptyTitle}>No custom decks yet</Text>
            <Text style={s.emptySub}>Tap "Create new deck" above to get started</Text>
          </View>
        ) : (
          <>
            <Text style={s.sectionLabel}>Your decks ({decks.length})</Text>
            {decks.map(deck => (
              <View key={deck.id} style={s.deckCard}>
                <View style={[s.deckAccent, { backgroundColor: deck.color || COLORS.custom }]} />
                <View style={{ flex: 1 }}>
                  <Text style={s.deckName}>{deck.name}</Text>
                  <Text style={s.deckCount}>{deck.cards?.length || 0} cards · Created {new Date(deck.createdAt).toLocaleDateString()}</Text>
                </View>
                <View style={s.deckActions}>
                  <TouchableOpacity style={s.actionBtn}
                    onPress={() => navigation.navigate('AddCard', { deckId: deck.id, deckName: deck.name })}>
                    <Ionicons name="add-circle-outline" size={22} color={COLORS.accent} />
                  </TouchableOpacity>
                  <TouchableOpacity style={s.actionBtn}
                    onPress={() => confirmDelete(deck.id, deck.name)}>
                    <Ionicons name="trash-outline" size={20} color={COLORS.muted} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: COLORS.bg },
  scroll:  { padding: 18 },
  createBtn: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: COLORS.accent, borderRadius: 16, padding: 16, marginBottom: 16 },
  createIcon:{ width: 40, height: 40, backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  createTitle:{ fontSize: 15, fontWeight: '500', color: COLORS.bg },
  createSub:  { fontSize: 12, color: 'rgba(13,13,15,0.7)', marginTop: 2 },
  tipBox:  { backgroundColor: COLORS.bg2, borderRadius: 14, padding: 16, marginBottom: 20, borderWidth: 0.5, borderColor: COLORS.border },
  tipTitle:{ fontSize: 13, fontWeight: '500', color: COLORS.text, marginBottom: 8 },
  tipText: { fontSize: 12, color: COLORS.muted, lineHeight: 20 },
  sectionLabel: { fontSize: 11, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 },
  empty:   { alignItems: 'center', paddingTop: 40 },
  emptyIcon:{ fontSize: 40, marginBottom: 12 },
  emptyTitle:{ fontSize: 16, color: COLORS.text, fontWeight: '500', marginBottom: 6 },
  emptySub:  { fontSize: 13, color: COLORS.muted, textAlign: 'center' },
  deckCard:  { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bg2, borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 0.5, borderColor: COLORS.border, gap: 12 },
  deckAccent:{ width: 4, height: '100%', borderRadius: 2, minHeight: 40 },
  deckName:  { fontSize: 15, color: COLORS.text, fontWeight: '500' },
  deckCount: { fontSize: 12, color: COLORS.muted, marginTop: 3 },
  deckActions:{ flexDirection: 'row', gap: 4 },
  actionBtn: { padding: 6 },
});
