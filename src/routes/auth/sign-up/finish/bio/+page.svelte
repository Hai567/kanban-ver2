<script>
    import { user } from "$lib/stores/userStore"
    import FlyInOutAnimation from "$lib/components/FlyInOutAnimation.svelte"
    import { db } from "$lib/firebase/firebaseConfig"
    import { doc, updateDoc } from "firebase/firestore"
    import { goto } from "$app/navigation"

    let inputBio = "New-comer"

    async function updateBio(inputBio) {
        let result = await updateDoc(doc(db, "users", $user.uid), {
            bio: inputBio
        })
        console.log(result)
        goto(`/auth/sign-up/done`)
    }
</script>
<FlyInOutAnimation>
    <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
        <h2 class="card-title">Tell us about yourself</h2>
        <p>It could be any thing, don't worry you can always change it anytime in the profile setting</p>
        <form class="flex flex-wrap w-full justify-center gap-4">
            <input bind:value={inputBio} class="input input-bordered w-full" type="text" on:click={() => {inputBio=""}}>   
            <div class="flex justify-end w-full">
                {#if inputBio.length < 5 || inputBio=="New-comer"}
                    <button on:click={() => {updateBio("New-comer")}} class="btn"><a href="/auth/sign-up/done">Skip</a></button> 
                {:else}
                    <button on:click={() => {updateBio(inputBio)}} class="btn btn-success">Update Bio</button> 
                {/if}
            </div>
        </form>
    </div>
    </div>
</FlyInOutAnimation>