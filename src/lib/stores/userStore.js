import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const user = writable(null)
if (!browser || !auth){
    console.warn("Auth is not initialized or is not run on browser ")
}else{
    onAuthStateChanged(auth, ((userData) => {
        user.set(userData)
    }))
}