import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdtjDPVHpMTwHJ8XbKk07kK5dlPw3J22g",
  authDomain: "hoellahuend-turniere.firebaseapp.com",
  projectId: "hoellahuend-turniere",
  storageBucket: "hoellahuend-turniere.firebasestorage.app",
  messagingSenderId: "333652950263",
  appId: "1:333652950263:web:b221164b336253cd9827f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
