import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// require.resolve();

const firebaseConfig = {
    apiKey: 'AIzaSyAnYA7oRdS_cdJZSK2IULF4taXxpiKBgi8',
    authDomain: 'clone-challenge-651b0.firebaseapp.com',
    projectId: 'clone-challenge-651b0',
    storageBucket: 'clone-challenge-651b0.appspot.com',
    messagingSenderId: '888230279026',
    appId: '1:888230279026:web:14586c6d13c20307954feb',
    measurementId: 'G-0MY0XV1TNC',
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore();
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth(app);
export { db, auth };
