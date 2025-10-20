import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from './stylesPerfil'; // importa os estilos

import MenuItem from './MenuItemPerfil'; // componente de item de menu

export default function Perfil() {
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
        <TouchableOpacity style={styles.headerButton}>
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
          <Text style={styles.profileName}>Isabela Silva</Text>
          <Text style={styles.profileEmail}>isabelasilva@gmail.com</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Geral</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <MenuItem
            icon="star-outline"
            title="Avaliações feitas"
            subtitle="Avaliações e Comentários"
            onPress={() => handleMenuPress('Avaliações')}
          />
          <MenuItem
            icon="key-outline"
            title="Mudar a senha"
            onPress={() => handleMenuPress('Senha')}
          />
          <MenuItem
            icon="time-outline"
            title="Histórico de visitas"
            onPress={() => handleMenuPress('Histórico')}
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
        </View>
      </ScrollView>
    </View>
  );
}
