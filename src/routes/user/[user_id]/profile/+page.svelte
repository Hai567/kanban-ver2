<script>
    import { userData } from "$lib/stores/userDataStore"
    import { isChildLoaded } from "$lib/stores/isChildLoaded.js"
	import { onDestroy, onMount } from "svelte";

    onMount(() => { setTimeout(() => {isChildLoaded.set(true)}, 500) })
    onDestroy(() => {isChildLoaded.set(false)})
</script>

<main>
    <div class="card w-3/4 m-auto bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="avatar justify-center">
                <div class="mask mask-squircle w-1/3">
                    <img src={$userData.photoURL} />
                </div>
            </div>
            <h4 class="text-center font-bold text-2xl">How is your day {$userData.displayName}</h4>
        </div>
    </div>
</main>