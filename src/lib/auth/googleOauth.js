import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth"
import { goto } from "$app/navigation"
import { addUserToFirestore } from "./addUserToFirestore";

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    try {
        let authenticatedUser = await signInWithPopup(auth, provider)
            .then(async (result) => {
                return result.user;
            }).catch((error) => {
                console.log(error.message)
            });
        
        await addUserToFirestore()
        await goto(`/user/${authenticatedUser.uid}`)
    } catch (error) {
        console.log(error.message)
    }
}   