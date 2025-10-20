import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from './firebaseconfig'; 
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

import styles from './stylesPerfil';
import MenuItem from './MenuItemPerfil';

export default function TelaPerfil({ navigation }) {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, "usuarios", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data()); 
          } else {
            console.log("Documento do usuário não encontrado!");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('TelaLogin'); 
    } catch (error) {
      console.error("Erro ao sair:", error);
      Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
    }
  };

  const handleMenuPress = (item) => {
    console.log('Pressed:', item);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['#2E1A47', '#4A5568']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="copy-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.profileName}>
            {userData ? userData.nome : 'Carregando...'}
          </Text>
          <Text style={styles.profileEmail}>
            {userData ? userData.email : '...'}
          </Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Geral</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <MenuItem
            icon="star-outline"
            title="Avaliações feitas"
            subtitle="Avaliações e Comentários"
            onPress={() => navigation.navigate('TelaAvaliacoes')}
          />
          <MenuItem
            icon="key-outline"
            title="Mudar a senha"
            onPress={() => navigation.navigate('TelaMudarSenha')}
          />
        </View>

        <Text style={styles.sectionHeader}>Informação</Text>
        
        <View style={styles.menuSection}>
          <MenuItem
            icon="phone-portrait-outline"
            title="Sobre o app"
            onPress={() => handleMenuPress('Sobre')}
          />
          <MenuItem
            icon="document-text-outline"
            title="Termos & Condições"
            onPress={() => handleMenuPress('Termos')}
          />
          <MenuItem
            icon="shield-checkmark-outline"
            title="Política de privacidade"
            onPress={() => handleMenuPress('Privacidade')}
          />
          <MenuItem
            icon="share-social-outline"
            title="Compartilhe esse app"
            onPress={() => handleMenuPress('Compartilhar')}
          />

          <MenuItem
            icon="log-out-outline"
            title="Sair"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </View>
  );
}