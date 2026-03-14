import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedButton from "../components/ui/AnimatedButton";
import { Theme } from "../components/ui/Theme";
import CalmBackground from "../components/ui/CalmBackground";

export default function SelectMode() {
  const router = useRouter();

  return (
    <CalmBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Who's using the app?</Text>
          <Text style={styles.subtitle}>
            Select your profile to continue
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <AnimatedButton
            style={[styles.button, styles.childButton]}
            onPress={() => router.push("/child")}
            scaleValue={0.94}
          >
            <Ionicons name="happy" size={24} color={Theme.colors.textDark} style={styles.buttonIcon} />
            <Text style={[styles.buttonText, { color: Theme.colors.textDark }]}>Child Mode</Text>
          </AnimatedButton>

          <AnimatedButton
            style={[styles.button, styles.parentButton]}
            onPress={() => router.push("/parent")}
            scaleValue={0.94}
          >
            <Ionicons name="people" size={24} color={Theme.colors.textDark} style={styles.buttonIcon} />
            <Text style={[styles.buttonText, { color: Theme.colors.textDark }]}>Parent Mode</Text>
          </AnimatedButton>
        </View>
      </View>
    </CalmBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", 
    paddingVertical: 30,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 60,
  },
  title: {
    ...Theme.typography.h2,
    marginBottom: 10,
    textAlign: "center",
    color: '#2C3E50',
  },
  subtitle: {
    ...Theme.typography.bodyLarge,
    textAlign: "center",
    color: '#7F8C8D',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 32, // Added more spacing between buttons
  },
  button: {
    width: "90%",      
    maxWidth: 340,     
    height: 75, // Button height: around 75px
    borderRadius: 25, // Rounded corners: 25px
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderBottomWidth: 8,
    // Add soft shadow
    shadowColor: '#A0AAB2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  childButton: {
    backgroundColor: '#D4EDDA', // Pastel mint green
    borderColor: '#A8D5B5',
  },
  parentButton: {
    backgroundColor: '#FFF3CD', // Pastel warm yellow
    borderColor: '#FFE69C',
  },
  buttonIcon: {
    marginRight: 12,
  },
  buttonText: {
    ...Theme.typography.bodyLarge,
    fontWeight: '800',
  }
});