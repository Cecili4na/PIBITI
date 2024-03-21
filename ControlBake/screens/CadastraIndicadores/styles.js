import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  dateText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#d3d3d3',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#000', // Alterada para preto
    fontSize: 16,
  },
  button: {
    width: '50%',
    height: 20,
    backgroundColor: '#d32f2f',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#000', // Alterada para preto
    fontSize: 14,
  },
});

export default styles;
