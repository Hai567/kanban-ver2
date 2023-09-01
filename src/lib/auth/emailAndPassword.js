import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth"

export const signUpWithEmailAndPass = async function(email, password) {
    await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            let user = userCredential.user
            console.log(user)
        })
        .catch(error => console.log(error.message))
}

export const signInWithEmailAndPass = async function(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            let user = userCredential.user
            console.log(user)
        })
        .catch(error => console.log(error.message))
}