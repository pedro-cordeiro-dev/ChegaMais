import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StatusBar, FlatList, ActivityIndicator, SafeAreaView,
  Modal, ScrollView, TextInput, KeyboardAvoidingView, Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { auth, db } from './firebaseconfig';
import { 
    collection, getDocs, query, where, orderBy, doc, updateDoc 
} from "firebase/firestore";

import stylesHome from './stylesHome';
import styles from './stylesMeusLazeres'; 

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

const EditLazerModal = ({ visible, onClose, lazerData, onSave }) => {
  
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [categoria, setCategoria] = useState(null);
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  
  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioFim, setHorarioFim] = useState('');
  const [dateInicio, setDateInicio] = useState(new Date());
  const [dateFim, setDateFim] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [currentPickerTarget, setCurrentPickerTarget] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const diasDaSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  useEffect(() => {
    if (lazerData) {
      setNome(lazerData.nome || '');
      setEndereco(lazerData.endereco || '');
      setNumero(lazerData.numero || '');
      setBairro(lazerData.bairro || '');
      setCategoria(lazerData.categoria || null);
      setHorarioInicio(lazerData.horarioInicio || '');
      setHorarioFim(lazerData.horarioFim || '');
      setDiasSelecionados(lazerData.diasFuncionamento || []);
    }
  }, [lazerData]); 

  const toggleDia = (diaIndex) => {
    if (diasSelecionados.includes(diaIndex)) {
      setDiasSelecionados(diasSelecionados.filter((index) => index !== diaIndex));
    } else {
      setDiasSelecionados([...diasSelecionados, diaIndex]);
    }
  };

  const onChangeTime = (event, selectedDate) => {
    setShowPicker(false);
    if (event.type === 'dismissed' || !selectedDate) {
      return;
    }
    const formattedTime = selectedDate.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    if (currentPickerTarget === 'inicio') {
      setDateInicio(selectedDate);
      setHorarioInicio(formattedTime);
    } else {
      setDateFim(selectedDate);
      setHorarioFim(formattedTime);
    }
  };

  const showTimepicker = (target) => {
    setCurrentPickerTarget(target);
    setShowPicker(true);
  };

  const handleSaveChanges = async () => {
    if (!lazerData) return;
    setIsLoading(true);

    const docRef = doc(db, "lazer", lazerData.id);

    const updatedData = {
      nome,
      endereco,
      numero,
      bairro,
      categoria,
      horarioInicio,
      horarioFim,
      diasFuncionamento: diasSelecionados,
      enderecoCompleto: `${endereco}, ${numero} - ${bairro}`,
      horarioFuncionamento: `${horarioInicio} AS ${horarioFim}`,
    };

    try {
      await updateDoc(docRef, updatedData);
      onSave(updatedData); 
      onClose(); 
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalKAV}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Editar Lazer</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              
              <Text style={styles.label}>NOME</Text>
              <TextInput style={styles.input} value={nome} onChangeText={setNome} />

              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>ENDEREÇO</Text>
                  <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />
                </View>
                <View style={styles.inputGroupSmall}>
                  <Text style={styles.label}>NÚMERO</Text>
                  <TextInput style={styles.input} value={numero} onChangeText={setNumero} />
                </View>
              </View>

              <Text style={styles.label}>BAIRRO</Text>
              <TextInput style={styles.input} value={bairro} onChangeText={setBairro} />

              <Text style={styles.label}>CATEGORIA</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={categoria}
                  onValueChange={(itemValue) => setCategoria(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Lazer" value="lazer" />
                  <Picker.Item label="Comida" value="comida" />
                  <Picker.Item label="Esportes" value="esportes" />
                  <Picker.Item label="Compras" value="compras" />
                  <Picker.Item label="Outro" value="outro" />
                </Picker>
              </View>

              <Text style={styles.label}>HORÁRIO DE FUNCIONAMENTO</Text>
              <View style={styles.timeContainer}>
                <TouchableOpacity style={[styles.input, styles.timeInput]} onPress={() => showTimepicker('inicio')}>
                  <Text style={styles.timeInputText}>{horarioInicio || "Início"}</Text>
                </TouchableOpacity>
                <Text style={styles.timeSeparator}>AS</Text>
                <TouchableOpacity style={[styles.input, styles.timeInput]} onPress={() => showTimepicker('fim')}>
                  <Text style={styles.timeInputText}>{horarioFim || "Fim"}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.diasContainer}>
                {diasDaSemana.map((dia, index) => {
                  const isSelected = diasSelecionados.includes(index);
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[styles.diaButton, isSelected && styles.diaButtonSelected]}
                      onPress={() => toggleDia(index)}
                    >
                      <Text style={[styles.diaText, isSelected && styles.diaSelecionado]}>
                        {dia}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleSaveChanges} disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>SALVAR ALTERAÇÕES</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeButton} onPress={onClose} disabled={isLoading}>
                <Text style={styles.closeButtonText}>CANCELAR</Text>
              </TouchableOpacity>

            </ScrollView>
            
            {showPicker && (
              <DateTimePicker
                value={currentPickerTarget === 'inicio' ? dateInicio : dateFim}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={onChangeTime}
              />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const MeuLazerCard = ({ item, onEdit }) => (
  <View style={styles.cardContainer}>
    <CardRecomendado
      item={item}
      style={styles.cardWrapper}
    />
    <TouchableOpacity style={styles.editButton} onPress={onEdit}>
      <MaterialIcons name="edit" size={18} color="#FFFFFF" />
    </TouchableOpacity>
  </View>
);

export default function TelaMeusLazeres({ navigation }) {

  const [loading, setLoading] = useState(true);
  const [meusLazeres, setMeusLazeres] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLazer, setSelectedLazer] = useState(null);

  useEffect(() => {
    fetchMeusLazeres();
  }, []);

  const fetchMeusLazeres = async () => {
    setLoading(true);
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const q = query(
        collection(db, "lazer"), 
        where("postedBy", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const lazerList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMeusLazeres(lazerList);
    } catch (error) {
      console.error("Erro ao buscar 'Meus Lazeres':", error);
    }
    setLoading(false);
  };

  const openEditModal = (item) => {
    setSelectedLazer(item);
    setModalVisible(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
    setSelectedLazer(null);
  };

  const handleUpdateLazer = (updatedData) => {
    setMeusLazeres(prevLazeres => 
      prevLazeres.map(lazer => 
        lazer.id === selectedLazer.id 
          ? { ...lazer, ...updatedData } 
          : lazer
      )
    );
  };

  return (
    <SafeAreaView style={stylesHome.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#4B0082" />

      <LinearGradient
        colors={['#2E1A47', '#4A5568']}
        style={styles.header}
      >
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Lazeres</Text>
        <View style={{ width: 48 }} /> 
      </LinearGradient>

      {loading ? (
        <ActivityIndicator size="large" color="#4B0082" style={styles.loadingContainer} />
      ) : (
        <FlatList
          data={meusLazeres}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Você ainda não cadastrou nenhum lazer.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <MeuLazerCard
              item={item}
              onEdit={() => openEditModal(item)} 
            />
          )}
        />
      )}

      {selectedLazer && (
        <EditLazerModal
          visible={isModalVisible}
          onClose={onCloseModal}
          lazerData={selectedLazer}
          onSave={handleUpdateLazer}
        />
      )}

    </SafeAreaView>
  );
}