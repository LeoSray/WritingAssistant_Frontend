// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDocRgvfLdY68NLL9T1I6yOwFmhDighdcE",
  authDomain: "nextauthentication-44994.firebaseapp.com",
  projectId: "nextauthentication-44994",
  storageBucket: "nextauthentication-44994.appspot.com",
  messagingSenderId: "258204825668",
  appId: "1:258204825668:web:568398468857cbb09de411"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
