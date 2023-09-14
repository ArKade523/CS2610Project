<script lang="ts">
    import { onMount } from 'svelte';
	import Header from './Header.svelte';
    import './styles.css'
    import HoverGlowEffect from '$lib/components/HoverGlowEffect.svelte';

</script>

<div class="app">
	<div class="content-wrapper">
		<Header />
		
		<main>
            <HoverGlowEffect />
			<slot />
		</main>

		<footer>
			<p></p>
		</footer>
	</div>
</div>

<style>

</style>
