import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { authentifier } from '../services/authentification.js';
import { getUser } from '../services/visiteur.js';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    let result = await authentifier(email, password);
    if (result.response == true) {
      let user = await getUser(email);
      router.push({
        pathname: '/affichage',
        params: { nom: user.nom, prenom: user.prenom }
      })
    }
    else if (result.response == "utilisateur introuvable") {
      setMessage('Utilisateur introuvable');
    }
    else {
      setMessage('Mauvais mot de passe ou login');
    }
  };



  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.subtitle}>Entrez vos identifiants pour continuer</Text>
      </View>

      <View style={styles.formCard}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="nom@exemple.com"
            placeholderTextColor="#64748b"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#64748b"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {message ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{message}</Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotLink}>
          <Text style={styles.forgotText}>Identifiants oubliés ?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Bleu nuit très profond (Slate 950)
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#f8fafc', // Blanc cassé
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8', // Gris bleuté doux
    marginTop: 8,
  },
  formCard: {
    backgroundColor: '#1e293b', // Ardoise foncée (Slate 800)
    padding: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#334155', // Bordure subtile pour l'effet relief
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
    fontSize: 13,
    fontWeight: '700',
    color: '#cbd5e1',
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    height: 56,
    backgroundColor: '#0f172a', // Fond d'input plus sombre que la carte
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#f8fafc',
    borderWidth: 1,
    borderColor: '#334155',
  },
  button: {
    backgroundColor: '#38bdf8', // Bleu ciel électrique (Sky 400)
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    // Effet de lueur sous le bouton
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  buttonText: {
    color: '#0f172a', // Texte sombre sur bouton clair pour le contraste
    fontSize: 16,
    fontWeight: '800',
  },
  errorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)', // Rouge transparent
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
  forgotLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  forgotText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});


export default LoginForm;