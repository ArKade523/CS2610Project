<script lang="ts">
    // TODO: Send a POST request to the backend to login
    // TODO: Redirect to the homepage if the login is successful
    // TODO: Display an error message if the login is unsuccessful
    // TODO: Create Forgot Password page
    // TODO: Create Register page

    let email = '';
    let username = '';
    let password = '';
    let confirmPassword = '';

    const handleSubmit = async (event: Event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            console.log("Passwords don't match");
            return;
        }

        const payload = {
            email,
            username,
            password
        };

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // TODO: Redirect to homepage
            console.log('Registration successful');
        } else {
            // TODO: display an error message
            console.log('Registration failed');
        }

        email = '';
        username = '';
        password = '';
        confirmPassword = '';
    };
</script>

<div class="login" on:submit={handleSubmit}>
    <form action="">
        <input type="text" placeholder="Email" bind:value={email}>
        <input type="text" placeholder="Username" bind:value={username}>
        <input type="password" placeholder="Password" bind:value={password}>
        <input type="password" placeholder="Confirm Password" bind:value={confirmPassword}>
        <button type="submit">Register</button>
        <br />
        <a href="/" class="register">Already have an account?</a>
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