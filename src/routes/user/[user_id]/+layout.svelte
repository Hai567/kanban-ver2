<script>
    /** @type {import('./$types').LayoutData} */
    export let data;
    import AuthCheck from '$lib/components/AuthCheck.svelte';
    let userIDParam = data.userIDParam
</script>

<AuthCheck userIDParam={userIDParam}>
    <slot></slot>
</AuthCheck>