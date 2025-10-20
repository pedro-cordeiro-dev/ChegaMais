import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth } from './firebaseconfig';
import styles from './styles'; arquivo

export default function TelaAlterarSenha({ navigation }) {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const alterarSenha = async () => {
    if (novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (novaSenha.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      setCarregando(true);
      const user = auth.currentUser;
      await user.updatePassword(novaSenha);
      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      Alert.alert('Erro', 'Não foi possível alterar a senha.');
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
          <Text style={styles.senha_textoBotao}>
            {carregando ? 'Alterando...' : 'Confirmar Alteração'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
