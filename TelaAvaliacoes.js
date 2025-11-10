import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  TextInput, ActivityIndicator, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from './firebaseconfig';
import {
  collectionGroup, query, where, orderBy, getDocs
} from "firebase/firestore";

import estilos from './styles';

const formatDate = (timestamp) => {
  if (!timestamp || typeof timestamp.toDate !== 'function') {
    return '...';
  }
  try {
    const date = timestamp.toDate();
    return date.toLocaleDateString('pt-BR');
  } catch (error) {
    return 'Data inválida';
  }
};

const CartaoAvaliacao = ({ review }) => (
  <View style={estilos.cartaoAvaliacao}>
    <View style={estilos.topoCartaoAvaliacao}>
      <Text style={estilos.localAvaliacao}>{review.lazerName || 'Local não informado'}</Text>
      <Text style={estilos.dataAvaliacao}>{formatDate(review.createdAt)}</Text>
    </View>
    <Text style={estilos.comentarioAvaliacao}>{review.comment}</Text>
    <View style={estilos.estrelasAvaliacao}>
      {[...Array(5)].map((_, i) => (
        <Ionicons
          key={i}
          name={i < review.rating ? 'star' : 'star-outline'}
          size={20}
          color="#FFD700"
        />
      ))}
    </View>
  </View>
);

export default function TelaAvaliacoes({ navigation }) {
  const [textoBusca, setTextoBusca] = useState('');
  const [filtroNota, setFiltroNota] = useState(null);

  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserReviews = async () => {
      setLoading(true);
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const reviewsRef = collectionGroup(db, 'reviews');
        
        const q = query(
          reviewsRef,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const userReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllReviews(userReviews);

      } catch (error) {
        console.error("Erro ao buscar avaliações (Verifique o ÍNDICE):", error);
      }
      setLoading(false);
    };

    fetchUserReviews();
  }, []);

  const avaliacoesFiltradas = allReviews.filter((review) => {
    const correspondeBusca =
      (review.lazerName?.toLowerCase().includes(textoBusca.toLowerCase()) ||
      review.comment?.toLowerCase().includes(textoBusca.toLowerCase()));

    const correspondeNota = filtroNota ? review.rating === filtroNota : true;

    return correspondeBusca && correspondeNota;
  });

  return (
    <SafeAreaView style={estilos.containerAvaliacao}> 
      <View style={estilos.cabecalhoAvaliacao}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={estilos.tituloAvaliacao}>Minhas Avaliações</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={estilos.campoBusca}>
        <TextInput
          style={estilos.entradaBusca}
          placeholder="Buscar nos meus comentários..."
          placeholderTextColor="#888"
          value={textoBusca}
          onChangeText={setTextoBusca}
        />
      </View>

      <View style={estilos.caixaFiltros}>
        <Text style={estilos.tituloFiltros}>Filtrar por estrelas:</Text>
        <View style={estilos.containerBotoesFiltro}>
          {[1, 2, 3, 4, 5].map((nota) => (
            <TouchableOpacity
              key={nota}
              style={[
                estilos.botaoFiltro,
                filtroNota === nota && estilos.botaoFiltroAtivo,
              ]}
              onPress={() => setFiltroNota(filtroNota === nota ? null : nota)}
            >
              <Text style={estilos.textoFiltro}>{nota}★</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[
              estilos.botaoFiltro,
              filtroNota === null && estilos.botaoFiltroAtivo,
            ]}
            onPress={() => setFiltroNota(null)}
          >
            <Text style={estilos.textoFiltro}>Todos</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4B0082" style={{ marginTop: 50 }} />
      ) : avaliacoesFiltradas.length === 0 ? (
        <Text style={estilos.mensagemVazia}>
          {allReviews.length === 0 
            ? "Você ainda não fez nenhuma avaliação." 
            : "Nenhuma avaliação encontrada com base no filtro."}
        </Text>
      ) : (
        <FlatList
          data={avaliacoesFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CartaoAvaliacao review={item} />}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </SafeAreaView>
  );
}