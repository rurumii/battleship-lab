import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAxQVGV2CYhyvIM2Er0_7_Sfiy9s5AIoy8",
  authDomain: "battleship-lab.firebaseapp.com",
  projectId: "battleship-lab",
  storageBucket: "battleship-lab.firebasestorage.app",
  messagingSenderId: "392056443952",
  appId: "1:392056443952:web:7640d50a39619734f449f5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);