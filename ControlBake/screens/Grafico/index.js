import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const GerarGrafico = () => {
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showZoneInput, setShowZoneInput] = useState(false);
  const [zoneInput, setZoneInput] = useState('');
  const [selectedZone, setSelectedZone] = useState(null);

  const handleGenerateChart = async () => {
    try {
      const dateKey = selectedDate.toLocaleDateString();
      const data = await AsyncStorage.getItem(dateKey);
      if (data !== null) {
        const indicadores = JSON.parse(data);
        const temperatureValues = indicadores.map(indicador => indicador.temperature);
        const humidityValues = indicadores.map(indicador => indicador.humidity);
        setTemperatureData(temperatureValues);
        setHumidityData(humidityValues);
      } else {
        console.log('Nenhum dado encontrado para a data selecionada.');
      }
    } catch (error) {
      console.error('Erro ao obter os dados do AsyncStorage:', error);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const handleSelectZone = () => {
    setShowZoneInput(true);
  };

  const handleConfirmZone = () => {
    setSelectedZone(zoneInput);
    setShowZoneInput(false);
    setZoneInput('');
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
      {selectedZone && (
        <TouchableOpacity style={[styles.button, styles.redButton]} onPress={() => setSelectedZone(null)}>
          <Text style={styles.buttonText}>Zona Selecionada: {selectedZone}</Text>
        </TouchableOpacity>
      )}
      {temperatureData.length > 0 && humidityData.length > 0 && (
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: ['1', '2', '3', '4', '5', '6', '7'],
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
      {!selectedZone && !showZoneInput && (
        <TouchableOpacity style={[styles.button, styles.redButton]} onPress={handleSelectZone}>
          <Text style={styles.buttonText}>Definir Zona</Text>
        </TouchableOpacity>
      )}
      {showZoneInput && (
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { backgroundColor: '#fff' }]}
            onChangeText={text => setZoneInput(text)}
            value={zoneInput}
            placeholder="Digite a Zona"
            keyboardType="numeric"
          />
          <TouchableOpacity style={[styles.button, styles.redButton]} onPress={handleConfirmZone}>
            <Text style={styles.buttonText}>Definir Zona</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={[styles.button, styles.redButton]} onPress={handleGenerateChart}>
        <Text style={styles.buttonText}>Gerar Gráfico</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.button, styles.redButton]}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GerarGrafico;
