<script>
    import { onMount } from "svelte";
    import { onSnapshot, doc, collection } from "firebase/firestore"
    import Sortable from "sortablejs"
    let todo, inProgress, done

    let reSortHandler = function (e){
        let fromList = e.from.innerText.split("\n")
        let toList = e.to.innerText.split("\n")
        console.log(fromList, toList)
    }

    onMount(async () => {
        Sortable.create(todo, {
            group: {
                put: true,
            },
            onEnd: reSortHandler,
            animation: 200,
        })
        Sortable.create(inProgress, {
            group: {
                put: true,
            },
            onEnd: reSortHandler,
            animation: 200,
        })
        Sortable.create(done, {
            group: {
                put: true,
            },
            onEnd: reSortHandler,
            animation: 200,
        })
    })

    let todoList = ["Making Blog Page", "Learning Hacking", "Learning SEO"]
    let inProgressList = ["Making Kanban Using Svelte", "Studying Physics"]
    let doneList = ["Basic Grasp Of Firebase"]
    
</script>


<div id="todo" class="container" bind:this={todo}>
    {#each todoList as item, index (index)}
        <div class="item">{item}</div>
    {/each}
</div>
<hr>
<div id="inProgress" class="container" bind:this={inProgress}>
    {#each inProgressList as item, index (index)}
        <div class="item">{item}</div>
    {/each}
</div>
<hr>
<div id="done" class="container" bind:this={done}>
    {#each doneList as item, index (index)}
        <div class="item">{item}</div>
    {/each}
</div>


<style>
    .item{
        padding: 2em;
        margin: 1em;
        background-color: aquamarine;
    }
</style>