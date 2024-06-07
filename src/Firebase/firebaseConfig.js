// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
 //https:firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDgIqHzfog4x9neuKwKTy2bPOJGN_FTnk",
  authDomain: "prisma-e5930.firebaseapp.com",
  projectId: "prisma-e5930",
  storageBucket: "prisma-e5930.appspot.com",
  messagingSenderId: "395251630949",
  appId: "1:395251630949:web:c5bbee4c44356b41e4578c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dataBase = getFirestore(app);
//export const googleProvider = new googleProvider();