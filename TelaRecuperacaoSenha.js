import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

export default function TelaRecuperacaoSenha({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecuperacaoSenha = async () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, digite seu e-mail.');
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, digite um e-mail válido.');
      return;
    }

    setLoading(true);

    
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Email Enviado',
        'Instruções para redefinir sua senha foram enviadas para o seu email.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 2000);
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient 
        colors={['#0f0c29', '#302b63', '#24243e']} 
        style={styles.container}
      >
        {/* Botão de voltar */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.title}>Chega+</Text>
        <Text style={styles.subtitle}>Esqueceu sua senha?</Text>
        <Text style={styles.description}>
          Digite seu email para receber instruções de como redefinir sua senha
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address" 
          autoCapitalize="none" 
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <TouchableOpacity 
          style={[
            styles.loginButton,
            loading && styles.loginButtonDisabled
          ]} 
          onPress={handleRecuperacaoSenha}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Enviando...' : 'Enviar Email'}
          </Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Lembrou da senha?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.registerLink}>Faça login</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}