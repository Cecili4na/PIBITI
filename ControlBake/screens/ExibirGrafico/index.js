import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const GerarGrafico = () => {
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);

  const handleGenerateChart = async () => {
    try {
      const dateKey = selectedDate.toLocaleDateString();
      const data = await AsyncStorage.getItem(dateKey);
      if (data !== null) {
        const indicadores = JSON.parse(data);
        const temperatureValues = indicadores.map(indicador => parseFloat(indicador.temperature));
        const humidityValues = indicadores.map(indicador => parseFloat(indicador.humidity));
        const times = indicadores.map(indicador => indicador.time);
        setTemperatureData(temperatureValues);
        setHumidityData(humidityValues);
      } else {
        console.log('Nenhum dado encontrado para a data selecionada.');
      }
    } catch (error) {
      console.error('Erro ao obter os dados do AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>Selecionar Data: {selectedDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.redButton]} onPress={handleGenerateChart}>
        <Text style={styles.buttonText}>Gerar Gráfico</Text>
      </TouchableOpacity>
      <LineChart
        data={{
          labels: times,
          datasets: [
            {
              data: temperatureData,
              color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
              strokeWidth: 2,
            },
            {
              data: humidityData,
              color: (opacity = 1) => `rgba(135, 206, 250, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        }}
        width={400}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
          },
        }}
        bezier
      />
    </View>
  );
};

export default GerarGrafico;
