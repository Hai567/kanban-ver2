<script>
    import { user } from "$lib/stores/userStore"
    import { db } from "$lib/firebase/firebaseConfig"
    import { onSnapshot, doc, arrayUnion, writeBatch } from "firebase/firestore";
    import { goto } from "$app/navigation"
	import { onMount } from "svelte";
    import LoadingScreen from "$lib/components/LoadingScreen.svelte";
    import { createRandomKanbanId } from "$lib/helpers/createRandomKanbanID.js"
    $: userKanbanName = ""
    let isLoaded = false
    let kanbans = []
    let closeModalBtn
    async function createNewKanban() {
        let newKanbanRandomId = await createRandomKanbanId()
        let batch = writeBatch(db)
        batch.update(doc(db, "users", $user.uid), {
            kanbans: arrayUnion({
                kid: newKanbanRandomId,
                kname: userKanbanName
            })
        })
        batch.set(doc(db, "kanbans", newKanbanRandomId), {
            kname: userKanbanName,
            uid: $user.uid,
            todo: [],
            inProgress: [],
            done: []
        })
        batch.commit()
        closeModalBtn.click()
        userKanbanName = ""
    }
    // async function getKanbans () {
    onSnapshot(doc(db, "users", $user.uid), async (snapshot) => {
        kanbans = snapshot.data().kanbans
    })
    // }
    onMount(() => { isLoaded = true })
</script>

<main class="main-container w-full h-full p-4">
    {#if isLoaded == false}
        <LoadingScreen />
    {/if}
    <div class="side-bar" name="child" class:isChildLoaded={isLoaded}>
        <div class="header flex justify-between items-center mb-4">
            <h3>Your Kanbans</h3>
            <button class="btn btn-accent" onclick="createKanbanModal.showModal()">New</button>
            <dialog id="createKanbanModal" class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">New Kanban</h3>
                    <div>
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label class="label">
                            <span class="label-text">Your Kanban Name</span>
                        </label>
                        <input bind:value={userKanbanName} type="text" placeholder="Type here" class="input input-bordered w-full" required />
                        {#if userKanbanName.length < 1}
                            <button on:click={() => closeModalBtn.click()} class="btn mt-6 float-right">Close</button>
                        {:else}
                            <button on:click={createNewKanban} class="btn mt-6 float-right bg-accent">Create</button>
                        {/if}
                    </div>
                </div>
                <form method="dialog" class="modal-backdrop">
                    <button bind:this={closeModalBtn}>close</button>
                </form>
            </dialog>
        </div>
        <input type="text" placeholder="Find your kanban" class="input input-bordered w-full max-w-xs h4" />
        <div class="kanban-list mt-4 border-t-2 pt-4">
            <ul class="p-4 w-full min-h-full bg-base-200 text-base-content rounded-xl flex flex-wrap flex-col text-sm">
                {#if kanbans.length > 0}
                    {#each kanbans as kanban, i (i)}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                        <li on:click={() => goto(`/user/${$user.uid}/kanban/${kanban.kid}`)} class="py-2 px-3 hover:bg-base-300 rounded-md hover:cursor-pointer">{kanban.kname}</li>
                    {/each}
                {:else}
                    <li class="text-slate-400">Nothing here...</li>
                {/if}
            </ul>
        </div>
    </div>
    <div class="kanban-board">  
        <div class="board-main">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <p>Please open a kanban or <a onclick="createKanbanModal.showModal()" class="text-primary hover:cursor-pointer">create a new one</a></p>
        </div>
    </div>
</main>
<style>
    main.main-container{
        display: grid;
        grid-template-columns: 1fr 5fr;
        gap: 10px;
    }
    div.side-bar{
        padding: 0 10px 0 0; 
        border-right: 1px solid #3c3f50;
    }
</style>