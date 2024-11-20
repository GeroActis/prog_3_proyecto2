import app from 'firebase/app';
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyATooqB9UoMXNEwEh4z4nbWlarhV061Qgw",
    authDomain: "proyecto2-2a6ef.firebaseapp.com",
    projectId: "proyecto2-2a6ef",
    storageBucket: "proyecto2-2a6ef.firebasestorage.app",
    messagingSenderId: "442049976903",
    appId: "1:442049976903:web:d4f802b2c8429e354e2f62",
    measurementId: "G-4SRX90LCNS"
  };

  app.initializeApp(firebaseConfig)

  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();
