import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Text, TouchableOpacity, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import GoBack from '../../components/common/GoBack/GoBack';

interface Versiculo {
  capitulo: string;
  versiculo: string;
  texto: string;
}

const compartilharVersiculo = async (versiculo: Versiculo) => {
  try {
    await Share.share({
      message: `📖 ${versiculo.capitulo} ${versiculo.versiculo}\n\n"${versiculo.texto}"\n\n🙏 Compartilhado via App`,
    });
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível compartilhar o versículo.');
  }
};

const TelaVersiculosSalvos: React.FC = () => {
  const [versiculosExibidos, setVersiculosExibidos] = useState<Versiculo[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      carregarVersiculosCurtidos();
    }, [])
  );

  const carregarVersiculosCurtidos = async () => {
    try {
      
      const curtidos = await AsyncStorage.getItem('versiculosCurtidos');

      if (curtidos) {
        const versiculosCurtidosArray: Versiculo[] = JSON.parse(curtidos);
        
        if (Array.isArray(versiculosCurtidosArray)) {
          setVersiculosExibidos(versiculosCurtidosArray);
        } else {
          console.warn("⚠️ Dados corrompidos no AsyncStorage. Resetando...");
          setVersiculosExibidos([]);
        }
      } else {
        setVersiculosExibidos([]);
      }
    } catch (error) {
      console.error("🚨 Erro ao carregar versículos salvos:", error);
      Alert.alert('Erro', 'Não foi possível carregar os versículos curtidos.');
    }
  };

  const descurtirVersiculo = async (versiculoRemovido: Versiculo) => {
    try {
      const novosVersiculos = versiculosExibidos.filter(
        versiculo =>
          versiculo.capitulo !== versiculoRemovido.capitulo ||
          versiculo.versiculo !== versiculoRemovido.versiculo
      );

      await AsyncStorage.setItem('versiculosCurtidos', JSON.stringify(novosVersiculos));
      setVersiculosExibidos(novosVersiculos);
    } catch (error) {
      console.error("🚨 Erro ao remover versículo:", error);
      Alert.alert('Erro', 'Não foi possível remover o versículo.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.voltar}>
      <GoBack color='#fff'/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {versiculosExibidos.length > 0 ? (
          versiculosExibidos.map((versiculo, index) => (
            
            <View key={index} style={styles.versiculoContainer}>
              <View style={styles.header}>
              <Text style={styles.versiculoCapitulo}>{versiculo.capitulo} {versiculo.versiculo}</Text>
                  <TouchableOpacity style={styles.botaoDescurtir} onPress={() => descurtirVersiculo(versiculo)}>
                    <Text style={styles.coracao}>💔</Text>
                  </TouchableOpacity>
                  
              </View>
              <Text style={styles.versiculoTexto}>{versiculo.texto}</Text>

              <View style={styles.botoes}>
                <TouchableOpacity style={styles.botaoLerCompartilhar}>
                  <Text style={styles.textoBotoes}>LER 📖</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoLerCompartilhar} onPress={() => compartilharVersiculo(versiculo)}>
                  <Text style={styles.textoBotoes}>COMPARTILHAR</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyMessage}>
            <Text style={styles.text}>Nenhum versículo salvo ainda.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  emptyMessage: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },

  coracao: {
    fontSize: 20,
  },
  versiculoContainer: {
    backgroundColor: '#333533',
    padding: 15,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 30,
    
  },
  versiculoCapitulo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  versiculoTexto: {
    color: '#ddd',
    fontSize: 18,
    marginTop: 5,
    fontWeight: 'bold',

  },
  botaoLerCompartilhar: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    
  },
  botaoDescurtir: {
    display: 'flex',
    alignItems: 'flex-end',
    backgroundColor: '#222221',
    padding: 10,
    borderRadius: 16,
  },
  textoBotoes: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botoes: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  voltar: {
    marginTop: 15
  }
});

export default TelaVersiculosSalvos;