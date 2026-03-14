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

  // Responsive Grid Logic:
  // Max-width 1000px container.
  // >= 1024px: 3 columns
  // >= 768px: 2 columns
  // < 768px: 1 column
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;
  const getCardWidth = () => {
    if (isDesktop) return '31%';
    if (isTablet) return '48%';
    return '100%';
  };

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
      icon: "medkit", // using medkit instead of pure medical for doctor/support feel
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
        <View style={styles.container}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Parent Dashboard</Text>
            <Text style={styles.subtitle}>Tools & support to help your child thrive</Text>
          </View>

          <View style={styles.gridContainer}>
            {features.map((feature, index) => (
              <AnimatedButton
                key={index}
                style={[styles.card, { width: getCardWidth() as any }]}
                onPress={() => router.push(feature.route as any)}
                scaleValue={0.98}
              >
                {/* Icon Area */}
                <View style={[styles.iconContainer, { backgroundColor: `${feature.color}15` }]}>
                  <Ionicons name={feature.icon} size={40} color={feature.color} />
                </View>

                {/* Text Content */}
                <Text style={styles.cardTitle}>{feature.title}</Text>
                <Text style={styles.cardDescription}>{feature.description}</Text>

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
    paddingVertical: 40,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 1000, // Centered container max-width around 1000px
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 40,
    alignItems: 'flex-start',
  },
  title: {
    ...Theme.typography.h2,
    fontSize: 28, // Title font size 28px
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    ...Theme.typography.body,
    fontSize: 16, // Subtitle 16px
    color: '#7F8C8D',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24, // 24px gap between cards
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16, // Soft rounded corners (16px)
    padding: 24, // Balanced padding (24px)
    justifyContent: 'space-between',
    alignItems: 'center',
    
    // Subtle shadow
    shadowColor: '#A0AAB2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,

    // Add a very subtle border for definition
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    ...Theme.typography.h3,
    fontSize: 18, // Card title 18px
    fontWeight: 'bold', // Bold
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardDescription: {
    ...Theme.typography.body,
    fontSize: 14, // Description 14px
    color: '#95A5A6', // Soft gray color
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20, // Rounded medium button
    width: '100%',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  }
});