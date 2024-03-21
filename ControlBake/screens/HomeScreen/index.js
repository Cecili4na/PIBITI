import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const HomeScreen = () => {
  const navigation = useNavigation();
 
  const navigateToCadastrarIndicadores = () => {
    navigation.navigate('CadastraIndicadores');
  };

  const navigateToIndicadores = () => {
    navigation.navigate('Indicadores');
  };

  const navigateToGrafico = () => {
    navigation.navigate('Grafico');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Painel de Controle</Text>
      <Text style={styles.subtitle}>Fábrica de Biscoitos</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToCadastrarIndicadores}>
        <Text style={styles.buttonText}>Cadastrar indicadores</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToIndicadores}>
        <Text style={styles.buttonText}>Visualizar indicadores</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToGrafico}>
        <Text style={styles.buttonText}>Gerar gráfico</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Gerar Relatórios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
