/* eslint-disable no-unused-vars */
import { db } from "$lib/firebase/firebaseConfig"
import { user } from "$lib/stores/userStore.js"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"


export let addUserToFirestore = async function () {
    await user.subscribe( async (userData) => {
        await getDoc(doc(db, "users", userData.uid))
            .then(async(user) => {
                if (user.exists == true){
                    console.log("User is already in db")
                }else{
                    let photoURL = ""
                    if (userData.photoURL == null){
                        photoURL = "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                    }else{
                        photoURL = userData.photoURL
                    }
                    await setDoc(doc(db, "users", userData.uid), {
                        displayName: userData.displayName,
                        email: userData.email,
                        emailVerified: userData.emailVerified,
                        isAnonymous: userData.isAnonymous,
                        phoneNumber: userData.phoneNumber,
                        photoURL: photoURL,
                        kanbans: []
                    })
                        .then(() => console.log("Add user to db successfully"))
                        .catch((e) => console.log(e.message))
                }
            })
    })
}
// batch.set(doc(db, "users", user.uid), {

// })