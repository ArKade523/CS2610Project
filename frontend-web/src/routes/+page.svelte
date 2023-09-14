<script lang="ts">
    import Login from "$lib/components/Login.svelte";


</script>

<section>
    <div class="grid-two-items">
        <div class="grid-item">
            <div>
                <h1>Homepage</h1>
                <h2>Example Text to explain what the site does</h2>

            </div>

        </div>
        <div class="grid-item">
            <Login />
        </div>
    </div>

</section>

<style>

    h1 {
        color: var(--secondary);
        font-size: 3rem;
    }
    .grid-two-items {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
    }

    .grid-item {
        width: 40vw;
        max-width: 50vw;
        display: flex;
        justify-content: center;
    }

    @media only screen and (max-width: 768px) {
        .grid-two-items {
            display: grid;
            grid-template-columns: 1fr;
        }

    }
</style>