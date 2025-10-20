import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import estilos from './styles';

const avaliacoes = [
  {
    id: '1',
    lugar: 'Parque da Cidade',
    comentario: 'Ótimo lugar para relaxar com a família!',
    nota: 4,
    data: '20/09/2025',
  },
  {
    id: '2',
    lugar: 'Festival de Música',
    comentario: 'Ambiente animado e bem organizado.',
    nota: 5,
    data: '10/08/2025',
  },
  {
    id: '3',
    lugar: 'Praia do Futuro',
    comentario: 'Perfeito para um dia de sol!',
    nota: 3,
    data: '05/07/2025',
  },
];

const CartaoAvaliacao = ({ lugar, comentario, nota, data }) => (
  <View style={estilos.cartaoAvaliacao}>
    <View style={estilos.topoCartaoAvaliacao}>
      <Text style={estilos.localAvaliacao}>{lugar}</Text>
      <Text style={estilos.dataAvaliacao}>{data}</Text>
    </View>
    <Text style={estilos.comentarioAvaliacao}>{comentario}</Text>
    <View style={estilos.estrelasAvaliacao}>
      {[...Array(5)].map((_, i) => (
        <Ionicons
          key={i}
          name={i < nota ? 'star' : 'star-outline'}
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

  const avaliacoesFiltradas = avaliacoes.filter((avaliacao) => {
    const correspondeBusca =
      avaliacao.lugar.toLowerCase().includes(textoBusca.toLowerCase()) ||
      avaliacao.comentario.toLowerCase().includes(textoBusca.toLowerCase());

    const correspondeNota = filtroNota ? avaliacao.nota === filtroNota : true;

    return correspondeBusca && correspondeNota;
  });

  return (
    <View style={estilos.containerAvaliacao}>
      <View style={estilos.cabecalhoAvaliacao}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={estilos.tituloAvaliacao}>Avaliações</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={estilos.campoBusca}>
        <TextInput
          style={estilos.entradaBusca}
          placeholder="Buscar avaliações..."
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
              onPress={() => setFiltroNota(nota)}
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

      {avaliacoesFiltradas.length === 0 ? (
        <Text style={estilos.mensagemVazia}>
          Nenhuma avaliação encontrada com base no filtro.
        </Text>
      ) : (
        <FlatList
          data={avaliacoesFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CartaoAvaliacao
              lugar={item.lugar}
              comentario={item.comentario}
              nota={item.nota}
              data={item.data}
            />
          )}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
}
