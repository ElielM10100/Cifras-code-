import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import DiagramaAcorde from './DiagramaAcorde';

interface Acorde {
  nome: string;
  posicoes: number[];
  pestana?: number;
  casa?: number;
}

interface ListaAcordesProps {
  acordes: Acorde[];
  onAcordePress?: (acorde: Acorde) => void;
}

const ListaAcordes: React.FC<ListaAcordesProps> = ({
  acordes,
  onAcordePress,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {acordes.map((acorde, index) => (
        <TouchableOpacity
          key={index}
          style={styles.acordeItem}
          onPress={() => onAcordePress?.(acorde)}
        >
          <Text style={styles.acordeNome}>{acorde.nome}</Text>
          <DiagramaAcorde
            nome={acorde.nome}
            posicoes={acorde.posicoes}
            pestana={acorde.pestana}
            casa={acorde.casa}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  acordeItem: {
    marginRight: 20,
    alignItems: 'center',
  },
  acordeNome: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ListaAcordes; 