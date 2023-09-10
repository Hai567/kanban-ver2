<script>
    import { fade } from "svelte/transition";
    export let loadingType = "loading-infinity"
    let loadingClass = `loading text-secondary w-16 ${loadingType} z-30`
</script>
<div class="w-full h-screen z-10 top-0 left-0 flex justify-center items-center fixed" out:fade={{ duration: 350}}>
    <span class={loadingClass}></span>
    <div class="bg-base-100 z-20 opacity-60 loading-screen-bg absolute h-full w-full fixed"></div>
</div>