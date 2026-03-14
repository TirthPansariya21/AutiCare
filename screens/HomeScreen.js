import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NeuroNest</Text>

      <Text style={styles.subtitle}>
        Supporting autistic children and empowering parents.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Parent")}
      >
        <Text style={styles.buttonText}>👨‍👩‍👧 Parent Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ChildBoard")}
      >
        <Text style={styles.buttonText}>🧒 Child Mode</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAF7FF"
  },
  title: {
    fontSize: 40,
    fontWeight: "bold"
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    margin: 20
  },
  button: {
    backgroundColor: "#A8E6CF",
    padding: 20,
    margin: 10,
    width: "80%",
    borderRadius: 10
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center"
  }
});