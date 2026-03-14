import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

export default function CalmBackground({ children }: { children: React.ReactNode }) {
  return (
    <ImageBackground
      source={require('../../assets/images/calm_abstract_wallpaper.png')}
      style={styles.container}
      imageStyle={styles.patternImage}
      resizeMode="cover"
    >

      {/* Render the screen content above the shapes and illustration */}
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#F8F9FA', // Clean off-white background
  },
  patternImage: {
    opacity: 0.8, // Raised opacity significantly as this is a full-featured wallpaper rather than a noisy repeating pattern
    resizeMode: 'cover',
  }
});
