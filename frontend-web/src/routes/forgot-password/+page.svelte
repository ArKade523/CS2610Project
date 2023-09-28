<script lang="ts">
    import ForgotPassword from "$lib/components/ForgotPassword.svelte";


</script>

<section>
    <div class="grid-two-items">
        <div class="grid-item">
            <div>
                <h1>Forgot your Password?</h1>
                <h2>Send a reset link to you email</h2>

            </div>

        </div>
        <div class="grid-item">
            <ForgotPassword />
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
