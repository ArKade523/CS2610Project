<script lang="ts">
    // Add a glowing effect around the mouse to the background
    import {onMount} from 'svelte';
	
	let mousePosition = {x: 0, y: 0};
    let divPosition = {x: 0, y: 0};
    
    const mouseMove = (event: MouseEvent) => {
        mousePosition.x = event.clientX;
        mousePosition.y = event.clientY;
    }

    const updateDivPosition = () => {
        if (divPosition.x === 0 && divPosition.y === 0) {
            divPosition.x = mousePosition.x;
            divPosition.y = mousePosition.y;
        }

        divPosition.x += (mousePosition.x - divPosition.x) * 0.3;
        divPosition.y += (mousePosition.y - divPosition.y) * 0.3;

        requestAnimationFrame(updateDivPosition);
    };

    onMount(() => {
        // Add event listener to window object
        window.addEventListener('mousemove', mouseMove);

        // Start animation loop
        requestAnimationFrame(updateDivPosition);
        
        // Cleanup
        return () => {
            window.removeEventListener('mousemove', mouseMove);
        };
    });
</script>

<div style={`top: ${Math.round(divPosition.y)}px; left: ${Math.round(divPosition.x)}px`}></div>

<style>
    div {
        position: absolute;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(255,255,255,0.02) 10%, rgba(255,255,255,0) 70%);
        transform: translate(-50%, -60%);

        z-index: 0;
    }
</style>