import React, { useState } from 'react';
import { 
  Text, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView,  Platform,ActivityIndicator, Keyboard 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth } from './firebaseconfig'; 
import { sendPasswordResetEmail } from 'firebase/auth';
import styles from './styles';

export default function TelaRecuperacaoSenha({ navigation }) {
  const [email, setEmail] = useState('');
  const [loadingSendCode, setLoadingSendCode] = useState(false);

  const handleSendCode = async () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, digite seu e-mail.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, digite um e-mail válido.');
      return;
    }

    Keyboard.dismiss();
    setLoadingSendCode(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setLoadingSendCode(false);
      Alert.alert(
        'Email Enviado',
        'Verifique seu email (e caixa de spam). Siga o link enviado para criar uma nova senha.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      setLoadingSendCode(false);
      console.error('Erro ao enviar email:', error);
      console.log('Código do Erro:', error.code);
      let msg = 'Não foi possível enviar o email.';
      if (error.code === 'auth/user-not-found') {
        msg = 'Email não cadastrado.';
      }
      Alert.alert('Erro', msg);
    }
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
        <TouchableOpacity 
          style={styles.botaoVoltar} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Chega+</Text>
        <Text style={styles.subtitulo}>Esqueceu sua senha?</Text>
        <Text style={styles.descricao}>
          Digite seu email e enviaremos um link para você redefinir sua senha.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address" 
          autoCapitalize="none" 
          value={email}
          onChangeText={setEmail}
          editable={!loadingSendCode}
        />

        <TouchableOpacity 
          style={[
            styles.botaoLogin,
            loadingSendCode && styles.botaoLoginDesabilitado
          ]} 
          onPress={handleSendCode} 
          disabled={loadingSendCode}
        >
          {loadingSendCode ? (
            <ActivityIndicator color="#FFF" /> 
          ) : (
            <Text style={styles.textoBotaoLogin}>Enviar Link de Recuperação</Text>
          )}
        </TouchableOpacity>

        <View style={styles.containerRegistro}>
          <Text style={styles.textoRegistro}>Lembrou da senha?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.linkRegistro}>Faça login</Text>
          </TouchableOpacity>
        </View>

      </LinearGradient>
    </KeyboardAvoidingView>
  );
}