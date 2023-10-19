<script lang="ts">
    import { onMount } from 'svelte';
	import Header from './Header.svelte';
    import './styles.css'
    import HoverGlowEffect from '$lib/components/HoverGlowEffect.svelte';
	import Daydoodle from '$lib/images/Daydoodle.png';
</script>
<head>
	<link rel="favicon" href={Daydoodle} />
</head>

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
