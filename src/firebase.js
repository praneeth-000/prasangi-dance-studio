import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwGJcvir-DgiJRZceSqkyatV5U9P-Y9nY",
  authDomain: "prasangi-dance-studio.firebaseapp.com",
  projectId: "prasangi-dance-studio",
  storageBucket: "prasangi-dance-studio.firebasestorage.app",
  messagingSenderId: "661682700708",
  appId: "1:661682700708:web:7ca3aa48ed42c359adc131"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);