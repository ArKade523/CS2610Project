<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    // Check if the web token is valid before continuing to render the page
    async function pageRedirect({ fetch }: { fetch: WindowOrWorkerGlobalScope['fetch'] }) {
        const res = await fetch('/api/verify-token');
        const data = await res.json();

        if (!data.valid) {
            goto('/login');
        }
    }

    onMount(() => {
        pageRedirect({ fetch: window.fetch });
    });
</script>
<section>
    <div class="grid-two-items">
        <div class="grid-item">
            <div>
                <h1>Home</h1>
            </div>
        </div>
    </div>
</section>