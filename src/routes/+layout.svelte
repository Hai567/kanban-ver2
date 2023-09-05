<script>
    import "../app.css"
    import NavBar from "../lib/components/NavBar.svelte";
    export let bodyTheme

</script>

<NavBar bind:bodyTheme={bodyTheme} />
<div data-theme={bodyTheme||"light"} style="height: 100%;">
    <slot />
</div>