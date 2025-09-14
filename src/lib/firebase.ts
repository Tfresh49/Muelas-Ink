// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqMPNrEJiFJI7iAGjSnTA4RzBmYfqe38M",
  authDomain: "muelas-ink.firebaseapp.com",
  databaseURL: "https://muelas-ink-default-rtdb.firebaseio.com",
  projectId: "muelas-ink",
  storageBucket: "muelas-ink.firebasestorage.app",
  messagingSenderId: "43963686553",
  appId: "1:43963686553:web:d92b55ee0e44f805f5e208",
  measurementId: "G-ERHK7MLSDW"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
