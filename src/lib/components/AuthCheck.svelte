<script>
    import { user } from "$lib/stores/userStore"
</script>

{#if $user}
    <slot></slot>
{:else}
    <p>Please sign in to view the contents.</p>
{/if}
