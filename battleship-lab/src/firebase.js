import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword     
} from "firebase/auth";
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
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error(error);
  }
};
const registerWithEmail = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const loginWithEmail = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logout = () => signOut(auth);

export { 
  auth, 
  db, 
  loginWithGoogle, 
  registerWithEmail, 
  loginWithEmail, 
  logout 
};
