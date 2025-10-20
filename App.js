import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TelaCadastro from './TelaCadastro';
import TelaLogin from './TelaLogin';  
import TelaRecuperacaoSenha from './TelaRecuperacaoSenha';
import TelaAvaliacoes from './TelaAvaliacoes'; 
import TelaHome from './TelaHome';
import TelaPerfil from './Perfil';
import TelaMudarSenha from './TelaMudarSenha';

const Stack = createStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaLogin"> 

       <Stack.Screen
         name="TelaLogin"
         component={TelaLogin}
         options={{ headerShown: false }} 
        />

        <Stack.Screen
          name="TelaCadastro"
          component={TelaCadastro}
          options={{ headerShown: false }} 
        />

        <Stack.Screen
          name="TelaRecuperacaoSenha"
          component={TelaRecuperacaoSenha}
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen
          name="TelaAvaliacoes" 
          component={TelaAvaliacoes}
          options={{ headerShown: false }} 
        />

         <Stack.Screen
          name="TelaHome" 
          component={TelaHome}
          options={{ headerShown: false }} 
        />

        <Stack.Screen
          name="Perfil"
          component={TelaPerfil}
          options={{ headerShown: false }} 
        />

      <Stack.Screen
          name="TelaMudarSenha" 
          component={TelaMudarSenha}
          options={{ headerShown: false }} 
        />

        </Stack.Navigator>
    </NavigationContainer>
   );
}