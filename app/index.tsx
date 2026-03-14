import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Nunito_800ExtraBold } from "@expo-google-fonts/nunito";
import AnimatedButton from "../components/ui/AnimatedButton";
import { Theme } from "../components/ui/Theme";
import CalmBackground from "../components/ui/CalmBackground";
import AbstractPuzzleCross from "../components/ui/AbstractPuzzleCross";

export default function Welcome() {
  const router = useRouter();
  
  const [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null; // Return nothing while fonts load
  }

  return (
    <CalmBackground>
      <View style={styles.content}>
        <View style={styles.header}>
          <AbstractPuzzleCross />
          <Text style={styles.title}>AutiCare</Text>
        </View>

        <View style={styles.bottomSection}>
          <AnimatedButton
            style={styles.buttonWrapper}
            onPress={() => router.push("/select")}
            scaleValue={1.05} // Gentle scale UP on hover/press
          >
            <LinearGradient
              colors={['#A2D2FF', '#E0F2F1']} // Light Blue to Mint Green
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
            </LinearGradient>
          </AnimatedButton>
          <Text style={styles.caption}>
            Built with care for autistic children and their families.
          </Text>
        </View>
      </View>
    </CalmBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingHorizontal: 25,
    zIndex: 1, 
  },
  header: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    ...Theme.typography.h1,
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 62, // Increased by ~30% from 48
    marginBottom: 16,
    textAlign: "center",
    color: '#34495E',
    letterSpacing: 0.8,
    textShadowColor: 'rgba(162, 210, 255, 0.65)', // Very subtle, calming pastel blue glow/shadow
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonWrapper: {
    width: "90%",
    maxWidth: 340,
    height: 80, // Increased padding
    borderRadius: 50, // More rounded corners
    marginBottom: 16,
    shadowColor: '#A2D2FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  gradientButton: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  buttonText: {
    ...Theme.typography.h3,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  caption: {
    ...Theme.typography.bodySmall,
    color: '#95A5A6', // Soft grey font
    textAlign: "center",
    marginTop: 8,
    fontWeight: '500',
    paddingHorizontal: 20,
  }
});
