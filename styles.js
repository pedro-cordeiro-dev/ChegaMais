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
    backgroundColor: "#751a65",
    width: "80%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "white",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default styles;
