import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const TelaOpcoesCifra: React.FC = () => {
  const navigation = useNavigation();
  const [mostrarTabs, setMostrarTabs] = useState(true);
  const [tom, setTom] = useState('Ebm');
  const [capotraste, setCapotraste] = useState(0);

  const tons = [
    'Am', 'Bbm', 'Bm', 'Cm', 'C#m', 'Dm',
    'Ebm', 'Em', 'Fm', 'F#m', 'Gm', 'G#m'
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Opções da cifra</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <TouchableOpacity style={styles.option}>
            <Icon name="playlist-plus" size={24} color="#666" />
            <Text style={styles.optionText}>Salvar em uma lista</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Icon name="share-variant" size={24} color="#666" />
            <Text style={styles.optionText}>Compartilhar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Versão</Text>
          <TouchableOpacity style={styles.versionOption}>
            <Text style={styles.versionText}>Guitarra</Text>
            <Text style={styles.versionSelected}>Principal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tom</Text>
          <View style={styles.tonsGrid}>
            {tons.map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.tomButton, tom === t && styles.tomButtonActive]}
                onPress={() => setTom(t)}
              >
                <Text style={[styles.tomText, tom === t && styles.tomTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Mostrar tabs</Text>
            <Switch
              value={mostrarTabs}
              onValueChange={setMostrarTabs}
              trackColor={{ false: '#666', true: '#FF6B00' }}
              thumbColor={mostrarTabs ? '#fff' : '#fff'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Afinação</Text>
          <Text style={styles.afinacaoText}>Eb Ab Db Gb Bb Eb</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Capotraste</Text>
          <Text style={styles.capotasteText}>Sem capo</Text>
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
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  versionOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  versionText: {
    color: '#fff',
    fontSize: 16,
  },
  versionSelected: {
    color: '#666',
    fontSize: 16,
  },
  tonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  tomButton: {
    width: '16.666%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  tomButtonActive: {
    backgroundColor: '#FF6B00',
  },
  tomText: {
    color: '#fff',
    fontSize: 14,
  },
  tomTextActive: {
    fontWeight: 'bold',
  },
  afinacaoText: {
    color: '#666',
    fontSize: 16,
  },
  capotasteText: {
    color: '#666',
    fontSize: 16,
  },
});

export default TelaOpcoesCifra; 