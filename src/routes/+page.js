import { user } from "$lib/stores/userStore"
import { goto } from "$app/navigation"

export function load() {
    user.subscribe((userData) => {
        if ( userData ){
            goto(`/user/${userData.uid}`)
        }
    })
}