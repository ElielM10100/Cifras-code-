import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface RolagemAutomaticaProps {
  scrollViewRef: React.RefObject<ScrollView>;
  contentHeight: number;
  onClose: () => void;
}

const RolagemAutomatica: React.FC<RolagemAutomaticaProps> = ({
  scrollViewRef,
  contentHeight,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [velocidade, setVelocidade] = useState(1);
  const animationRef = useRef(new Animated.Value(0));
  const { height: screenHeight } = Dimensions.get('window');

  useEffect(() => {
    if (isPlaying) {
      const duration = (contentHeight - screenHeight) / (velocidade * 20); // pixels por segundo
      Animated.timing(animationRef.current, {
        toValue: contentHeight - screenHeight,
        duration: duration * 1000,
        useNativeDriver: true,
      }).start();
    } else {
      animationRef.current.stopAnimation();
    }
  }, [isPlaying, velocidade, contentHeight]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVelocidade = (novaVelocidade: number) => {
    setVelocidade(novaVelocidade);
  };

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <TouchableOpacity onPress={handlePlayPause} style={styles.button}>
          <Icon
            name={isPlaying ? 'pause' : 'play'}
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>

        <View style={styles.velocidades}>
          {[0.5, 1, 1.5, 2].map((v) => (
            <TouchableOpacity
              key={v}
              style={[styles.velocidadeBtn, velocidade === v && styles.velocidadeBtnAtivo]}
              onPress={() => handleVelocidade(v)}
            >
              <Text style={styles.velocidadeText}>{v}x</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={onClose} style={styles.button}>
          <Icon name="close" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#222221',
    borderTopWidth: 1,
    borderTopColor: '#333',
    padding: 15,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
  },
  velocidades: {
    flexDirection: 'row',
  },
  velocidadeBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  velocidadeBtnAtivo: {
    backgroundColor: '#FF6B00',
  },
  velocidadeText: {
    color: '#FFF',
    fontSize: 14,
  },
});

export default RolagemAutomatica; 