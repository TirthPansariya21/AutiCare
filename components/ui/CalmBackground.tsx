import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalmBackground({ children }: { children: React.ReactNode }) {
  return (
    <ImageBackground
      source={require('../../assets/images/calm_abstract_wallpaper.png')}
      style={styles.container}
      imageStyle={styles.patternImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#F8F9FA',
  },
  safeArea: {
    flex: 1,
  },
  patternImage: {
    opacity: 0.8,
    resizeMode: 'cover',
  }
});
