// Import Firebase dependencies
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3LCTSkPg9bz_5_6H_t5Twy7Ou9_SQJ7A",
  authDomain: "lab03-10aee.firebaseapp.com",
  projectId: "lab03-10aee",
  storageBucket: "lab03-10aee.firebasestorage.app",
  messagingSenderId: "1043880743185",
  appId: "1:1043880743185:web:34287ba06bb97c00af3cb0",
  measurementId: "G-77BLWGBGSL"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


