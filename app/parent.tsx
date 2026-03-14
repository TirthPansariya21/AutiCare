import { useRouter } from "expo-router";
import { StyleSheet, Text, View, ScrollView, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedButton from "../components/ui/AnimatedButton";
import { Theme } from "../components/ui/Theme";
import CalmBackground from "../components/ui/CalmBackground";

interface FeatureCardProps {
  title: string;
  description: string;
  route: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  buttonText: string;
}

export default function ParentDashboard() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const isDesktop = width >= 900;

  const features: FeatureCardProps[] = [
    {
      title: "Autism Risk Screening",
      description: "Quick screening questionnaire based on behavioral indicators.",
      route: "/questionnaire",
      icon: "shield-checkmark",
      color: Theme.colors.primary,
      buttonText: "Start Screening"
    },
    {
      title: "AI Parenting Assistant",
      description: "Ask questions and get personalized parenting guidance.",
      route: "/assistant",
      icon: "chatbubbles",
      color: Theme.colors.tertiary,
      buttonText: "Open Assistant"
    },
    {
      title: "Expert Connect",
      description: "Find and connect with autism specialists near you.",
      route: "/experts",
      icon: "medkit",
      color: Theme.colors.accent,
      buttonText: "Find Experts"
    }
  ];

  return (
    <CalmBackground>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.container, isDesktop && styles.containerDesktop]}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Parent Dashboard</Text>
            <Text style={styles.subtitle}>Tools & support to help your child thrive</Text>
          </View>

          {/* Desktop: row layout | Mobile: vertical stack */}
          <View style={[styles.cardList, isDesktop && styles.cardListDesktop]}>
            {features.map((feature, index) => (
              <AnimatedButton
                key={index}
                style={[styles.card, isDesktop && styles.cardDesktop]}
                onPress={() => router.push(feature.route as any)}
                scaleValue={0.98}
              >
                {/* Icon */}
                <View style={[styles.iconContainer, { backgroundColor: `${feature.color}15` }]}>
                  <Ionicons name={feature.icon} size={36} color={feature.color} />
                </View>

                {/* Text */}
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{feature.title}</Text>
                  <Text style={styles.cardDescription}>{feature.description}</Text>
                </View>

                {/* Action Button */}
                <View style={[styles.actionButton, { backgroundColor: feature.color }]}>
                  <Text style={styles.actionButtonText}>{feature.buttonText}</Text>
                  <Ionicons name="arrow-forward" size={16} color="#FFF" style={{ marginLeft: 6 }} />
                </View>

              </AnimatedButton>
            ))}
          </View>

        </View>
      </ScrollView>
    </CalmBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 40,
  },
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  containerDesktop: {
    maxWidth: 1000,
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 28,
    alignItems: 'flex-start',
  },
  title: {
    ...Theme.typography.h2,
    fontSize: 28,
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    ...Theme.typography.body,
    fontSize: 16,
    color: '#7F8C8D',
  },

  // ── Card list ──────────────────────────────────
  // Mobile: simple vertical stack
  cardList: {
    gap: 16,
  },
  // Desktop: horizontal row
  cardListDesktop: {
    flexDirection: 'row',
    gap: 24,
  },

  // ── Individual card ────────────────────────────
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '100%',

    // Shadow
    shadowColor: '#A0AAB2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,

    // Border
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardDesktop: {
    flex: 1,
    padding: 24,
  },

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTextContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    ...Theme.typography.h3,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardDescription: {
    ...Theme.typography.body,
    fontSize: 14,
    color: '#95A5A6',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '100%',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  }
});