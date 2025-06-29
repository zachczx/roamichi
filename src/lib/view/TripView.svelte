<script lang="ts">
	import TripNavSection from '$lib/ui/TripNavSection.svelte';
	import type { Snippet } from 'svelte';

	interface TripViewProps {
		mode: 'trips' | 'trip' | 'flight' | 'stay' | 'pack' | 'activity' | 'gift';
		tripId: string;
		tripName: string;
		breadcrumbs?: Snippet;
		children: Snippet;
		showSidebar?: boolean;
	}
	let {
		mode,
		breadcrumbs,
		children,
		tripId = '',
		tripName,
		showSidebar = true
	}: TripViewProps = $props();
</script>

<div class="flex">
	{#if showSidebar}
		<div class="shrink-0"><TripNavSection {mode} {tripId} {tripName} /></div>
	{/if}
	<main class="grid w-full content-start justify-self-center">
		{#if breadcrumbs}
			<div class="breadcrumbs mb-8 grid h-16 w-full content-center p-2 px-6 text-lg xl:px-16">
				<ul class="bg-neutral/15 w-fit rounded-xl px-4 py-2">
					<!-- <li class="hidden">
					<a href="/" aria-label="home"
						><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M5 20v-9.15L2.2 13L1 11.4L12 3l4 3.05V4h3v4.35l4 3.05l-1.2 1.6l-2.8-2.15V20h-5v-6h-4v6zm5-9.975h4q0-.8-.6-1.313T12 8.2t-1.4.513t-.6 1.312"
							/></svg
						>Home</a
					>
				</li> -->

					{@render breadcrumbs?.()}
				</ul>
			</div>
		{/if}

		<div class={['w-full px-4 pb-8 xl:px-16', !breadcrumbs && 'mt-8']}>{@render children()}</div>
	</main>
</div>

<style>
	.breadcrumbs {
		ul > li {
			a {
				display: flex;
				gap: 0.5rem;
				align-items: center;
			}
		}
	}
</style>
