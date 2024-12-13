import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración del proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBa_Aa32dNYJATDWkbmraIJVVY3GGVMrDI",
  authDomain: "matespatt.firebaseapp.com",
  projectId: "matespatt",
  storageBucket: "matespatt.firebasestorage.app",
  messagingSenderId: "65663623310",
  appId: "1:65663623310:web:cc47b80a699850eb4b29df",
  measurementId: "G-K0ZTM0MRM7"
};

// Inicializar la app de Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
