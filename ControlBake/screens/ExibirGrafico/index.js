import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styles from './styles'; // Importe os estilos

const ExibirGrafico = ({ route }) => {
  const { dataTitle, temperatureData, humidityData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{dataTitle}</Text>
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
            stroke: '#ffa726',
          },
        }}
        bezier
      />
    </View>
  );
};

export default ExibirGrafico;
