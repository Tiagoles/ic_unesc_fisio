import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBbyU4-dgT-H6znQs0LJlqZ0yFHgKeEU_c",
  authDomain: "ic-fisio.firebaseapp.com",
  projectId: "ic-fisio",
  storageBucket: "ic-fisio.firebasestorage.app",
  messagingSenderId: "1090442396176",
  appId: "1:1090442396176:web:f244360d21e5f7e3e38095",
  measurementId: "G-8R1YK5RCBR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const analytics = getAnalytics(app);
export { db }