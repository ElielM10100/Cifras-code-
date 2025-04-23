import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cadastro'>;

const Cadastro: React.FC = () => {
  const navigation = useNavigation<CadastroScreenNavigationProp>();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const handleCadastro = () => {
    // TODO: Implementar lógica de cadastro
    console.log('Cadastro:', { nome, email, senha, confirmarSenha });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color="#FFF" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.titulo}>Criar conta</Text>
        <Text style={styles.subtitulo}>
          Crie sua conta para salvar suas cifras favoritas e acessar recursos exclusivos
        </Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#666"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#666"
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setMostrarSenha(!mostrarSenha)}
            >
              <Icon
                name={mostrarSenha ? 'eye-off' : 'eye'}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              placeholderTextColor="#666"
              secureTextEntry={!mostrarConfirmarSenha}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
            >
              <Icon
                name={mostrarConfirmarSenha ? 'eye-off' : 'eye'}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.cadastroButton}
            onPress={handleCadastro}
          >
            <Text style={styles.cadastroButtonText}>Criar conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>
              Já tem uma conta? Faça login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222221',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
  },
  titulo: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    color: '#666',
    fontSize: 16,
    marginBottom: 40,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 15,
    color: '#FFF',
    fontSize: 16,
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  cadastroButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  cadastroButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#FF6B00',
    fontSize: 16,
  },
});

export default Cadastro; 