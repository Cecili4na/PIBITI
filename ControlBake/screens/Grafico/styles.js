import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#ffa726', // Cor padrão dos botões
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  redButton: {
    backgroundColor: '#d32f2f', // Cor vermelho escuro
  },
  buttonText: {
    color: '#fff', // Cor do texto dos botões
  },
  dateText: {
    marginBottom: 20,
    fontSize: 16,
  },
  chartContainer: {
    marginTop: 20,
  },
  zonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  selectedZone: {
    backgroundColor: '#d32f2f', // Cor vermelho escuro para a zona selecionada
  },
});

export default styles;
