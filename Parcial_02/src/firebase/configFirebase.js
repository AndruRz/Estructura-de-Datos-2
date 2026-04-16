import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIKHrh3C6Ikk8k69lTBNCYxfiyLypjE7k",
  authDomain: "estructura-datos-2.firebaseapp.com",
  projectId: "estructura-datos-2",
  storageBucket: "estructura-datos-2.firebasestorage.app",
  messagingSenderId: "41140584295",
  appId: "1:41140584295:web:84af698ca01ec3e159f9c2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);