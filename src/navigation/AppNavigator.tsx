import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

// Importando as telas
import TelaInicial from '../screens/TelaInicial';
import TelaCifra from '../screens/TelaCifra';
import TelaFavoritos from '../screens/TelaFavoritos';
import TelaPerfil from '../screens/TelaPerfil';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="TelaInicial"
        screenOptions={{ 
          headerShown: false,
        }}
      >
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="TelaCifra" component={TelaCifra} />
        <Stack.Screen name="TelaFavoritos" component={TelaFavoritos} />
        <Stack.Screen name="TelaPerfil" component={TelaPerfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;


