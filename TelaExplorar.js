import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView
} from 'react-native';

import Carousel from 'react-native-reanimated-carousel';
import { MaterialIcons } from '@expo/vector-icons';
import stylesHome from './Styles';

export default function TelaHome({ navigation }) {

  const carouselItems = [
    { id: 1, title: 'Igreja', img: 'https://xadmin.s3.us-east-2.amazonaws.com/214/PhotoAssets/459535/images/large/igreja.jpg' },
    { id: 2, title: 'Praça', img: 'https://prefeitura.pbh.gov.br/sites/default/files/styles/slideshow/public/estrutura-de-governo/WhatsApp-Image-2023-02-06-at-17.45.02.jpg?itok=-6GkUPvq' },
    { id: 3, title: 'Cinema', img: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4' },
  ];

  return (
    <SafeAreaView style={stylesHome.container}>

      <View style={stylesHome.fundoRoxo} />

      <View style={stylesHome.searchBox}>
        <MaterialIcons name="search" size={24} color="#FFF" />
        <TextInput
          placeholder="Pesquisar..."
          placeholderTextColor="#D8D8D8"
          style={stylesHome.searchInput}
        />
      </View>

      <View style={stylesHome.carouselWrapper}>
        <Carousel
          width={320}
          height={230}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.85,
            parallaxScrollingOffset: 140,
          }}
          data={carouselItems}
          scrollAnimationDuration={800}
          renderItem={({ item }) => (
            <View style={stylesHome.card}>
              <Image source={{ uri: item.img }} style={stylesHome.cardImage} />
              <View style={stylesHome.cardOverlay}>
                <Text style={stylesHome.cardTitle}>{item.title}</Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* NAV BAR */}
      <View style={stylesHome.botaoNav}>
        <TouchableOpacity style={stylesHome.navItem} onPress={() => navigation.navigate('TelaHome')}>
          <MaterialIcons name="home" size={24} color="#4B0082" />
          <Text style={[stylesHome.navText, { color: '#4B0082' }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesHome.navItem}>
          <MaterialIcons name="explore" size={24} color="#A9A9A9" />
          <Text style={stylesHome.navText}>Explorar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesHome.navItem} onPress={() => navigation.navigate('TelaCadastrar')}>
          <MaterialIcons name="add-circle-outline" size={24} color="#A9A9A9" />
          <Text style={stylesHome.navText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesHome.navItem} onPress={() => navigation.navigate('Perfil')}>
          <MaterialIcons name="person" size={24} color="#A9A9A9" />
          <Text style={stylesHome.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
