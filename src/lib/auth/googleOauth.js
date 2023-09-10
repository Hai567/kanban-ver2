import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth"
import { goto } from "$app/navigation"
import { addUserToFirestore } from "./addUserToFirestore";

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    try {
        let authenticatedUser = await signInWithPopup(auth, provider)
            .then(async (result) => {
                let userAlreadyInDb = await addUserToFirestore(result.user)
                // Make user finish setting up their info 
                // if (!userAlreadyInDb){
                //     goto("/sign-up/finish")
                // }
                return result.user
            }).catch((error) => {
                console.log(error.message)
            });
        
        await goto(`/user/${authenticatedUser.uid}`)
    } catch (error) {
        console.log(error.message)
    }
}   