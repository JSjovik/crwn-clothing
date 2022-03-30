import {initializeApp} from 'firebase/app';
import {getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect} from 'firebase/auth'
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createAt});
        } catch (error) {
            console.log('error reating the user', error.message);
        }
    };

    return userDocRef;
};