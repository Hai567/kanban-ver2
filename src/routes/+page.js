import { redirect } from "@sveltejs/kit"
import { user } from "$lib/stores/userStore"

export function load() {
    user.subscribe((userData) => {
        if ( userData ){
            throw redirect(307, `/user/${userData.uid}`)
        }
    })
}