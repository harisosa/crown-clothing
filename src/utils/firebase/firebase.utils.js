// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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

export const addCollectionAndDocuments = async (collectionKey,objectToAdd) => {
    const collectionRef = collection(db,collectionKey)
    const batch = writeBatch(db);

    objectToAdd.forEach((object)=> {
        const docRef = doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object)
    })

    await batch.commit();
}

export const getCategoriesAndDocuments = async ()=> {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=> {
        const {title,items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{})

    return categoryMap;
}


export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {})=> {
    if(!userAuth)return;
    const userDocRef = await doc(db,'users',userAuth.uid) 
    const userSnapshot = await getDoc(userDocRef);
    //console.log(userSnapshot.exists())

    if(!userSnapshot.exists()){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }catch (error){
            console.log('error creating the user',error.Message)
        }
    }

    return userDocRef;
}


export const CreateAuthUserWithEmailAndPassword = async (email,password) => {
     if(!email || !password)return;

     return await createUserWithEmailAndPassword(auth,email,password)
}


export const SignInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password)return;

    return await signInWithEmailAndPassword(auth,email,password)
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangeListener = (callback)=> onAuthStateChanged(auth,callback)
