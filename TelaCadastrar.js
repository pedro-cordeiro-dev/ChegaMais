import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform, StatusBar, Image, Alert, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db } from './firebaseconfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './stylesCadastrar';

const TelaCadastrar = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [categoria, setCategoria] = useState(null);
  const diasDaSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioFim, setHorarioFim] = useState('');
  const [dateInicio, setDateInicio] = useState(new Date());
  const [dateFim, setDateFim] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [currentPickerTarget, setCurrentPickerTarget] = useState(null);


  const toggleDia = (diaIndex) => {
    if (diasSelecionados.includes(diaIndex)) {
      setDiasSelecionados(
        diasSelecionados.filter((index) => index !== diaIndex)
      );
    } else {
      setDiasSelecionados([...diasSelecionados, diaIndex]);
    }
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permissão para acessar a galeria foi negada');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const user = auth.currentUser;
    if (!uri || !user) return null;

    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const filename = `lazer/${user.uid}/${Date.now()}`;
      const storage = getStorage();
      const storageRef = ref(storage, filename);

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;

    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      return null;
    }
  };

  const handleCadastrar = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const user = auth.currentUser;

    if (!nome || !endereco || !categoria || !imageUri || !user) {
      console.error("Por favor, preencha todos os campos e adicione uma imagem.");
      setIsLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadImage(imageUri);
      if (!imageUrl) {
        throw new Error("Falha no upload da imagem.");
      }

      const lazerData = {
        nome,
        endereco,
        numero,
        bairro,
        enderecoCompleto: `${endereco}, ${numero} - ${bairro}`,
        categoria,
        horarioInicio,
        horarioFim,
        horarioFuncionamento: `${horarioInicio} AS ${horarioFim}`,
        diasFuncionamento: diasSelecionados,
        imageUrl,
        postedBy: user.uid,
        postedByName: user.displayName || 'Usuário Anônimo',
        createdAt: serverTimestamp(),
        rating: 0,
        totalReviews: 0,
      };

      const lazerCollection = collection(db, "lazer");
      await addDoc(lazerCollection, lazerData);

      console.log("Área de lazer cadastrada com sucesso!");
      setIsLoading(false);

      setNome('');
      setEndereco('');
      setNumero('');
      setBairro('');
      setCategoria(null);
      setHorarioInicio('');
      setHorarioFim('');
      setDiasSelecionados([]);
      setImageUri(null);
      
      navigation.navigate('TelaHome');

    } catch (error) {
      console.error("Erro ao cadastrar lazer:", error);
      setIsLoading(false);
    }
  };

  const onChangeTime = (event, selectedDate) => {
    setShowPicker(false);

    if (event.type === 'dismissed') {
      return;
    }

    if (selectedDate) {
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
    }
  };

  const showTimepicker = (target) => {
    setCurrentPickerTarget(target);
    setShowPicker(true);
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0c29" />
      
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          
          <LinearGradient
            colors={['#0f0c29', '#302b63', '#24243e']}
            style={styles.headerBackground}
          >
            <Text style={styles.title}>Adicionar Área</Text>
          </LinearGradient>

          <View style={styles.formContainer}>
            <TouchableOpacity style={styles.imagePlaceholder} onPress={handleImagePick}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.previewImage} />
              ) : (
                <MaterialCommunityIcons name="image-plus" size={50} style={styles.icon} />
              )}
            </TouchableOpacity>

            <Text style={styles.label}>NOME</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Nome do local"
              placeholderTextColor="#888"
            />
            
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>ENDEREÇO</Text>
                <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} placeholder="Endereço" placeholderTextColor="#888" />
              </View>
              <View style={styles.inputGroupSmall}>
                <Text style={styles.label}>NÚMERO</Text>
                <TextInput style={styles.input} value={numero} onChangeText={setNumero} keyboardType="numeric" placeholder="Nº" placeholderTextColor="#888" />
              </View>
            </View>
            <Text style={styles.label}>BAIRRO</Text>
            <TextInput style={styles.input} value={bairro} onChangeText={setBairro} placeholder="Bairro do local" placeholderTextColor="#888" />

            <Text style={styles.label}>CATEGORIA</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={categoria}
                onValueChange={(itemValue) => setCategoria(itemValue)}
                style={styles.picker}
                dropdownIconColor="#888"
              >
                <Picker.Item label="Selecione uma categoria..." value={null} />
                <Picker.Item label="Lazer" value="lazer" />
                <Picker.Item label="Comida" value="comida" />
                <Picker.Item label="Esportes" value="esportes" />
                <Picker.Item label="Compras" value="compras" />
                <Picker.Item label="Outro" value="outro" />
              </Picker>
            </View>

            <Text style={styles.label}>HORÁRIO DE FUNCIONAMENTO</Text>
            <View style={styles.timeContainer}>
              <TouchableOpacity
                style={[styles.input, styles.timeInput]}
                onPress={() => showTimepicker('inicio')}
              >
                <Text style={styles.timeInputText}>
                  {horarioInicio || "Início"}
                </Text>
              </TouchableOpacity>
              
              <Text style={styles.timeSeparator}>AS</Text>
              
              <TouchableOpacity
                style={[styles.input, styles.timeInput]}
                onPress={() => showTimepicker('fim')}
              >
                <Text style={styles.timeInputText}>
                  {horarioFim || "Fim"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.diasContainer}>
              {diasDaSemana.map((dia, index) => {
                const isSelected = diasSelecionados.includes(index);
                return (
                  <TouchableOpacity
                    key={index}
                    style={[ styles.diaButton, isSelected && styles.diaButtonSelected ]}
                    onPress={() => toggleDia(index)}
                  >
                    <Text style={[ styles.diaText, isSelected && styles.diaSelecionado ]}>
                      {dia}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity 
              style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
              onPress={handleCadastrar}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>CADASTRAR</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={currentPickerTarget === 'inicio' ? dateInicio : dateFim}
          mode={'time'}
          is24Hour={true}
          display="default" 
          onChange={onChangeTime}
        />
      )}

      <View style={styles.botaoNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('TelaHome')}>
          <MaterialIcons name="home" size={24} color="#A9A9A9" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('TelaExplorar')}>
          <MaterialIcons name="explore" size={24} color="#A9A9A9" />
          <Text style={styles.navText}>Explorar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <MaterialIcons name="add-circle" size={24} color="#4B0082" />
          <Text style={[styles.navText, { color: '#4B0082' }]}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Perfil')}>
          <MaterialIcons name="person" size={24} color="#A9A9AA" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TelaCadastrar;