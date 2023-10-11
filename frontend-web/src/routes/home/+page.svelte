<script lang="ts">
    import { onMount } from "svelte";

    // Check if the web token is valid before continuing to render the page
    async function load({ fetch }: { fetch: WindowOrWorkerGlobalScope['fetch'] }) {
        const res = await fetch('/api/verify-token');
      
        if (!res.ok) {
            return { redirect: '/login' }; // Redirect to login page if token is invalid
        } 
    }

    onMount(() => {
        load({ fetch: window.fetch });
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