import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native'; 
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebaseconfig';
import styles from './styles'; 

export default function TelaLogin({ navigation }) {

  const [eMail, setEMail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const lidarComLogin = async () => {

    if (!eMail.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos para continuar.');
      return;
    }

    if (loading) return;
    setLoading(true);

    try {

      await signInWithEmailAndPassword(auth, eMail, senha);
      navigation.navigate('TelaHome'); 

    } catch (error) {
      console.error("Erro no login:", error.code);
      let mensagemErro = 'Ocorreu um erro ao tentar fazer login.';

      if (error.code === 'auth/invalid-credential' || 
          error.code === 'auth/user-not-found' || 
          error.code === 'auth/wrong-password') {
        mensagemErro = 'Email ou senha inválidos.';
      }
      
      Alert.alert('Erro', mensagemErro);

    } finally {
      setLoading(false); 
    }
  };

  return (
    <LinearGradient 
      colors={['#0f0c29', '#302b63', '#24243e']} 
      style={styles.container}
    >
      <Text style={styles.titulo}>Chega+</Text>
      <Text style={styles.subtitulo}>Login para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address" 
        autoCapitalize="none" 
        value={eMail}
        onChangeText={setEMail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry 
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity 
        style={styles.botaoLogin} 
        onPress={lidarComLogin} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.textoBotaoLogin}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate('TelaRecuperacaoSenha')}
        style={styles.botaoEsqueceuSenha} 
      >
        <Text style={styles.textoEsqueceuSenha}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <View style={styles.containerRegistro}>
        <Text style={styles.textoRegistro}>Não tem conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TelaCadastro')}>
          <Text style={styles.linkRegistro}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}