import React, { useState } from 'react';
import {
  View,Text,TextInput,TouchableOpacity,ScrollView,KeyboardAvoidingView,Platform,StatusBar, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Importado
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; // Importado
import { LinearGradient } from 'expo-linear-gradient';
import styles from './stylesCadastrar'; // O nome do estilo permanece o mesmo

const TelaCadastrar = ({ navigation }) => { 
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [categoria, setCategoria] = useState(null);
  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioFim, setHorarioFim] = useState('');
  const diasDaSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const [diasSelecionados, setDiasSelecionados] = useState([]);

  const toggleDia = (diaIndex) => {
    if (diasSelecionados.includes(diaIndex)) {
      setDiasSelecionados(
        diasSelecionados.filter((index) => index !== diaIndex)
      );
    } else {
      setDiasSelecionados([...diasSelecionados, diaIndex]);
    }
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
            <TouchableOpacity style={styles.imagePlaceholder}>
              <MaterialCommunityIcons
                name="image-plus"
                size={50}
                style={styles.icon}
              />
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
                <TextInput
                  style={styles.input}
                  value={endereco}
                  onChangeText={setEndereco}
                  placeholder="Endereço"
                  placeholderTextColor="#888"
                />
              </View>
              <View style={styles.inputGroupSmall}>
                <Text style={styles.label}>NÚMERO</Text>
                <TextInput
                  style={styles.input}
                  value={numero}
                  onChangeText={setNumero}
                  keyboardType="numeric"
                  placeholder="Nº"
                  placeholderTextColor="#888"
                />
              </View>
            </View>

            <Text style={styles.label}>BAIRRO</Text>
            <TextInput
              style={styles.input}
              value={bairro}
              onChangeText={setBairro}
              placeholder="Bairro do local"
              placeholderTextColor="#888"
            />

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
              <TextInput
                style={[styles.input, styles.timeInput]}
                value={horarioInicio}
                onChangeText={setHorarioInicio}
                placeholder="08:00"
                placeholderTextColor="#888"
              />
              <Text style={styles.timeSeparator}>AS</Text>
              <TextInput
                style={[styles.input, styles.timeInput]}
                value={horarioFim}
                onChangeText={setHorarioFim}
                placeholder="18:00"
                placeholderTextColor="#888"
              />
            </View>

            <View style={styles.daysContainer}>
              {diasDaSemana.map((dia, index) => {
                const isSelected = diasSelecionados.includes(index);
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dayButton,
                      isSelected && styles.dayButtonSelected,
                    ]}
                    onPress={() => toggleDia(index)}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        isSelected && styles.dayTextSelected,
                      ]}
                    >
                      {dia}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>CADASTRAR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.botaoNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('TelaHome')}>
          <MaterialIcons name="home" size={24} color="#A9A9A9" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => {/* navigation.navigate('TelaExplorar') */ }}>
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