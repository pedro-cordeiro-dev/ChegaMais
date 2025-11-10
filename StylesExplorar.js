import { StyleSheet, Dimensions } from 'react-native';

// Pega a largura da tela para os cálculos de estilo
const { width } = Dimensions.get('window');

// === ESTILOS ESPECÍFICOS PARA A TELA EXPLORAR ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fundo branco como pedido
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  addButton: {
    marginLeft: 10,
    padding: 5,
  },
  carouselContainer: {
    flex: 1, // Ocupa o espaço restante
    justifyContent: 'center',
    // O alinhamento 'center' é bom se o carrossel for a única coisa
  },
  lazerCard: {
    width: width * 0.85, // Card ocupa 85% da largura da tela
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginHorizontal: 10, // Espaçamento entre os cards
    // Sombra (para Android)
    elevation: 8,
    // Sombra (para iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  lazerImage: {
    width: '100%',
    height: 200, // Altura da imagem
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  newTag: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(46, 204, 113, 0.9)', // Um verde bonito, como no protótipo
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 7,
  },
  newTagText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  lazerInfoContainer: {
    padding: 15,
  },
  lazerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusOpen: {
    color: '#2ECC71', // Verde
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusClosed: {
    color: '#E74C3C', // Vermelho
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusTime: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  infoText: {
    marginLeft: 10,
    color: '#555',
    fontSize: 14,
    flexShrink: 1, // Garante que o texto quebre se for muito longo
  },
  comoChegarButton: {
    backgroundColor: '#4B0082', // Roxo principal do app
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  comoChegarButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default styles;