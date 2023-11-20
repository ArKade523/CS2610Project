<script lang="ts">
    import Logout from "$lib/components/Logout.svelte";
    import DaydoodleTransparentLight from "$lib/images/Daydoodle-Transparent-Light.png";
    import headerShowAllItemsStore from "$lib/stores/headerShowAllItemsStore";
    import { onMount } from "svelte";

    onMount(() => {
        headerShowAllItemsStore.set(true);
    });
</script>

<section>
    <div class="grid-two-items">
        <div class="grid-item">
            <div>
                <div>
                    <h1>Logout</h1>

                </div>
                <img src={DaydoodleTransparentLight} alt="Daydoodle Logo" />
            </div>

        </div>
        <div class="grid-item">
            <Logout />
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