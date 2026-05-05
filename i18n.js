import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  english: {
    translation: {
      title: "Parachute Challenge",
      description:
        "Students design, build, and test a parachute for a small toy to reduce its landing speed and impact force. Teams iterate their designs under time and material constraints, aiming to achieve the slowest and safest landing within a target area.",
      equipment_title: "Equipments",
      instruction_title: "Instructions",
      start_lab: "Start",
      cancel: "Cancel",

      // Language picker
      select_language: "Select Language",
      choose_language: "Choose your preferred language",

      // Equipment
      equip_1: "Small toy (e.g. army toy soldier)",
      equip_2: "Table or elevated surface",
      equip_3: "Paper or plastic",
      equip_4: "String",
      equip_5: "Scissors",
      equip_6: "Tape",

      // Instructions
      inst_1:
        "Drop the toy without a parachute and record the fall (baseline test).",
      inst_2: "Build a parachute using provided materials.",
      inst_3: "Drop the toy from the same height and record the fall.",
      inst_4: "Review speed and landing accuracy results in the app.",
      inst_5: "Redesign and test up to three prototypes within 20 minutes.",
      inst_6: "Upload videos, results, and team reflections.",

      // Experiment
      camera_permission: "Camera permission is required.",
      grant_permission: "Grant Permission",
      experiment_setup: "Experiment Setup",
      height_label: "Drop Height (meter)",
      mass_label: "Object Mass (gram)",
      height_placeholder: "e.g. 2.5",
      mass_placeholder: "e.g. 50",
      confirm: "Confirm & Start",
      record: "RECORD",
      stop: "STOP",
      enter_values: "Please enter both values to proceed.",
    },
  },

  espanol: {
    translation: {
      title: "Desafío de Paracaídas",
      description:
        "Los estudiantes diseñan, construyen y prueban un paracaídas para un pequeño juguete para reducir su velocidad de caída y fuerza de impacto.",
      equipment_title: "Materiales",
      instruction_title: "Instrucciones",
      start_lab: "Iniciar",
      cancel: "Cancelar",

      select_language: "Seleccionar idioma",
      choose_language: "Elija su idioma preferido",

      equip_1: "Juguete pequeño",
      equip_2: "Mesa o superficie elevada",
      equip_3: "Papel o plástico",
      equip_4: "Cuerda",
      equip_5: "Tijeras",
      equip_6: "Cinta",

      inst_1: "Suelte el juguete sin paracaídas.",
      inst_2: "Construya un paracaídas.",
      inst_3: "Suelte desde la misma altura.",
      inst_4: "Revise los resultados.",
      inst_5: "Rediseñe hasta tres veces.",
      inst_6: "Suba videos y resultados.",

      camera_permission: "Se requiere permiso para usar la cámara.",
      grant_permission: "Conceder permiso",
      experiment_setup: "Configuración del Experimento",
      height_label: "Altura de caída (metro)",
      mass_label: "Masa del objeto (gramo)",
      height_placeholder: "ej. 2.5",
      mass_placeholder: "ej. 50",
      confirm: "Confirmar e iniciar",
      record: "GRABAR",
      stop: "PARAR",
      enter_values: "Por favor ingrese ambos valores.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "english",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
