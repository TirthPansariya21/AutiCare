import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Image } from "expo-image";
import * as Speech from "expo-speech";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import AnimatedButton from "../components/ui/AnimatedButton";
import CalmBackground from "../components/ui/CalmBackground";
import { Theme } from "../components/ui/Theme";

type CategoryId = "common" | "needs" | "emotions" | "activities" | "sensory" | "favorites";

interface Category {
  id: CategoryId;
  label: string;
}

const CATEGORIES: Category[] = [
  { id: "common", label: "Common" },
  { id: "needs", label: "Needs" },
  { id: "emotions", label: "Emotions" },
  { id: "activities", label: "Activities" },
  { id: "sensory", label: "Sensory" },
  { id: "favorites", label: "Favorites ⭐️" },
];

interface ButtonData {
  id: string;
  categoryId: CategoryId[]; // A phrase can belong to multiple categories, e.g. "needs" AND "common"
  label: string;
  speechPhrase: string;
  imageUrl: string;
  color: string;
  bgColor: string;
}

const AAC_IMAGES = {
  hungry: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
  thirsty: "https://cdn-icons-png.flaticon.com/128/2447/2447774.png",
  bathroom: "https://cdn-icons-png.flaticon.com/128/14696/14696192.png",
  tired: "https://cdn-icons-png.flaticon.com/128/3997/3997779.png ",
  help: "https://cdn-icons-png.flaticon.com/128/682/682055.png",
  rest: "https://cdn-icons-png.flaticon.com/128/3993/3993416.png",
  happy: "https://cdn-icons-png.flaticon.com/512/742/742751.png",
  sad: "https://cdn-icons-png.flaticon.com/512/742/742752.png",
  angry: "https://cdn-icons-png.flaticon.com/128/260/260222.png",
  scared: "https://cdn-icons-png.flaticon.com/128/2341/2341853.png",
  confused: "https://cdn-icons-png.flaticon.com/128/14299/14299215.png",
  play: "https://cdn-icons-png.flaticon.com/128/1702/1702342.png",
  study: "https://cdn-icons-png.flaticon.com/128/1081/1081040.png",
  outside: "https://cdn-icons-png.flaticon.com/128/18391/18391067.png",
  home: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
  walk: "https://cdn-icons-png.flaticon.com/128/4557/4557251.png",
  music: "https://cdn-icons-png.flaticon.com/128/2907/2907253.png",
  quiet: "https://cdn-icons-png.flaticon.com/128/15428/15428577.png",
  loud: "https://cdn-icons-png.flaticon.com/512/727/727240.png",
  bright: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
  dark: "https://cdn-icons-png.flaticon.com/128/9925/9925389.png",
  water: "https://cdn-icons-png.flaticon.com/128/2447/2447774.png",
  food: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
  toilet: "https://cdn-icons-png.flaticon.com/128/3130/3130213.png",
  sleep: "https://cdn-icons-png.flaticon.com/128/6266/6266005.png",
};

const INITIAL_BUTTONS: ButtonData[] = [
  // Needs 
  { id: "n1", categoryId: ["needs", "common"], label: "Hungry", speechPhrase: "I am hungry", imageUrl: AAC_IMAGES.hungry, color: "#FF6B6B", bgColor: "#FFE5E5" },
  { id: "n2", categoryId: ["needs", "common"], label: "Thirsty", speechPhrase: "I am thirsty", imageUrl: AAC_IMAGES.thirsty, color: "#4ECDC4", bgColor: "#E6F8F6" },
  { id: "n3", categoryId: ["needs", "common"], label: "Bathroom", speechPhrase: "I need the bathroom", imageUrl: AAC_IMAGES.bathroom, color: "#3BCCC0", bgColor: "#E6F7F5" },
  { id: "n4", categoryId: ["needs", "common"], label: "Tired", speechPhrase: "I am tired", imageUrl: AAC_IMAGES.tired, color: "#9D94FF", bgColor: "#EEEDFF" },
  { id: "n5", categoryId: ["needs", "common"], label: "Help", speechPhrase: "I need help", imageUrl: AAC_IMAGES.help, color: "#FDCB6E", bgColor: "#FFF9E6" },
  { id: "n6", categoryId: ["needs"], label: "Rest", speechPhrase: "I want to rest", imageUrl: AAC_IMAGES.rest, color: "#A8A4CE", bgColor: "#F0EFF5" },
  { id: "n7", categoryId: ["needs"], label: "Water", speechPhrase: "I want water", imageUrl: AAC_IMAGES.water, color: "#3498DB", bgColor: "#EBF5FB" },
  { id: "n8", categoryId: ["needs"], label: "Food", speechPhrase: "I want food", imageUrl: AAC_IMAGES.food, color: "#E67E22", bgColor: "#FEF5E7" },
  { id: "n9", categoryId: ["needs"], label: "Toilet", speechPhrase: "I need the toilet", imageUrl: AAC_IMAGES.toilet, color: "#8E44AD", bgColor: "#F5EEF8" },
  { id: "n10", categoryId: ["needs"], label: "Sleep", speechPhrase: "I want to sleep", imageUrl: AAC_IMAGES.sleep, color: "#2C3E50", bgColor: "#EAECEE" },

  // Emotions
  { id: "e1", categoryId: ["emotions", "common"], label: "Happy", speechPhrase: "I feel happy", imageUrl: AAC_IMAGES.happy, color: "#FFB300", bgColor: "#FFF9C4" },
  { id: "e2", categoryId: ["emotions", "common"], label: "Sad", speechPhrase: "I feel sad", imageUrl: AAC_IMAGES.sad, color: "#42A5F5", bgColor: "#E3F2FD" },
  { id: "e3", categoryId: ["emotions"], label: "Angry", speechPhrase: "I feel angry", imageUrl: AAC_IMAGES.angry, color: "#EF5350", bgColor: "#FFEBEE" },
  { id: "e4", categoryId: ["emotions"], label: "Scared", speechPhrase: "I feel scared", imageUrl: AAC_IMAGES.scared, color: "#AB47BC", bgColor: "#F3E5F5" },
  { id: "e5", categoryId: ["emotions"], label: "Confused", speechPhrase: "I feel confused", imageUrl: AAC_IMAGES.confused, color: "#78909C", bgColor: "#ECEFF1" },

  // Activities
  { id: "a1", categoryId: ["activities", "common"], label: "Play", speechPhrase: "I want to play", imageUrl: AAC_IMAGES.play, color: "#F57C00", bgColor: "#FFF3E0" },
  { id: "a2", categoryId: ["activities"], label: "Study", speechPhrase: "I want to study", imageUrl: AAC_IMAGES.study, color: "#26A69A", bgColor: "#E0F2F1" },
  { id: "a3", categoryId: ["activities"], label: "Outside", speechPhrase: "I want to go outside", imageUrl: AAC_IMAGES.outside, color: "#66BB6A", bgColor: "#E8F5E9" },
  { id: "a4", categoryId: ["activities"], label: "Home", speechPhrase: "I want to go home", imageUrl: AAC_IMAGES.home, color: "#5C6BC0", bgColor: "#E8EAF6" },
  { id: "a5", categoryId: ["activities"], label: "Walk", speechPhrase: "I want to walk", imageUrl: AAC_IMAGES.walk, color: "#8D6E63", bgColor: "#EFEBE9" },

  // Sensory
  { id: "s1", categoryId: ["sensory"], label: "Music", speechPhrase: "I want to listen to music", imageUrl: AAC_IMAGES.music, color: "#29B6F6", bgColor: "#E1F5FE" },
  { id: "s2", categoryId: ["sensory", "common"], label: "Quiet", speechPhrase: "I need quiet time", imageUrl: AAC_IMAGES.quiet, color: "#9CCC65", bgColor: "#F1F8E9" },
  { id: "s3", categoryId: ["sensory"], label: "Loud", speechPhrase: "It is too loud", imageUrl: AAC_IMAGES.loud, color: "#FF7043", bgColor: "#FBE9E7" },
  { id: "s4", categoryId: ["sensory"], label: "Bright", speechPhrase: "The light is too bright", imageUrl: AAC_IMAGES.bright, color: "#FBC02D", bgColor: "#FFFDE7" },
  { id: "s5", categoryId: ["sensory"], label: "Dark", speechPhrase: "I want the lights off", imageUrl: AAC_IMAGES.dark, color: "#5D4037", bgColor: "#D7CCC8" },
];

export default function Child() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("common");
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [favorites, setFavorites] = useState<string[]>([]);

  const { width } = useWindowDimensions();
  // Responsive grid logic
  const isDesktop = width >= 1024;
  const isTablet = width >= 600 && width < 1024;
  const getCardWidth = () => {
    if (isDesktop) return '23%'; // 4 columns
    if (isTablet) return '31%';  // 3 columns
    return '47%';                // 2 columns
  };

  // Custom phrases states
  const [customButtons, setCustomButtons] = useState<ButtonData[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newLabelText, setNewLabelText] = useState("");
  const [newSpeechText, setNewSpeechText] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  const speak = (phrase: string) => {
    setCurrentMessage(phrase);
    Speech.speak(phrase, { rate: speechRate, pitch: 1.1 });
  };

  const repeatVoice = () => {
    if (currentMessage) {
      Speech.speak(currentMessage, { rate: speechRate, pitch: 1.1 });
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const addCustomPhrase = () => {
    if (!newLabelText.trim() || !newSpeechText.trim() || !newImageUrl.trim()) return;

    const newBtn: ButtonData = {
      id: `custom-${new Date().getTime()}`,
      categoryId: activeCategory === "favorites" || activeCategory === "common" ? ["common"] : [activeCategory],
      label: newLabelText.trim(),
      speechPhrase: newSpeechText.trim(),
      imageUrl: newImageUrl.trim(),
      color: "#8E44AD", // Custom phrase default deep purple
      bgColor: "#F5EEF8",
    };

    setCustomButtons((prev) => [...prev, newBtn]);
    setNewLabelText("");
    setNewSpeechText("");
    setNewImageUrl("");
    setModalVisible(false);
  };

  // Combine initial and custom buttons
  const allButtons = [...INITIAL_BUTTONS, ...customButtons];

  // Map out which buttons to display
  let displayedButtons: ButtonData[] = [];
  if (activeCategory === "favorites") {
    displayedButtons = allButtons.filter((btn) => favorites.includes(btn.id));
  } else {
    displayedButtons = allButtons.filter((btn) => btn.categoryId.includes(activeCategory));
  }

  return (
    <CalmBackground>
      {/* Title Area */}
      <View style={styles.header}>
        <Text style={styles.title}>Visual Communication Board</Text>
        <Text style={styles.subtitle}>AAC Communication Tool</Text>
      </View>

      {/* Main Board Section */}
      <View style={styles.boardTopSection}>
        {/* Compact Message Card Area (15-20% vertical space goal) */}
        <View style={styles.messageCard}>
          <View style={styles.messageContentArea}>
            <Text style={[styles.messageText, !currentMessage && styles.messageTextPlaceholder]} numberOfLines={2}>
              {currentMessage ? `"${currentMessage}"` : "Tap a tile to speak..."}
            </Text>
          </View>

          <View style={styles.messageControlsRight}>
            <AnimatedButton
              style={[styles.iconActionBtn, { backgroundColor: Theme.colors.primary }]}
              onPress={repeatVoice}
              disabled={!currentMessage}
              scaleValue={0.9}
            >
              <Ionicons name="volume-high" size={20} color="#fff" />
            </AnimatedButton>
            <AnimatedButton
              style={[styles.iconActionBtn, { backgroundColor: "#E74C3C" }]}
              onPress={() => setCurrentMessage("")}
              disabled={!currentMessage}
              scaleValue={0.9}
            >
              <Ionicons name="close" size={20} color="#fff" />
            </AnimatedButton>
          </View>
        </View>

        {/* Speech Speed Settings */}
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>Speed: {speechRate.toFixed(1)}x</Text>
          <Slider
            style={{ flex: 1, height: 25 }}
            minimumValue={0.5}
            maximumValue={1.5}
            step={0.1}
            value={speechRate}
            onValueChange={setSpeechRate}
            minimumTrackTintColor={Theme.colors.primary}
            maximumTrackTintColor="#CBD5E0"
            thumbTintColor={Theme.colors.primary}
          />
        </View>

        {/* Filter Bar (Categories) */}
        <View style={{ height: 45, marginTop: 12 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            {CATEGORIES.map((cat) => (
              <AnimatedButton
                key={cat.id}
                style={[
                  styles.categoryPill,
                  activeCategory === cat.id && styles.categoryPillActive,
                ]}
                onPress={() => setActiveCategory(cat.id)}
              >
                <Text
                  style={[
                    styles.categoryPillText,
                    activeCategory === cat.id && styles.categoryPillTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </AnimatedButton>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Tile Grid */}
      <ScrollView contentContainerStyle={styles.gridContainer} showsVerticalScrollIndicator={false}>
        {displayedButtons.length === 0 && activeCategory === "favorites" ? (
          <Text style={styles.emptyText}>Tap the star ⭐️ on any tile to save it here!</Text>
        ) : (
          displayedButtons.map((b) => (
            <View key={b.id} style={[styles.cardWrapper, { width: getCardWidth() as any }]}>
              <TouchableOpacity
                style={styles.starIconBase}
                onPress={() => toggleFavorite(b.id)}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              >
                <Ionicons
                  name={favorites.includes(b.id) ? "star" : "star-outline"}
                  size={22}
                  color={favorites.includes(b.id) ? "#F39C12" : "#95A5A6"}
                />
              </TouchableOpacity>

              <AnimatedButton
                style={[styles.tile, { borderColor: b.color, backgroundColor: b.bgColor }]}
                onPress={() => speak(b.speechPhrase)}
                scaleValue={0.96}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: b.imageUrl }}
                    style={styles.tileImage}
                    contentFit="contain"
                    transition={200}
                    accessibilityLabel={b.label}
                  />
                </View>
                <View style={styles.tileTextContainer}>
                  <Text style={[styles.tileLabel, { color: b.color }]} numberOfLines={1}>{b.label}</Text>
                </View>
              </AnimatedButton>
            </View>
          ))
        )}
      </ScrollView>

      {/* Add Custom AAC Tile Button */}
      <View style={styles.floatingButtonContainer}>
        <AnimatedButton
          style={styles.addPhraseBtn}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addPhraseBtnText}>Add Custom Phrase</Text>
        </AnimatedButton>
      </View>

      {/* Modal: Parent Custom Img URL Input */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Custom AAC Tile</Text>
            <Text style={styles.modalSubtitle}>Create a new image tile for the communication board.</Text>

            <TextInput
              style={styles.input}
              placeholder="Short Label (e.g. Snack)"
              value={newLabelText}
              onChangeText={setNewLabelText}
            />

            <TextInput
              style={styles.input}
              placeholder="Spoken Phrase (e.g. I want a snack)"
              value={newSpeechText}
              onChangeText={setNewSpeechText}
            />

            <TextInput
              style={styles.input}
              placeholder="Image URL (e.g. https://.../apple.png)"
              value={newImageUrl}
              onChangeText={setNewImageUrl}
              autoCapitalize="none"
              keyboardType="url"
            />

            <View style={styles.modalActions}>
              <AnimatedButton
                style={[styles.modalBtn, { backgroundColor: "#BDC3C7" }]}
                onPress={() => {
                  setNewLabelText("");
                  setNewSpeechText("");
                  setNewImageUrl("");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </AnimatedButton>

              <AnimatedButton
                style={[
                  styles.modalBtn,
                  { backgroundColor: Theme.colors.primary },
                  (!newLabelText || !newSpeechText || !newImageUrl) && { opacity: 0.5 }
                ]}
                onPress={addCustomPhrase}
                disabled={!newLabelText || !newSpeechText || !newImageUrl}
              >
                <Text style={styles.modalBtnText}>Save Tile</Text>
              </AnimatedButton>
            </View>
          </View>
        </View>
      </Modal>

    </CalmBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 55,
    paddingBottom: 15,
    alignItems: 'center',
    zIndex: 1,
    paddingHorizontal: 20,
  },
  title: {
    ...Theme.typography.h2,
    fontSize: 28,
    color: '#2C3E50',
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    ...Theme.typography.bodySmall,
    color: '#7F8C8D',
    fontSize: 16,
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '600',
  },
  boardTopSection: {
    paddingHorizontal: 16,
    zIndex: 2,
  },
  // Keeps the message area truly compact to save vertical space
  messageCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 65,
    maxHeight: 100, // Caps vertical space
    ...Theme.shadows.medium,
  },
  messageContentArea: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 8,
  },
  messageText: {
    ...Theme.typography.h3,
    fontSize: 22,
    color: '#2C3E50',
    fontWeight: '800',
    lineHeight: 28,
  },
  messageTextPlaceholder: {
    color: '#BDC3C7',
    fontStyle: 'italic',
    fontWeight: '500',
    fontSize: 18,
  },
  messageControlsRight: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  iconActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.soft,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
    paddingHorizontal: 5,
    gap: 8,
  },
  sliderLabel: {
    ...Theme.typography.bodySmall,
    color: '#95A5A6',
    fontWeight: '700',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  categoryScroll: {
    gap: 8,
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  categoryPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryPillActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  categoryPillText: {
    fontWeight: '700',
    color: '#95A5A6',
    fontSize: 14,
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 110, // room for floating button
    gap: 12, // Reduced whitespace
  },
  emptyText: {
    ...Theme.typography.bodyLarge,
    color: '#95A5A6',
    textAlign: 'center',
    width: '100%',
    marginTop: 40,
    fontWeight: '500',
  },
  cardWrapper: {
    aspectRatio: 0.85, // Adjusts tile tallness
    position: 'relative',
    marginBottom: 4,
  },
  tile: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderBottomWidth: 5, // Slightly less aggressive bottom border for modern feel
    overflow: 'hidden', // keeps image contained neatly in corners
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start', // Let image stick to top, label below
    ...Theme.shadows.medium,
  },
  starIconBase: {
    position: 'absolute',
    top: -6,
    right: -6,
    zIndex: 10,
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: 4,
    ...Theme.shadows.soft,
  },
  imageContainer: {
    width: '100%',
    height: '65%', // 65% requirement
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  tileImage: {
    width: '80%',
    height: '80%',
  },
  tileTextContainer: {
    width: '100%',
    height: '35%', // remaining space
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    backgroundColor: '#FFF', // Ensure label area has a solid background below image
  },
  tileLabel: {
    ...Theme.typography.bodySmall,
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 18,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    zIndex: 100,
  },
  addPhraseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34495E',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
    ...Theme.shadows.medium,
  },
  addPhraseBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    ...Theme.shadows.medium,
  },
  modalTitle: {
    ...Theme.typography.h3,
    color: '#2C3E50',
    marginBottom: 6,
  },
  modalSubtitle: {
    ...Theme.typography.bodySmall,
    color: '#7F8C8D',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: '#2C3E50',
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 10,
  },
  modalBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  modalBtnText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 14,
  }
});