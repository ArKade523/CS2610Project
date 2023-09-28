<script lang="ts">
    // Add a glowing effect around the mouse to the background
    import {onMount} from 'svelte';
	
	let mousePosition = {x: 0, y: 0};
    let divPosition = {x: 0, y: 0};

    let opacity = 0.05;

    let div: HTMLDivElement;
    
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

        // Calculate new opacity based on Sine wave
        const currentTime = Date.now() / 1000; // Get current time in seconds
        opacity = 0.02 * Math.sin(1.4 * currentTime) + 0.06; // Sine function oscillates between -1 and 1, so normalize it to 0.02 to 0.1

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

<!-- <div style={`top: ${Math.round(divPosition.y)}px; left: ${Math.round(divPosition.x)}px; opacity: ${opacity};`}></div> -->
<div style={`transform: translate(${Math.round(divPosition.x) - ((div) ? (div?.clientWidth * 0.5) : 300)}px, ${Math.round(divPosition.y) - ((div) ? (div?.clientHeight * 0.6) : 360)}px); opacity: ${opacity};`} bind:this={div}></div>

<style>
    div {
        position: fixed;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(255,255,255,1) 10%, rgba(255,255,255,0) 70%);
        transform: translate(-50%, -60%);

        z-index: 0;
    }
</style>