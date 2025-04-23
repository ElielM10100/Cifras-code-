import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './navigation/types';
import Login from './screens/Login';
import Cadastro from './screens/Cadastro';
import TelaInicial from './screens/TelaInicial';
import TelaHoje from './screens/TelaHoje/TelaHoje';
import TelaBuscar from './screens/TelaBuscar';
import TelaCifra from './screens/TelaCifra';
import TelaOpcoesCifra from './screens/TelaOpcoesCifra';
import TelaFavoritos from './screens/TelaFavoritos';
import TelaArtista from './screens/TelaArtista';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [telaInicial, setTelaInicial] = useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    const verificarTelaInicial = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setTelaInicial('TelaHoje');
        } else {
          setTelaInicial('Login');
        }
      } catch (error) {
        console.error('Erro ao verificar token:', error);
        setTelaInicial('Login');
      }
    };

    verificarTelaInicial();
  }, []);

  if (telaInicial === null) return <View />;

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={telaInicial}
        screenOptions={{ 
          headerShown: false,
          cardStyle: { backgroundColor: '#222221' }
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="TelaHoje" component={TelaHoje} />
        <Stack.Screen name="TelaBuscar" component={TelaBuscar} />
        <Stack.Screen name="TelaCifra" component={TelaCifra} />
        <Stack.Screen 
          name="TelaOpcoesCifra" 
          component={TelaOpcoesCifra}
          options={{
            presentation: 'modal',
            cardStyle: { backgroundColor: '#222221' }
          }}
        />
        <Stack.Screen name="TelaFavoritos" component={TelaFavoritos} />
        <Stack.Screen name="TelaArtista" component={TelaArtista} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
