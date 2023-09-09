<script>
	import { onDestroy, onMount } from "svelte";
    import FlyInOutAnimation from "$lib/components/FlyInOutAnimation.svelte"
    import { isChildLoaded } from "$lib/stores/isChildLoaded.js"
    
    onMount(() => { setTimeout(() => {isChildLoaded.set(true)}, 500) })
    onDestroy(() => {isChildLoaded.set(false)})
</script>

<FlyInOutAnimation>
    <main>
        <div class="hero min-h-screen" style="background-image: url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg);">
            <div class="hero-overlay bg-opacity-60"></div>
            <div class="hero-content text-center text-neutral-content">
                <div class="max-w-md">
                <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
                <p class="mb-5">Welcome to The Kanban App - A free to use planning app</p>
                <a href="/auth/sign-up"><button class="btn btn-primary">Get Started, it's free</button></a>
                </div>
            </div>
        </div>
    </main>
</FlyInOutAnimation>