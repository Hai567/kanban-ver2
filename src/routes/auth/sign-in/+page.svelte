<script>
    import { fly } from "svelte/transition";
    import { signInWithGoogle } from "$lib/auth/googleOauth";
    import { signInWithFacebook } from "$lib/auth/facebookOauth";
    import { signInWithEmailAndPass } from "$lib/auth/emailAndPassword"; 
    import { isChildLoaded } from "$lib/stores/isChildLoaded.js"
	import { onDestroy, onMount } from "svelte";
    import { user } from "$lib/stores/userStore.js"
    import { userData } from "$lib/stores/userDataStore.js"
    import { goto } from "$app/navigation"

    onMount(() => {     
        setTimeout(() => {
            isChildLoaded.set(true)
            if ($user && $userData){
                console.log(123)
                goto(`/user/${$user.uid}`)
            }
            }, 500) 

    })
    onDestroy(() => {isChildLoaded.set(false)})
    
    // Form validation
    let password = ""
    let email = ""
    let validEmail = true
    let validPassword = true
    $: isUserEligible = validEmail && validPassword
    let validateEmail = function () {
        let emailRe = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
        validEmail = emailRe.test(email)
    }
    let validatePassword = function() {
        // 5 to 20 characters, at least: 1 uppercase, 1 lowercase, 1 digit 
        let passwordRe = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,20}$/
        validPassword = passwordRe.test(password)
    }
    ////////////////////////////////
    let firebaseErrorMessage = ""
</script>

<main class="sign-up-main h-full mx-auto w-11/12 md:w-4/6 flex items-center justify-center">
    <div class="sign-in-container rounded-3xl justify-center lg:grid lg:grid-cols-2 p-8 md:flex md:flex-wrap sm:w-11/12" data-theme="light" in:fly={{x: "100%", duration: 400, delay: 500}} out:fly={{x: "-100%", duration: 400}}>
        <div class="sign-up-image flex lg:border-r-2 lg:pl-1 lg:p-12">
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img class="rounded-3xl object-cover" src="/images/sign-in.png" alt="Sign In Image">
        </div>
        <div class="sign-in-form flex justify-center items-center flex-wrap">
            <form class="form-control max-w-xs mb-6 w-11/12 relative top-0" on:submit|preventDefault={ 
                async () => {
                    firebaseErrorMessage = await signInWithEmailAndPass(email, password)
                }
            }>
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label">
                    <span class="label-text">Enter your email</span>
                </label>
                <input bind:value={email} on:blur={validateEmail} type="text" placeholder="Email goes here" class="input input-bordered w-full max-w-xs" required />
                <span class:hidden={validEmail} class="error-message text-error">Wrong email format</span>

                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label">
                    <span class="label-text">Enter the password</span>
                </label>
                <input bind:value={password} on:blur={validatePassword} type="password" placeholder="Password goes here" class="input input-bordered w-full max-w-xs" required />
                <span class:hidden={validPassword} class="error-message text-error">Password must contains 8 to 20 characters with at least 1 uppercase, 1 lowercase, 1 digit</span>

                <button disabled={!isUserEligible} class="btn btn-primary mt-3" type="submit">Sign In</button>
                {#if firebaseErrorMessage}
                    <p class="text-error">{firebaseErrorMessage.code}</p>
                {/if}
            </form>
            <h3 class="text-center w-full">Don't have an account? Don't worry, sign up <a class="text-blue-500" href="/auth/sign-up">here</a></h3>
            <div class="oauth-options w-3/4 mx-auto flex gap-4 justify-center pt-4 border-t-2 relative bottom-0">
                <button on:click={(signInWithGoogle)}><i class="fa-brands fa-google oauth-icon google-icon"></i></button>
                <button on:click={signInWithFacebook}><i class="fa-brands fa-facebook oauth-icon facebook-icon"></i></button>
                <i class="fa-brands fa-github oauth-icon"></i>
            </div>
        </div>
    </div>
</main>