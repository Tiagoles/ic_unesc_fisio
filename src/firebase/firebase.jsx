import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBbyU4-dgT-H6znQs0LJlqZ0yFHgKeEU_c",
  authDomain: "ic-fisio.firebaseapp.com",
  projectId: "ic-fisio",
  storageBucket: "ic-fisio.firebasestorage.app",
  messagingSenderId: "1090442396176",
  appId: "1:1090442396176:web:f244360d21e5f7e3e38095",
  measurementId: "G-8R1YK5RCBR",
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Serviços que podem ser usados em outros lugares
const auth = getAuth(app); // Autenticação
const firestore = getFirestore(app); // Firestore

export { app, analytics, auth, firestore };
// Verifique se o app foi inicializado
