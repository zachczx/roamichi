<script>
	import EmptyState from '$lib/assets/svg/EmptyState.svelte';
	import { stay } from '$lib/drizzle/schema.js';
	import TripView from '$lib/ui/TripView.svelte';

	let { data } = $props();
</script>

<TripView mode="trip" tripId={data.trip.id}>
	{#snippet breadcrumbs()}
		<li><a href="/trip" class="hover:text-primary">Trips</a></li>
		<li><a href="/trip/{data.trip.id}">{data.trip.tripName}</a></li>
		<li>Flight</li>
	{/snippet}

	<main class="content-height grid w-full content-start gap-12 justify-self-center">
		<header>
			<h1 class="font-header text-7xl font-bold">{data.trip.tripName}</h1>
			<span class="text-base-content/50 text-sm">Created {data.trip.createdAtSemantic}</span>
		</header>

		<section class="grid w-full gap-4 lg:grid-cols-2 xl:grid-cols-3">
			<div class="grid grid-cols-[1fr_auto] lg:col-span-2 xl:col-span-3">
				<h2 class="font-header text-4xl font-bold">Flights ({data.flight.length})</h2>
				<div>
					<a href="/trip/{data.trip.id}/flight/add" class="btn btn-primary flex items-center gap-2"
						>Add Flight<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1.3em"
							height="1.3em"
							class="material-symbols:add"
							viewBox="0 0 24 24"
							><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg
						></a
					>
				</div>
			</div>
			{#if data.flight.length > 0}
				{#each data.flight as flight}
					<div
						class="bg-base-200 border-base-300/30 grid grid-cols-[1fr_auto_1fr] gap-2 rounded-xl border p-4"
					>
						<div class="col-span-3">{flight.airline} {flight.flightNumber}</div>

						<div>
							<div class="text-2xl">{flight.fromCity}</div>
							<div>{flight.departureTimestampFormatted}</div>
							<div>
								{flight.fromCountry}
								{#if flight.fromAirport}, {flight.fromAirport}{/if}
							</div>
						</div>
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								class="material-symbols:arrow-forward h-8 w-8"
								viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8l-8 8l-1.425-1.4z"
								/></svg
							>
						</div>
						<div>
							<div class="text-2xl">{flight.toCity}</div>
							<div>{flight.arrivalTimestampFormatted}</div>
							<div>
								{flight.toCountry}{#if flight.toAirport}, {flight.toAirport}{/if}
							</div>
						</div>

						{flight.cost}
					</div>
				{/each}
			{:else}
				<div class="col-span-2 grid content-center justify-items-center gap-8 py-12">
					<span class="text-base-300"><EmptyState /></span>
					<h3 class="-mt-2 text-center text-lg font-medium">There's nothing here!</h3>
				</div>
			{/if}
		</section>
	</main></TripView
>

<style>
	.content-height {
		min-height: calc(100vh - 6rem);
	}
</style>
