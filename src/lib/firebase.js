import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjbdP3F0XokCTwBCF9xRnd0MbMouvXMXk",
  authDomain: "rekha-portfolio-c540d.firebaseapp.com",
  projectId: "rekha-portfolio-c540d",
  storageBucket: "rekha-portfolio-c540d.firebasestorage.app",
  messagingSenderId: "588549756009",
  appId: "1:588549756009:web:415ca1d387f493d9437ef8",
  measurementId: "G-6KCT8ZL0FN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
