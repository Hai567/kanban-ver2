import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const user = writable(false)
if (!browser || !auth){
    console.warn("Auth is not initialized or is not run on browser ")
}else{
    onAuthStateChanged(auth, ((authenticatedUser) => {
        user.set(authenticatedUser)
    }))
}