<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    async function pageRedirect({ fetch }: { fetch: WindowOrWorkerGlobalScope['fetch'] }) {
        console.log('Checking token');
        const res = await fetch('/api/verify-token');
        const data = await res.json();

        if (data.valid) {
            console.log('Token is valid');
            goto('/home');
        } else {
            console.log('Token is invalid');
            goto('/login')
        }
    }

    onMount(() => {
        pageRedirect({ fetch: window.fetch });
    });
</script>
