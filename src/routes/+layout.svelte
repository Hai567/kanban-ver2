<script>
    import "../app.css"
    import NavBar from "../lib/components/NavBar.svelte";
    export let appTheme
    import Footer from "../lib/components/Footer.svelte";

</script>

<NavBar bind:appTheme={appTheme} />
<div data-theme={appTheme||"light"} style="height: 100%;">
    <slot />
</div>
<footer data-theme={appTheme||"light"}>
    <Footer />
</footer>