<script>
    import FlyInOutAnimation from "$lib/components/FlyInOutAnimation.svelte"
    import { isChildLoaded } from "$lib/stores/isChildLoaded.js"
    import { user } from "$lib/stores/userStore"
    import { onMount } from "svelte";
    import { goto } from "$app/navigation"
    let count = 5
    onMount(() => {
        isChildLoaded.set(true)
        setInterval(() => {
            count = count - 1
        }, 1000)
        setTimeout(() => { goto(`/user/${$user.uid}`) }, 5000)
    })
</script>

<FlyInOutAnimation>
    <main class=" h-screen flex items-center">
        <div class="m-auto w-fit card bg-base-100 shadow-xl">
            <div class="card-body">
                <div>
                    <div class="z-20 relative flex flex-wrap text-center">
                        <h3 class="w-full text-lg font-bold">Congrats, all set!</h3>
                        <p class="w-full">Continue to your workspace <a class="text-info" href={`/user/${$user.uid}`}>now</a></p>
                        <p class="w-full">Or you will be redirected there after {count}</p>
                    </div>
                    <br>
                    <div class="cover-up w-full h-3/4 z-10 absolute opacity-0" />
                    <div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/g9582DNuQppxC" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
                </div>
            </div>
        </div>
    </main>
</FlyInOutAnimation>