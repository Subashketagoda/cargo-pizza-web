import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrXu7-u70PGWICJBCjv5hc8ZSThYcG9Nw",
  authDomain: "cargo-web-c9b5f.firebaseapp.com",
  projectId: "cargo-web-c9b5f",
  storageBucket: "cargo-web-c9b5f.firebasestorage.app",
  messagingSenderId: "438619340050",
  appId: "1:438619340050:web:dfe25f92959fdb62f1c7cb",
  measurementId: "G-PQFKJSNQV3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
