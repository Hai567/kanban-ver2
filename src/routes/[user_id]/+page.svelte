<script>
    import { user } from "$lib/stores/userStore"
    import { signOutHandler } from "$lib/auth/signOut"
</script>

<h1>Hello {$user.email}</h1>
<button on:click={signOutHandler} >Sign Out</button>