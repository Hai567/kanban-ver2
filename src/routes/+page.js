import { user } from "$lib/stores/userStore"
import { userData } from "$lib/stores/userDataStore"
import { goto } from "$app/navigation"

user.subscribe((authenticatedUser) => {
    if (authenticatedUser){
        userData.subscribe((userData) => {
            goto(`/user/${authenticatedUser.uid}`)
        })
    }
})