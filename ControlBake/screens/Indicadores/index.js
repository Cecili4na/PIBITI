import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Indicadores = () => {
  const [indicadores, setIndicadores] = useState([]);

  // Função para carregar os indicadores salvos do AsyncStorage
  const carregarIndicadores = async () => {
    try {
      const data = await AsyncStorage.getItem('indicadores');
      if (data !== null) {
        setIndicadores(JSON.parse(data));
      } else {
        setIndicadores([]);
      }
    } catch (error) {
      console.error('Erro ao carregar os indicadores:', error);
    }
  };

  useEffect(() => {
    // Carregar os indicadores salvos do AsyncStorage quando o componente for montado
    carregarIndicadores();
  }, []);

  // Função para renderizar cada item da lista de indicadores
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <Text style={styles.label}>Dia:</Text>
        <Text style={styles.value}>{item.day}/{item.month}/{item.year}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Horário:</Text>
        <Text style={styles.value}>{item.time}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Temperatura:</Text>
        <Text style={styles.value}>{item.temperature}°C</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Umidade:</Text>
        <Text style={styles.value}>{item.humidity}%</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={indicadores}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Usar o índice como chave única
        ListEmptyComponent={() => <Text style={styles.emptyText}>Nenhum registro encontrado</Text>}
        contentContainerStyle={styles.listContainer} // Estilo para o contêiner de lista
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  listContainer: {
    paddingTop: 20, // Adiciona espaço no topo da lista
    paddingHorizontal: 10, // Adiciona espaço horizontal
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#800000', // Cor vermelha para a borda
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%', // Largura total
    overflow: 'hidden', // Evita que os dados ultrapassem a linha
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
    maxWidth: '60%', // Define a largura máxima para evitar que os dados ultrapassem a linha
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default Indicadores;
