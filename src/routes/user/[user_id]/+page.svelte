<script>
    import { user } from "$lib/stores/userStore"
    import { db } from "$lib/firebase/firebaseConfig"
    import { onSnapshot, doc, arrayUnion, arrayRemove, collection, updateDoc } from "firebase/firestore";
    import { createRandomKanbanId } from "$lib/helpers/createRandomKanbanID"
    import { goto } from "$app/navigation"
    $: userKanbanName = ""
    let closeModalBtn
    async function createNewKanban() {
        let newKanbanRandomId = await createRandomKanbanId()
        updateDoc(doc(db, "users", $user.uid), {
            kanbans: arrayUnion({
                kid: newKanbanRandomId,
                kname: userKanbanName
            })
        })
    }
    let kanbans = []
    // async function getKanbans () {
    onSnapshot(doc(db, "users", $user.uid), async (snapshot) => {
        kanbans = snapshot.data().kanbans
    })
    // }
</script>

<main class="main-container w-full h-full p-4">
    <div class="side-bar">
        <div class="header flex justify-between items-center mb-4">
            <h3>Your Kanbans</h3>
            <button class="btn btn-accent" onclick="createKanbanModal.showModal()">New</button>
            <dialog on:dblclick={() => closeModalBtn.click()} id="createKanbanModal" class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">New Kanban</h3>
                    <p class="py-4">Press ESC key or double click to close</p>
                    <div class="">
                        <form method="dialog" class="flex flex-wrap">
                            <label class="label">
                                <span class="label-text">Your Kanban Name</span>
                            </label>
                            <!-- if there is a button in form, it will close the modal -->
                            <input bind:value={userKanbanName} type="text" placeholder="Type here" class="input input-bordered w-full" />
                            {#if userKanbanName.length < 1}
                                <button bind:this={closeModalBtn} class="btn mt-6 ml-auto">Close</button>
                            {:else}
                                <button on:click={createNewKanban} class="btn mt-6 ml-auto bg-accent">Create</button>
                            {/if}
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
        <input type="text" placeholder="Find your kanban" class="input input-bordered w-full max-w-xs h4" />
        <div class="kanban-list mt-4 border-t-2 pt-4">
            <ul class="p-4 w-full min-h-full bg-base-200 text-base-content rounded-xl flex flex-wrap flex-col text-sm">
                {#each kanbans as kanban, i (i)}
                    <li on:click={() => goto(`/user/${$user.uid}/kanban/${kanban.kid}`)} class="py-2 px-3 hover:bg-base-300 rounded-md hover:cursor-pointer">{kanban.kname}</li>
                {/each}
            </ul>
        </div>
    </div>
    <div class="kanban-board">  
        <div class="board-main">
            <p>Please open a kanban or <a href="" class="text-primary">create a new one</a></p>
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
    div.kanban-board{
        /* padding: 10px; */
    }
</style>