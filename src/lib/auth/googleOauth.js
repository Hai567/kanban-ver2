import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth"

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user)
        }).catch((error) => {
            console.log(error.message)
        });
}   