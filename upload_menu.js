import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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
const db = getFirestore(app);

const dummyItems = [
  { name: 'Veggie Delight', price: '1,900', category: 'pizzas', tag: 'VEGGIE DECK 12"', popular: false },
  { name: 'Margherita', price: '2,000', category: 'pizzas', tag: 'VEGGIE DECK 12"', popular: true },
  { name: 'Fungi Fiesta', price: '2,000', category: 'pizzas', tag: 'VEGGIE DECK 12"', popular: false },
  { name: 'Sausage Delight', price: '1,800', category: 'pizzas', tag: 'MEATY DECK 12"', popular: false },
  { name: 'Devilled Chicken', price: '2,100', category: 'pizzas', tag: 'MEATY DECK 12"', popular: true },
  { name: 'Tandoori Chicken', price: '2,100', category: 'pizzas', tag: 'MEATY DECK 12"', popular: false },
  { name: 'BBQ Chicken', price: '2,100', category: 'pizzas', tag: 'MEATY DECK 12"', popular: true },
  { name: 'Loaded Lamb', price: '2,600', category: 'pizzas', tag: 'MEATY DECK 12"', popular: false },
  { name: 'Spicy Chicken', price: '2,100', category: 'pizzas', tag: 'MEATY DECK 12"', popular: false },
  { name: 'Fungi Chicken', price: '2,200', category: 'pizzas', tag: 'MEATY DECK 12"', popular: false },
  { name: 'Lamb Slam', price: '2,600', category: 'pizzas', tag: 'CARGO SPECIALS', popular: true },
  { name: 'Holy Prawn', price: '2,800', category: 'pizzas', tag: 'CARGO SPECIALS', popular: false },
  { name: 'Full Loaded Meat', price: '2,900', category: 'pizzas', tag: 'CARGO SPECIALS', popular: true },
  { name: 'Tuna', price: '2,700', category: 'pizzas', tag: 'CARGO SPECIALS', popular: false },
  { name: 'Strawberry Mojito', price: '500', category: 'drinks', tag: 'REFRESHERS', popular: true },
  { name: 'Black Mojito', price: '500', category: 'drinks', tag: 'REFRESHERS', popular: false },
  { name: 'Passion Mojito', price: '500', category: 'drinks', tag: 'REFRESHERS', popular: false },
  { name: 'Lime Mojito', price: '500', category: 'drinks', tag: 'REFRESHERS', popular: false },
  { name: 'Iced Milo', price: '350', category: 'drinks', tag: 'REFRESHERS', popular: false },
  { name: 'Peached Ice Tea', price: '300', category: 'drinks', tag: 'REFRESHERS', popular: false },
  { name: 'Chocolate Lava Cake', price: '600', category: 'desserts', tag: 'DESSERTS', popular: true },
  { name: 'Classic Hot Dog', price: '850', category: 'hotdogs', tag: 'HOT DOGS', popular: true }
];

async function uploadData() {
  console.log("Starting upload...");
  for (const item of dummyItems) {
    try {
      await addDoc(collection(db, "menuItems"), item);
      console.log(`Added: ${item.name}`);
    } catch (e) {
      console.error(`Failed to add ${item.name}:`, e.message);
    }
  }
  console.log("Finished upload!");
  process.exit(0);
}

uploadData();
