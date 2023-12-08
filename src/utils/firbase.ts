// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgioEEZ4Z_65u4hAkjorOBfeeU0nSnL_s",
  authDomain: "social-dashboard-92418.firebaseapp.com",
  projectId: "social-dashboard-92418",
  storageBucket: "social-dashboard-92418.appspot.com",
  messagingSenderId: "5464703368",
  appId: "1:5464703368:web:72f48cd184b9aa7cbf7a3d",
  measurementId: "G-G3LS7RPLPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const analytics = getAnalytics(app);

export const auth = getAuth();