import { ResizeMode, Video } from "expo-av"; // Added AVPlaybackStatus
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function MarkerScreen() {
  const { videoUri } = useLocalSearchParams<{ videoUri: string }>(); // Explicitly type the param
  const { t } = useTranslation();
  const router = useRouter();

  const videoRef = useRef<Video>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [step, setStep] = useState(0);

  // New state to keep track of the current playhead position
  const [lastPosition, setLastPosition] = useState(0);

  const handleMark = () => {
    if (step > 1) return;

    const currentTime = lastPosition / 1000;

    const newMarker = {
      time: currentTime,
      label: step === 0 ? "Release" : "Landing",
      color: step === 0 ? "#007AFF" : "#ff3b30",
    };

    setMarkers((prev) => [...prev, newMarker]);
    setStep(step + 1);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: videoUri }}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        // This listener updates our playhead state automatically
        onPlaybackStatusUpdate={(status) => {
          if (status.isLoaded) {
            setLastPosition(status.positionMillis);
          }
        }}
      />

      <View style={styles.controlPanel}>
        {step < 2 ? (
          <Pressable onPress={handleMark} style={styles.markButton}>
            <Text style={styles.buttonText}>
              {step === 0 ? "MARK RELEASE" : "MARK LANDING"}
            </Text>
          </Pressable>
        ) : (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>
              Fall Time: {(markers[1].time - markers[0].time).toFixed(2)}s
            </Text>
            <Pressable
              onPress={() => {
                setMarkers([]);
                setStep(0);
              }}
              style={styles.resetButton}
            >
              <Text style={styles.resetText}>Reset Marks</Text>
            </Pressable>
          </View>
        )}

        <ScrollView style={styles.timeline}>
          <Text style={styles.sectionTitle}>Timeline Markers</Text>
          {markers.map((m, i) => (
            <View key={i} style={styles.markerRow}>
              <Text style={[styles.markerLabel, { color: m.color }]}>
                {m.label}
              </Text>
              <Text style={styles.timeText}>{m.time.toFixed(2)}s</Text>
            </View>
          ))}
        </ScrollView>

        <Pressable
          style={styles.finishButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.buttonText}>Finish & Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ... styles remain the same from the previous response

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  video: { width: "100%", height: 300, backgroundColor: "#000" },
  controlPanel: { flex: 1, padding: 20 },
  markButton: {
    backgroundColor: "#5cb85c",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  resultBox: {
    padding: 15,
    backgroundColor: "#f0f9f0",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#5cb85c",
    alignItems: "center",
    marginBottom: 20,
  },
  resultText: { fontSize: 20, fontWeight: "bold", color: "#2e7d32" },
  resetButton: { marginTop: 10 },
  resetText: { color: "#ff3b30", fontWeight: "600" },
  timeline: { flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  markerRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  markerLabel: { width: 80, fontWeight: "bold" },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: { height: "100%" },
  timeText: { marginLeft: 10, width: 50, fontSize: 14, color: "#666" },
  finishButton: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
});
