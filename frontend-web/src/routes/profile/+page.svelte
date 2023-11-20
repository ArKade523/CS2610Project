<script lang="ts">
    import DaydoodleTransparentLight from "$lib/images/Daydoodle-Transparent-Light.png";
    import userStore from "$lib/stores/userStore";
    import type { UserData } from "$lib/types/userTypes";
    import getUserData from "$lib/utils/getUserData";
    import headerShowAllItemsStore from "$lib/stores/headerShowAllItemsStore";
    import { onMount } from "svelte";

    let user: UserData | null = null;
    
    onMount(async () => {
        if (!user) {
            await getUserData();
        }
        
        headerShowAllItemsStore.set(true);
    });


    $: user = $userStore ? $userStore as UserData : null;
</script>

<section>
    <div class="grid-two-items">
        <div class="grid-item">
            <div>
                <div>
                    <h1>Profile</h1>
                    <!-- Check to make sure that the user is logged in. -->
                    {#if user}
                        <h2>Username: {user.username}</h2>
                        <h2>Email: {user.email}</h2>
                    {:else}
                        <h2>Not logged in</h2>
                    {/if}
                </div>
                <img src={DaydoodleTransparentLight} alt="Daydoodle Logo" />
            </div>

        </div>
        <div class="grid-item">

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