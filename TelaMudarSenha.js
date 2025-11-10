import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth } from './firebaseconfig';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

import styles from './styles'; 

export default function TelaMudarSenha({ navigation }) {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const alterarSenha = async () => {
    if (!senhaAtual) {
      Alert.alert('Erro', 'Por favor, digite sua senha atual.');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'As novas senhas não coincidem.');
      return;
    }
    if (novaSenha.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setCarregando(true);
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Erro', 'Nenhum usuário logado.');
      setCarregando(false);
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, senhaAtual);

      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, novaSenha);

      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      navigation.goBack();

    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Erro', 'A senha atual está incorreta.');
      } else if (error.code === 'auth/too-many-requests') {
        Alert.alert('Erro', 'Muitas tentativas. Tente novamente mais tarde.');
      } else {
        Alert.alert('Erro', 'Não foi possível alterar a senha. Tente fazer login novamente.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.senha_container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['#2E1A47', '#4A5568']}
        style={styles.senha_cabecalho}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <TouchableOpacity style={styles.senha_botaoCabecalho} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.senha_tituloCabecalho}>Alterar Senha</Text>
        <View style={styles.senha_botaoCabecalho} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.senha_conteudo}>
        
        <Text style={styles.senha_rotuloCampo}>Senha Atual</Text>
        <TextInput
          style={styles.senha_input}
          secureTextEntry
          value={senhaAtual}
          onChangeText={setSenhaAtual}
          placeholder="Digite sua senha atual"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.senha_rotuloCampo}>Nova Senha</Text>
        <TextInput
          style={styles.senha_input}
          secureTextEntry
          value={novaSenha}
          onChangeText={setNovaSenha}
          placeholder="Digite a nova senha"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.senha_rotuloCampo}>Confirmar Nova Senha</Text>
        <TextInput
          style={styles.senha_input}
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          placeholder="Confirme a nova senha"
          placeholderTextColor="#9CA3AF"
        />

        <TouchableOpacity
          style={styles.senha_botao}
          onPress={alterarSenha}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.senha_textoBotao}>
              Confirmar Alteração
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}