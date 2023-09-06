<script>
    /** @type {import('./$types').LayoutData} */
    export let data;
    import { onSnapshot, doc, arrayRemove, arrayUnion, collection, updateDoc, getDoc } from "firebase/firestore"
    import { user } from "$lib/stores/userStore"
    import { db } from "$lib/firebase/firebaseConfig"
	import { onMount } from "svelte";
    $: todoItem = ""
    $: inProgressItem = ""
    $: doneItem = ""
    $: isLoaded = false
    $: currentKanban = {
        todo: [],
        inProgress: [],
        done: []
    }
    let closeAddTodoModalBtn
    let closeAddInProgressModalBtn
    let closeAddDoneModalBtn
    onMount(() => {
        isLoaded = true
    })
    onSnapshot(doc(db, "kanbans", data.kanban_id), async (userSnapShot) => {
        currentKanban = await userSnapShot.data()
    })
    async function addNewTodoItem() {
        updateDoc(doc(db, "kanbans", data.kanban_id), {
            todo: arrayUnion(todoItem)
        })
        todoItem = ""
        closeAddTodoModalBtn.click()
    }
    async function addNewInProgressItem() {
        updateDoc(doc(db, "kanbans", data.kanban_id), {
            inProgress: arrayUnion(inProgressItem)
        })
        inProgressItem = ""
        closeAddInProgressModalBtn.click()
    }
    async function addNewDoneItem() {
        updateDoc(doc(db, "kanbans", data.kanban_id), {
            done: arrayUnion(doneItem)
        })
        doneItem = ""
        closeAddDoneModalBtn.click()
    }
</script>
{#if isLoaded}
    <main class="kanban-board grid grid-cols-3 gap-6 p-4 w-5/6 m-auto">
        <div class="todo-col border rounded-lg p-7">
            <!-- Header -->
            <div class="header flex justify-between items-center">
                <h1>Todo</h1>
                <button class="my-1" onclick="addNewTodoItem.showModal()"><i class="fa-solid fa-plus"></i></button>
                <dialog id="addNewTodoItem" class="modal">
                    <div class="modal-box">
                        <h3 class="font-bold text-lg">New Todo Item</h3>
                        <div>
                            <!-- svelte-ignore a11y-label-has-associated-control -->
                            <label class="label">
                                <span class="label-text">What is it?</span>
                            </label>
                            <input bind:value={todoItem} type="text" placeholder="Type here" class="input input-bordered w-full" />
                            {#if todoItem.length < 1}
                                <button class="btn mt-6 float-right" on:click={() => closeAddTodoModalBtn.click()}>Close</button>
                            {:else}
                                <button on:click={addNewTodoItem} class="btn mt-6 float-right bg-accent">Add</button>
                            {/if}
                        </div>
                    </div>
                    <form method="dialog" class="modal-backdrop">
                        <button bind:this={closeAddTodoModalBtn}>close</button>
                    </form>
                </dialog>
            </div>
            <!-- ////////////////////////////////////////////////////////// -->
            <hr>
            <!-- Displayer -->
            <div class="items-display mt-4">
                {#if currentKanban.todo.length > 0}
                    {#each currentKanban.todo as todoItem, index (index)}
                        <div class="item px-5 pt-5 pb-3 my-2 bg-item-color rounded-lg">
                            <h3 style="border-bottom: 1px solid;">{todoItem}</h3>
                        </div>
                    {/each}
                {/if}
            </div>
            <!-- ////////////////////////////////////////////////////////// -->
        </div>
        <div class="inProgress-col border rounded-lg p-7">
            <!-- Header -->
            <div class="header flex justify-between items-center">
                <h1>In Progress</h1>
                <button class="my-1" onclick="addNewInProgressItem.showModal()"><i class="fa-solid fa-plus"></i></button>
                <dialog id="addNewInProgressItem" class="modal">
                    <div class="modal-box">
                        <h3 class="font-bold text-lg">New In Progress Item</h3>
                        <div>
                            <!-- svelte-ignore a11y-label-has-associated-control -->
                            <label class="label">
                                <span class="label-text">What is it?</span>
                            </label>
                            <input bind:value={inProgressItem} type="text" placeholder="Type here" class="input input-bordered w-full" />
                            {#if inProgressItem.length < 1}
                                <button class="btn mt-6 float-right">Close</button>
                            {:else}
                                <button class="btn mt-6 float-right bg-accent" on:click={addNewInProgressItem}>Add</button>
                            {/if}
                        </div>
                    </div>
                    <form method="dialog" class="modal-backdrop">
                        <button bind:this={closeAddInProgressModalBtn}>close</button>
                    </form>
                </dialog>
            </div>
            <hr>
            <!-- ////////////////////////////////////////////////////////// -->
            <!-- Displayer -->
            <div class="items-display mt-4">
                {#if currentKanban.inProgress.length > 0}
                    {#each currentKanban.inProgress as inProgressItem, index (index)}
                        <div class="item px-5 pt-5 pb-3 my-2 bg-item-color rounded-lg">
                            <h3 style="border-bottom: 1px solid;">{inProgressItem}</h3>
                        </div>
                    {/each}
                {/if}
            </div>
            <!-- ////////////////////////////////////////////////////////// -->
        </div>
        <div class="done-col border rounded-lg p-7">
            <!-- Header -->
            <div class="header flex justify-between items-center">
                <h1>Done</h1>
                <button class="my-1" onclick="addNewDoneItem.showModal()"><i class="fa-solid fa-plus"></i></button>
                <!-- Modal -->
                <dialog id="addNewDoneItem" class="modal">
                    <div class="modal-box">
                        <h3 class="font-bold text-lg">New Done Item</h3>
                        <div>
                            <!-- svelte-ignore a11y-label-has-associated-control -->
                            <label class="label">
                                <span class="label-text">What is it?</span>
                            </label>
                            <input bind:value={doneItem} type="text" placeholder="Type here" class="input input-bordered w-full" />
                            {#if doneItem.length < 1}
                                <button class="btn mt-6 float-right">Close</button>
                            {:else}
                                <button on:click={addNewDoneItem} class="btn mt-6 float-right bg-accent">Add</button>
                            {/if}
                        </div>
                    </div>
                    <form method="dialog" class="modal-backdrop">
                        <button bind:this={closeAddDoneModalBtn}>close</button>
                    </form>
                </dialog>
            </div>
            <!-- ////////////////////////////////////////////////////////// -->
            <hr>
            <!-- Displayer -->
            <div class="items-display mt-4">
                {#if currentKanban.done.length > 0}
                    {#each currentKanban.done as doneItem, index (index)}
                        <div class="item px-5 pt-5 pb-3 my-2 bg-item-color rounded-lg">
                            <h3 style="border-bottom: 1px solid;">{doneItem}</h3>
                        </div>
                    {/each}
                {/if}
            </div>
            <!-- ////////////////////////////////////////////////////////// -->
        </div>
    </main>
{/if}
<style>
    .kanban-board{
        min-height: 35em;
    }
</style>