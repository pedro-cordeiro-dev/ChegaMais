import React from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Linking, // Importa o Linking para abrir o Google Maps
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Importe os ícones que vamos usar
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
// Importa seus estilos globais da Home
import stylesHome from './stylesHome';
// IMPORTA O NOVO ARQUIVO DE ESTILO
import styles from './StylesExplorar';

// Pega a largura da tela
const { width } = Dimensions.get('window');

// --- DADOS MOCADOS (PARA TESTE) ---
// ... (dados mocados permanecem os mesmos)
const LAZER_DATA = [
  {
    id: '1',
    name: 'Igreja Matriz',
    image: 'https://images.unsplash.com/photo-1508381306714-2596b3f75f7e?auto=format&fit=crop&q=80&w=1974', // Imagem de exemplo
    rating: 5,
    status: 'Aberto',
    closes: '8:00 PM',
    address: 'Av. Washington Soares, 123',
    postedBy: 'Pedro Lucas',
    isNew: true,
    latitude: -3.745, // Coordenadas de exemplo
    longitude: -38.523,
  },
  {
    id: '2',
    name: 'Parque do Cocó',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2070', // Imagem de exemplo
    rating: 4,
    status: 'Fechado',
    closes: '10:00 PM',
    address: 'Av. Engenheiro Santana Jr., 456',
    postedBy: 'Maria Silva',
    isNew: false,
    latitude: -3.7319,
    longitude: -38.4907,
  },
  {
    id: '3',
    name: 'Praia do Futuro',
    image: 'https://images.unsplash.com/photo-1509281373149-e-957c6296406?auto=format&fit=crop&q=80&w=1928', // Imagem de exemplo
    rating: 4,
    status: 'Aberto',
    closes: '6:00 PM',
    address: 'Av. Zezé Diogo, 789',
    postedBy: 'Ana Clara',
    isNew: false,
    latitude: -3.7661,
    longitude: -38.4411,
  },
];
// --- FIM DOS DADOS MOCADOS ---

export default function TelaExplorar({ navigation }) {
  // Função para abrir o Google Maps
  const handleGetDirections = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    Linking.openURL(url).catch(err => console.error('Ocorreu um erro', err));
  };

  // Função para renderizar as estrelas
  const renderRating = (rating) => {
    return (
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, index) => (
          <FontAwesome
            key={index}
            name="star"
            size={16}
            color={index < rating ? '#FFD700' : '#E0E0E0'} // Amarelo para preenchida, cinza para vazia
          />
        ))}
      </View>
    );
  };

  // Renderiza cada card do carrossel
  const renderLazerCard = ({ item }) => (
    <View style={styles.lazerCard}>
      <Image source={{ uri: item.image }} style={styles.lazerImage} />
      {/* Tag "New" como no protótipo */}
      {item.isNew && (
        <View style={styles.newTag}>
          <Text style={styles.newTagText}>New</Text>
        </View>
      )}

      <View style={styles.lazerInfoContainer}>
        <Text style={styles.lazerName}>{item.name}</Text>
        
        {/* Renderiza as estrelas de avaliação */}
        {renderRating(item.rating)}

        {/* Status (Aberto/Fechado) */}
        <View style={styles.statusContainer}>
          <Text style={item.status === 'Aberto' ? styles.statusOpen : styles.statusClosed}>
            {item.status}
          </Text>
          <Text style={styles.statusTime}> • Fecha às {item.closes}</Text>
        </View>

        {/* Endereço */}
        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={16} color="#666" />
          <Text style={styles.infoText}>{item.address}</Text>
        </View>

        {/* Publicado por */}
        <View style={styles.infoRow}>
          <MaterialIcons name="person" size={16} color="#666" />
          <Text style={styles.infoText}>Publicado por {item.postedBy}</Text>
        </View>

        {/* Botão "Como Chegar" */}
        <TouchableOpacity
          style={styles.comoChegarButton}
          onPress={() => handleGetDirections(item.latitude, item.longitude)}
        >
          <MaterialIcons name="directions" size={18} color="#FFFFFF" />
          <Text style={styles.comoChegarButtonText}>Como chegar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    // Reutiliza o estilo safeArea do seu stylesHome.js, mas com fundo branco
    <SafeAreaView style={[stylesHome.safeArea, { backgroundColor: '#FFFFFF' }]}>
      <View style={styles.container}>
        {/* === HEADER COM PESQUISA === */}
        <View style={styles.headerContainer}>
          {/* Reutiliza a barra de pesquisa do stylesHome.js */}
          <View style={[stylesHome.pesquisaBar, { flex: 1, backgroundColor: '#F0F0F0' }]}>
            <MaterialIcons name="search" size={24} color="#751a65" />
            <TextInput
              style={stylesHome.pesquisaInput}
              placeholder="Pesquisar lazer..."
              placeholderTextColor="#751a65"
            />
          </View>
          {/* Botão de Adicionar (+) */}
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-circle" size={32} color="#4B0082" />
          </TouchableOpacity>
        </View>

        {/* === CARROSSEL DE LAZER === */}
        <View style={styles.carouselContainer}>
          <FlatList
            data={LAZER_DATA}
            renderItem={renderLazerCard}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            // Efeito de "snap" (parar no card)
            snapToInterval={width * 0.85 + 20} // Largura do Card + (marginHorizontal * 2)
            decelerationRate="fast"
            // Adiciona padding para o primeiro e último item ficarem centralizados
            contentContainerStyle={{
              paddingHorizontal: (width - (width * 0.85)) / 2, // Centraliza o primeiro item
              paddingVertical: 20, // Espaço em cima e embaixo do carrossel
            }}
          />
        </View>
      </View>

      {/* === MENU DE NAVEGAÇÃO === */}
      {/* Copiado exatamente da sua TelaHome.js, com correções */}
      <View style={stylesHome.botaoNav}>
        <TouchableOpacity style={stylesHome.navItem} onPress={() => navigation.navigate('TelaHome')}>
          <MaterialIcons name="home" size={24} color="#A9A9A9" />
          <Text style={stylesHome.navText}>Home</Text>
        </TouchableOpacity>

        {/* Item "Explorar" agora está ATIVO */}
        <TouchableOpacity style={stylesHome.navItem} onPress={() => navigation.navigate('TelaExplorar')}>
          <MaterialIcons name="explore" size={24} color="#4B0082" />
          <Text style={[stylesHome.navText, { color: '#4B0082' }]}>Explorar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesHome.navItem} onPress={() => navigation.navigate('TelaCadastrar')}>
          <MaterialIcons name="add-circle-outline" size={24} color="#A9A9A9" />
          <Text style={stylesHome.navText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesHome.navItem} onPress={() => navigation.navigate('Perfil')}>
          <MaterialIcons name="person" size={24} color="#A9A9AA" />
          <Text style={stylesHome.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

