<script>
    import { user } from "$lib/stores/userStore"
    import { userData } from "$lib/stores/userDataStore" 
    import { goto } from "$app/navigation"
    import { onMount } from "svelte";
    export let userIDParam = ""
    onMount(() => {
        setTimeout(() => {
            if (!$user){
                goto("/auth/sign-in")
            }
        }, 2000)
    })
</script>
{#if $user && $userData}
    {#if $user.uid == userIDParam}
        <slot></slot>
    {:else}
        <p>You do not have permission to view this page.</p>
    {/if}
{:else}
    <p>Please sign in to view the contents.</p>
{/if}
