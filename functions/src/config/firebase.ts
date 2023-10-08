import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBi6FZEtWHpyvz1KKDznKkHVFf-oW1Yypw",
  authDomain: "residenciaiii.firebaseapp.com",
  projectId: "residenciaiii",
  storageBucket: "residenciaiii.appspot.com",
  messagingSenderId: "386156246512",
  appId: "1:386156246512:web:c7f3ab0e2ebb35ba221935",
  measurementId: "G-FQ951DDYN6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);