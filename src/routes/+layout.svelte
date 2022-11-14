<script>
	import ModalComponent from '$lib/components/modal/ModalComponent.svelte';
	import { openModal } from '$lib/module/modal/modal';
</script>

<div class="scene">
	<button class="about-app" on:click={openModal}>About</button>

	<main>
		<slot />
	</main>

	<ModalComponent>
		<div class="about-apps">
			<h3 style="text-align: center;">Application</h3>
			<p class="with-divider" style="text-align: center;">
				Created with 🫶🏽 by <a href="https://github.com/IDNatte" rel="noreferrer" target="_blank"
					>Github/IDNatte</a
				>
				Learning 3D Threlte & Three.js in svelte, module by
				<a
					href="https://joyofcode.xyz/introduction-to-3d-with-svelte#introduction"
					rel="noreferrer"
					target="_blank">Joy Of Code</a
				>
			</p>
		</div>
	</ModalComponent>
</div>

<style>
	:global(body) {
		margin: 0 !important;
		padding: 0px !important;
	}

	.about-app {
		top: 20px;
		left: 20px;
		z-index: 555;
		color: #eaeaea;
		font-size: 18px;
		cursor: pointer;
		font-weight: bold;
		position: absolute;
		border-color: transparent;
		text-decoration: underline;
		text-underline-offset: 0.5rem;
		background-color: transparent;
	}

	.with-divider {
		padding-bottom: 19px;
		border-bottom: 1px solid black;
	}
</style>
