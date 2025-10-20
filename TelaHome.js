import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Image, TouchableOpacity,
  ScrollView, StatusBar, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { auth, db } from './firebaseconfig'; 
import { doc, getDoc } from "firebase/firestore";

import stylesHome from './stylesHome'; 

const CATEGORIAS = [
  { id: '1', nome: 'Lazer', icone: 'home' },
  { id: '2', nome: 'Comida', icone: 'restaurant' },
  { id: '3', nome: 'Esportes', icone: 'sports-soccer' },
  { id: '4', nome: 'Compras', icone: 'shopping-bag' },
];

const RECOMENDADOS = [
  { id: 'r1', nome: 'ARENINHA', local: '123 Anywhere Street, Any City', imagem: 'https://www.ceara.gov.br/wp-content/uploads/2023/10/231011_INAUG-ARENINHA-PACUJA_EJ1707-scaled.jpg' },
  { id: 'r2', nome: 'FEIRA LIVRE', local: '456 Main Road, Outra Cidade', imagem: 'https://prefeitura.pbh.gov.br/sites/default/files/estrutura-de-governo/obras-e-infraestrutura/pca-da-comunidade-dom-cabralfinalizada8-3.jpg'},
  { id: 'r3', nome: 'FESTIVAL', local: '321 ALGUM FESTIVAL', imagem: 'https://www.bage.rs.gov.br/noticias/shows-com-ultramen-e-comunidade-nin-jitsu-celebram-os-20-anos-do-anuncio-de-criacao-da-unipampa-neste-domingo/@@images/image' },
];

const MAIS_AVALIADOS = [
  { id: 'a1', nome: 'IGREJA', imagem: 'https://xadmin.s3.us-east-2.amazonaws.com/214/PhotoAssets/459535/images/large/igreja.jpg' },
  { id: 'a2', nome: 'PRAÇA', imagem: 'https://prefeitura.pbh.gov.br/sites/default/files/styles/slideshow/public/estrutura-de-governo/WhatsApp-Image-2023-02-06-at-17.45.02.jpg?itok=-6GkUPvq' },
];

const ItemCategoria = ({ nome, icone, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      stylesHome.categoriaItem,
      isSelected && stylesHome.categoriaItemSelected,
    ]}
    onPress={onPress}
  >
    <View style={stylesHome.iconeContainer}>
      <MaterialIcons name={icone} size={24} color={isSelected ? '#4B0082' : '#4B0082'} />
    </View>
    <Text style={[stylesHome.categoriaTexto, isSelected && stylesHome.categoriaTextoSelected]}>{nome}</Text>
  </TouchableOpacity>
);

const CardRecomendado = ({ item }) => (
  <View style={stylesHome.cardRecomendado}>
    <Image source={{ uri: item.imagem }} style={stylesHome.cardRecomendadoImagem} />
    <View style={stylesHome.cardRecomendadoOverlay}>
      <Text style={stylesHome.cardRecomendadoNome}>{item.nome}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <MaterialIcons name="location-on" size={12} color="#751a65" />
        <Text style={stylesHome.cardRecomendadoLocal}>{item.local}</Text>
      </View>
    </View>
  </View>
);

const CardAvaliado = ({ item }) => (
  <View style={stylesHome.cardAvaliado}>
    <Image source={{ uri: item.imagem }} style={stylesHome.cardAvaliadoImagem} />
    <View style={stylesHome.cardAvaliadoOverlay}>
      <MaterialIcons name="star" size={16} color="#FFD700" />
      <Text style={stylesHome.cardAvaliadoNome}>{item.nome}</Text>
    </View>
  </View>
);

export default function TelaHome({ navigation }) { 
  
  const [textoPesquisa, setTextoPesquisa] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [userName, setUserName] = useState(''); 

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, "usuarios", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserName(userData.nome);
          } else {
            console.log("Documento do usuário não encontrado!");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar nome do usuário:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <SafeAreaView style={stylesHome.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#4B0082" />
      
      <ScrollView style={stylesHome.container} showsVerticalScrollIndicator={false}>
        
    <LinearGradient
  colors={['#0f0c29', '#302b63', '#24243e']}
  style={stylesHome.headerBackground}>

  <View style={stylesHome.headerTop}>
    <View style={stylesHome.perfilContainer}>
      <View>
        <Text style={stylesHome.logoTexto}>Chega+</Text>
        
        <Text style={stylesHome.userName}>
          {userName ? userName.toUpperCase() : 'BEM-VINDO(A)'}
        </Text>

      </View>
    </View>
    <TouchableOpacity style={stylesHome.notificacaoIcon}>
      <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  </View>

  <View style={stylesHome.pesquisaBar}>
    <MaterialIcons name="search" size={24} color="#751a65" />
    <TextInput
      style={stylesHome.pesquisaInput}
      placeholder="Pesquisar"
      placeholderTextColor="#751a65"
      value={textoPesquisa}
      onChangeText={setTextoPesquisa}
    />
  </View>

  <FlatList
    data={CATEGORIAS}
    renderItem={({ item }) => (
      <ItemCategoria 
        nome={item.nome} 
        icone={item.icone} 
        isSelected={item.id === categoriaSelecionada} 
        onPress={() => setCategoriaSelecionada(item.id)}
      />
    )}
    keyExtractor={item => item.id}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={stylesHome.categoriasList}/>
    </LinearGradient>

        <View style={stylesHome.sessaoRecomendados}>
          <Text style={stylesHome.sessaoRecomendadosTitulo}>Recomendados</Text>
          <FlatList
            data={RECOMENDADOS}
            renderItem={({ item }) => <CardRecomendado item={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={stylesHome.horizontalListContent}/>
        </View>

        <View style={stylesHome.sessaoRecomendados}>
          <Text style={stylesHome.sessaoRecomendadosTitulo}>Mais Avaliados</Text>
          <FlatList
            data={MAIS_AVALIADOS}
            renderItem={({ item }) => <CardAvaliado item={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={stylesHome.horizontalListContent}
          />
        </View>
        <View style={{ height: 10 }} /> 
      </ScrollView>

      <View style={stylesHome.botaoNav}>
        <TouchableOpacity style={stylesHome.navItem} onPress={() => navigation.navigate('TelaHome')}>
          <MaterialIcons name="home" size={24} color="#4B0082" />
          <Text style={[stylesHome.navText, { color: '#4B0082' }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesHome.navItem} onPress={() => {/* Adicionar tela aqui, ex: navigation.navigate('TelaExplorar') */}}>
          <MaterialIcons name="explore" size={24} color="#A9A9A9" />
          <Text style={stylesHome.navText}>Explorar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesHome.navItem} onPress={() => {/* Adicionar tela, ex: navigation.navigate('TelaCadastrar') */}}>
          <MaterialIcons name="add-circle-outline" size={24} color="#A9A9A9" />
          <Text style={stylesHome.navText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesHome.navItem} onPress={() => {navigation.navigate('Perfil')}}>
          <MaterialIcons name="person" size={24} color="#A9A9A9" />
          <Text style={stylesHome.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}