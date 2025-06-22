<script lang="ts">
	import { duration } from 'drizzle-orm/gel-core';
	import { onDestroy, onMount } from 'svelte';

	let { status = 'success', description }: { status: string; description?: string } = $props();

	let el = $state() as HTMLDivElement;

	onMount(() => {
		setTimeout(() => {
			el.classList.add('hidden');
		}, 4000);
	});
</script>

<div class="toast toast-top toast-center z-[1]" bind:this={el}>
	<div
		class="alert flex items-center gap-2 {status === 'success' ? 'alert-success' : 'alert-error'}"
	>
		{#if status === 'success'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				class="material-symbols:check-circle"
				viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
				/></svg
			>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				class="material-symbols:error"
				viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
				/></svg
			>
		{/if}
		<span>{description}</span>
	</div>
</div>
