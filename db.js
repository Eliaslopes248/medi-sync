// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRggqWTaeP8nLXwRCGEntC7iHiDN4JCLU",
  authDomain: "medi-sync-da4d3.firebaseapp.com",
  projectId: "medi-sync-da4d3",
  storageBucket: "medi-sync-da4d3.firebasestorage.app",
  messagingSenderId: "601278054066",
  appId: "1:601278054066:web:4c3d7e5a0cef18f34e53ab",
  measurementId: "G-N4VEFMHMFQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)