import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  titulo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitulo: {
    fontSize: 14,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },

  descricao: {
    fontSize: 14,
    color: "#CCC",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 20,
  },

  input: {
    width: '90%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },

  botaoLogin: {
    width: '90%',
    height: 50,
    backgroundColor: '#751a65',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },

  botaoLoginDesabilitado: {
    backgroundColor: '#555',
  },

  textoBotaoLogin: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  botaoVoltar: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    padding: 10,
  },

  botaoEsqueceuSenha: {
    marginTop: 10,
  },

  textoEsqueceuSenha: {
    color: "white",
    fontSize: 14,
    textDecorationLine: "underline",
  },

  containerRegistro: {
    flexDirection: 'row',
    marginTop: 20,
  },

  textoRegistro: {
    color: '#CCC',
    fontSize: 14,
  },

  linkRegistro: {
    color: '#00BFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
});

export default estilos;