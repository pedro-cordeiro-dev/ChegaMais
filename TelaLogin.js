import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles'; 

export default function TelaLogin({ navigation }) {
  const [eMail, setEMail] = useState('');
  const [senha, setSenha] = useState('');

  const lidarComLogin = () => {
    if (eMail.trim() && senha.trim()) {
      alert('Login realizado com sucesso! (Em breve, navegação real)');
    } else {
      alert('Preencha todos os campos para continuar.');
    }
  };

  return (
    <LinearGradient 
      colors={['#0f0c29', '#302b63', '#24243e']} 
      style={styles.container}
    >
      <Text style={styles.title}>Chega+</Text>
      <Text style={styles.subtitle}>Login para continuar</Text>

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

      <TouchableOpacity style={styles.loginButton} onPress={lidarComLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate('TelaRecuperacaoSenha')}
        style={styles.forgotPasswordButton} 
      >
        <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Não tem conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TelaCadastro')}>
          <Text style={styles.registerLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}