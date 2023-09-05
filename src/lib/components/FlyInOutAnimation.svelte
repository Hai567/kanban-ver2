<script>
    import { fly } from "svelte/transition";
</script>
<div in:fly={{x: "100%", duration: 400, delay: 500}} out:fly={{x: "-100%", duration: 400}}>
    <slot></slot>
</div>