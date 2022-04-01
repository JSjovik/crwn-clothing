import {initializeApp} from 'firebase/app';
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDNJWYGseY7reXVy8CywzBJjcPWjb_6w_U",
    authDomain: "crwn-clothing-f122e.firebaseapp.com",
    projectId: "crwn-clothing-f122e",
    storageBucket: "crwn-clothing-f122e.appspot.com",
    messagingSenderId: "818953971359",
    appId: "1:818953971359:web:5327b413de2dbae1a864aa"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: "select_account"});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithGoogleRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInformation ={}) => {
    if (!userAuth) 
        return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation});
        } catch (error) {
            console.log('error reating the user', error.message);
        }
    };

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) 
        return;
    return await createUserWithEmailAndPassword(auth, email, password);
};