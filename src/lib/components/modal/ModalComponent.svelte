<script lang="ts">
	import { fade } from 'svelte/transition';

	import CloseSvg from '$lib/assets/images/CloseSvg.svelte';
	import { closeModal } from '$lib/module/modal/modal';
	import { modalStore } from '$lib/store/modal.store';
	import { get } from 'svelte/store';

	function closeOnEscape(event: KeyboardEvent) {
		if (get(modalStore).is_open === true) {
			if (event.code === 'Escape') {
				closeModal();
			}
		}
	}
</script>

<svelte:window on:keydown={closeOnEscape} />

{#if $modalStore.is_open == true}
	<div class="about-application" transition:fade>
		<div class="about-wrapper">
			<div class="about-header">
				<h1>About</h1>
				<a href="#!" on:click|preventDefault={closeModal}>
					<CloseSvg />
				</a>
			</div>
			<div class="about-text">
				<slot />
			</div>
		</div>
	</div>
{/if}

<style>
	.about-application {
		width: 100%;
		z-index: 999;
		height: 100vh;
		display: flex;
		position: absolute;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.44);
	}

	.about-wrapper {
		width: 30%;
		height: auto;
		padding: 1rem;
		border-radius: 2.5px;
		background-color: white;
	}

	.about-header {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.about-header a {
		display: flex;
		color: black;
		align-items: center;
		text-decoration: none;
	}

	.about-header h1 {
		margin: 0 !important;
		padding: 0px !important;
	}

	.about-text {
		padding: 2rem 0px;
	}
</style>
