import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
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
  loginButton: { 
    width: '90%',
    height: 50,
    backgroundColor: '#8A2BE2', 
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
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: "white",
    fontSize: 14,
    textDecorationLine: "underline",
    marginTop: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    color: '#CCC',
    fontSize: 14,
  },
  registerLink: {
    color: '#00BFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline', 
    marginLeft: 5,
  },
});

export default styles;