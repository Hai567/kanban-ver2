<script>
    import { user } from "$lib/stores/userStore"
    export let userIDParam = ""
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
