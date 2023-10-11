<script lang="ts">
    // TODO: Display an error message if the login is unsuccessful
    import { goto } from '$app/navigation';
    import { error } from '@sveltejs/kit';

    let username = '';
    let password = '';

    let usernameEmpty = false;
    let passwordEmpty = false;

    let errorMessage = '';

    const handleSubmit = async (event: Event) => {
        event.preventDefault();

        usernameEmpty = !username;
        passwordEmpty = !password;

        if (usernameEmpty || passwordEmpty) {
            return;
        }

        const payload = {
            username,
            password
        };

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log('Login successful');
            goto('/home');
        } else {
            // TODO: display an error message
            console.log('Login unsuccessful');
            errorMessage = 'Login unsuccessful';
        }

        username = '';
        password = '';
    };

    $: {
        if (usernameEmpty || passwordEmpty) {
            errorMessage = 'Username or password cannot be empty';
        } else {
            errorMessage = '';
        }
    }

    const clearErrorMessage = () => {
        errorMessage = '';
    }
</script>

<div class="login">
    <form on:submit={handleSubmit}>
        <div class="input-wrapper {usernameEmpty ? 'warning' : ''}">
            <input type="text" placeholder="Email / Username" bind:value={username} on:input={clearErrorMessage}>
        </div>
        <div class="input-wrapper {passwordEmpty ? 'warning' : ''}">
            <input type="password" placeholder="Password" bind:value={password} on:input={clearErrorMessage}>
        </div>
        <p class="warning-text">{errorMessage}</p>
        <button type="submit">Login</button>
        <br />
        <a href="/forgot-password">Forgot password?</a>
        <br />
        <a href="/register" class="register">Create an Account</a>
    </form>
</div>

<style>
    .login {
        z-index: 2;
    }
    
    .login > form {
        height: 300px;
        width: 300px;
        padding: 3rem;
        background: var(--primary);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        box-shadow: 1rem 1rem var(--secondary);
    }

    .login > form > .input-wrapper > * {
        padding: 0.5rem;
    }

    button {
        background-color: var(--secondary);
        color: var(--text);
        border: none;
        padding: 1rem;
        cursor: pointer;
        margin: 0.5rem 0;
    }

    a.register, button {
        background-color: var(--secondary);
        padding: 1rem;
        cursor: pointer;

    }

    a.register:hover, button:hover, button:focus {
        background-color: var(--accent);
    }

    a {
        color: var(--text);
        text-decoration: none;
    }

    a:hover {
        color: var(--secondary);
        text-decoration: none;
        cursor: pointer;
    }

    .input-wrapper {
        position: relative;
        margin: 0.5rem 0;
    }
    .warning {
        border: 1px solid red;
    }

    .warning-text {
        color: red;
        pointer-events: none;
        text-align: center;
    }
</style>