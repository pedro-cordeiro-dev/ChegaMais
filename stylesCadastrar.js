import { StyleSheet, Platform } from 'react-native';
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  kav: {
    flex: 1, 
  },
  container: {
    flex: 1, 
  },
  headerBackground: {
    paddingTop: Platform.OS === 'ios' ? 20 : 30, 
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25, 
    borderBottomRightRadius: 25, 
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    padding: 20,
  },

  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 15,
    backgroundColor: '#F0F4F7',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  icon: {
    color: '#888',
  },
  label: {
    color: '#9A9A9A',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F0F4F7',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
  },
  inputGroup: {
    flex: 1,
    marginRight: 10,
  },
  inputGroupSmall: {
    width: '30%',
  },
  pickerContainer: {
    backgroundColor: '#F0F4F7',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeInput: {
    flex: 1,
    textAlign: 'center',
  },
  timeSeparator: {
    color: '#9A9A9A',
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  diasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  diaButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diaButtonSelected: {
    backgroundColor: '#09091A',
  },
  diaText: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 16,
  },
  diaSelecionado: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#09091A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  botaoNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 8, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#A9A9A9',
    marginTop: 2,
  },
});

export default styles;