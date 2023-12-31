<script>
    /** @type {import('./$types').LayoutData} */
    export let data;
    import { onSnapshot, doc, arrayRemove, arrayUnion, updateDoc, getDoc, writeBatch } from "firebase/firestore"
    import { isChildLoaded } from "$lib/stores/isChildLoaded.js"
    import { db } from "$lib/firebase/firebaseConfig"
	import { onDestroy, onMount } from "svelte";
    import Sortable from "sortablejs"

    $: todoItem = ""
    $: inProgressItem = ""
    $: doneItem = ""
    $: isLoaded = false
    isChildLoaded.set(isLoaded)
    $: currentKanban = {
        todo: [],
        inProgress: [],
        done: []
    }
    $: afterEditedItemName = ""

    let closeAddTodoModalBtn, closeAddInProgressModalBtn, closeAddDoneModalBtn, todoCol, inProgressCol, doneCol, 
    closeGlobalEditItemBtn, beingEditedItemNode, alreadyItemsList, beingEditedCol
    async function reFetchDB() {
        isLoaded = false
        isChildLoaded.set(false)
        await getDoc(doc(db, "kanbans", data.kanban_id))
            .then(async (userSnapShot) => {
            currentKanban = await userSnapShot.data()
        })
        isLoaded = true
        isChildLoaded.set(true)
    } 
    onMount(async() => {
        // Wait until the component is mounted
        // Then get the kanban data
        currentKanban = await (await getDoc(doc(db, "kanbans", data.kanban_id))).data()
        isLoaded = true
        isChildLoaded.set(true)
        // onSnapshot(doc(db, "kanbans", data.kanban_id), async (userSnapShot) => {
        //     currentKanban = await userSnapShot.data()
        // })
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
    let reSortHandler = async function (e){
        let batch = writeBatch(db)
        // Name (id) of from col (todo, inProgress, done)
        let fromColName = e.from.id
        // Name (id) of to col (todo, inProgress, done)
        let toColName = e.to.id
        // Items in from list
        let fromList = e.from.innerText.split("\n")
        // Items in to list
        let toList = e.to.innerText.split("\n")
        // If there is no item in the list, set the list to an empty list
        if ( fromList[0] == ""){
            fromList = []
        }if ( toList[0] == ""){
            toList = []
        }

        // Update from db
        isChildLoaded.set(false)
        batch.update(doc(db, "kanbans", data.kanban_id), {
            [fromColName]: fromList
        })
        // Update to db
        batch.update(doc(db, "kanbans", data.kanban_id), {
            [toColName]: toList
        })
        await batch.commit()
        isChildLoaded.set(true)
    }
    function getAlreadyItemsList(e) {
        // Returns all the items from the list that has an item that being edited
        return Array.from(e.target.parentElement.parentElement.children)
            .map(({children}) => (children[0].innerText))
    }
    async function globalEditItem(e) {
        beingEditedItemNode = this.parentElement.children[0]
        alreadyItemsList = getAlreadyItemsList(e)
        beingEditedCol = beingEditedItemNode.parentElement.parentElement.getAttribute("id")
    }
    async function updateEditedItems() {
        // let beingEditedCol = beingEditedItemNode.parentElement.parentElement.getAttribute("id")
        let beingEditedItemIndex = beingEditedItemNode.getAttribute("data-item-index")
        let updatedItemsList = alreadyItemsList
        updatedItemsList[beingEditedItemIndex] = afterEditedItemName
        console.log(beingEditedItemIndex)
        closeGlobalEditItemBtn.click()
        afterEditedItemName = ""
        updateDoc(doc(db, "kanbans", data.kanban_id), {
            [beingEditedCol]: updatedItemsList
        })
            .then( async() => {
                currentKanban = await (await getDoc(doc(db, "kanbans", data.kanban_id))).data()
                isChildLoaded.set(true)
            })
    }
    onDestroy(() => isChildLoaded.set(false))
</script>
<main class="kanban-board grid grid-cols-3 gap-6 p-4 w-5/6 m-auto">
    <dialog id="globalEditItem" class="modal">
        <div class="modal-box">
            {#if beingEditedItemNode}
                <h3 class="font-bold text-lg">Editing "{beingEditedItemNode.innerText}" from "{beingEditedCol}"</h3>
                <div>
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text">What is it?</span>
                    </label>
                    <input bind:value={afterEditedItemName} type="text" placeholder="Type here" class="input input-bordered w-full" required />
                    {#if afterEditedItemName.length < 1}
                        <button class="btn mt-6 float-right" on:click={() => closeGlobalEditItemBtn.click()}>Close</button>
                    {:else}
                        <button on:click={updateEditedItems} class="btn mt-6 float-right bg-accent hover:bg-accent-focus"><i class="fa-solid fa-floppy-disk"></i>Save</button>
                    {/if}
                </div>
            {/if}
        </div>
        <form method="dialog" class="modal-backdrop">
            <button bind:this={closeGlobalEditItemBtn}>close</button>
        </form>
    </dialog>
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
                        <input bind:value={todoItem} type="text" placeholder="Type here" class="input input-bordered w-full" required />
                        {#if todoItem.length < 1}
                            <button class="btn mt-6 float-right" on:click={() => closeAddTodoModalBtn.click()}>Close</button>
                        {:else}
                            <button on:click={addNewTodoItem} class="btn mt-6 float-right bg-accent hover:bg-accent-focus">Add</button>
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
                    <div class="item px-5 pt-5 pb-3 my-2 bg-base-200 rounded-lg hover:cursor-pointer hover:bg-base-300 flex justify-between relative ease-in-out">
                        <h3 style="border-bottom: 1px solid;" data-item-index={index} class="grow hover:mr-8 ease-in-out">{todoItem}</h3>
                        <button on:click={globalEditItem} onclick="globalEditItem.showModal()" class="absolute top-0 right-0 h-full px-4 hidden hover:btn-ghost rounded-r-lg"><i class="fa-solid fa-pen ease-in-out"></i></button>
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
                        <input bind:value={inProgressItem} type="text" placeholder="Type here" class="input input-bordered w-full" required />
                        {#if inProgressItem.length < 1}
                            <button class="btn mt-6 float-right">Close</button>
                        {:else}
                            <button class="btn mt-6 float-right bg-accent hover:bg-accent-focus" on:click={addNewInProgressItem}>Add</button>
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
                    <div class="item px-5 pt-5 pb-3 my-2 bg-base-200 rounded-lg hover:cursor-pointer hover:bg-base-300 flex justify-between relative ease-in-out">
                        <h3 style="border-bottom: 1px solid;"  data-item-index={index} class="grow hover:mr-8 ease-in-out">{inProgressItem}</h3>
                        <button on:click={globalEditItem} onclick="globalEditItem.showModal()"  class="absolute top-0 right-0 h-full px-4 hidden hover:btn-ghost rounded-r-lg"><i class="fa-solid fa-pen ease-in-out"></i></button>
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
                        <input bind:value={doneItem} type="text" placeholder="Type here" class="input input-bordered w-full" required />
                        {#if doneItem.length < 1}
                            <button class="btn mt-6 float-right">Close</button>
                        {:else}
                            <button on:click={addNewDoneItem} class="btn mt-6 float-right bg-accent hover:bg-accent-focus">Add</button>
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
                    <div class="item px-5 pt-5 pb-3 my-2 bg-base-200 rounded-lg hover:cursor-pointer hover:bg-base-300 flex justify-between relative ease-in-out">
                        <h3 style="border-bottom: 1px solid;" class="grow hover:mr-8 ease-in-out">{doneItem}</h3>
                        <button on:click={globalEditItem} onclick="globalEditItem.showModal()"  class="absolute top-0 right-0 h-full px-4 hidden hover:btn-ghost bordered rounded-r-lg"><i class="fa-solid fa-pen ease-in-out"></i></button>
                    </div>
                {/each}
            {/if}
        </div>
        <!-- ////////////////////////////////////////////////////////// -->
    </div>
</main>
<style>
    .kanban-board{
        min-height: 35em;
    }
    .item:hover h3{
        margin-right: 2.2em;
    }
    .item:hover button{
        display: block;
    }
</style>