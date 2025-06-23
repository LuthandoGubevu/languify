
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getAnalytics, type Analytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0zfXk27ue23ybbErlWqOqHcCw8Sf_lo0",
    authDomain: "languify-bff84.firebaseapp.com",
    projectId: "languify-bff84",
    storageBucket: "languify-bff84.appspot.com",
    messagingSenderId: "867131624947",
    appId: "1:867131624947:web:89aac9e4523be02685d686",
    measurementId: "G-KWJTQ3BCNH"
};


// Initialize Firebase
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);
const analytics: Analytics | undefined = typeof window !== 'undefined' ? getAnalytics(app) : undefined;


export { app, auth, db, storage, analytics };
