import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NeuroNest</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Child Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Parent Mode</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#4DA6FF",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    width: 200,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});