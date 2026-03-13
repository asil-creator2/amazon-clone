// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEmLjMr6kE5z-tQNr6vuJpK4bpNciA-MA",
  authDomain: "clone-6fb68.firebaseapp.com",
  projectId: "clone-6fb68",
  storageBucket: "clone-6fb68.firebasestorage.app",
  messagingSenderId: "83746762693",
  appId: "1:83746762693:web:161ead63d0f9a6e1e3e5ac",
  measurementId: "G-P1S7KN6PWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app