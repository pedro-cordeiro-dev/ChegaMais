import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Image, TouchableOpacity,
  ScrollView, StatusBar, FlatList, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { auth, db } from './firebaseconfig';
import { doc, getDoc, collection, getDocs, query, orderBy, limit, where } from "firebase/firestore";

import stylesHome from './stylesHome';

const CATEGORIAS = [
  { id: 'lazer', nome: 'Lazer', icone: 'home' },
  { id: 'comida', nome: 'Comida', icone: 'restaurant' },
  { id: 'esportes', nome: 'Esportes', icone: 'sports-soccer' },
  { id: 'compras', nome: 'Compras', icone: 'shopping-bag' },
  { id: 'outro', nome: 'Outro', icone: 'apps' },
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

const CardRecomendado = ({ item, style, ...props }) => (
  <View style={[stylesHome.cardRecomendado, style]} {...props}>
    <Image source={{ uri: item.imageUrl }} style={stylesHome.cardRecomendadoImagem} />
    <View style={stylesHome.cardRecomendadoOverlay}>
      <Text style={stylesHome.cardRecomendadoNome}>{item.nome}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <MaterialIcons name="location-on" size={12} color="#751a65" />
        <Text style={stylesHome.cardRecomendadoLocal}>{item.enderecoCompleto}</Text>
      </View>
    </View>
  </View>
);

const CardAvaliado = ({ item }) => (
  <View style={stylesHome.cardAvaliado}>
    <Image source={{ uri: item.imageUrl }} style={stylesHome.cardAvaliadoImagem} />
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

  const [loading, setLoading] = useState(true);
  const [recomendados, setRecomendados] = useState([]);
  const [maisAvaliados, setMaisAvaliados] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);

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

  useEffect(() => {
    const fetchDadosIniciais = async () => {
      setLoading(true);
      try {
        const lazerCollection = collection(db, "lazer");

        const qRecomendados = query(lazerCollection, orderBy("createdAt", "desc"), limit(5));
        const recSnapshot = await getDocs(qRecomendados);
        const recList = recSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecomendados(recList);

        const qAvaliados = query(lazerCollection, orderBy("rating", "desc"), limit(5));
        const avSnapshot = await getDocs(qAvaliados);
        const avList = avSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMaisAvaliados(avList);

      } catch (error) {
        console.error("Erro ao buscar dados iniciais:", error);
      }
      setLoading(false);
    };

    fetchDadosIniciais();
  }, []);

  useEffect(() => {
    const fetchDadosFiltrados = async () => {
      if (categoriaSelecionada === null) {
        setDadosFiltrados([]);
        return;
      }

      setLoading(true);
      try {
        const lazerCollection = collection(db, "lazer");
        const qFiltrados = query(lazerCollection, where("categoria", "==", categoriaSelecionada));
        const filtradosSnapshot = await getDocs(qFiltrados);
        const filtradosList = filtradosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDadosFiltrados(filtradosList);
      } catch (error) {
        console.error("Erro ao buscar dados filtrados:", error);
      }
      setLoading(false);
    };

    fetchDadosFiltrados();
  }, [categoriaSelecionada]);


  const handleCategoriaPress = (id) => {
    if (categoriaSelecionada === id) {
      setCategoriaSelecionada(null);
    } else {
      setCategoriaSelecionada(id);
    }
  };

  const categoriaInfo = CATEGORIAS.find(cat => cat.id === categoriaSelecionada);

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
                onPress={() => handleCategoriaPress(item.id)}
              />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={stylesHome.categoriasList} />
        </LinearGradient>

        {loading ? (
          <ActivityIndicator size="large" color="#4B0082" style={{ marginTop: 50 }} />
        ) : (
          <>
            {categoriaSelecionada === null ? (
              <>
                <View style={stylesHome.sessaoRecomendados}>
                  <Text style={stylesHome.sessaoRecomendadosTitulo}>Recomendados</Text>
                  <FlatList
                    data={recomendados}
                    renderItem={({ item }) => <CardRecomendado item={item} />}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={stylesHome.horizontalListContent}
                    ListEmptyComponent={<Text style={{ color: '#999', marginLeft: 15 }}>Nenhum item recomendado.</Text>}
                  />
                </View>

                <View style={stylesHome.sessaoRecomendados}>
                  <Text style={stylesHome.sessaoRecomendadosTitulo}>Mais Avaliados</Text>
                  <FlatList
                    data={maisAvaliados}
                    renderItem={({ item }) => <CardAvaliado item={item} />}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={stylesHome.horizontalListContent}
                    ListEmptyComponent={<Text style={{ color: '#999', marginLeft: 15 }}>Nenhum item avaliado.</Text>}
                  />
                </View>
              </>
            ) : (
              <View style={stylesHome.sessaoRecomendados}>
                <Text style={stylesHome.sessaoRecomendadosTitulo}>
                  {categoriaInfo?.nome || 'Resultados'}
                </Text>
                <View style={{ paddingHorizontal: 20 }}>
                  {dadosFiltrados.length > 0 ? (
                    dadosFiltrados.map(item => (
                      <CardRecomendado
                        key={item.id}
                        item={item}
                        style={{ width: '100%', marginRight: 0, marginBottom: 15 }}
                      />
                    ))
                  ) : (
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ color: '#999' }}>Nenhum item encontrado para esta categoria.</Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          </>
        )}

        <View style={{ height: 10 }} />
      </ScrollView>

      <View style={stylesHome.botaoNav}>
        <TouchableOpacity style={stylesHome.navItem} onPress={() => navigation.navigate('TelaHome')}>
          <MaterialIcons name="home" size={24} color="#4B0082" />
          <Text style={[stylesHome.navText, { color: '#4B0082' }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesHome.navItem} onPress={() => navigation.navigate('TelaExplorar')}>
          <MaterialIcons name="explore" size={24} color="#A9A9A9" />
          <Text style={stylesHome.navText}>Explorar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesHome.navItem} onPress={() => navigation.navigate('TelaCadastrar')}>
          <MaterialIcons name="add-circle-outline" size={24} color="#A9A9A9" />
          <Text style={stylesHome.navText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesHome.navItem} onPress={() => { navigation.navigate('Perfil') }}>
          <MaterialIcons name="person" size={24} color="#A9A9AA" />
          <Text style={stylesHome.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}