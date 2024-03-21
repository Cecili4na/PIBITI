import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import firebase from 'firebase'; // Importe o Firebase
import 'firebase/database'; // Importe o módulo de banco de dados do Firebase

const Indicadores = () => {
  const [indicadores, setIndicadores] = useState([]);

  // Função para carregar os indicadores salvos do banco de dados Firebase
  const carregarIndicadores = async () => {
    const db = firebase.database();
    const snapshot = await db.ref('indicadores').once('value');
    const data = snapshot.val();

    if (data) {
      const indicadoresArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      setIndicadores(indicadoresArray);
    } else {
      setIndicadores([]);
    }
  };

  useEffect(() => {
    // Carregue os indicadores salvos do banco de dados Firebase quando o componente for montado
    carregarIndicadores();
  }, []);

  // Função para renderizar cada item da lista de indicadores
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
      <Text>{item.day}/{item.month}/{item.year} {item.time}</Text>
      <Text>{item.temperature}°C</Text>
      <Text>{item.humidity}%</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={indicadores}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => <Text>Nenhum  encontrado</Text>}
      />
    </View>
  );
};

export default Indicadores;
