<script>

let colors=["#7F03FC","#bb4484","#d96548","e8752a","f7850b"]

	import { onMount } from 'svelte';

	let canvas;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		let frame = requestAnimationFrame(loop);

		function loop(t) {
			frame = requestAnimationFrame(loop);

			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

			for (let p = 0; p < imageData.data.length; p += 4) {
				const i = p / 4;
				const x = i % canvas.width;
				const y = i / canvas.width >>> 0;

				const r = 64 + (128 * x / canvas.width) + (64 * Math.sin(t / 1000));
				const g = 64 + (128 * y / canvas.height) + (64 * Math.cos(t / 1000));
				const b = 128;

				imageData.data[p + 0] = r;
				imageData.data[p + 1] = g;
				imageData.data[p + 2] = b;
				imageData.data[p + 3] = 255;
			}

			ctx.putImageData(imageData, 0, 0);
		}

		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<main class="main flex flex-col justify-center items-center" >

    <h1 class="text-5xl font-bold">Don Auto's Information System</h1><br><br>
    <h2 class="text-3xl font-bold "> ALPHA V.0.0.1</h2>
    <h3 class="text-1xl ">This is still a build version of the system and the final product may look differnt </h3><br><br><br>
    <a href="/login" class="login text-4xl underline" id="link">Get started</a>

<canvas
	bind:this={canvas}
	width={32}
	height={32}
></canvas> 
</main>


<style>
	canvas {
		width: 100%;
		height: 100%;
		background-color: #666;
		-webkit-mask: url("../images/Name.svg") 50% 50% no-repeat;
		mask: url("../images/Name.svg") 50% 50% no-repeat;
	}
</style>