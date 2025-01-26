import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDdNEohj3SokwfoqfgpC7FvI4XsyMS9UJQ",
    authDomain: "student-management-73fd8.firebaseapp.com",
    projectId: "student-management-73fd8",
    storageBucket: "student-management-73fd8.appspot.com",
    messagingSenderId: "602123297744",
    appId: "1:602123297744:web:517e9cb33d94d928d28fd5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
