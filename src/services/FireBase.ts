// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXKSw7Uia6PmFFs1ppGzSnCjc8XjjjKwo",
  authDomain: "diri-final.firebaseapp.com",
  databaseURL: "https://diri-final-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "diri-final",
  storageBucket: "diri-final.firebasestorage.app",
  messagingSenderId: "1090907529215",
  appId: "1:1090907529215:web:66a84f9c86fca0db9b51ca",
  measurementId: "G-3H35Q6J4D1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);