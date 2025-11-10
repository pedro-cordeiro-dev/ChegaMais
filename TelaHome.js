import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  ScrollView, StatusBar, FlatList, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { auth, db } from './firebaseconfig';
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";

import stylesHome from './stylesHome';

const CATEGORIAS = [
  { id: 'lazer', nome: 'Lazer', icone: 'home' },
  { id: 'comida', nome: 'Comida', icone: 'restaurant' },
  { id: 'esportes', nome: 'Esportes', icone: 'sports-soccer' },
  { id: 'compras', nome: 'Compras', icone: 'shopping-bag' },
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

const CardRecomendado = ({ item, style, onPress, ...props }) => (
  <TouchableOpacity style={[stylesHome.cardRecomendado, style]} onPress={onPress} {...props}>
    <Image source={{ uri: item.imageUrl }} style={stylesHome.cardRecomendadoImagem} />
    <View style={stylesHome.cardRecomendadoOverlay}>
      <Text style={stylesHome.cardRecomendadoNome}>{item.nome}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <MaterialIcons name="location-on" size={12} color="#751a65" />
        <Text style={stylesHome.cardRecomendadoLocal}>{item.enderecoCompleto}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const CardAvaliado = ({ item, onPress }) => (
  <TouchableOpacity style={stylesHome.cardAvaliado} onPress={onPress}>
    <Image source={{ uri: item.imageUrl }} style={stylesHome.cardAvaliadoImagem} />
    <View style={stylesHome.cardAvaliadoOverlay}>
      <MaterialIcons name="star" size={16} color="#FFD700" />
      <Text style={stylesHome.cardAvaliadoNome}>{item.nome}</Text>
    </View>
  </TouchableOpacity>
);

export default function TelaHome({ navigation }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [userName, setUserName] = useState('');
  const [recomendados, setRecomendados] = useState([]);
  const [maisAvaliados, setMaisAvaliados] = useState([]);
  const [maisComentados, setMaisComentados] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingCarrossel, setLoadingCarrossel] = useState(true);
  const [loadingFiltro, setLoadingFiltro] = useState(false);

  useEffect(() => {
    const fetchUserName = async () => {
      setLoadingUser(true);
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, "usuarios", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserName(userDocSnap.data().nome);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar nome do usuário:", error);
      }
      setLoadingUser(false);
    };
    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchCarrosselData = async () => {
      setLoadingCarrossel(true);
      try {
        const lazerCollection = collection(db, "lazer");
        const qRecomendados = query(lazerCollection, orderBy("createdAt", "desc"), limit(10));
        const recomendadosSnap = await getDocs(qRecomendados);
        setRecomendados(recomendadosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        const qAvaliados = query(lazerCollection, orderBy("rating", "desc"), limit(10));
        const avaliadosSnap = await getDocs(qAvaliados);
        setMaisAvaliados(avaliadosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        const qComentados = query(lazerCollection, orderBy("totalReviews", "desc"), limit(10));
        const comentadosSnap = await getDocs(qComentados);
        setMaisComentados(comentadosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      } catch (error) {
        console.error("Erro ao buscar dados dos carrosséis (VERIFIQUE OS ÍNDICES):", error);
      }
      setLoadingCarrossel(false);
    };

    fetchCarrosselData();
  }, []);

  useEffect(() => {
    const fetchFilteredData = async () => {
      if (categoriaSelecionada === null) {
        setDadosFiltrados([]);
        return;
      }
      
      setLoadingFiltro(true);
      try {
        const q = query(
          collection(db, "lazer"),
          where("categoria", "==", categoriaSelecionada),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        setDadosFiltrados(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Erro ao filtrar dados (VERIFIQUE O ÍNDICE):", error);
      }
      setLoadingFiltro(false);
    };

    fetchFilteredData();
  }, [categoriaSelecionada]);

  const handleCategoriaPress = (id) => {
    if (categoriaSelecionada === id) {
      setCategoriaSelecionada(null);
    } else {
      setCategoriaSelecionada(id);
    }
  };
  
  const handleLazerPress = (lazerId) => {
    navigation.navigate('TelaExplorar', { lazerId });
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
                  {loadingUser ? 'Carregando...' : (userName ? userName.toUpperCase() : 'BEM-VINDO(A)')}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={stylesHome.notificacaoIcon}>
              <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
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

        {categoriaSelecionada === null ? (
          <>
            {loadingCarrossel ? (
              <ActivityIndicator size="large" color="#4B0082" style={{ marginTop: 20 }}/>
            ) : (
              <>
                <View style={stylesHome.sessaoRecomendados}>
                  <Text style={stylesHome.sessaoRecomendadosTitulo}>Recomendados</Text>
                  <FlatList
                    data={recomendados}
                    renderItem={({ item }) => (
                      <CardRecomendado item={item} onPress={() => handleLazerPress(item.id)} />
                    )}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={stylesHome.horizontalListContent} 
                  />
                </View>

                <View style={stylesHome.sessaoRecomendados}>
                  <Text style={stylesHome.sessaoRecomendadosTitulo}>Mais Avaliados</Text>
                  <FlatList
                    data={maisAvaliados}
                    renderItem={({ item }) => (
                      <CardAvaliado item={item} onPress={() => handleLazerPress(item.id)} />
                    )}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={stylesHome.horizontalListContent}
                  />
                </View>
                
                <View style={stylesHome.sessaoRecomendados}>
                  <Text style={stylesHome.sessaoRecomendadosTitulo}>Mais Comentados</Text>
                  <FlatList
                    data={maisComentados}
                    renderItem={({ item }) => (
                      <CardAvaliado item={item} onPress={() => handleLazerPress(item.id)} />
                    )}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={stylesHome.horizontalListContent}
                  />
                </View>
              </>
            )}
          </>
        ) : (
          <View style={stylesHome.sessaoRecomendados}>
            <Text style={stylesHome.sessaoRecomendadosTitulo}>
              {categoriaInfo?.nome || 'Resultados'}
            </Text>
            {loadingFiltro ? (
              <ActivityIndicator size="large" color="#4B0082" style={{ marginTop: 20 }}/>
            ) : (
              <View style={{ paddingHorizontal: 20 }}>
                {dadosFiltrados.length > 0 ? (
                  dadosFiltrados.map(item => (
                    <CardRecomendado
                      key={item.id}
                      item={item}
                      style={{ width: '100%', marginRight: 0, marginBottom: 15 }}
                      onPress={() => handleLazerPress(item.id)}
                    />
                  ))
                ) : (
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ color: '#999' }}>Nenhum item encontrado para esta categoria.</Text>
                  </View>
                )}
              </View>
            )}
          </View>
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