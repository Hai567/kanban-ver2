<script>
    import { isChildLoaded } from "$lib/stores/isChildLoaded"
    import { onMount } from "svelte";
    onMount(() => {
        isChildLoaded.set(true)
    })
</script>

<div>
    <main class="h-screen">
        <div class="m-auto w-3/4 card bg-base-100 shadow-xl">
            <div class="card-body">
                <div>
                    <div class="z-20 relative flex flex-wrap text-center">
                        <h3 class="w-full text-lg font-bold">Seems like you are so lost now!</h3>
                        <p>Head back to the <a data-sveltekit-preload-data="tap" class="text-info" href="/">home page</a></p>
                    </div>
                    <br>
                    <div class="cover-up w-full h-3/4 z-10 absolute opacity-0" />
                    <div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/26tn8cc5IQjkWpJhm" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
                </div>
            </div>
        </div>
    </main>
</div>