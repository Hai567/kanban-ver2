import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDlNvxRVdUH6fREd6Yg4z2NYRDygN9XJUk",
    authDomain: "kanban-app-385302.firebaseapp.com",
    projectId: "kanban-app-385302",
    storageBucket: "kanban-app-385302.appspot.com",
    messagingSenderId: "1022373090427",
    appId: "1:1022373090427:web:e448ad4d01c6f698f17ede",
    measurementId: "G-EVS61KYT5E"
  };

initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore()