<script lang="ts">
	import { onMount } from 'svelte'
	
	let width = 1280
	let height = 720
	let background = '#fff'
	
	let canvas: HTMLDivElement;
	let source: HTMLImageElement;
	let context: CanvasRenderingContext2D;
	
	const handleSize = () => {
		const { left, top } = canvas.getBoundingClientRect();
		const { innerWidth, innerHeight } = window;
		width = innerWidth - left - 1;
		height = innerHeight - top - 1;
	}
</script>

<svelte:window on:resize={handleSize} />

<div
	bind:this={canvas}
	style="background:{background}; position:absolute; width:{width}; height:{height}"
>t</div>

<div style="display:none;">
	<img
		bind:this={source}
		src="https://mdn.github.io/shared-assets/images/examples/rhino.jpg"
		width="300"
		height="227"
		alt="tesxt"
	/>
</div>