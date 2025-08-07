import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut } from "firebase/auth";

import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyA3SjMOFRv6yYxOe-tp3sIqXCtfCyiQfAA",
  authDomain: "netflix-clone-6f664.firebaseapp.com",
  projectId: "netflix-clone-6f664",
  storageBucket: "netflix-clone-6f664.firebasestorage.app",
  messagingSenderId: "885460154938",
  appId: "1:885460154938:web:83c738c344e003edfdd303",
  measurementId: "G-Z0E232Q987"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); 

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
        
    } catch (error) {
        console.log("error:", error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log("error", error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = async () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};







