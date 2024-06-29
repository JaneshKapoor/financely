// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMSgC85dYexeqbyOCGHFTed-GTJ2FET8o",
  authDomain: "financely-cc4d2.firebaseapp.com",
  projectId: "financely-cc4d2",
  storageBucket: "financely-cc4d2.appspot.com",
  messagingSenderId: "497121872732",
  appId: "1:497121872732:web:c6230abaea5cf91bb8cf99",
  measurementId: "G-KGZE28CESB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};