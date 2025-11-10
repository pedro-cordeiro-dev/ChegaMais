import React, { useState } from 'react';
import { 
  Text, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView,  Platform,ActivityIndicator, Keyboard 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth } from './firebaseconfig'; 
import { sendPasswordResetEmail, confirmPasswordReset } from 'firebase/auth';
import styles from './styles';

export default function TelaRecuperacaoSenha({ navigation }) {
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');       
  const [novaSenha, setNovaSenha] = useState(''); 

  const [loadingSendCode, setLoadingSendCode] = useState(false);
  const [loadingChangePass, setLoadingChangePass] = useState(false);

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
        'Verifique seu email (e caixa de spam). Procure o código no link enviado e cole-o abaixo.'
      );
    } catch (error) {
      setLoadingSendCode(false);
      console.error(error);
      let msg = 'Não foi possível enviar o email.';
      if (error.code === 'auth/user-not-found') {
        msg = 'Email não cadastrado.';
      }
      Alert.alert('Erro', msg);
    }
  };

  const handleChangePassword = async () => {
    if (!codigo.trim() || !novaSenha.trim()) {
      Alert.alert('Erro', 'Preencha o código e a nova senha.');
      return;
    }
    if (novaSenha.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    Keyboard.dismiss();
    setLoadingChangePass(true);

    try {
      await confirmPasswordReset(auth, codigo, novaSenha);
      setLoadingChangePass(false);
      Alert.alert(
        'Sucesso!',
        'Sua senha foi redefinida. Você já pode fazer login.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      setLoadingChangePass(false);
      console.error(error);
      let msg = 'Não foi possível redefinir a senha.';
      if (error.code === 'auth/invalid-action-code') {
        msg = 'Código inválido ou expirado. Peça um novo email.';
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
          Envie o código para seu email, depois cole-o e defina a nova senha.
        </Text>

        <View style={styles.inputContainerRow}>
          <TextInput
            style={styles.inputRow} 
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address" 
            autoCapitalize="none" 
            value={email}
            onChangeText={setEmail}
            editable={!loadingSendCode && !loadingChangePass}
          />
          <TouchableOpacity 
            style={[
              styles.buttonRow, 
              loadingSendCode && styles.buttonRowDisabled 
            ]} 
            onPress={handleSendCode} 
            disabled={loadingSendCode}
          >
            {loadingSendCode ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <Text style={styles.buttonRowText}>Enviar Código</Text>
            )}
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Código de Verificação"
          placeholderTextColor="#888"
          autoCapitalize="none" 
          value={codigo}
          onChangeText={setCodigo}
          editable={!loadingChangePass}
        />

        <TextInput
          style={styles.input}
          placeholder="Nova Senha (mín. 6 caracteres)"
          placeholderTextColor="#888"
          secureTextEntry
          value={novaSenha}
          onChangeText={setNovaSenha}
          editable={!loadingChangePass}
        />

        <TouchableOpacity 
          style={[
            styles.botaoLogin,
            loadingChangePass && styles.botaoLoginDesabilitado
          ]} 
          onPress={handleChangePassword} 
          disabled={loadingChangePass}
        >
          {loadingChangePass ? (
            <ActivityIndicator color="#FFF" /> 
          ) : (
            <Text style={styles.textoBotaoLogin}>Mudar Senha</Text>
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