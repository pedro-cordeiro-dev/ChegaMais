import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from './styles'; 

export default function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");

  return (
    <LinearGradient colors={["#302b63", "#24243e", "#0f0c29"]} style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>

      <TouchableOpacity onPress={() => navigation.navigate("TelaLogin")}>
        <Text style={styles.subtitle}>Já possui login? Clique aqui</Text>
      </TouchableOpacity>

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
      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#888"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.loginButton} onPress={() => alert("Email enviado!")}>
        <Text style={styles.loginButtonText}>Enviar</Text>
      </TouchableOpacity>

    </LinearGradient>
  );
}