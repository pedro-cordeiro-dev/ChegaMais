import React, { useState, useEffect } from 'react';
import {
  Text, View, TextInput, Image, TouchableOpacity, FlatList,
  Dimensions, Linking, Modal, ActivityIndicator, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { auth, db } from './firebaseconfig';
import {
  collection, getDocs, getDoc, query, orderBy, limit, addDoc,
  doc, runTransaction, serverTimestamp
} from "firebase/firestore";

import stylesHome from './stylesHome';
import styles from './StylesExplorar';

const { width } = Dimensions.get('window');

const LazerCard = ({ item }) => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [statusInfo, setStatusInfo] = useState({ text: '', color: '#666' });

  const fetchReviews = async () => {
    try {
      const reviewsCollection = collection(db, 'lazer', item.id, 'reviews');
      const q = query(reviewsCollection, orderBy('createdAt', 'desc'), limit(4));
      const querySnapshot = await getDocs(q);
      const reviewsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewsList);
    } catch (error) {
      console.error("Erro ao buscar reviews:", error);
    }
  };

  const checkOpenStatus = () => {
    try {
      if (!item.diasFuncionamento || !item.horarioInicio || !item.horarioFim) {
        setStatusInfo({ text: 'Horário não informado', color: '#666' });
        return;
      }
      
      const now = new Date();
      const currentDay = now.getDay();
      
      if (!item.diasFuncionamento.includes(currentDay)) {
        setStatusInfo({ text: 'Fechado', color: '#E74C3C' });
        return;
      }

      const [startHour, startMin] = item.horarioInicio.split(':').map(Number);
      const [endHour, endMin] = item.horarioFim.split(':').map(Number);
      
      const startTimeInMinutes = startHour * 60 + startMin;
      const endTimeInMinutes = endHour * 60 + endMin;
      const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

      if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes) {
        setStatusInfo({ text: 'Aberto', color: '#2ECC71' });
      } else {
        setStatusInfo({ text: 'Fechado', color: '#E74C3C' });
      }
    } catch (e) {
      setStatusInfo({ text: 'Horário inválido', color: '#666' });
    }
  };

  useEffect(() => {
    fetchReviews();
    checkOpenStatus();
  }, [item.id]);

  const handleGetDirections = (lat, lng) => {
    let destination = (lat && lng) ? `${lat},${lng}` : encodeURIComponent(item.enderecoCompleto);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
    Linking.openURL(url).catch(err => console.error('Ocorreu um erro', err));
  };

  const renderRatingStars = (rating) => (
    <View style={styles.ratingContainer}>
      {[...Array(5)].map((_, index) => (
        <FontAwesome
          key={index}
          name="star"
          size={16}
          color={index < Math.round(rating) ? '#FFD700' : '#E0E0E0'}
        />
      ))}
    </View>
  );

  const renderModalStars = () => (
    <View style={styles.starModalContainer}>
      {[...Array(5)].map((_, index) => (
        <TouchableOpacity key={index} onPress={() => setReviewRating(index + 1)}>
          <FontAwesome
            name={index < reviewRating ? "star" : "star-o"}
            size={32}
            color="#FFD700"
            style={styles.starButton}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const handleSubmitReview = async () => {
    const user = auth.currentUser;
    if (!user || reviewRating === 0) {
      console.error("É preciso estar logado e selecionar pelo menos 1 estrela.");
      return;
    }

    setIsSubmittingReview(true);
    
    try {
      const userDocRef = doc(db, "usuarios", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.exists() ? userDocSnap.data() : {};

      const reviewData = {
        rating: reviewRating,
        comment: reviewComment,
        userName: userData.nome || 'Usuário Anônimo',
        userPhoto: userData.photoURL || null,
        userId: user.uid,
        createdAt: serverTimestamp(),
      };
      const reviewCollectionRef = collection(db, 'lazer', item.id, 'reviews');
      await addDoc(reviewCollectionRef, reviewData);

      const lazerDocRef = doc(db, 'lazer', item.id);
      
      await runTransaction(db, async (transaction) => {
        const lazerDoc = await transaction.get(lazerDocRef);
        if (!lazerDoc.exists()) {
          throw "Documento não existe!";
        }
        
        const data = lazerDoc.data();
        const oldRatingTotal = (data.rating || 0) * (data.totalReviews || 0);
        const newTotalReviews = (data.totalReviews || 0) + 1;
        const newAvgRating = (oldRatingTotal + reviewRating) / newTotalReviews;

        transaction.update(lazerDocRef, {
          rating: parseFloat(newAvgRating.toFixed(1)),
          totalReviews: newTotalReviews,
        });
      });

      setIsSubmittingReview(false);
      setModalVisible(false);
      setReviewRating(0);
      setReviewComment('');
      fetchReviews();

    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      setIsSubmittingReview(false);
    }
  };

  return (
    <View style={styles.lazerCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.lazerImage} />
      {(Date.now() - item.createdAt?.toDate().getTime()) < (7 * 24 * 60 * 60 * 1000) && (
        <View style={styles.newTag}>
          <Text style={styles.newTagText}>New</Text>
        </View>
      )}

      <View style={styles.lazerInfoContainer}>
        <Text style={styles.lazerName}>{item.nome}</Text>
        
        {renderRatingStars(item.rating)}

        <View style={styles.statusContainer}>
          <Text style={[styles.statusTime, { color: statusInfo.color, fontWeight: 'bold' }]}>
            {statusInfo.text}
          </Text>
          <Text style={styles.statusTime}> • Fecha às {item.horarioFim || '??'}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={16} color="#666" />
          <Text style={styles.infoText}>{item.enderecoCompleto}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="person" size={16} color="#666" />
          <Text style={styles.infoText}>Publicado por {item.postedByName}</Text>
        </View>

        <TouchableOpacity
          style={styles.avaliarButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="star-border" size={18} color="#4B0082" />
          <Text style={styles.avaliarButtonText}>Avaliar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.comoChegarButton}
          onPress={() => handleGetDirections(item.latitude, item.longitude)}
        >
          <MaterialIcons name="directions" size={18} color="#FFFFFF" />
          <Text style={styles.comoChegarButtonText}>Como chegar</Text>
        </TouchableOpacity>

        <View style={styles.commentsContainer}>
          <Text style={styles.commentsTitle}>Comentários</Text>
          {reviews.length > 0 ? (
            reviews.map(review => (
              <View key={review.id} style={styles.commentItem}>
                <Image
                  source={review.userPhoto ? { uri: review.userPhoto } : require('./assets/iconUsuario.png')}
                  style={styles.commentUserImage}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.commentUserName}>{review.userName}</Text>
                  <Text style={styles.commentBody}>{review.comment}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.infoText}>Nenhuma avaliação ainda.</Text>
          )}
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Qual sua avaliação?</Text>
            {renderModalStars()}
            <TextInput
              style={styles.reviewInput}
              placeholder="Deixe um comentário (opcional)"
              placeholderTextColor="#888"
              value={reviewComment}
              onChangeText={setReviewComment}
              multiline
            />
            <TouchableOpacity
              style={[styles.submitReviewButton, isSubmittingReview && styles.submitReviewButtonDisabled]}
              onPress={handleSubmitReview}
              disabled={isSubmittingReview}
            >
              {isSubmittingReview ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.submitReviewButtonText}>Enviar Avaliação</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default function TelaExplorar({ navigation }) {
  
  const [lazerData, setLazerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchLazerData = async () => {
      setLoading(true);
      try {
        const lazerCollection = collection(db, "lazer");
        const q = query(lazerCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const lazerList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLazerData(lazerList);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
      setLoading(false);
    };

    fetchLazerData();
  }, []);

  const filteredData = lazerData.filter(item => 
    item.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={[stylesHome.safeArea, { backgroundColor: '#FFFFFF' }]}>
      <View style={styles.container}>
        
        <View style={styles.headerContainer}>
          <View style={[stylesHome.pesquisaBar, { flex: 1, backgroundColor: '#F0F0F0' }]}>
            <MaterialIcons name="search" size={24} color="#751a65" />
            <TextInput
              style={stylesHome.pesquisaInput}
              placeholder="Pesquisar lazer..."
              placeholderTextColor="#751a65"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('TelaCadastrar')}
          >
            <Ionicons name="add-circle" size={32} color="#4B0082" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#4B0082" style={{ flex: 1 }} />
        ) : (
          <FlatList
            data={filteredData}
            renderItem={({ item }) => <LazerCard item={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.85 + 20}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: (width - (width * 0.85)) / 2,
              paddingVertical: 20,
            }}
            ListEmptyComponent={<Text style={{ padding: 20 }}>Nenhum local encontrado.</Text>}
          />
        )}
      </View>

      <View style={stylesHome.botaoNav}>
        <TouchableOpacity style={stylesHome.navItem} onPress={() => navigation.navigate('TelaHome')}>
          <MaterialIcons name="home" size={24} color="#A9A9A9" />
          <Text style={stylesHome.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesHome.navItem} onPress={() => {}}>
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