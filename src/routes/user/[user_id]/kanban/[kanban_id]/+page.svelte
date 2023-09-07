<script>
    /** @type {import('./$types').LayoutData} */
    export let data;
    import { onSnapshot, doc, arrayRemove, arrayUnion, updateDoc, getDoc, writeBatch } from "firebase/firestore"
    import LoadingScreen from "$lib/components/LoadingScreen.svelte";
    import { db } from "$lib/firebase/firebaseConfig"
	import { onMount } from "svelte";
    import Sortable from "sortablejs"
    $: todoItem = ""
    $: inProgressItem = ""
    $: doneItem = ""
    $: isLoaded = false
    $: currentKanban = {
        todo: [],
        inProgress: [],
        done: []
    }
    let closeAddTodoModalBtn, closeAddInProgressModalBtn, closeAddDoneModalBtn, todoCol, inProgressCol, doneCol
    async function reFetchDB() {
        isLoaded = false
        await getDoc(doc(db, "kanbans", data.kanban_id))
            .then(async (userSnapShot) => {
            currentKanban = await userSnapShot.data()
        })
        isLoaded = true
    } 
    onMount(async() => {
    // Wait until the component is mounted
    // Then get the kanban data
    // After the kanban data is loaded, set isLoaded to true, then wait 2s for all the DOM to be loaded and create sortable cols
        await getDoc(doc(db, "kanbans", data.kanban_id))
            .then(async (userSnapShot) => {
                currentKanban = await userSnapShot.data()
            })
        isLoaded = true
        // onSnapshot(doc(db, "kanbans", data.kanban_id), async (userSnapShot) => {
        //     currentKanban = await userSnapShot.data()
        // })
        setTimeout(() => {
            Sortable.create(todoCol, {
                group: {
                    put: true
                },
                onEnd: reSortHandler,
                animation: 200,
            })
            Sortable.create(inProgressCol, {
                group: {
                    put: true
                },
                onEnd: reSortHandler,
                animation: 200,
            })
            Sortable.create(doneCol, {
                group: {
                    put: true
                },
                onEnd: reSortHandler,
                animation: 200,
            })
        }, 2000)
    })
    async function addNewTodoItem() {
        await updateDoc(doc(db, "kanbans", data.kanban_id), {
            todo: arrayUnion(todoItem)
        })
        todoItem = ""
        closeAddTodoModalBtn.click()
        reFetchDB()
    }
    async function addNewInProgressItem() {
        await updateDoc(doc(db, "kanbans", data.kanban_id), {
            inProgress: arrayUnion(inProgressItem)
        })
        inProgressItem = ""
        closeAddInProgressModalBtn.click()
        reFetchDB()
    }
    async function addNewDoneItem() {
        await updateDoc(doc(db, "kanbans", data.kanban_id), {
            done: arrayUnion(doneItem)
        })
        doneItem = ""
        closeAddDoneModalBtn.click()
        reFetchDB()
    }
    let reSortHandler = function (e){
        let batch = writeBatch(db)
        // Name (id) of from col (todo, inProgress, done)
        let fromColName = e.from.id
        // Name (id) of to col (todo, inProgress, done)
        let toColName = e.to.id
        // Items in from list
        let fromList = e.from.innerText.split("\n")
        // Items in to list
        let toList = e.to.innerText.split("\n")

        // Update from db
        batch.update(doc(db, "kanbans", data.kanban_id), {
            [fromColName]: fromList
        })
        // Update to db
        batch.update(doc(db, "kanbans", data.kanban_id), {
            [toColName]: toList
        })
        batch.commit()
    }
</script>
{#if isLoaded==true}
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
            <div id="todo" class="items-display mt-4 h-full" bind:this={todoCol}>
                {#if currentKanban.todo.length > 0}
                    {#each currentKanban.todo as todoItem, index (index)}
                        <div class="item px-5 pt-5 pb-3 my-2 bg-base-200 rounded-lg hover:cursor-move">
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
            <div id="inProgress" class="items-display mt-4 h-full" bind:this={inProgressCol}>
                {#if currentKanban.inProgress.length > 0}
                    {#each currentKanban.inProgress as inProgressItem, index (index)}
                        <div class="item px-5 pt-5 pb-3 my-2 bg-base-200 rounded-lg hover:cursor-move">
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
            <div id="done" class="items-display mt-4 h-full" bind:this={doneCol}>
                {#if currentKanban.done.length > 0}
                    {#each currentKanban.done as doneItem, index (index)}
                        <div class="item px-5 pt-5 pb-3 my-2 bg-base-200 rounded-lg hover:cursor-move">
                            <h3 style="border-bottom: 1px solid;">{doneItem}</h3>
                        </div>
                    {/each}
                {/if}
            </div>
            <!-- ////////////////////////////////////////////////////////// -->
        </div>
    </main>
{:else}
    <LoadingScreen />
{/if}
<style>
    .kanban-board{
        min-height: 35em;
    }
</style>