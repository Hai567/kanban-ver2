<script>
    import { userData } from "$lib/stores/userDataStore"
    import FlyInOutAnimation from "$lib/components/FlyInOutAnimation.svelte"
    let inputBio = ""
    // onMount(() => {
    //     setTimeout(() => {
    //         isChildLoaded.set(true)
    //     }, 500)
    // })
    // onDestroy(() => { isChildLoaded.set(false) })
</script>
<FlyInOutAnimation>
    <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
        <h2 class="card-title">Tell us about yourself</h2>
        <p>It could be any thing, don't worry you can always change it anytime in the profile setting</p>
        <form class="flex flex-wrap w-full justify-center gap-4">
            <input bind:value={inputBio} class="input input-bordered w-full" type="text">   
            <button disabled={inputBio.length < 5} class="btn btn-success">Update Bio</button> 
        </form>
    </div>
    </div>
</FlyInOutAnimation>