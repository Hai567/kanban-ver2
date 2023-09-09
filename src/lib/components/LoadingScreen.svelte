<script>
    import FadeOutAnimation from "./FadeOutAnimation.svelte";
    export let loadingType = "loading-infinity"
    let loadingClass = `loading text-secondary w-16 ${loadingType} z-20`
</script>
<FadeOutAnimation>
    <div class="w-full h-screen absolute top-0 left-0 flex justify-center items-center">
        <span class={loadingClass}></span>
        <div class="bg-base-100 z-10 opacity-60 loading-screen-bg absolute h-full w-full"></div>
    </div>
</FadeOutAnimation>