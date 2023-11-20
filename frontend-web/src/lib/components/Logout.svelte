<script lang="ts">
    // TODO: Display an error message if the login is unsuccessful
    import { goto } from '$app/navigation';
    import userStore from '$lib/stores/userStore';
</script>

<div class="logout">
    <div>
        <h3>Are you sure you want to Logout?</h3>
        <button on:click={() => goto('/home')}>No</button>
        <button on:click={() => {
            fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                userStore.set(null);
                goto('/login');
            }).catch(err => {
                console.error(err);
            });
        }}>Yes</button>
    </div>
</div>

<style>
    .logout {
        z-index: 2;
    }

    button {
        background-color: var(--secondary);
        color: var(--text);
        border: none;
        padding: 1rem;
        cursor: pointer;
        margin: 0.5rem 0;
    }
</style>