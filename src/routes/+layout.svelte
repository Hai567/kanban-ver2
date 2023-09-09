<script>
    import "../app.css"
    import NavBar from "../lib/components/NavBar.svelte";
    export let appTheme
    import Footer from "../lib/components/Footer.svelte";
    import LoadingScreen from "$lib/components/LoadingScreen.svelte";
    import { isChildLoaded } from "$lib/stores/isChildLoaded.js"
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    let mode = ""
    if (dev){
        mode = "development"
    }else{
        mode = "production"
    }
    inject({mode})
</script>
{#if $isChildLoaded == false}
    <LoadingScreen />
{/if}
<NavBar bind:appTheme={appTheme} />
<div data-theme={appTheme||"light"} style="height: 100%;">
    <slot />
</div>
<footer data-theme={appTheme||"light"}>
    <Footer />
</footer>