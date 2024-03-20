import React from 'react';
import { View, Text, Image } from 'react-native';

const HomeScreen = () => {
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
    </View>
  );
};

export default HomeScreen;
