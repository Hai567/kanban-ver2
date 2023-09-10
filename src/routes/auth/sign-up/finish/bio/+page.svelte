<script>
    import { userData } from "$lib/stores/userDataStore"
    import { onDestroy, onMount } from "svelte";
    import { isChildLoaded } from "$lib/stores/isChildLoaded"
    onMount(() => {
        setTimeout(() => {
            isChildLoaded.set(true)
        }, 500)
    })
    onDestroy(() => { isChildLoaded.set(false) })
</script>