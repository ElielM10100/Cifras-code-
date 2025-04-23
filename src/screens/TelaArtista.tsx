import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TelaArtistaProps } from '../navigation/types';

const TelaArtista: React.FC<TelaArtistaProps> = ({ route }) => {
  const { artistaId, artistaNome } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{artistaNome}</Text>
      <Text style={styles.subtitle}>ID: {artistaId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222221',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
  },
});

export default TelaArtista; 