import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function KilometrageScreen() {
  const [kilometres, setKilometres] = useState<string>('');
  const [erreur, setErreur] = useState<string>('');
  const nom=useLocalSearchParams<{nom:string}>();
  const handleValider = () => {
    setErreur(''); 

    // Validation simple avant ton Back
    if (!kilometres || kilometres.trim() === '') {
      setErreur('Veuillez saisir un chiffre');
      return;
    }

    const value = parseFloat(kilometres);
    if (isNaN(value) || value < 0) {
      setErreur('Nombre invalide');
      return;
    }

    // --- ICI TU METS TON CODE BACK ---
    console.log("Donnée prête pour le back :", value);
    // ---------------------------------
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={dark.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />

      <View style={dark.headerContainer}>
        <Text style={dark.title}>Bonjour {nom}</Text>
        <Text style={dark.subtitle}>Entrez l'indice kilométrique du véhicule</Text>
      </View>

      <View style={dark.formCard}>
        <View style={dark.inputWrapper}>
          <Text style={dark.label}>Distance actuelle (KM)</Text>
          <TextInput
            style={dark.input}
            placeholder="Ex: 45200"
            placeholderTextColor="#64748b"
            keyboardType="numeric" // Clavier chiffres uniquement
            value={kilometres}
            onChangeText={setKilometres}
            maxLength={10}
          />
        </View>

        {erreur ? (
          <View style={dark.errorContainer}>
            <Text style={dark.errorText}>{erreur}</Text>
          </View>
        ) : null}

        <TouchableOpacity style={dark.button} onPress={handleValider} activeOpacity={0.8}>
          <Text style={dark.buttonText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const dark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#f8fafc',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 8,
  },
  formCard: {
    backgroundColor: '#1e293b',
    padding: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 10,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38bdf8', 
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  input: {
    height: 60,
    backgroundColor: '#0f172a',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 22, // Plus gros pour les chiffres
    color: '#f8fafc',
    borderWidth: 1,
    borderColor: '#334155',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#38bdf8',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800',
  },
  errorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  errorText: {
    color: '#f87171',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});