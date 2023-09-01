import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth"
import { goto } from "$app/navigation"

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user)
            goto("/user")
        }).catch((error) => {
            console.log(error.message)
        });
}   