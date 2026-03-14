import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated } from "react-native";
import { Theme } from "../components/ui/Theme";
import CalmBackground from "../components/ui/CalmBackground";
import AnimatedButton from "../components/ui/AnimatedButton";
import { Stack, useRouter } from "expo-router";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// ──────────────────────────────────────────────────
// M-CHAT-inspired behavioral observation questions
// ──────────────────────────────────────────────────

interface Question {
  id: number;
  text: string;
  domain: string;
}

const QUESTIONS: Question[] = [
  { id: 1, domain: "Social Attention", text: "When you call your child's name, how often do they respond by turning toward you?" },
  { id: 2, domain: "Eye Contact", text: "How often does your child make eye contact during interactions with you or others?" },
  { id: 3, domain: "Joint Attention", text: "Does your child point at objects to show interest or to share experiences with you?" },
  { id: 4, domain: "Repetitive Behaviors", text: "How often does your child engage in repetitive movements such as hand flapping, rocking, or spinning?" },
  { id: 5, domain: "Imitation", text: "Does your child imitate actions like clapping, waving, or copying sounds you make?" },
  { id: 6, domain: "Sensory Processing", text: "How comfortable is your child in noisy or crowded environments?" },
  { id: 7, domain: "Social Play", text: "Does your child show interest in playing with other children of similar age?" },
  { id: 8, domain: "Emotional Reciprocity", text: "When you smile at your child, how often do they smile back at you?" },
  { id: 9, domain: "Communication", text: "Does your child use gestures, words, or expressions to communicate their needs?" },
  { id: 10, domain: "Routine Flexibility", text: "How does your child react to unexpected changes in their daily routine?" },
];

// ──────────────────────────────────────────────────
// Answer options with weighted scores
// Higher score = higher risk indicator
// ──────────────────────────────────────────────────

interface AnswerOption {
  label: string;
  score: number;
}

const ANSWER_OPTIONS: AnswerOption[] = [
  { label: "Never", score: 4 },
  { label: "Rarely", score: 3 },
  { label: "Sometimes", score: 2 },
  { label: "Often", score: 1 },
  { label: "Always", score: 0 },
];

const OPTION_COLORS = ["#E74C3C", "#E67E22", "#F1C40F", "#2ECC71", "#27AE60"];
const OPTION_BG_SELECTED = ["#FDEDEC", "#FEF5E7", "#FEF9E7", "#EAFAF1", "#E8F8F5"];

export default function AutismRiskScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // questionId → score
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const totalQuestions = QUESTIONS.length;
  const isComplete = currentIndex >= totalQuestions; // past the last question → media/submit screen

  // Animate progress bar
  const animateProgress = (toIndex: number) => {
    Animated.timing(progressAnim, {
      toValue: toIndex / totalQuestions,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleSelectAnswer = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const handleNext = () => {
    if (answers[QUESTIONS[currentIndex].id] === undefined) return;
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    animateProgress(nextIndex);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      animateProgress(prevIndex);
    }
  };

  const handlePickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      quality: 0.7,
    });
    if (!result.canceled && result.assets.length > 0) {
      setSelectedMedia(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    let totalScore = 0;
    Object.values(answers).forEach(s => { totalScore += s; });
    const maxScore = totalQuestions * 4;

    router.push({
      pathname: "/questionnaire-results",
      params: { score: totalScore, total: maxScore },
    });
  };

  const currentQuestion = currentIndex < totalQuestions ? QUESTIONS[currentIndex] : null;
  const currentAnswered = currentQuestion ? answers[currentQuestion.id] !== undefined : false;
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <CalmBackground>
      <Stack.Screen options={{ title: "Autism Risk Screening" }} />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Disclaimer */}
        <View style={styles.disclaimerBox}>
          <Ionicons name="information-circle-outline" size={22} color="#856404" style={{ marginRight: 10, marginTop: 2 }} />
          <Text style={styles.disclaimerText}>
            This screening is not a medical diagnosis. Please consult a qualified professional for clinical evaluation.
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>
            {isComplete ? "Review & Submit" : `Question ${currentIndex + 1} of ${totalQuestions}`}
          </Text>
          <View style={styles.progressBarBg}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth as any }]} />
          </View>
        </View>

        {/* Question Card (one at a time) */}
        {currentQuestion ? (
          <View style={styles.questionCard}>
            <View style={styles.domainBadge}>
              <Text style={styles.domainText}>{currentQuestion.domain}</Text>
            </View>
            <Text style={styles.questionText}>{currentQuestion.text}</Text>

            <View style={styles.optionsContainer}>
              {ANSWER_OPTIONS.map((opt, i) => {
                const isSelected = answers[currentQuestion.id] === opt.score;
                return (
                  <TouchableOpacity
                    key={opt.label}
                    style={[
                      styles.optionButton,
                      isSelected && { backgroundColor: OPTION_BG_SELECTED[i], borderColor: OPTION_COLORS[i] },
                    ]}
                    onPress={() => handleSelectAnswer(currentQuestion.id, opt.score)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.optionDot, isSelected && { backgroundColor: OPTION_COLORS[i] }]} />
                    <Text style={[styles.optionText, isSelected && { color: OPTION_COLORS[i], fontWeight: "700" }]}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Navigation Buttons */}
            <View style={styles.navRow}>
              {currentIndex > 0 && (
                <AnimatedButton style={styles.backBtn} onPress={handleBack} scaleValue={0.96}>
                  <Ionicons name="arrow-back" size={18} color="#7F8C8D" />
                  <Text style={styles.backBtnText}>Back</Text>
                </AnimatedButton>
              )}
              <View style={{ flex: 1 }} />
              <AnimatedButton
                style={[styles.nextBtn, !currentAnswered && styles.nextBtnDisabled]}
                onPress={handleNext}
                scaleValue={0.96}
                disabled={!currentAnswered}
              >
                <Text style={styles.nextBtnText}>Next</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFF" />
              </AnimatedButton>
            </View>
          </View>
        ) : (
          /* ─── Completion / Media Upload Screen ─── */
          <View style={styles.questionCard}>
            <Ionicons name="checkmark-circle" size={48} color="#27AE60" style={{ alignSelf: "center", marginBottom: 16 }} />
            <Text style={styles.completeTitle}>All questions answered!</Text>
            <Text style={styles.completeSubtitle}>
              You can optionally upload a short video or photo of your child during play to assist future AI analysis.
            </Text>

            <AnimatedButton style={styles.uploadBtn} onPress={handlePickMedia} scaleValue={0.96}>
              <Ionicons name="cloud-upload-outline" size={22} color={Theme.colors.primary} />
              <Text style={styles.uploadBtnText}>
                {selectedMedia ? "Media Selected ✓" : "Upload Photo / Video (Optional)"}
              </Text>
            </AnimatedButton>

            {selectedMedia && (
              <View style={styles.futureAiBox}>
                <Ionicons name="sparkles" size={18} color="#8E44AD" style={{ marginRight: 8 }} />
                <Text style={styles.futureAiText}>Future AI analysis will evaluate behavioral cues.</Text>
              </View>
            )}

            {/* Navigation */}
            <View style={styles.navRow}>
              <AnimatedButton style={styles.backBtn} onPress={handleBack} scaleValue={0.96}>
                <Ionicons name="arrow-back" size={18} color="#7F8C8D" />
                <Text style={styles.backBtnText}>Back</Text>
              </AnimatedButton>
              <View style={{ flex: 1 }} />
              <AnimatedButton style={styles.submitButton} onPress={handleSubmit} scaleValue={0.96}>
                <Text style={styles.submitButtonText}>Submit Screening</Text>
              </AnimatedButton>
            </View>
          </View>
        )}
      </ScrollView>
    </CalmBackground>
  );
}

// ──────────────────────── Styles ────────────────────────

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 100,
  },
  disclaimerBox: {
    backgroundColor: "#FFF3CD",
    borderColor: "#FFEED8",
    borderWidth: 1,
    borderRadius: Theme.borderRadius.lg,
    padding: 14,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    ...Theme.shadows.soft,
  },
  disclaimerText: {
    ...Theme.typography.bodySmall,
    flex: 1,
    color: "#856404",
    lineHeight: 20,
  },

  // Progress
  progressSection: {
    marginBottom: 20,
  },
  progressLabel: {
    ...Theme.typography.bodySmall,
    fontWeight: "700",
    color: "#7F8C8D",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Theme.colors.primary,
    borderRadius: 4,
  },

  // Question Card
  questionCard: {
    backgroundColor: Theme.colors.cardBackground,
    borderRadius: Theme.borderRadius.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    ...Theme.shadows.medium,
  },
  domainBadge: {
    alignSelf: "flex-start",
    backgroundColor: `${Theme.colors.primary}15`,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  domainText: {
    ...Theme.typography.bodySmall,
    fontWeight: "700",
    color: Theme.colors.primary,
    textTransform: "uppercase",
    fontSize: 11,
    letterSpacing: 0.5,
  },
  questionText: {
    ...Theme.typography.bodyLarge,
    fontWeight: "600",
    color: "#2C3E50",
    fontSize: 17,
    marginBottom: 16,
    lineHeight: 24,
  },

  // Options
  optionsContainer: {
    gap: 8,
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
  },
  optionDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    backgroundColor: "transparent",
    marginRight: 14,
  },
  optionText: {
    ...Theme.typography.body,
    fontWeight: "600",
    color: "#475569",
  },

  // Navigation
  navRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    gap: 6,
  },
  backBtnText: {
    ...Theme.typography.body,
    fontWeight: "600",
    color: "#7F8C8D",
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
    backgroundColor: Theme.colors.primary,
    gap: 6,
    ...Theme.shadows.soft,
  },
  nextBtnDisabled: {
    backgroundColor: "#BDC3C7",
    opacity: 0.7,
  },
  nextBtnText: {
    ...Theme.typography.body,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  // Completion
  completeTitle: {
    ...Theme.typography.h3,
    textAlign: "center",
    color: "#2C3E50",
    marginBottom: 8,
  },
  completeSubtitle: {
    ...Theme.typography.body,
    textAlign: "center",
    color: "#7F8C8D",
    lineHeight: 22,
    marginBottom: 24,
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    borderStyle: "dashed",
    backgroundColor: `${Theme.colors.primary}08`,
    gap: 10,
    marginBottom: 12,
  },
  uploadBtnText: {
    ...Theme.typography.body,
    fontWeight: "600",
    color: Theme.colors.primary,
  },
  futureAiBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5EEF8",
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  futureAiText: {
    ...Theme.typography.bodySmall,
    flex: 1,
    color: "#8E44AD",
    fontStyle: "italic",
  },

  // Submit
  submitButton: {
    backgroundColor: Theme.colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: "center",
    ...Theme.shadows.medium,
  },
  submitButtonText: {
    ...Theme.typography.body,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
