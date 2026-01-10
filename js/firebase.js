import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAtJmSy01vD5R7yr0dEIe-zatndywiIzD4",
  authDomain: "billing-system-bc77f.firebaseapp.com",
  projectId: "billing-system-bc77f",
  storageBucket: "billing-system-bc77f.firebasestorage.app",
  messagingSenderId: "738782000344",
  appId: "1:738782000344:web:39f53a46c9c6ca956153ad"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
