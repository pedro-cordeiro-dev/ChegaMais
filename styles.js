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

    containerAvaliacao: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  cabecalhoAvaliacao: {
    backgroundColor: '#751a65',
    height: 80,
    paddingTop: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tituloAvaliacao: {
    color: 'white',
    fontSize: 18,
  },

  cartaoAvaliacao: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },

  topoCartaoAvaliacao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  localAvaliacao: {
    fontSize: 16,
    color: '#222',
  },

  dataAvaliacao: {
    fontSize: 12,
    color: '#888',
  },

  comentarioAvaliacao: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  estrelasAvaliacao: {
    flexDirection: 'row',
  },

  campoBusca: {
    paddingHorizontal: 16,
    marginVertical: 10,
  },

  entradaBusca: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 40,
    fontSize: 14,
  },
  
  caixaFiltros: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  tituloFiltros: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },

  containerBotoesFiltro: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  botaoFiltro: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },

  botaoFiltroAtivo: {
    backgroundColor: '#a33b91',
  },

  textoFiltro: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },

  mensagemVazia: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 32,
  },
  
});

export default estilos;