// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";  // Para autenticação
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";  // Para Firestore

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBbyU4-dgT-H6znQs0LJlqZ0yFHgKeEU_c",
  authDomain: "ic-fisio.firebaseapp.com",
  projectId: "ic-fisio",
  storageBucket: "ic-fisio.firebasestorage.app",
  messagingSenderId: "1090442396176",
  appId: "1:1090442396176:web:f244360d21e5f7e3e38095",
  measurementId: "G-8R1YK5RCBR"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Analytics (caso seja necessário)
const analytics = getAnalytics(app);

// Inicializa outros serviços como Auth e Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta os serviços que você precisa em outras telas
export { app, auth, db, analytics };
