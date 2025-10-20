import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from './firebaseconfig'
import styles from './styles';

export default function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");

  const AuthCadastro = async () => {
    if (!nome || !email || !password || !confirmPassword || !cpf) {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("As senhas não coincidem!");
      return;
    }

    if (cpf.length !== 11) {
      Alert.alert("O CPF deve ter exatamente 11 dígitos!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        nome,
        email,
        cpf,
        criadoEm: new Date(),
      });

      Alert.alert("Cadastro realizado com sucesso!");
      navigation.navigate("TelaLogin");

    } catch (error) {
      console.log(error);
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <LinearGradient colors={["#302b63", "#24243e", "#0f0c29"]} style={styles.container}>
      <Text style={styles.titulo}>Criar conta</Text>

      <TouchableOpacity onPress={() => navigation.navigate("TelaLogin")}>
        <Text style={styles.subtitulo}>Já possui login? Clique aqui</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#888"
        value={cpf}
        onChangeText={(text) => {
          const numeros = text.replace(/[^0-9]/g, "");
          if (numeros.length <= 11) {
            setCpf(numeros);
          }
        }}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#888"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />


      <TouchableOpacity style={styles.botaoLogin} onPress={AuthCadastro}>
        <Text style={styles.textoBotaoLogin}>Enviar</Text>
      </TouchableOpacity>

    </LinearGradient>
  );
}