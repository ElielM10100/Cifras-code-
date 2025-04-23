import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

interface Video {
  id: string;
  titulo: string;
  thumbnail: string;
  visualizacoes: string;
  duracao: string;
}

interface ListaVideosProps {
  videos: Video[];
  onVideoPress: (videoId: string) => void;
}

const ListaVideos: React.FC<ListaVideosProps> = ({ videos, onVideoPress }) => {
  const renderItem = ({ item }: { item: Video }) => (
    <TouchableOpacity
      style={styles.videoItem}
      onPress={() => onVideoPress(item.id)}
    >
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.thumbnail}
        />
        <View style={styles.duracaoContainer}>
          <Text style={styles.duracao}>{item.duracao}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titulo} numberOfLines={2}>
          {item.titulo}
        </Text>
        <Text style={styles.visualizacoes}>
          {item.visualizacoes} visualizações
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={videos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  videoItem: {
    marginBottom: 15,
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  duracaoContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  duracao: {
    color: '#FFF',
    fontSize: 12,
  },
  infoContainer: {
    marginTop: 8,
  },
  titulo: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  visualizacoes: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
});

export default ListaVideos; 