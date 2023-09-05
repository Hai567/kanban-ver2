const characters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];
import { db } from "$lib/firebase/firebaseConfig"
import { getDocs, collection } from "firebase/firestore"
let alreadyIds = []
export let createRandomKanbanId = async function () {
    let isDuplicate = true
    let newID = ""
    await getDocs(collection(db, "kanbans"))
        .then(docs => {
            docs.forEach(doc => {
                alreadyIds.push(doc.id)
            })
        })
    while (isDuplicate){
        for (let i = 0; i < 20; i++){
            newID = newID + characters[Math.floor(Math.random() * 58)]
        }
        if (alreadyIds.includes(newID) == false){
            isDuplicate = false
            return newID
        }
    }
}