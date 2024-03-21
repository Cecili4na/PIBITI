import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import CadastraIndicadores from '../CadastraIndicadores/index.js';

const HomeScreen = () => {
  const navigation = useNavigation();
 
  const navigateToCadastrarIndicadores = () => {
    navigation.navigate(CadastraIndicadores);
  };

  const navigateToIndicadores = () => {
    navigation.navigate('Indicadores');
  };


  return (
    <View style={styles.container}>
      {/* Espaço para a logo */}
      {/* Substitua a URL da imagem pela URL da sua logo */}
      {/* <Image 
        source={{uri: 'coloque_aqui_o_link_da_sua_logo'}}
        style={styles.logo}
        resizeMode="contain"
      /> */}

      {/* Título "Painel de Controle" */}
      <Text style={styles.title}>Painel de Controle</Text>

      {/* Subtítulo "Fábrica de Biscoitos" */}
      <Text style={styles.subtitle}>Fábrica de Biscoitos</Text>

      {/* Botões */}
      <TouchableOpacity style={styles.button} onPress={navigateToCadastrarIndicadores}>
        <Text style={styles.buttonText}>Cadastrar indicadores</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToIndicadores}>
        <Text style={styles.buttonText}>Visualizar indicadores</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
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
