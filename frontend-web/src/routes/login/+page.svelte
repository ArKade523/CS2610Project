<script lang="ts">
    import Login from "$lib/components/Login.svelte";
    import DaydoodleTransparentLight from "$lib/images/Daydoodle-Transparent-Light.png";

</script>

<section>
    <div class="grid-two-items">
        <div class="grid-item">
            <div>
                <div>
                    <h1>Login</h1>
                    <h2>Enter your login credentials</h2>
                </div>
                <img src={DaydoodleTransparentLight} alt="Daydoodle Logo" />
            </div>

        </div>
        <div class="grid-item">
            <Login />
        </div>
    </div>

</section>

<style>
    .grid-item > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 80%;
        height: auto;
    }
</style>