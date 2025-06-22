<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title = '', type = 'card', children, pack }: PackCardProps = $props();

	interface PackCardProps {
		title: string;
		type?: string;
		children: Snippet;
		pack?: PackProps[];
	}

	let packComplete = $derived.by(() => {
		if (!pack) return false;
		if (pack.length === 0) return false;
		for (const p of pack) {
			if (!p.done) return false;
		}
		return true;
	});
</script>

<section
	class="{type === 'warning'
		? 'bg-warning/10 border-warning/50'
		: 'bg-base-200/70 border-base-300/30'} grid h-fit content-start rounded-xl border shadow-md"
>
	<div
		class="{type === 'warning'
			? 'bg-warning text-warning-content'
			: 'bg-base-400 text-primary-content'} flex items-center gap-2 rounded-t-xl px-4 py-2 font-semibold"
	>
		<div class="flex grow items-center gap-2">
			{#if type === 'warning'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1.3em"
					height="1.3em"
					class="material-symbols:warning"
					viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M1 21L12 2l11 19zm11-3q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18m-1-3h2v-5h-2z"
					/></svg
				>
			{:else}
				<!-- <svg
				xmlns="http://www.w3.org/2000/svg"
				width="1.3em"
				height="1.3em"
				class="material-symbols:hourglass-top"
				viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M8 20h8v-3q0-1.65-1.175-2.825T12 13t-2.825 1.175T8 17zm-4 2v-2h2v-3q0-1.525.713-2.863T8.7 12q-1.275-.8-1.987-2.137T6 7V4H4V2h16v2h-2v3q0 1.525-.712 2.863T15.3 12q1.275.8 1.988 2.138T18 17v3h2v2z"
				/></svg
			> -->
			{/if}{title}
		</div>
		<div>
			{#if packComplete}<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1.3em"
					height="1.3em"
					class="material-symbols:check"
					viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"
					/></svg
				>{/if}
		</div>
	</div>
	<ul class="grid gap-2 p-4">
		{@render children()}
	</ul>
</section>
