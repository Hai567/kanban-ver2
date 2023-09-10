import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "$lib/firebase/firebaseConfig"

export const userData = writable(null)

if (!browser || !auth){
    console.warn("Auth is not initialized or is not run on browser ")
}else{
    onAuthStateChanged(auth, ((authenticatedUser) => {
        if (authenticatedUser){
            if (authenticatedUser){
                onSnapshot(doc(db, "users", authenticatedUser.uid), (foundUser) => {
                    userData.set(foundUser.data())
                })
            }
        }
    }))
}

