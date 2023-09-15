import { auth, db } from "$lib/firebase/firebaseConfig";
import { sendEmailVerification } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"

export async function sendVerificationEmailThenUpdate(user) {
    await sendEmailVerification(user.currentUser)
    if (user){
        if ( user.emailVerified == false ){
            await updateDoc(doc(db, "users", user.uid), {
                emailVerified: true
            })
        }
        }
}