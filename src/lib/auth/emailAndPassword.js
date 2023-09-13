import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth"
import { goto } from "$app/navigation"
import { addUserToFirestore } from "./addUserToFirestore";

export const signUpWithEmailAndPass = async function(email, password) {
    try {
        let userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await addUserToFirestore(userCredential.user)
        goto(`/auth/sign-up/finish/username`)
        return null
    } catch (error) {
        return error
    }
}

export const signInWithEmailAndPass = async function(email, password) {
    try {
        let userCredential = await signInWithEmailAndPassword(auth, email, password)
        let user = userCredential.user
        goto(`/user/${user.uid}`)
        return null
    } catch (error) {
        return error
    }
}