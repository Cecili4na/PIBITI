import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Grafico = () => {
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleGenerateChart = async () => {
    try {
      const dateKey = selectedDate.toLocaleDateString();
      console.log('Date Key:', dateKey); // Adiciona log para verificar a chave de data
      const data = await AsyncStorage.getAllKeys();
      const indicadores = await AsyncStorage.multiGet(data.filter(key => key.startsWith('indicadores_')));
      console.log('Indicadores:', indicadores); // Adiciona log para verificar os indicadores obtidos
      const temperatureValues = indicadores.map(([key, value]) => JSON.parse(value).temperature);
      const humidityValues = indicadores.map(([key, value]) => JSON.parse(value).humidity);
      console.log('Temperature Data:', temperatureValues); // Adiciona log para verificar os dados de temperatura
      console.log('Humidity Data:', humidityValues); // Adiciona log para verificar os dados de umidade
      setTemperatureData(temperatureValues);
      setHumidityData(humidityValues);
    } catch (error) {
      console.error('Erro ao obter os dados do AsyncStorage:', error);
    }
  };
  

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>Selecionar Data: {selectedDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      {temperatureData.length > 0 && humidityData.length > 0 && (
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
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
      )}
      <TouchableOpacity style={styles.button} onPress={handleGenerateChart}>
        <Text style={styles.buttonText}>Gerar Gráfico</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Grafico;
