<script>
    import FadeOutAnimation from "./FadeOutAnimation.svelte";
    export let loadingType = "loading-infinity"
    let loadingClass = `loading text-secondary w-16 ${loadingType}`
</script>
<FadeOutAnimation>
    <div style="height: 100vh;" class="loading-screen flex justify-center items-center w-full absolute h-full bg-base-100 opacity-50 top-0 left-0">
        <span class={loadingClass}></span>
    </div>
</FadeOutAnimation>