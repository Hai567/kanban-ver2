import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth"
import { goto } from "$app/navigation"
import { addUserToFirestore } from "./addUserToFirestore";

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            await addUserToFirestore()
            goto(`/user/${user.uid}`)
        }).catch((error) => {
            console.log(error.message)
        });
}   