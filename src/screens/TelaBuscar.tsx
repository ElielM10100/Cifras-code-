import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type BuscarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TelaBuscar'>;

// Dados de exemplo para demonstração
const musicasExemplo = [
  {
    id: '1',
    titulo: 'Bohemian Rhapsody',
    artista: 'Queen',
    capa: 'https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b',
  },
  {
    id: '2',
    titulo: 'Stairway to Heaven',
    artista: 'Led Zeppelin',
    capa: 'https://i.scdn.co/image/ab67616d0000b273c8a5e8c8c8c8c8c8c8c8c8c8',
  },
  // Adicione mais músicas conforme necessário
];

const TelaBuscar: React.FC = () => {
  const navigation = useNavigation<BuscarScreenNavigationProp>();
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState(musicasExemplo);

  const handleBusca = (texto: string) => {
    setBusca(texto);
    // TODO: Implementar lógica de busca real
    const filtrados = musicasExemplo.filter(
      (musica) =>
        musica.titulo.toLowerCase().includes(texto.toLowerCase()) ||
        musica.artista.toLowerCase().includes(texto.toLowerCase())
    );
    setResultados(filtrados);
  };

  const renderItem = ({ item }: { item: typeof musicasExemplo[0] }) => (
    <TouchableOpacity
      style={styles.musicaItem}
      onPress={() => navigation.navigate('TelaCifra', { cifraId: item.id })}
    >
      <Image source={{ uri: item.capa }} style={styles.capa} />
      <View style={styles.infoMusica}>
        <Text style={styles.tituloMusica}>{item.titulo}</Text>
        <Text style={styles.artistaMusica}>{item.artista}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buscaContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar músicas ou artistas..."
          placeholderTextColor="#666"
          value={busca}
          onChangeText={handleBusca}
        />
      </View>

      <FlatList
        data={resultados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222221',
  },
  buscaContainer: {
    padding: 20,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 15,
    color: '#fff',
  },
  lista: {
    padding: 20,
  },
  musicaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
  },
  capa: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  infoMusica: {
    marginLeft: 15,
    flex: 1,
  },
  tituloMusica: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistaMusica: {
    color: '#666',
    fontSize: 14,
  },
});

export default TelaBuscar; 