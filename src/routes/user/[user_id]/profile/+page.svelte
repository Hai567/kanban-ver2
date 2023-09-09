<script>
    import { user } from "$lib/stores/userStore"
    import { isChildLoaded } from "$lib/stores/isChildLoaded.js"
	import { onDestroy, onMount } from "svelte";

    onMount(() => { setTimeout(() => {isChildLoaded.set(true)}, 500) })
    onDestroy(() => {isChildLoaded.set(false)})
</script>

<main>
    <p>{$user.email} profile page</p>
</main>