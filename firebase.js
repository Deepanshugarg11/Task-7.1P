// Correct placement of imports at the top of the file
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = { 
  apiKey: "AIzaSyDDejZRRTTKvQhlcO3ZboBMw3CXNGqKsC8",
  authDomain: "deepanshhu.firebaseapp.com",
  projectId: "deepanshhu",
  storageBucket: "deepanshhu.appspot.com",
  messagingSenderId: "281570784000",
  appId: "1:281570784000:web:2e0c5a60a642540d6cb9e5",
  measurementId: "G-57J90ZTZZJ"
};


// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

// Set up Google Auth Provider
const provider = new GoogleAuthProvider(); 
provider.setCustomParameters({
  prompt: "select_account"
});

// Firebase Authentication
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Firestore Database
export const db = getFirestore();

// Create user document from authentication
export const createUserDocFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }

  return userDocRef;
};

// Auth functions
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export default db;
