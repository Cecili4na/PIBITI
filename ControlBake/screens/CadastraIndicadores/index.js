import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const CadastraIndicadores = () => {
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [zona, setZona] = useState('');

  const handleSave = async () => {
    try {
      const newRecord = {
        day: selectedDate.getDate(),
        month: selectedDate.getMonth() + 1,
        year: selectedDate.getFullYear(),
        time: `${selectedDate.getHours()}:${selectedDate.getMinutes()}`,
        temperature: temperature,
        humidity: humidity,
      };

      const existingRecords = await AsyncStorage.getItem('indicadores');
      const existingRecordsArray = existingRecords ? JSON.parse(existingRecords) : [];

      existingRecordsArray.push(newRecord);

      await AsyncStorage.setItem('indicadores', JSON.stringify(existingRecordsArray));

      console.log('Registro salvo com sucesso:', newRecord);

      setSelectedDate(new Date());
      setTemperature('');
      setHumidity('');
    } catch (error) {
      console.error('Erro ao salvar o registro:', error);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}
    >
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={[styles.dateText, { marginBottom: 20 }]}>Selecionar Data e Hora: {selectedDate.toLocaleString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="datetime"
          display="default"
          onChange={onDateChange}
        />
      )}
      <TextInput
        placeholder="Digite a Zona"
        value={zona}
        onChangeText={setZona}
        keyboardType="numeric"
        style={[styles.input, { color: 'black' }]}
      />
      <TouchableOpacity
        style={[styles.button, styles.definirButton]}
        onPress={() => setZona(`Zona ${zona}`)}
      >
        <Text style={styles.buttonText}>Definir Zona</Text>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
      <TextInput
        placeholder="Temperatura (°C)"
        value={temperature}
        onChangeText={setTemperature}
        keyboardType="numeric"
        style={[styles.input, { color: 'black' }]}
      />
      <TextInput
        placeholder="Umidade (%)"
        value={humidity}
        onChangeText={setHumidity}
        keyboardType="numeric"
        style={[styles.input, { color: 'black' }]}
      />
      <TouchableOpacity
        style={[styles.button, styles.saveButton, { marginBottom: 20 }]}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.voltarButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default CadastraIndicadores;
