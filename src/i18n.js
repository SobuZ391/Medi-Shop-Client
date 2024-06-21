// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          home: "Home",
          shop: "Shop",
          cart: "Cart",
          languages: "Languages",
          joinUs: "Join Us",
          updateProfile: "Update Profile",
          dashboard: "Dashboard",
          logout: "Logout",
        }
      },
      fr: {
        translation: {
          home: "Accueil",
          shop: "Boutique",
          cart: "Panier",
          languages: "Langues",
          joinUs: "Rejoignez-nous",
          updateProfile: "Mettre à jour le profil",
          dashboard: "Tableau de bord",
          logout: "Se déconnecter",
        }
      }
      // Add other languages here
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
