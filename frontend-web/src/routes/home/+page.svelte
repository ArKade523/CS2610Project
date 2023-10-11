<script lang="ts" context="module">
    // Check if the web token is valid before continuing to render the page
    export async function load({ fetch }: { fetch: WindowOrWorkerGlobalScope['fetch'] }) {
        const res = await fetch('/api/verify-token');
      
        if (res.ok) {
            return { props: {} }; // Continue to render the page
        } else {
            return { redirect: '/login' }; // Redirect to login page
        }
    }
</script>
<script lang="ts">

</script>
<h1>Super Secure homepage</h1>