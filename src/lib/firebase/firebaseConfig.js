import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyASfkpFnVRyt5kPypl1gOCjqqMBClFgkfI",
    authDomain: "kanban-80b0a.firebaseapp.com",
    projectId: "kanban-80b0a",
    storageBucket: "kanban-80b0a.appspot.com",
    messagingSenderId: "927563163099",
    appId: "1:927563163099:web:048b9d0c239b183a80b3fe",
    measurementId: "G-B11XXY9GRD"
};

initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore()