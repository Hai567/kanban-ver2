<script>
    import { fly } from "svelte/transition";
    import { signInWithGoogle } from "$lib/auth/googleOauth";
    import { signUpWithEmailAndPass } from "$lib/auth/emailAndPassword"; 
    
    // Form validation
    let password = ""
    let email = ""
    let rePassword = ""
    let validEmail = true
    let validPassword = true
    let passwordResemble = true
    $: isUserEligible = validEmail && validPassword && passwordResemble
    let validateEmail = function () {
        let emailRe = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
        validEmail = emailRe.test(email)
    }
    let validatePassword = function() {
        // 5 to 20 characters, at least: 1 uppercase, 1 lowercase, 1 digit 
        let passwordRe = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,20}$/
        validPassword = passwordRe.test(password)
    }
    let comfirmPassword = function() {
        passwordResemble = rePassword === password
    }
    ////////////////////////////////
</script>

<main class="sign-up-main h-full mx-auto w-11/12 flex items-center justify-center lg:w-3/4">
    <div class="sign-in-container rounded-3xl justify-center lg:grid lg:grid-cols-2 p-8 md:flex md:flex-wrap sm:w-11/12" data-theme="light" in:fly={{x: "100%", duration: 400, delay: 500}} out:fly={{x: "-100%", duration: 400}}>
        <div class="sign-up-image flex lg:border-r-2 lg:pl-1 lg:p-12">
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img class="rounded-3xl object-cover" src="/images/sign-up.png" alt="Sign Up Image">
        </div>
        <div class="sign-up-form flex justify-center items-center flex-wrap">
            <form class="form-control mb-6 w-11/12 relative top-0 max-w-md" action="" on:submit|preventDefault={() => signUpWithEmailAndPass(email, password)}>
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label">
                    <span class="label-text">Enter your email</span>
                </label>
                <input bind:value={email} on:blur={validateEmail} type="text" placeholder="Email goes here" class="input input-bordered w-full" required />
                <span class:hidden={validEmail} class="error-message text-error">Wrong email format</span>
                

                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label">
                    <span class="label-text">Choose a password</span>
                </label>
                <input bind:value={password} on:blur={validatePassword} type="password" placeholder="Password goes here" class="input input-bordered w-full" required/>
                <span class:hidden={validPassword} class="error-message text-error">Password must contains 8 to 20 characters with at least 1 uppercase, 1 lowercase, 1 digit</span>


                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label">
                    <span class="label-text">Re-enter your password</span>
                </label>
                <input bind:value={rePassword} type="password" placeholder="That goes here" on:keyup={comfirmPassword} class="input input-bordered w-full" required />
                <span class:hidden={passwordResemble} class="error-message text-error">Passwords are not resemble</span>
                <button disabled={!isUserEligible} class="btn btn-primary mt-3" type="submit">Sign Up</button>
            </form>
            <h3 class="w-full text-center">Already have an account, sign in <a class="text-blue-500" href="/auth/sign-in">here</a></h3>
            <div class="oauth-options w-3/4 mx-auto flex gap-4 justify-center pt-4 border-t-2 relative bottom-0">
                <button on:click={signInWithGoogle}><i class="fa-brands fa-google oauth-icon google-icon"></i></button>
                <i class="fa-brands fa-facebook oauth-icon facebook-icon"></i>
                <i class="fa-brands fa-github oauth-icon"></i>
            </div>
        </div>
    </div>
</main>