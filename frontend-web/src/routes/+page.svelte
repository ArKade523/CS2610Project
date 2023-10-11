<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    async function pageRedirect({ fetch }: { fetch: WindowOrWorkerGlobalScope['fetch'] }) {
        const res = await fetch('/api/verify-token');
        const data = await res.json();

        if (data.valid) {
            goto('/home');
        } else {
            goto('/login')
        }
    }

    onMount(() => {
        pageRedirect({ fetch: window.fetch });
    });
</script>
