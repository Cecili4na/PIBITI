const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Alinha todo o conteúdo no início do contêiner
    alignItems: 'center',
    backgroundColor: '#000', // Fundo preto
  },
  logo: {
    width: 150, // Largura da logo
    height: 150, // Altura da logo
    marginBottom: 5, // Espaço abaixo da logo
    marginTop: 40, // Espaço acima da logo
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,

    textAlign: 'center', // centraliza o texto
    color: '#fff', // Cor do texto branca
  },
  subtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center', // centraliza o texto
    color: '#fff', // Cor do texto branca
  },
  button: {
    backgroundColor: '#f0f0f0', // Cor do botão (cinza claro)
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    width: 250, // Largura do botão
    height: 40, // Altura do botão
    justifyContent: 'center', // Centraliza verticalmente o texto
    alignItems: 'center', // Centraliza horizontalmente o texto
  },
  buttonText: {
    color: '#000', // Cor do texto do botão (preta)
    fontSize: 16,
  },
};

export default styles;
