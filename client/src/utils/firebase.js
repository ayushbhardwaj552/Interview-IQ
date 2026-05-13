// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "interviewiq-b8f7a.firebaseapp.com",
  projectId: "interviewiq-b8f7a",
  storageBucket: "interviewiq-b8f7a.firebasestorage.app",
  messagingSenderId: "330539656691",
  appId: "1:330539656691:web:df63a6931af2f020571e86"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export{auth, provider};
