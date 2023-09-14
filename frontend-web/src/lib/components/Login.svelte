<script lang="ts">
    // TODO: Send a POST request to the backend to login
    // TODO: Redirect to the homepage if the login is successful
    // TODO: Display an error message if the login is unsuccessful
    // TODO: Create Forgot Password page
    // TODO: Create Register page
</script>

<div class="login">
    <form action="">
        <input type="text" placeholder="Email / Username">
        <input type="password" placeholder="Password">
        <button type="submit">Login</button>
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

    .login > form > * {
        margin: 0.5rem 0;
        padding: 0.5rem;
    }

    a.register {
        background-color: var(--secondary);
        padding: 1rem;

    }

    a.register:hover {
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