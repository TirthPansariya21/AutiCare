import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Theme } from "../components/ui/Theme";
import CalmBackground from "../components/ui/CalmBackground";
import { Stack } from "expo-router";
import { useState, useRef } from "react";
import AnimatedButton from "../components/ui/AnimatedButton";
import { Ionicons } from "@expo/vector-icons";
import { sendMessage } from "../utils/gemini";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const SUGGESTED_QUESTIONS = [
  "My child avoids eye contact",
  "My child gets overwhelmed by loud sounds",
  "How can I improve my child's communication?",
];

export default function AssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-0",
      text: "Hello! I'm the AutiCare AI Parenting Assistant, powered by advanced AI. I can provide guidance on sensory sensitivity, communication strategies, behavioral support, and more. How can I help you today?",
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Track chat history for Gemini context
  const chatHistoryRef = useRef<{ role: "user" | "model"; text: string }[]>([]);

  const handleSend = async (text?: string) => {
    const userMessage = (text || inputText).trim();
    if (!userMessage || isLoading) return;

    const messageId = Date.now().toString();

    // Add user message to UI
    setMessages((prev) => [
      ...prev,
      { id: `user-${messageId}`, text: userMessage, isUser: true },
    ]);
    setInputText("");
    setIsLoading(true);

    // Send to Gemini
    try {
      const aiResponse = await sendMessage(chatHistoryRef.current, userMessage);

      // Update chat history
      chatHistoryRef.current.push({ role: "user", text: userMessage });
      chatHistoryRef.current.push({ role: "model", text: aiResponse });

      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now().toString()}`, text: aiResponse, isUser: false },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now().toString()}`,
          text: "I'm sorry, I encountered an issue. Please try again.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const showSuggestions = messages.length <= 1 && !isLoading;

  return (
    <CalmBackground>
      <Stack.Screen options={{ title: "AI Parenting Assistant" }} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Disclaimer Banner */}
        <View style={styles.disclaimerBanner}>
          <Ionicons
            name="shield-checkmark-outline"
            size={14}
            color="#856404"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.disclaimerBannerText}>
            This assistant provides general guidance and does not replace professional medical advice.
          </Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.chatContainer}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map((msg) => {
            const isAI = !msg.isUser;
            return (
              <View
                key={msg.id}
                style={[
                  styles.messageBubble,
                  msg.isUser ? styles.userBubble : styles.aiBubble,
                ]}
              >
                {isAI && (
                  <View style={styles.avatarContainer}>
                    <Ionicons name="sparkles" size={16} color="#FFFFFF" />
                  </View>
                )}

                <Text
                  style={[
                    styles.messageText,
                    msg.isUser ? styles.userText : styles.aiText,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>
            );
          })}

          {/* Loading Animation */}
          {isLoading && (
            <View style={[styles.messageBubble, styles.aiBubble]}>
              <View style={styles.avatarContainer}>
                <Ionicons name="sparkles" size={16} color="#FFFFFF" />
              </View>
              <View style={styles.typingContainer}>
                <ActivityIndicator size="small" color={Theme.colors.primary} />
                <Text style={styles.typingText}>Thinking...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Suggested Questions */}
        {showSuggestions && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsLabel}>Try asking:</Text>
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <AnimatedButton
                key={i}
                style={styles.suggestionChip}
                onPress={() => handleSend(q)}
                scaleValue={0.97}
              >
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={14}
                  color={Theme.colors.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.suggestionText}>{q}</Text>
              </AnimatedButton>
            ))}
          </View>
        )}

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your question here..."
            placeholderTextColor="#95A5A6"
            multiline
            maxLength={500}
            editable={!isLoading}
          />
          <AnimatedButton
            style={[
              styles.sendButton,
              (!inputText.trim() || isLoading) && styles.sendButtonDisabled,
            ]}
            onPress={() => handleSend()}
            scaleValue={0.9}
            disabled={!inputText.trim() || isLoading}
          >
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </AnimatedButton>
        </View>
      </KeyboardAvoidingView>
    </CalmBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  disclaimerBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3CD",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#FFEED8",
  },
  disclaimerBannerText: {
    flex: 1,
    fontSize: 11,
    color: "#856404",
    fontWeight: "500",
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 20,
    gap: 16,
  },
  messageBubble: {
    maxWidth: "85%",
    padding: 16,
    borderRadius: Theme.borderRadius.lg,
    ...Theme.shadows.soft,
  },
  userBubble: {
    backgroundColor: Theme.colors.primary,
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
  },
  avatarContainer: {
    backgroundColor: Theme.colors.tertiary,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 2,
  },
  messageText: {
    ...Theme.typography.body,
    lineHeight: 24,
    flexShrink: 1,
  },
  userText: {
    color: "#FFFFFF",
  },
  aiText: {
    color: "#34495E",
  },

  // Typing indicator
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  typingText: {
    ...Theme.typography.bodySmall,
    color: "#95A5A6",
    fontStyle: "italic",
  },

  // Suggestions
  suggestionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  suggestionsLabel: {
    ...Theme.typography.bodySmall,
    fontWeight: "700",
    color: "#95A5A6",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  suggestionChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${Theme.colors.primary}10`,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${Theme.colors.primary}30`,
    marginBottom: 8,
  },
  suggestionText: {
    ...Theme.typography.bodySmall,
    color: Theme.colors.primary,
    fontWeight: "600",
    flex: 1,
  },

  // Input
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 32 : 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    ...Theme.shadows.medium,
  },
  textInput: {
    ...Theme.typography.body,
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    backgroundColor: "#F8F9FA",
    borderRadius: Theme.borderRadius.lg,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    color: "#2C3E50",
    marginRight: 12,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    ...Theme.shadows.soft,
  },
  sendButtonDisabled: {
    backgroundColor: "#BDC3C7",
  },
});
