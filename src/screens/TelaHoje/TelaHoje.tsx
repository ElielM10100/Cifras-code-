import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TelaHojeProps } from '../../navigation/types';

const TelaHoje: React.FC<TelaHojeProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Cifras Club</Text>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => navigation.navigate('TelaBuscar')}
          >
            <Text style={styles.searchButtonText}>Buscar músicas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Músicas do Dia</Text>
          {/* Aqui virá a lista de músicas do dia */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Artistas em Destaque</Text>
          {/* Aqui virá a lista de artistas em destaque */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gêneros Populares</Text>
          {/* Aqui virá a lista de gêneros populares */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suas Favoritas</Text>
          {/* Aqui virá a lista de músicas favoritas */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222221',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
});

export default TelaHoje;
