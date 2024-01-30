// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mean-app-6fff3.firebaseapp.com",
  projectId: "mean-app-6fff3",
  storageBucket: "mean-app-6fff3.appspot.com",
  messagingSenderId: "530992879332",
  appId: "1:530992879332:web:6ce16c88909384c3173ef1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
