import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Animated,
  Modal,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ListaAcordes from '../components/ListaAcordes';
import RolagemAutomatica from '../components/RolagemAutomatica';
import ListaVideos from '../components/ListaVideos';
import { StackNavigationProp } from '@react-navigation/stack';

type TelaCifraRouteProp = RouteProp<RootStackParamList, 'TelaCifra'>;
type TelaCifraNavigationProp = StackNavigationProp<RootStackParamList, 'TelaCifra'>;

const TelaCifra: React.FC = () => {
  const route = useRoute<TelaCifraRouteProp>();
  const navigation = useNavigation<TelaCifraNavigationProp>();
  const [versaoSelecionada, setVersaoSelecionada] = useState('Principal');
  const [mostrarTabs, setMostrarTabs] = useState(true);
  const [mostrarRolagem, setMostrarRolagem] = useState(false);
  const [mostrarVideos, setMostrarVideos] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Exemplo de dados da música
  const cifra = {
    titulo: 'Liberdade Provisória',
    artista: 'Henrique e Juliano',
    tom: 'Ebm',
    afinacao: 'Eb Ab Db Gb Bb Eb',
    acordes: [
      { nome: 'Em7', posicoes: [0, 2, 0, 0, 0, 0] },
      { nome: 'Bm7', posicoes: [2, 2, 4, 2, 3, 2] },
      { nome: 'D9', posicoes: [-1, 5, 4, 5, 5, 5] },
      { nome: 'A', posicoes: [0, 0, 2, 2, 2, 0] },
    ],
    letra: `[Intro] Em7 Bm7 D9 A

[Solo]
E|--------------------------------3-3-3-3-
B|-/5-5--7-7/8----8\\7-5-5-------5-5-5-5-
G|--------------------------------4-4-4-4-
D|--------------------------------7-4-----
A|----------------------------------------
E|----------------------------------------`,
    videos: [
      {
        id: '1',
        titulo: 'Henrique e Juliano - LIBERDADE PROVISÓRIA - DVD Ao Vivo No Ibirapuera',
        thumbnail: 'https://i.ytimg.com/vi/L3-XDq0mUFk/maxresdefault.jpg',
        visualizacoes: '412.590.924',
        duracao: '3:45',
      },
      {
        id: '2',
        titulo: 'Henrique e Juliano - Liberdade Provisória (Letra)',
        thumbnail: 'https://i.ytimg.com/vi/9XZGJFdE_dg/maxresdefault.jpg',
        visualizacoes: '5.430.124',
        duracao: '3:42',
      },
      {
        id: '3',
        titulo: 'Henrique e Juliano - Liberdade Provisória (Cover)',
        thumbnail: 'https://i.ytimg.com/vi/L3-XDq0mUFk/maxresdefault.jpg',
        visualizacoes: '1.355.789',
        duracao: '3:40',
      },
    ],
  };

  const handleVideoPress = (videoId: string) => {
    // TODO: Implementar reprodução do vídeo
    console.log('Reproduzir vídeo:', videoId);
  };

  const handleAcordePress = (acorde: { nome: string; posicoes: number[] }) => {
    // TODO: Implementar visualização detalhada do acorde
    console.log('Visualizar acorde:', acorde.nome);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.titulo}>{cifra.titulo}</Text>
          <Text style={styles.artista}>{cifra.artista}</Text>
        </View>
      </View>

      <View style={styles.versoes}>
        <TouchableOpacity 
          style={[styles.versaoBtn, versaoSelecionada === 'Principal' && styles.versaoBtnAtivo]}
          onPress={() => setVersaoSelecionada('Principal')}
        >
          <Text style={styles.versaoText}>Principal</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.versaoBtn, versaoSelecionada === 'Simplificada' && styles.versaoBtnAtivo]}
          onPress={() => setVersaoSelecionada('Simplificada')}
        >
          <Text style={styles.versaoText}>Simplificada</Text>
        </TouchableOpacity>
      </View>

      <ListaAcordes
        acordes={cifra.acordes}
        onAcordePress={handleAcordePress}
      />

      <Animated.ScrollView
        ref={scrollViewRef}
        style={styles.cifraContainer}
        onContentSizeChange={(_, height) => setContentHeight(height)}
      >
        <Text style={styles.cifraInfo}>Tom: {cifra.tom}</Text>
        <Text style={styles.cifraInfo}>Afinação: {cifra.afinacao}</Text>
        <Text style={styles.cifraConteudo}>{cifra.letra}</Text>
      </Animated.ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerButton}
          onPress={() => setMostrarVideos(true)}
        >
          <Icon name="play" size={24} color="#FFF" />
          <Text style={styles.footerButtonText}>Ouvir</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.footerButton}
          onPress={() => setMostrarRolagem(true)}
        >
          <Icon name="repeat" size={24} color="#FFF" />
          <Text style={styles.footerButtonText}>Rolagem</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.footerButton}
          onPress={() => navigation.navigate('TelaOpcoesCifra', { cifraId: route.params.cifraId })}
        >
          <Icon name="cog" size={24} color="#FFF" />
          <Text style={styles.footerButtonText}>Opções</Text>
        </TouchableOpacity>
      </View>

      {mostrarRolagem && (
        <RolagemAutomatica
          scrollViewRef={scrollViewRef}
          contentHeight={contentHeight}
          onClose={() => setMostrarRolagem(false)}
        />
      )}

      <Modal
        visible={mostrarVideos}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setMostrarVideos(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>BIBLIOTECA</Text>
            <TouchableOpacity onPress={() => setMostrarVideos(false)}>
              <Icon name="close" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
          <ListaVideos
            videos={cifra.videos}
            onVideoPress={handleVideoPress}
          />
        </View>
      </Modal>
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
    padding: 20,
    paddingTop: 40,
  },
  headerInfo: {
    marginLeft: 15,
  },
  titulo: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  artista: {
    color: '#FF6B00',
    fontSize: 16,
  },
  versoes: {
    flexDirection: 'row',
    padding: 10,
  },
  versaoBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  versaoBtnAtivo: {
    backgroundColor: '#000',
  },
  versaoText: {
    color: '#FFF',
  },
  cifraContainer: {
    flex: 1,
    padding: 20,
  },
  cifraInfo: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 10,
  },
  cifraConteudo: {
    color: '#FFF',
    fontFamily: 'monospace',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#FFF',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#222221',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaCifra; 