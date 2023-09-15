<script>
    import { goto } from "$app/navigation"
    import { user } from "$lib/stores/userStore"
    import { userData } from "$lib/stores/userDataStore"
</script>
<div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
        <label for="my-drawer" class="btn bg-base-100 drawer-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
    </div> 
    <div class="drawer-side">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <!-- Sidebar content here -->
            <li><a href="/"><i class="fa-solid fa-house mr-4"></i> Home</a></li>
            { #if $user && $userData }
                <li on:click={() => goto(`/user/${$user.uid}`)}><a><i class="fa-solid fa-briefcase mr-4"></i> Your Workspace</a></li>
                <li class="relative bottom-0 mt-auto" on:click={() => goto(`/user/${$user.uid}`)}><a><i class="fa-solid fa-gear mr-4"></i> Settings</a></li>
            {:else}
                <li class="relative bottom-0 mt-auto self-end w-4/5 grid grid-cols-2 gap-8">
                    <button class="px-6 py-4 rounded-lg bg-info" on:click={() => goto(`/user/${$user.uid}`)}>Sign In</button>
                    <button class="px-6 py-4 rounded-lg bg-accent" on:click={() => goto(`/user/${$user.uid}`)}>Sign Up</button>
                </li>
            {/if}
        </ul>
    </div>
</div>