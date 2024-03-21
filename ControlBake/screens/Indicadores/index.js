import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Importar o useNavigation


const salvarIndicadores = async (indicadores) => {
  try {
    await AsyncStorage.setItem('indicadores', JSON.stringify(indicadores));
    console.log('Indicadores salvos com sucesso no AsyncStorage.');
  } catch (error) {
    console.error('Erro ao salvar os indicadores no AsyncStorage:', error);
  }
};


const carregarIndicadores = async (setIndicadores) => {
  try {
    const keys = await AsyncStorage.getAllKeys(); // Obter todas as chaves do AsyncStorage
    const indicadoresKeys = keys.filter(key => key.startsWith('indicadores_')); // Filtrar as chaves dos indicadores
    const indicadores = await AsyncStorage.multiGet(indicadoresKeys); // Obter os valores correspondentes às chaves dos indicadores
    const parsedIndicadores = indicadores.map(([key, value]) => JSON.parse(value)); // Fazer o parsing dos valores JSON
    setIndicadores(parsedIndicadores);
  } catch (error) {
    console.error('Erro ao carregar os indicadores:', error.message);
  }
};


const Indicadores = () => {
  const [indicadores, setIndicadores] = useState([]);
  const navigation = useNavigation(); // Obter o objeto de navegação

  useEffect(() => {
    // Carregar os indicadores salvos do AsyncStorage quando o componente for montado
    carregarIndicadores(setIndicadores);
  }, []);

  useEffect(() => {
    salvarIndicadores(indicadores);
  }, [indicadores]);

  // Função para navegar para a página de Gráfico
  const handleNavigateToGraph = (selectedIndicadores) => {
    navigation.navigate('Grafico', { indicadores: selectedIndicadores }); // Passar os dados dos indicadores como parâmetro
  };

  // Função para renderizar cada item da lista de indicadores
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleNavigateToGraph(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Text style={styles.label}>Dia:</Text>
          <Text style={styles.value}>{String(item.day)}/{String(item.month)}/{String(item.year)}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Horário:</Text>
          <Text style={styles.value}>{String(item.time)}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Temperatura:</Text>
          <Text style={styles.value}>{String(item.temperature)}°C</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Umidade:</Text>
          <Text style={styles.value}>{String(item.humidity)}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <FlatList
        data={indicadores}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Usar o índice como chave única
        contentContainerStyle={{ flexGrow: 1 }} // Adicionado para garantir que o conteúdo seja expandido para preencher a tela
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum registro encontrado</Text>
          </View>
        )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default Indicadores;
