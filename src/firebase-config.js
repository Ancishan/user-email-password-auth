// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUMCeePmSzYNcr5hZGMjmb6z3DmakXoYM",
  authDomain: "user-email-password-auth-bc1d9.firebaseapp.com",
  projectId: "user-email-password-auth-bc1d9",
  storageBucket: "user-email-password-auth-bc1d9.appspot.com",
  messagingSenderId: "706091000829",
  appId: "1:706091000829:web:56ee7a66127ec3ccb9af94",
  measurementId: "G-Q782G7YHQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

export default auth;