import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const { t, i18n } = useTranslation();

  const showLanguagePicker = () => {
    Alert.alert(t("select_language"), t("choose_language"), [
      {
        text: "English",
        onPress: () => i18n.changeLanguage("english"),
      },
      {
        text: "Español",
        onPress: () => i18n.changeLanguage("espanol"),
      },
      {
        text: t("cancel"),
        style: "cancel",
      },
    ]);
  };

  const router = useRouter();

  const handleStart = () => {
    router.push("/experiment");
  };

  const equipment = [
    t("equip_1"),
    t("equip_2"),
    t("equip_3"),
    t("equip_4"),
    t("equip_5"),
    t("equip_6"),
  ];

  const instruction = [
    t("inst_1"),
    t("inst_2"),
    t("inst_3"),
    t("inst_4"),
    t("inst_5"),
    t("inst_6"),
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("title")}</Text>
        <Pressable onPress={showLanguagePicker} style={styles.globeButton}>
          <Ionicons name="globe-outline" size={28} color="black" />
        </Pressable>
      </View>

      <Image
        source={require("../../assets/images/parachute.png")}
        style={styles.mainImage}
        contentFit="contain"
      />

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{t("description")}</Text>

        <Text style={styles.sectionTitle}>{t("equipment_title")}</Text>
        {equipment.map((item, index) => (
          <View key={`equip-${index}`} style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{item}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>{t("instruction_title")}</Text>
        {instruction.map((item, index) => (
          <View key={`inst-${index}`} style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startText}>{t("start_lab")}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingHorizontal: 20,
    position: "relative",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  globeButton: {
    position: "absolute",
    right: 20,
    top: 30,
  },
  mainImage: {
    width: "100%",
    height: 200,
    marginVertical: 20,
  },
  descriptionContainer: {
    paddingHorizontal: 25,
  },
  descriptionText: {
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 5,
    paddingRight: 20,
  },
  bullet: {
    fontSize: 18,
    marginRight: 10,
    color: "#5cb85c",
  },
  bulletText: {
    fontSize: 15,
    color: "#333",
    flexShrink: 1,
  },
  buttonContainer: {
    paddingHorizontal: 25,
    marginTop: 30,
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "#5cb85c",
    width: "50%",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  startText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
