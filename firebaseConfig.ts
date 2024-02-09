// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpkN7w0ay9nnTRJtFoL6xgzvoWxcAzNfs",
  authDomain: "kultora-66a9f.firebaseapp.com",
  databaseURL: "https://kultora-66a9f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kultora-66a9f",
  storageBucket: "kultora-66a9f.appspot.com",
  messagingSenderId: "1017335610406",
  appId: "1:1017335610406:web:95511c6f2cf36c2ed43ae7",
  measurementId: "G-MXR9RYGDEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);


