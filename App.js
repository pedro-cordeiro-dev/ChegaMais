import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TelaCadastro from './TelaCadastro';
import TelaLogin from './TelaLogin';  
import TelaRecuperacaoSenha from './TelaRecuperacaoSenha';

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

      </Stack.Navigator>
    </NavigationContainer>
  );
}
