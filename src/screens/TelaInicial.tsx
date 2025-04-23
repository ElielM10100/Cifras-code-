import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type TelaInicialNavigationProp = StackNavigationProp<RootStackParamList, 'TelaInicial'>;

const TelaInicial = () => {
  const navigation = useNavigation<TelaInicialNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BiblIA</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TelaCifra', { id: '1', title: 'Música Exemplo' })}
        >
          <Text style={styles.buttonText}>Cifras</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TelaFavoritos')}
        >
          <Text style={styles.buttonText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TelaPerfil')}
        >
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#333',
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TelaInicial; 