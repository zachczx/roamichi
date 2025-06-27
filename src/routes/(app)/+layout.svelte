<script lang="ts">
	import MaterialSymbolsSettings from '$lib/assets/svg/MaterialSymbolsSettings.svelte';
	import MaterialSymbolsTravelLuggageAndBags from '$lib/assets/svg/MaterialSymbolsTravelLuggageAndBags.svelte';
	import Toaster from '$lib/ui/Toaster.svelte';

	let { children, data } = $props();
</script>

<div class="grid min-h-dvh grid-cols-[auto_1fr]">
	<!-- <div
			class="font-logo text-primary col-span-2 h-full max-h-20 px-2 py-4 text-4xl font-extrabold tracking-tighter"
		>
			<a href="/" class="flex items-center justify-center gap-4">Roamichi</a>
		</div> -->
	<nav
		class="to-base-900 from-base-900/100 text-primary-content sticky top-0 z-[1] grid h-full max-h-dvh w-full max-w-[200px] content-start border-r border-r-black/10 bg-linear-to-br"
	>
		<a
			class="border-b-base-300/30 font-logo text-primary-content flex h-16 items-center justify-center border-b-0 text-6xl font-bold"
			href="/"
		>
			R
		</a>
		<ul class="mt-4">
			<li>
				<a
					aria-label="dashboard"
					href="/trip"
					class="{data.paths.includes('trip')
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} grid aspect-square w-full min-w-32 cursor-pointer content-center justify-items-center gap-1 p-8 text-lg font-semibold"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.3em"
						height="1.3em"
						class="material-symbols:dashboard h-10 w-10"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z"
						/></svg
					>Trips</a
				>
			</li>

			<li>
				<a
					aria-label="contact"
					href="/settings"
					class="{data.paths.includes('settings')
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} grid aspect-square w-full min-w-32 cursor-pointer content-center justify-items-center gap-1 p-8 text-lg font-semibold"
					><MaterialSymbolsSettings class="h-10 w-10" />Settings</a
				>
			</li>

			<li>
				<a
					aria-label="contact"
					href="/contact"
					class="{data.paths.includes('contact')
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} grid aspect-square w-full min-w-32 cursor-pointer content-center justify-items-center gap-1 p-8 text-lg font-semibold"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.3em"
						height="1.3em"
						class="material-symbols:mail h-10 w-10"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"
						/></svg
					>Contact</a
				>
			</li>
		</ul>
	</nav>
	{@render children()}
</div>

<style>
	.main-container-height {
		min-height: calc(100vh - 2rem);
	}

	.nav-full-height {
		min-height: calc(100vh - 5rem);
	}
</style>
