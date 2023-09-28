<script lang="ts">
    // TODO: Send a POST request to the backend to login
    // TODO: Redirect to the homepage if the login is successful
    // TODO: Display an error message if the login is unsuccessful
    // TODO: Create Forgot Password page
    // TODO: Create Register page

    let email = '';

    const handleSubmit = async (event: Event) => {
        event.preventDefault();

        const payload = {
            email
        };

        const response = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // TODO: Redirect to homepage
            console.log('Reset link sent to email!');
        } else {
            // TODO: display an error message
            console.log('Invalid email');
        }

        email = '';
    };
</script>

<div class="login" on:submit={handleSubmit}>
    <form action="">
        <input type="text" placeholder="Email" bind:value={email}>
        <button type="submit">Send Reset Link</button>
        <br />
        <a href="/" class="register">Remembered your password?</a>
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

    .login > form > * {
        margin: 0.5rem 0;
        padding: 0.5rem;
    }

    button {
        background-color: var(--secondary);
        color: var(--text);
        border: none;
        padding: 1rem;
        cursor: pointer;
    }

    a.register, button {
        background-color: var(--secondary);
        padding: 1rem;
        cursor: pointer;

    }

    a.register:hover, button:hover, button:focus {
        color: var(--accent);
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
</style>