import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Theme } from "../components/ui/Theme";
import CalmBackground from "../components/ui/CalmBackground";
import AnimatedButton from "../components/ui/AnimatedButton";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function QuestionnaireResultsScreen() {
  const router = useRouter();
  const { score, total } = useLocalSearchParams<{ score: string; total: string }>();

  const numScore = parseInt(score || "0", 10);
  const maxScore = parseInt(total || "40", 10);
  const percentage = Math.round((numScore / maxScore) * 100);

  let riskLevel = "";
  let riskDescription = "";
  let recommendation = "";
  let iconName: keyof typeof Ionicons.glyphMap = "information-circle";
  let iconColor = Theme.colors.primary;
  let riskColor = Theme.colors.primary;

  if (percentage >= 67) {
    riskLevel = "High Risk";
    riskDescription =
      "Your responses indicate a significant number of behavioral traits commonly associated with autism spectrum disorder. This does not confirm a diagnosis, but warrants further professional evaluation.";
    recommendation =
      "We strongly recommend scheduling an appointment with a pediatric developmental specialist or child psychologist for a comprehensive assessment.";
    iconName = "alert-circle";
    iconColor = "#E74C3C";
    riskColor = "#E74C3C";
  } else if (percentage >= 34) {
    riskLevel = "Moderate Risk";
    riskDescription =
      "Your responses suggest some behavioral patterns that may be associated with autism spectrum traits. These observations are worth monitoring and discussing with a professional.";
    recommendation =
      "Consider consulting with your child's pediatrician or a developmental specialist to discuss these observations in more detail.";
    iconName = "help-circle";
    iconColor = "#E67E22";
    riskColor = "#E67E22";
  } else {
    riskLevel = "Low Risk";
    riskDescription =
      "Your responses suggest fewer behavioral traits typically associated with autism spectrum disorder. However, every child develops differently, and continued observation is always encouraged.";
    recommendation = "";
    iconName = "checkmark-circle";
    iconColor = "#27AE60";
    riskColor = "#27AE60";
  }

  return (
    <CalmBackground>
      <Stack.Screen options={{ title: "Screening Results" }} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Results Card */}
        <View style={styles.card}>
          <Ionicons name={iconName} size={64} color={iconColor} style={styles.icon} />

          {/* Score Ring */}
          <View style={[styles.scoreRing, { borderColor: riskColor }]}>
            <Text style={[styles.scoreNumber, { color: riskColor }]}>{numScore}</Text>
            <Text style={styles.scoreMax}>/ {maxScore}</Text>
          </View>

          {/* Risk Level Badge */}
          <View style={[styles.riskBadge, { backgroundColor: `${riskColor}15` }]}>
            <Text style={[styles.riskBadgeText, { color: riskColor }]}>{riskLevel}</Text>
          </View>

          <Text style={styles.resultDescription}>{riskDescription}</Text>

          {recommendation.length > 0 && (
            <View style={[styles.recommendationBox, { borderLeftColor: riskColor }]}>
              <Ionicons name="medkit-outline" size={20} color={riskColor} style={{ marginRight: 10, marginTop: 2 }} />
              <Text style={styles.recommendationText}>{recommendation}</Text>
            </View>
          )}

          {/* Score Breakdown */}
          <View style={styles.breakdownContainer}>
            <Text style={styles.breakdownTitle}>Score Breakdown</Text>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Your Score</Text>
              <Text style={[styles.breakdownValue, { color: riskColor }]}>{numScore}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Maximum Possible</Text>
              <Text style={styles.breakdownValue}>{maxScore}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Risk Percentage</Text>
              <Text style={[styles.breakdownValue, { color: riskColor }]}>{percentage}%</Text>
            </View>
          </View>

          {/* Disclaimer */}
          <View style={styles.disclaimerBox}>
            <Ionicons name="shield-checkmark-outline" size={18} color="#95A5A6" style={{ marginRight: 8, marginTop: 1 }} />
            <Text style={styles.disclaimerText}>
              This screening is not a medical diagnosis. It is intended to help organize your observations when consulting a qualified professional for clinical evaluation.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        {percentage >= 34 && (
          <AnimatedButton
            style={[styles.actionButton, { backgroundColor: riskColor }]}
            onPress={() => router.navigate("/experts")}
            scaleValue={0.96}
          >
            <Ionicons name="medkit" size={20} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.actionButtonText}>Consult an Expert</Text>
          </AnimatedButton>
        )}

        <AnimatedButton
          style={[styles.actionButton, { backgroundColor: Theme.colors.primary }]}
          onPress={() => router.navigate("/parent")}
          scaleValue={0.96}
        >
          <Ionicons name="home" size={20} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.actionButtonText}>Return to Dashboard</Text>
        </AnimatedButton>

        <AnimatedButton
          style={styles.retakeButton}
          onPress={() => router.replace("/questionnaire")}
          scaleValue={0.96}
        >
          <Ionicons name="refresh" size={18} color="#7F8C8D" style={{ marginRight: 8 }} />
          <Text style={styles.retakeButtonText}>Retake Screening</Text>
        </AnimatedButton>
      </ScrollView>
    </CalmBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: Theme.colors.cardBackground,
    borderRadius: Theme.borderRadius.lg,
    padding: 28,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    ...Theme.shadows.medium,
    marginBottom: 24,
  },
  icon: {
    marginBottom: 16,
  },
  scoreRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  scoreNumber: {
    fontSize: 32,
    fontWeight: "900",
  },
  scoreMax: {
    ...Theme.typography.bodySmall,
    color: "#95A5A6",
    fontWeight: "600",
  },
  riskBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 18,
  },
  riskBadgeText: {
    fontWeight: "800",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  resultDescription: {
    ...Theme.typography.body,
    color: "#5D6D7E",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 20,
  },
  recommendationBox: {
    flexDirection: "row",
    backgroundColor: "#FFF9F0",
    borderLeftWidth: 4,
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    width: "100%",
  },
  recommendationText: {
    ...Theme.typography.bodySmall,
    flex: 1,
    color: "#6E4B2C",
    lineHeight: 20,
    fontWeight: "500",
  },
  breakdownContainer: {
    width: "100%",
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  breakdownTitle: {
    ...Theme.typography.bodySmall,
    fontWeight: "700",
    color: "#95A5A6",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  breakdownLabel: {
    ...Theme.typography.body,
    color: "#7F8C8D",
  },
  breakdownValue: {
    ...Theme.typography.body,
    fontWeight: "700",
    color: "#2C3E50",
  },
  disclaimerBox: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    padding: 14,
    borderRadius: 12,
    width: "100%",
  },
  disclaimerText: {
    ...Theme.typography.bodySmall,
    color: "#95A5A6",
    flex: 1,
    fontStyle: "italic",
    lineHeight: 18,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    paddingVertical: 16,
    width: "100%",
    marginBottom: 12,
    ...Theme.shadows.soft,
  },
  actionButtonText: {
    ...Theme.typography.body,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  retakeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
    width: "100%",
  },
  retakeButtonText: {
    ...Theme.typography.body,
    fontWeight: "600",
    color: "#7F8C8D",
  },
});
