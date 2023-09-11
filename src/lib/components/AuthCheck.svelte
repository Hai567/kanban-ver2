<script>
    import { user } from "$lib/stores/userStore"
    import { goto } from "$app/navigation"
    import { onMount } from "svelte";
    export let userIDParam = ""
    onMount(() => {
        if ( !$user ){
            setTimeout(() => {
                goto("/auth/sign-in")
            }, 3000)
        }
    })
</script>
{#if $user}
    {#if $user.uid == userIDParam}
        <slot></slot>
    {:else}
        <p>You do not have permission to view this page.</p>
    {/if}
{:else}
    <p>Please sign in to view the contents.</p>
{/if}
