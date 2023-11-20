<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { get } from 'svelte/store'; 
	import userStore from '$lib/stores/userStore';
	import headerShowAllItemsStore from '$lib/stores/headerShowAllItemsStore';
  
	let showMenu = false;
	let unsubscribe = () => {};
  
	onMount(() => {
		unsubscribe = userStore.subscribe(user => {
			headerShowAllItemsStore.set(!!user);
		});
	
		if (!import.meta.env.SSR) {
			showItemsIfTokenIsValid();
		}
	
	});
	
	async function showItemsIfTokenIsValid() {
		try {
			const res = await fetch('/api/verify-token');
			const data = await res.json();
			headerShowAllItemsStore.set(data.valid);
		} catch (err) {
			console.error(err);
			headerShowAllItemsStore.set(false);
		}
	}
	
	onDestroy(() => {
		unsubscribe();
	});


</script>

<header>
	<nav class="desktop-nav" class:hidden={showMenu}>
		{#if !$headerShowAllItemsStore}
			<div class="nav-item">
				<a href='/login'>Login</a>
			</div>
			<div class="nav-item">
				<a href='/register'>Register</a>
			</div>
		{:else if $headerShowAllItemsStore}
			<div class="nav-item">
				<a href='/home'>Home</a>
			</div>
			<div class="nav-item">
				<a href='/profile'>Profile</a>
			</div>
			<div class="nav-item">
				<a href='/logout'>Logout</a>
			</div>
		{/if}
	</nav>
	<button class="hamburger-button" aria-label="Hamburger Menu" on:click={() => showMenu = !showMenu}>
		<i class={`fas ${showMenu ? 'fa-times rotate-x' : 'fa-bars rotate-bars'}`}></i>
	</button>
	<nav class={`mobile-nav ${showMenu ? 'show-nav' : 'hidden'}`} >
		<a href='/' on:click={() => showMenu = !showMenu}>Home</a>
	</nav>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: -20px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;
		height: 4rem;
		z-index: 2;
		font-family: var(--font-mono);
		overflow: hidden;

        background-color: var(--secondary);
	}

	.desktop-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}

	nav > * {
		display: flex;
		justify-content: center;
		height: 100%;
	}

	nav > * > * {
		color: #fff;
		text-decoration: none;
		font-size: 1.5rem;
		font-weight: 700;
		padding: 0 1rem;
		height: 100%;
		justify-content: center;
		padding-top: 1.1rem;
	}
	
	.nav-item:hover {
		background-color: var(--accent);
		text-decoration: none;
		cursor: pointer;
	}
	
	.hidden {
		display: none;
	}
	
	.hamburger-button {
		display: none;
	}

	/* Mobile view */
	@media only screen and (max-width: 768px) {
		.desktop-nav {
			display: none;
		}
		
		.hamburger-button {
			display: block;
			background: none;
			color: var(--color-text);
			border: none;
			left: 1rem;
			top: 0;
			position: absolute;
			margin: 0rem;
			font-size: 2rem;
			cursor: pointer;
		}
		
		.rotate-bars {
			transform: rotate(0deg);
			transition: transform 0.3s ease;
		}
	
		.rotate-x {
			transform: rotate(90deg);
			transition: transform 0.3s ease;
		}

		.hamburger-button:hover {
			color: var(--accent);
		}

		.mobile-nav {
			background: var(--background);
			width: 100%;
			padding: 0.25rem;
			position: absolute;
			top: 4rem;
			left: 0;
			margin-left: 0.45rem;
			flex-direction: column;
			align-items: left;
			transform: translateY(-100%);
			transition: transform 0.3s ease;
			display: none;
		}
		
		.mobile-nav.show-nav {
			display: flex;
			transform: translateY(0%);
			transition: transform 0.3s ease;
		}

	}

</style>
