<script>
    import { userData } from "$lib/stores/userDataStore"
    import { onDestroy, onMount } from "svelte";
    import { isChildLoaded } from "$lib/stores/isChildLoaded"
    onMount(() => {
        setTimeout(() => {
            isChildLoaded.set(true)
        }, 500)
    })
    onDestroy(() => { isChildLoaded.set(false) })
</script>
{#if $userData}
    <div style="max-width: 35em;" class="flex justify-center m-auto flex-wrap gap-6">
        <h1 class="w-full text-center">Let's get your account set up before continue</h1>
        <ul class="steps">
            <a class="step step-primary">Register</a>
            <a href="/auth/sign-up/finish/username" class="step step-primary">Choose username</a>
            <a href="/auth/sign-up/finish/avatar" class="step">Update Avatar</a>
            <a href="/auth/sign-up/finish/bio" class="step">Bio</a>
        </ul>

        <div class="w-full">
            <slot />
        </div>
    </div>
{/if}