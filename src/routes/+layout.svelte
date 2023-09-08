<script>
    import "../app.css"
    import NavBar from "../lib/components/NavBar.svelte";
    export let appTheme
    import Footer from "../lib/components/Footer.svelte";
	import { onDestroy, onMount } from "svelte";
    import LoadingScreen from "$lib/components/LoadingScreen.svelte";
    $: isLoaded = false
    onMount(() => {
        isLoaded = true
    })
    onDestroy(() => {
        isLoaded = false
    })
</script>

{#if isLoaded == false}
    <LoadingScreen />
{/if}
<NavBar bind:appTheme={appTheme} />
<div data-theme={appTheme||"light"} style="height: 100%;">
    <slot />
</div>
<footer data-theme={appTheme||"light"}>
    <Footer />
</footer>