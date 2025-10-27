import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from './firebaseconfig'; 
import { doc, getDoc } from "firebase/firestore";

import styles from './stylesPerfil';
import MenuItem from './MenuItemPerfil';

export default function TelaPerfil({ navigation }) {

  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

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
      await auth.signOut();
      navigation.replace('TelaLogin'); 
    } catch (error) {
      console.error("Erro ao sair:", error);
      Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
    }
  };

 const handleMenuPress = (item) => {
  if (item === 'Termos') {
    setModalContent("Ao utilizar este aplicativo, você concorda que as informações fornecidas são apenas para fins informativos. Não nos responsabilizamos por eventuais alterações, imprecisões ou quaisquer consequências decorrentes do uso do aplicativo.");
    setModalVisible(true);
  } else if (item === 'Privacidade') {
    setModalContent("Utilizamos as informações exclusivamente para melhorar os serviços oferecidos pelo aplicativo. Ao utilizar nossa plataforma, você concorda com esta política de privacidade. Para mais informações, entre em contato conosco.");
    setModalVisible(true);
  } else {
    console.log('Pressed:', item);
  }
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalText}>{modalContent}</Text>
            <TouchableOpacity
              style={modalStyles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={modalStyles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#2E1A47',
    borderRadius: 10,
    padding: 20,
    maxWidth: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#4A5568',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
