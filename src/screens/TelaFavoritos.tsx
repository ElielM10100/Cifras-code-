import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type FavoritosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TelaFavoritos'>;

interface CifraFavorita {
  id: string;
  titulo: string;
  artista: string;
  instrumento: string;
  tom: string;
}

const TelaFavoritos: React.FC = () => {
  const navigation = useNavigation<FavoritosScreenNavigationProp>();
  const [filtroAtivo, setFiltroAtivo] = useState('Personalizado');

  // Dados de exemplo
  const cifrasFavoritas: CifraFavorita[] = [
    {
      id: '1',
      titulo: 'Vou Seguir',
      artista: 'Kazzo',
      instrumento: 'Violão/Guitarra',
      tom: 'F#m',
    },
    {
      id: '2',
      titulo: 'Girassol',
      artista: 'Whindersson Nunes',
      instrumento: 'Violão/Guitarra',
      tom: 'F#m',
    },
    {
      id: '3',
      titulo: 'Ainda Gosto Dela',
      artista: 'Skank',
      instrumento: 'Violão/Guitarra',
      tom: 'F#m',
    },
    {
      id: '4',
      titulo: 'Canção Pra Dois',
      artista: 'Rener Reges & Amigos',
      instrumento: 'Violão/Guitarra',
      tom: 'F#m',
    },
    {
      id: '5',
      titulo: 'Pé de Cedro',
      artista: 'Sergio Reis',
      instrumento: 'Violão/Guitarra',
      tom: 'F#m',
    },
  ];

  const renderItem = ({ item }: { item: CifraFavorita }) => (
    <TouchableOpacity
      style={styles.cifraItem}
      onPress={() => navigation.navigate('TelaCifra', { cifraId: item.id })}
    >
      <View style={styles.cifraInfo}>
        <Text style={styles.cifraTitulo}>{item.titulo}</Text>
        <Text style={styles.cifraArtista}>{item.artista}</Text>
        <Text style={styles.cifraDetalhes}>
          {item.instrumento} • Tom: {item.tom}
        </Text>
      </View>
      <TouchableOpacity style={styles.menuButton}>
        <Icon name="dots-vertical" size={24} color="#666" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Cifras favoritas</Text>
        <TouchableOpacity>
          <Icon name="plus" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>44/100 cifras</Text>
        <TouchableOpacity>
          <Text style={styles.aumentarLimite}>Aumentar Limite</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filtros}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['Personalizado', 'Recentes', 'Mais Antigas', 'Ordem'].map((filtro) => (
            <TouchableOpacity
              key={filtro}
              style={[styles.filtroBtn, filtroAtivo === filtro && styles.filtroBtnAtivo]}
              onPress={() => setFiltroAtivo(filtro)}
            >
              <Text style={[styles.filtroText, filtroAtivo === filtro && styles.filtroTextAtivo]}>
                {filtro}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={cifrasFavoritas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
      />

      <TouchableOpacity style={styles.salvarButton}>
        <Text style={styles.salvarButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222221',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 40,
  },
  titulo: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  infoText: {
    color: '#FFF',
    fontSize: 14,
  },
  aumentarLimite: {
    color: '#4CAF50',
    fontSize: 14,
  },
  filtros: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filtroBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filtroBtnAtivo: {
    backgroundColor: '#000',
  },
  filtroText: {
    color: '#666',
    fontSize: 14,
  },
  filtroTextAtivo: {
    color: '#FFF',
  },
  lista: {
    padding: 20,
  },
  cifraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  cifraInfo: {
    flex: 1,
  },
  cifraTitulo: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cifraArtista: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  },
  cifraDetalhes: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  menuButton: {
    padding: 10,
  },
  salvarButton: {
    backgroundColor: '#FF6B00',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  salvarButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaFavoritos; 