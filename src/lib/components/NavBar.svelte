<script>
  import DarkModeSwitch from "./DarkModeSwitch.svelte";
  import { user } from "$lib/stores/userStore"
  import { goto } from "$app/navigation"
  import Drawer from "./Drawer.svelte";
  import { signOutHandler } from "$lib/auth/signOut"
  let isDarkMode = false
  let navbarTheme = ""
  export let bodyTheme = ""
  function toggleDarkModeHandler() {
    isDarkMode = !isDarkMode
    if (isDarkMode){
      navbarTheme = "night"
      bodyTheme = "dracula"
    }else{
      navbarTheme = "light"
      bodyTheme = "retro"
    }
  }
</script>
<div id="navbar-top" class="navbar bg-base-100" data-theme={navbarTheme||"light"}>
    <div class="navbar-start">
      <Drawer />
    </div>
    <div class="navbar-center">
      <a href="/" class="btn btn-ghost normal-case text-xl">Kanban App</a>
    </div>
    <div class="navbar-end gap-2">
      <button id="toggle-darkmode" class="btn btn-square btn-ghost">
        <DarkModeSwitch on:click={toggleDarkModeHandler} />
      </button>
      {#if $user}
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img src="https://lh3.googleusercontent.com/a/AAcHTtdL0H2aBC-Vm0_Ck2No3qscVNSGt3gt7NDZWc_tbbP6Cw=s96-c" />
            </div>
          </label>
          <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a on:click={() => goto(`/user/${$user.uid}/profile`)} class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li on:click={signOutHandler}><a>Sign Out</a></li>
          </ul>
        </div>
      {:else}
        <div>
          <a class="px-5 py-4 rounded-xl bg-base-300" href="/auth/sign-in">Sign In</a>
        </div>
      {/if}
    </div>
  </div>