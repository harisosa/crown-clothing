// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,
    signInWithPopup, 
    GoogleAuthProvider} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjuyeAEXRaXbQvl2D0WJ8C5tjDLXDNic0",
  authDomain: "cloting-db-c41d1.firebaseapp.com",
  projectId: "cloting-db-c41d1",
  storageBucket: "cloting-db-c41d1.appspot.com",
  messagingSenderId: "321060304613",
  appId: "1:321060304613:web:04853a95361483a980460c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth,provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth)=> {
    const userDocRef = await doc(db,'users',userAuth.uid)
    console.log(userDocRef)    
    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot)

}

