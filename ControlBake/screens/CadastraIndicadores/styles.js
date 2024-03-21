import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.1, // Utilizando uma porcentagem da largura da tela para o espaçamento horizontal
  },
  dateText: {
    marginBottom: height * 0.02, // Utilizando uma porcentagem da altura da tela para o espaçamento vertical
  },
  input: {
    marginBottom: height * 0.01, // Utilizando uma porcentagem da altura da tela para o espaçamento vertical
    paddingHorizontal: width * 0.05, // Utilizando uma porcentagem da largura da tela para o padding horizontal
    paddingVertical: height * 0.015, // Utilizando uma porcentagem da altura da tela para o padding vertical
    borderColor: 'gray',
    borderWidth: 1,
    width: width * 0.8, // Utilizando uma porcentagem da largura da tela para o tamanho do componente
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: width * 0.04, // Utilizando uma porcentagem da largura da tela para o padding do botão
    borderRadius: 5,
    marginTop: height * 0.03, // Utilizando uma porcentagem da altura da tela para o espaçamento vertical
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default styles;
