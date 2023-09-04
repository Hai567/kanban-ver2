import { db } from "$lib/firebase/firebaseConfig"
import { user } from "$lib/stores/userStore.js"
import { writeBatch, collection, doc, getDoc } from "firebase/firestore"

let batch = writeBatch(db)

export let addUserToFirestore = async function () {
    user.subscribe(data => {
        console.log(data)
    })
}
// batch.set(doc(db, "users", user.uid), {

// })