<script>
    export let loadingType = "loading-infinity"
    let loadingClass = `loading text-secondary w-16 ${loadingType}`
</script>
<div style="height: 80%;" class="loading-screen flex justify-center items-center w-full opacity-50">
    <span class={loadingClass}></span>
</div>