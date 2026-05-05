import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function ExperimentScreen() {
  const { t } = useTranslation();
  const [permission, requestPermission] = useCameraPermissions();

  const [modalVisible, setModalVisible] = useState(true);
  const [height, setHeight] = useState("");
  const [mass, setMass] = useState("");

  const [recording, setRecording] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  if (!permission)
    return (
      <View style={styles.centeredView}>
        <Text>Loading Camera...</Text>
      </View>
    );
  if (!permission.granted) {
    return (
      <View style={styles.centeredView}>
        <Text>{t("camera_permission")}</Text>
        <Pressable onPress={requestPermission} style={styles.button}>
          <Text style={styles.textStyle}>{t("grant_permission")}</Text>
        </Pressable>
      </View>
    );
  }

  const handleRecord = async () => {
    if (!cameraRef.current) return;

    if (recording) {
      cameraRef.current.stopRecording();
      setRecording(false);
    } else {
      try {
        setRecording(true);
        const video = await cameraRef.current.recordAsync({
          maxDuration: 60,
        });

        if (video?.uri) {
          router.push({
            pathname: "../marker",
            params: { videoUri: encodeURIComponent(video.uri) },
          });
        }
      } catch (error) {
        console.error("Recording error:", error);
        setRecording(false);
      }
    }
  };

  const handleSaveData = () => {
    if (height && mass) {
      setModalVisible(false);
    } else {
      alert(t("enter_values"));
    }
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{t("experiment_setup")}</Text>
            <Text style={styles.label}>{t("height_label")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("height_placeholder")}
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
            <Text style={styles.label}>{t("mass_label")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("mass_placeholder")}
              keyboardType="numeric"
              value={mass}
              onChangeText={setMass}
            />
            <Pressable style={styles.saveButton} onPress={handleSaveData}>
              <Text style={styles.textStyle}>{t("confirm")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        mode="video"
        facing="back"
        mute={true}
      >
        <View style={styles.overlay} pointerEvents="box-none">
          <View style={styles.dataDisplay}>
            <Text style={styles.dataText}>
              H: {height}m | M: {mass}g
            </Text>
          </View>

          <Pressable
            style={[
              styles.recordButton,
              recording && { backgroundColor: "#555" },
            ]}
            onPress={handleRecord}
          >
            <Text style={styles.textStyle}>
              {recording ? t("stop") : t("record")}
            </Text>
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  button: {
    backgroundColor: "#5cb85c",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  label: { alignSelf: "flex-start", marginBottom: 5, fontWeight: "600" },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: "#5cb85c",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: "100%",
    alignItems: "center",
  },
  textStyle: { color: "white", fontWeight: "bold", textAlign: "center" },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    padding: 60,
  },
  recordButton: {
    backgroundColor: "red",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignSelf: "center",
  },
  dataDisplay: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  dataText: { color: "white", fontSize: 16 },
});
