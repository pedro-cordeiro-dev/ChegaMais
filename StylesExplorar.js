import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  fundoRoxo: {
    position: 'absolute',
    width: '100%',
    height: 260,
    backgroundColor: 'purple',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  searchBox: {
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchInput: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },

carouselWrapper: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: 90, // sobe um pouco acima do menu
},



  card: {
    width: 320,
    height: 230,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },

  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },

  botaoNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFF',
  },

  navItem: {
    alignItems: 'center',
  },

  navText: {
    fontSize: 12,
    color: '#A9A9A9',
    marginTop: 4,
  },
});
