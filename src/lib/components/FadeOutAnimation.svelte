<script>
	import { fade } from "svelte/transition";
</script>
<div class="w-full h-full" out:fade={{ duration: 350}}>
    <slot></slot>
</div>