import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from "../ControlBake/screens/HomeScreen/index";
import CadastraIndicadores from '../ControlBake/screens/CadastraIndicadores/index';
import Indicadores from '../ControlBake/screens/Indicadores/index';
import Grafico from '../ControlBake/screens/Grafico/index'; // Importe a tela Grafico

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerTitle: "", headerTransparent: true, headerShown: false }}
        />
        <Stack.Screen
          name="CadastraIndicadores"
          component={CadastraIndicadores}
          options={{ headerTitle: "", headerTransparent: true, headerShown: false }}
        />
        <Stack.Screen
          name="Indicadores"
          component={Indicadores}
          options={{ headerTitle: "", headerTransparent: true, headerShown: false }}
        />
        <Stack.Screen
          name="Grafico"
          component={Grafico} // Adicione a tela Grafico ao Stack.Navigator
          options={{ headerTitle: "", headerTransparent: true, headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
