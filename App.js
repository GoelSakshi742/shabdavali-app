import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS } from './src/utils/theme';

import HomeScreen      from './src/screens/HomeScreen';
import QuizScreen      from './src/screens/QuizScreen';
import ResultsScreen   from './src/screens/ResultsScreen';
import MyDecksScreen   from './src/screens/MyDecksScreen';
import CreateDeckScreen from './src/screens/CreateDeckScreen';
import AddCardScreen   from './src/screens/AddCardScreen';
import SettingsScreen  from './src/screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab   = createBottomTabNavigator();

function StudyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.bg2, borderBottomWidth: 0.5, borderBottomColor: COLORS.border },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontFamily: 'Georgia', fontSize: 17 },
        cardStyle: { backgroundColor: COLORS.bg },
      }}
    >
      <Stack.Screen name="Home"    component={HomeScreen}    options={{ title: 'ਸ਼ਬਦਾਵਲੀ' }} />
      <Stack.Screen name="Quiz"    component={QuizScreen}    options={{ title: 'Study' }} />
      <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Results', headerLeft: () => null }} />
    </Stack.Navigator>
  );
}

function DecksStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.bg2, borderBottomWidth: 0.5, borderBottomColor: COLORS.border },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontFamily: 'Georgia', fontSize: 17 },
        cardStyle: { backgroundColor: COLORS.bg },
      }}
    >
      <Stack.Screen name="MyDecks"    component={MyDecksScreen}    options={{ title: 'My Decks' }} />
      <Stack.Screen name="CreateDeck" component={CreateDeckScreen} options={{ title: 'New Deck' }} />
      <Stack.Screen name="AddCard"    component={AddCardScreen}    options={{ title: 'Add Card' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: COLORS.bg2,
              borderTopWidth: 0.5,
              borderTopColor: COLORS.border,
              height: 88,
              paddingBottom: 28,
            },
            tabBarActiveTintColor:   COLORS.accent,
            tabBarInactiveTintColor: COLORS.muted,
            tabBarLabelStyle: { fontSize: 11, marginTop: -2 },
            tabBarIcon: ({ focused, color, size }) => {
              const icons = {
                Study:    focused ? 'book'      : 'book-outline',
                Decks:    focused ? 'layers'    : 'layers-outline',
                Settings: focused ? 'settings'  : 'settings-outline',
              };
              return <Ionicons name={icons[route.name]} size={22} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Study"    component={StudyStack} />
          <Tab.Screen name="Decks"    component={DecksStack} />
          <Tab.Screen name="Settings" component={SettingsScreen}
            options={{ headerShown: true, headerTitle: 'Settings',
              headerStyle: { backgroundColor: COLORS.bg2, borderBottomWidth: 0.5, borderBottomColor: COLORS.border },
              headerTintColor: COLORS.text,
              headerTitleStyle: { fontFamily: 'Georgia', fontSize: 17 },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
