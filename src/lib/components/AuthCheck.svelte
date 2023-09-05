<script>
    import { user } from "$lib/stores/userStore"
    export let userIDParam = ""
</script>

{#if $user}
    {#if $user.uid == userIDParam}
        <slot></slot>
    {:else}
        <p>Please sign in to view the contents.</p>
    {/if}
{:else}
    <p>Please sign in to view the contents.</p>
{/if}
