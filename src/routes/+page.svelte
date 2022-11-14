<script lang="ts">
	import { browser } from '$app/environment';

	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
	import * as Threlte from '@threlte/core';
	import * as Extra from '@threlte/extras';
	import { Pane } from 'tweakpane';
	import * as Three from 'three';

	import { camera } from '$lib/type/camera';
	import { point } from '$lib/type/point';
	import { ghost } from '$lib/type/ghost';

	import BgComponent from '$lib/components/background/BgComponent.svelte';

	export const prerender = true;

	type PointLight = keyof typeof point;
	type Camera = keyof typeof camera;
	type Ghost = keyof typeof ghost;

	function float() {
		let second = Date.now() / 1000;
		let offsetY = 2.9;
		ghost.position.y = Math.sin(second) + offsetY;
		requestAnimationFrame(float);
	}

	if (browser) {
		float();

		let pane = new Pane({ title: 'Scene' });

		let cameraControl = pane.addFolder({ title: 'Camera' });
		cameraControl.addInput(camera, 'position');
		cameraControl.addInput(camera, 'zoom');

		cameraControl.on('change', ({ presetKey, value }) => {
			camera[presetKey as Camera] = value as any;
		});

		let pointLightControl = pane.addFolder({ title: 'Point Light' });
		pointLightControl.addInput(point, 'position');
		pointLightControl.addInput(point, 'color');

		pointLightControl.on('change', ({ presetKey, value }) => {
			point[presetKey as PointLight] = value as any;
		});

		let ghostControl = pane.addFolder({ title: 'Ghost' });
		ghostControl.addInput(ghost, 'scale');
		ghostControl.addInput(ghost, 'position');

		ghostControl.on('change', ({ presetKey, value }) => {
			ghost[presetKey as Ghost] = value as any;
		});
	}

	let gridHelper = new Three.GridHelper(20, 10);
	let axisHelper = new Three.AxesHelper(10);
</script>

<div class="scene">
	<Threlte.Canvas rendererParameters={{ antialias: true }}>
		<Threlte.Object3DInstance object={gridHelper} />
		<Threlte.Object3DInstance object={axisHelper} />

		<Threlte.Pass pass={new UnrealBloomPass(new Three.Vector2(1, 1), 4, 1, 0.7)} />

		<BgComponent color="orangered" />

		<Threlte.OrthographicCamera {...camera}>
			<Threlte.OrbitControls />
		</Threlte.OrthographicCamera>

		<Threlte.AmbientLight color="blue" intensity={4} />
		<Threlte.PointLight intensity={0.2} {...point} />

		<Extra.GLTF url="models/ghost.glb" {...ghost} />
		<Extra.GLTF url="models/garden.glb" />
	</Threlte.Canvas>
</div>

<style>
	.scene {
		inset: 0;
		width: 100%;
		height: 100%;
		position: absolute;
		background: radial-gradient(hsl(220 14% 20%), hsl(220 20% 10%));
		background-attachment: fixed;
	}
</style>
