<script>
    import { user } from "$lib/stores/userStore"
    import { db } from "$lib/firebase/firebaseConfig"
    import { doc, getDoc, writeBatch } from "firebase/firestore"
    import { goto } from "$app/navigation"
    import FlyInOutAnimation from "$lib/components/FlyInOutAnimation.svelte"

    let inputUsername
    if ($user.displayName){
        inputUsername = $user.displayName.toLowerCase().replaceAll(" ", "")
    }else{
        inputUsername = ""
    }
     
    $: isUsernameTaken = true
    $: usernameRegexValid = true
    $: usernameValid = isUsernameTaken && usernameRegexValid && inputUsername.length >= 5
    let usernameRegex = /^[0-9a-zA-Z]{5,30}$/
    let timer

    const debounce = (inputValue) => {
        usernameRegexValid = usernameRegex.test(inputValue)
		clearTimeout(timer);
		timer = setTimeout(() => {
			inputUsername = inputValue;
            if (usernameRegexValid) {
                    getDoc(doc(db, "usernames", inputUsername))
                        .then ((usernameSnapshot) => {
                        if (usernameSnapshot.exists()){
                            isUsernameTaken = false
                        }else{
                            isUsernameTaken = true
                        }
                    })
                }
		}, 500);
	}
    async function submitUsernameHandler() {
        let batch = writeBatch(db)
        if ( usernameValid ){
            batch.set(doc(db, "usernames", inputUsername), {
                uid: $user.uid
            })
            batch.update(doc(db, "users", $user.uid), {
                displayName: inputUsername
            })
            await batch.commit()
            goto("/auth/sign-up/finish/avatar")
        }
    }

</script>

<FlyInOutAnimation>
    <div class="card w-full bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Choose Your Username</h2>
        <p>Don't worry, you can always change it anytime in the profile setting</p>
        <form class="flex flex-wrap w-full justify-center gap-4">
            <input bind:value={inputUsername} class:input-success={usernameValid} class:input-error={!usernameRegexValid} class="input input-bordered w-full" on:keyup={({ target: { value } }) => debounce(value)} type="text">   
            <span class="username-validation-error-message text-error w-full" class:hidden={usernameRegexValid}>Username must contain 5 to 30 character, no special character</span>
            <span class="username-validation-error-message text-warning w-full" class:hidden={isUsernameTaken}>@{inputUsername} has already been taken</span>
            <button on:click={submitUsernameHandler} class:btn-success={usernameValid} disabled={!usernameValid} class="btn">Confirm choosing @{inputUsername}</button> 
        </form>
      </div>
    </div>
</FlyInOutAnimation>