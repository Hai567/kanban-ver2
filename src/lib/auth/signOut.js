import { signOut } from "firebase/auth"
import { auth } from "$lib/firebase/firebaseConfig"
import { goto } from "$app/navigation"

export const signOutHandler = async function() {
    await signOut(auth)
        .then(() => goto("/auth/sign-in"))
        .catch(error => console.log(error.message))
}