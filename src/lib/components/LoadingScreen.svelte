<script>
    import FadeOutAnimation from "./FadeOutAnimation.svelte";
    export let loadingType = "loading-infinity"
    let loadingClass = `loading text-secondary w-16 ${loadingType}`
</script>
<FadeOutAnimation>
    <div style="height: 80vh;" class="loading-screen flex justify-center items-center w-full">
        <span class={loadingClass}></span>
    </div>
</FadeOutAnimation>