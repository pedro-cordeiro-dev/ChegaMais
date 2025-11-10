import React, { useState } from 'react';
import {
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth } from './firebaseconfig';
import { sendPasswordResetEmail, confirmPasswordReset } from 'firebase/auth'; 
import styles from './styles';

export default function TelaEsqueciSenha({ navigation }) {
  const [etapa, setEtapa] = useState(1); 
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSendResetEmail = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira seu email.');
      return;
    }
    Keyboard.dismiss();
    setCarregando(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setCarregando(false);
      Alert.alert('Email Enviado', 'Verifique seu email para o link de redefinição.');
      setEtapa(2); 
    } catch (error) {
      setCarregando(false);
      let msg = 'Não foi possível enviar o email.';
      if (error.code === 'auth/user-not-found') {
        msg = 'Email não cadastrado.';
      }
      Alert.alert('Erro', msg);
    }
  };

  const handleConfirmReset = async () => {
    if (!codigo || !novaSenha) {
      Alert.alert('Erro', 'Preencha o código e a nova senha.');
      return;
    }
    if (novaSenha.length < 6) {
        Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres.');
        return;
    }
    Keyboard.dismiss();
    setCarregando(true);
    try {
      await confirmPasswordReset(auth, codigo, novaSenha);
      setCarregando(false);
      Alert.alert(
        'Sucesso!',
        'Sua senha foi redefinida com sucesso.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      setCarregando(false);
      console.error(error);
      let msg = 'Não foi possível redefinir a senha.';
      if (error.code === 'auth/invalid-action-code') {
        msg = 'Código inválido ou expirado. Tente novamente.';
      }
      Alert.alert('Erro', msg);
    }
  };


  return (
    <LinearGradient
      colors={['#2E1A47', '#4A5568']}
      style={styles.senha_container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.senha_cabecalho}>
        <TouchableOpacity style={styles.senha_botaoCabecalho} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.senha_tituloCabecalho}>Recuperar Senha</Text>
        <View style={styles.senha_botaoCabecalho} />
      </View>

      <ScrollView contentContainerStyle={styles.senha_conteudo}>
        
        {etapa === 1 && (
          <>
            <Text style={styles.senha_rotuloCampo}>Email</Text>
            <TextInput
              style={styles.senha_input}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu email de cadastro"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.senha_botao}
              onPress={handleSendResetEmail}
              disabled={carregando}
            >
              {carregando ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.senha_textoBotao}>Enviar Email</Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {etapa === 2 && (
          <>
            <Text style={styles.senha_rotuloCampo}>Código de Verificação</Text>
            <TextInput
              style={styles.senha_input}
              value={codigo}
              onChangeText={setCodigo}
              placeholder="Cole o código do email"
              placeholderTextColor="#9CA3AF"
            />
            <Text style={styles.senha_rotuloCampo}>Nova Senha</Text>
            <TextInput
              style={styles.senha_input}
              value={novaSenha}
              onChangeText={setNovaSenha}
              placeholder="Digite sua nova senha"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.senha_botao}
              onPress={handleConfirmReset}
              disabled={carregando}
            >
              {carregando ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.senha_textoBotao}>Confirmar Nova Senha</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </LinearGradient> 
  );
}