export const Theme = {
  colors: {
    primary: '#4A90E2', // Calm Blue
    secondary: '#A8E6CF', // Soft Mint
    tertiary: '#FFD166', // Warm Yellow
    accent: '#FF9F1C', // Orange
    backgroundBase: '#F0F4FF',
    backgroundGradientEnd: '#E0E8FF',
    textDark: '#2C3E50',
    textLight: '#F8F9FA',
    cardBackground: '#FFFFFF',
    shadow: '#000000',
    danger: '#FF6B6B',
  },
  typography: {
    h1: {
      fontSize: 42,
      fontWeight: '800' as const,
      color: '#2C3E50',
    },
    h2: {
      fontSize: 32,
      fontWeight: '700' as const,
      color: '#2C3E50',
    },
    h3: {
      fontSize: 24,
      fontWeight: '600' as const,
      color: '#2C3E50',
    },
    bodyLarge: {
      fontSize: 20,
      fontWeight: '500' as const,
      color: '#34495E',
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      color: '#34495E',
    },
    buttonText: {
      fontSize: 20,
      fontWeight: '700' as const,
      color: '#FFFFFF',
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      color: '#7F8C8D', // Soft grey
    }
  },
  shadows: {
    soft: {
      shadowColor: '#2C3E50',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    medium: {
      shadowColor: '#2C3E50',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 8,
    }
  },
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    round: 9999,
  }
};
