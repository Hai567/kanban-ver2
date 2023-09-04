<script>
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { user } from "$lib/stores/userStore"
    import { signOutHandler } from "$lib/auth/signOut"
</script>

<AuthCheck>
    <h1>Hello {$user.displayName}</h1>
    <button on:click={signOutHandler} >Sign Out</button>
</AuthCheck>