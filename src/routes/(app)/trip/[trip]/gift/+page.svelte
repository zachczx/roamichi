<script lang="ts">
	import TripView from '$lib/ui/TripView.svelte';
	import type { PageProps } from '../$types';

	let { data }: PageProps = $props();
</script>

<TripView mode="gift" tripId={data.trip.id}>
	{#snippet breadcrumbs()}
		<li><a href="/trip">Trips</a></li>
		<li><a href="/trip/{data.trip.id}">{data.trip.tripName}</a></li>
		<li>Gift</li>
	{/snippet}

	<main class="grid w-full grid-cols-2 content-start gap-12 justify-self-center">
		<header class="col-span-2">
			<h1 class="font-header text-4xl font-bold">{data.trip.tripName}</h1>
			<span class="text-base-content/50 text-sm">Created {data.trip.createdAtSemantic}</span>
		</header>

		<div class="col-span-2 grid grid-cols-2 gap-8">
			<h2 class="font-header col-span-2 grid text-7xl font-bold">Gift</h2>

			<div
				class="bg-base-200/70 border-base-300/30 col-span-2 grid h-fit content-start items-start rounded-xl border p-4 shadow-md"
			>
				<h3 class="font-semibold">Gift Progress</h3>
				<div>
					<!-- <progress class="progress progress-success w-full" value={progress} max="100"></progress> -->
				</div>
				<p>
					<!-- {packed.length > 0 ? data.pack.length - packed.length : '0'} of {data.pack.length} items remaining -->
				</p>
			</div>
		</div>
	</main>
</TripView>
