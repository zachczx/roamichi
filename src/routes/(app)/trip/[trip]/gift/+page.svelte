<script lang="ts">
	import TripView from '$lib/view/TripView.svelte';
	import type { PageProps } from '../$types';

	let { data }: PageProps = $props();
</script>

<TripView mode="gift" tripId={data.trip.id} tripName={data.trip.tripName}>
	{#snippet breadcrumbs()}
		<li><a href="/trip">Trips</a></li>
		<li><a href="/trip/{data.trip.id}">{data.trip.tripName}</a></li>
		<li>Gift</li>
	{/snippet}

	<main class="grid w-full content-start gap-8 justify-self-center">
		<h2 class="font-header col-span-2 grid text-7xl font-bold">Gift</h2>

		<!-- <div
				class="bg-base-200/70 border-base-300/30 col-span-2 grid h-fit content-start items-start rounded-xl border p-4 shadow-md"
			>
				<h3 class="font-semibold">Gift Progress</h3>
				<div></div>
					<progress class="progress progress-success w-full" value={progress} max="100"></progress>
				</div>
				<p>
					{packed.length > 0 ? data.pack.length - packed.length : '0'} of {data.pack.length} items remaining
				</p>
			</div> -->

		Coming soon
	</main>
</TripView>
