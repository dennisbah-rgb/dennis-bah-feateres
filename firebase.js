import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "DIN_API_KEY",
  authDomain: "DIN_AUTH_DOMAIN",
  projectId: "DIN_PROJECT_ID",
  storageBucket: "DIN_STORAGE_BUCKET",
  messagingSenderId: "DIN_SENDER_ID",
  appId: "DIN_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export { collection, addDoc, getDocs };