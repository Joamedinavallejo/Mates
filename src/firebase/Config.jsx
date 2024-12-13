import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración del proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCSkIwuKlGtb25NSclyZJz7XOflESKmWjk",
  authDomain: "mates-85160.firebaseapp.com",
  projectId: "mates-85160",
  storageBucket: "mates-85160.firebasestorage.app",
  messagingSenderId: "150577413256",
  appId: "1:150577413256:web:800c72936d623ab04eb33d",
  measurementId: "G-YERWD1ZZCS"
};

// Inicializar la app de Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
