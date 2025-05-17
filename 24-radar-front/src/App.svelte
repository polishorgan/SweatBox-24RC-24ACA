<script>
	import Canvas from './Canvas.svelte'
	
	const colors = [
		'#d58141',
		'#d7c44c',
		'#4fa9cc',
		'#3f8d27',
	]
	const background = '#fff'

	let color = colors[0]
	const paletteColor = color
</script>

<main>
	<h1>Test</h1>
	<Canvas />
</main>
