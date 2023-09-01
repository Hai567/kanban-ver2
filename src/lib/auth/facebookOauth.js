import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { goto } from "$app/navigation"
const provider = new FacebookAuthProvider();

export const signInWithFacebook = async function () {
    await signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user)
            goto("/user")
        })
        .catch(error => console.log(error.message))
}