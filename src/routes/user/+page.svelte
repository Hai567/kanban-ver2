<script>
    import CheckAuth from "../../lib/components/checkAuth.svelte";
    import { user } from "$lib/stores/userStore"
    import { signOutHandler } from "$lib/auth/signOut"
</script>

<CheckAuth>
    <h1>Hello {$user.displayName}</h1>
    <button on:click={signOutHandler} >Sign Out</button>
</CheckAuth>