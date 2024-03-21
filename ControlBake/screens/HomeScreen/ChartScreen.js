import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ChartScreen = () => {
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"],
          datasets: [
            {
              data: [100, 125, 150, 175, 200, 225, 300],
            },
            {
              data: [120, 125, 200, 175, 120, 200, 120],
            },
          ],
        }}
        width={screenWidth} // Largura da tela
        height={400} // Altura do gráfico
        yAxisSuffix="°" // Sufixo do eixo Y
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Cor de fundo da tela
  },
});

export default ChartScreen;
