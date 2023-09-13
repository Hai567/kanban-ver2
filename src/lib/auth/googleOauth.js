import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth"
import { goto } from "$app/navigation"
import { addUserToFirestore } from "./addUserToFirestore";

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
        .then(async (result) => {
            let userAlreadyInDb = await addUserToFirestore(result.user)
            // Make user finish setting up their info 
            if (!userAlreadyInDb){
                goto("/auth/sign-up/finish/username")
            }else{
                goto(`/user/${result.uid}`)
            }
            return result.user
        }).catch((error) => {
            console.log(error.message)
        });
}   