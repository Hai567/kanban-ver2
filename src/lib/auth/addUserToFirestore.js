/* eslint-disable no-unused-vars */
import { db } from "$lib/firebase/firebaseConfig"
import { user } from "$lib/stores/userStore.js"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"

export let addUserToFirestore = async function (userData) {
    // Return if user is already in the db
    return new Promise((resolve, reject) => {
        async function ifUserExits() {
            try {
                let foundUser = await getDoc(doc(db, "users", userData.uid))
                return foundUser.exists()
            } catch (error) {
                console.log(error.message)
                return false
            }
        }

        return (async function() {
            if ( await ifUserExits() == true){
                console.log("User is already in db")
                resolve(true) 
            }else{
                let photoURL = photoURL = userData.photoURL || "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                    
                try {
                    await setDoc(doc(db, "users", userData.uid), {
                        displayName: userData.displayName,
                        email: userData.email,
                        emailVerified: userData.emailVerified,
                        isAnonymous: userData.isAnonymous,
                        phoneNumber: userData.phoneNumber,
                        photoURL: photoURL,
                        kanbans: [],
                        createdAt: serverTimestamp(),
                        isProfileSetupCorrectly: false
                    })
                    console.log("Added user to db successfully")
                    resolve(false) 
                } catch (error) {
                    console.log(error.message)
                    reject(false)
                }
            }
        })()
    })
}