import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBrXu7-u70PGWICJBCjv5hc8ZSThYcG9Nw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cargo-web-c9b5f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "cargo-web-c9b5f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cargo-web-c9b5f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "438619340050",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:438619340050:web:dfe25f92959fdb62f1c7cb",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-PQFKJSNQV3"
};

let app;
let db = null;
let auth = null;
let storage = null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
} catch (err) {
  console.warn("Firebase initialized with fallback:", err);
}

export { db, auth, storage };
