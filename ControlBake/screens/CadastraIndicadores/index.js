import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from 'firebase'; // Importe o Firebase
import 'firebase/database'; // Importe o módulo de banco de dados do Firebase
import styles from './styles';

// Inicialize o Firebase com as configurações do seu projeto
firebase.initializeApp({
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMÍNIO.firebaseapp.com",
  databaseURL: "https://SEU_DOMÍNIO.firebaseio.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
});

const CadastraIndicadores = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    const db = firebase.database();
    const newRecord = {
      day: selectedDate.getDate(),
      month: selectedDate.getMonth() + 1,
      year: selectedDate.getFullYear(),
      time: `${selectedDate.getHours()}:${selectedDate.getMinutes()}`,
      temperature: temperature,
      humidity: humidity,
    };

    // Salve o novo registro no banco de dados
    db.ref('indicadores').push(newRecord)
      .then(() => {
        console.log('Registro salvo com sucesso:', newRecord);
        // Limpe os campos após salvar
        setSelectedDate(new Date());
        setTemperature('');
        setHumidity('');
      })
      .catch(error => {
        console.error('Erro ao salvar o registro:', error);
      });
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
        <Text style={styles.dateText}>Selecionar Data e Hora: {selectedDate.toLocaleString()}</Text>
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
        placeholder="Temperatura (°C)"
        value={temperature}
        onChangeText={setTemperature}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Umidade (%)"
        value={humidity}
        onChangeText={setHumidity}
        keyboardType="numeric"
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default CadastraIndicadores;
