<script>
    import { userData } from "$lib/stores/userDataStore"
    import { user } from "$lib/stores/userStore"
    import { storage, db } from "$lib/firebase/firebaseConfig"
    import { getDownloadURL, uploadBytes, ref } from "@firebase/storage"
    import { updateDoc, doc } from "@firebase/firestore"
    import { goto } from "$app/navigation"
    import FlyInOutAnimation from "$lib/components/FlyInOutAnimation.svelte"

    let userFile
    let previewLink
    let isUploading = true
    function previewUploadedImage(e) {
        userFile = e.target.files[0]
        previewLink = URL.createObjectURL(userFile)
    }
    async function uploadImage() {
        isUploading = true
        let result = await uploadBytes(ref(storage, `users/${$user.uid}/avatar.png`), userFile)
        let uploadedAvatarUrl = await getDownloadURL(result.ref)
        await updateDoc(doc(db, "users", $user.uid), {
            photoURL: uploadedAvatarUrl
        })
        isUploading = false
        goto("/auth/sign-up/finish/bio")
    }
</script>


<FlyInOutAnimation>
    <div class="card w-full bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Upload your avatar</h2>
        <p>Don't worry, you can always change it anytime in the profile setting</p>
        <img src={previewLink || $userData.photoURL} alt="">
        <form class="flex flex-wrap w-full justify-center gap-4">
            <input type="file" name="user-avatar" 
            class="file-input file-input-bordered w-full" on:change={previewUploadedImage}
            accept="image/png, image/jpeg, image/gif, image/webp"
            >
            {#if isUploading}
                <progress class="progress progress-warning w-11/12" max="100"></progress>
            {/if}
            <div class="w-full flex justify-end">
                {#if userFile}
                    <button on:click={uploadImage} class="btn btn-success">Upload Image</button> 
                {:else}
                    <button on:click={() => goto("/auth/sign-up/finish/bio")} class="btn">Skip</button> 
                {/if}
            </div>
        </form>
      </div>
    </div>
</FlyInOutAnimation>