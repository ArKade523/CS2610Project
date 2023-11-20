<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import headerShowAllItemsStore from "$lib/stores/headerShowAllItemsStore";

    let prompt = 'placeholder';

    async function pageRedirect() {
        try {
            const res = await fetch('/api/verify-token');
            const data = await res.json();

            if (!data.valid) {
                goto('/login');
            }
        } catch (err) {
            console.error("Error verifying token:", err);
            goto('/login');
        }
    }

    onMount(async () => {
        if (!import.meta.env.SSR) {
            pageRedirect();
        }

        const response = await fetch('/api/prompt');
        if (response.ok) {
            const data = await response.json();
            prompt = data.phrase;
        } else {
            console.error("Error fetching prompt");
        }

        headerShowAllItemsStore.set(true);
    });
</script>

<section>
    <div class="grid-two-items">
        <div class="grid-item">
            <div>
                <h1>Home</h1>
                <h2>{prompt}</h2>
            </div>
        </div>
    </div>
</section>