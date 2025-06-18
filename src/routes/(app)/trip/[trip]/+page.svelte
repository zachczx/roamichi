<script>
	import EmptyState from '$lib/assets/svg/EmptyState.svelte';
	import { stay } from '$lib/drizzle/schema.js';

	let { data } = $props();
</script>

<div class="breadcrumbs text-sm">
	<ul>
		<li>
			<a href="/" class="hover:text-primary" aria-label="home"
				><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M5 20v-9.15L2.2 13L1 11.4L12 3l4 3.05V4h3v4.35l4 3.05l-1.2 1.6l-2.8-2.15V20h-5v-6h-4v6zm5-9.975h4q0-.8-.6-1.313T12 8.2t-1.4.513t-.6 1.312"
					/></svg
				></a
			>
		</li>
		<li><a href="/trip" class="hover:text-primary hover:underline">Trips</a></li>
		<li>{data.trip.tripName}</li>
	</ul>
</div>
<main class="grid content-start gap-12">
	<header>
		<h1 class="font-header text-7xl font-bold">{data.trip.tripName}</h1>
		<span class="text-base-content/50 text-sm">Created {data.trip.createdAtSemantic}</span>
	</header>

	<section class="grid w-full grid-cols-2 gap-4">
		<div class="col-span-2 grid grid-cols-[1fr_auto]">
			<h2 class="font-header text-4xl font-bold">Flights ({data.flight.length})</h2>
			<div>
				<a href="/trip/{data.trip.id}/flight" class="btn btn-primary flex items-center gap-2"
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
					class="bg-base-200 border-base-300/30 grid grid-cols-[1fr_auto_1fr] gap-2 rounded-xl border-2 p-4 shadow"
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
				<span class="text-neutral"><EmptyState /></span>
				<h3 class="-mt-2 text-center text-lg font-medium">There's nothing here!</h3>
			</div>
		{/if}
	</section>

	<section class="grid w-full gap-4">
		<div class="grid grid-cols-[1fr_auto]">
			<h2 class="font-header text-4xl font-bold">Stays ({data.stay.length})</h2>
			<a href="/trip/{data.trip.id}/stay" class="btn btn-primary flex items-center gap-2"
				>Add Stay<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1.3em"
					height="1.3em"
					class="material-symbols:add"
					viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg
				></a
			>
		</div>
		{#if data.stay.length > 0}
			{#each data.stay as stay}
				<div
					class="bg-base-200 border-base-300/30 grid grid-cols-2 gap-2 rounded-xl border-2 p-4 shadow"
				>
					<div class="grid gap-0">
						<div class="text-2xl">{stay.stayName}</div>
						{#if stay.address}
							<div>
								{stay.address}
							</div>
						{/if}
						<div>{stay.city}, {stay.country}</div>
						<div class="mt-2">
							<span class="btn-neutral btn-outline btn btn-xs rounded-full px-4 py-1"
								>{stay.type[0].toUpperCase() + stay.type.slice(1, stay.type.length)}
							</span>
						</div>
					</div>

					<div class="grid grid-cols-2 content-center gap-6">
						<div class="">
							<h3 class="font-bold">Check-In</h3>
							{stay.checkInFormatted}
						</div>

						<div class="">
							<h3 class="font-bold">Check-Out</h3>
							{stay.checkOutFormatted}
						</div>
					</div>

					{#if stay.cost}
						{stay.cost}
					{/if}
				</div>
			{/each}
		{:else}
			<div class="col-span-2 grid content-center justify-items-center gap-8 py-12">
				<span class="text-neutral"><EmptyState /></span>
				<h3 class="-mt-2 text-center text-lg font-medium">There's nothing here!</h3>
			</div>
		{/if}
	</section>

	<section class="grid w-full grid-cols-2 gap-4">
		<div class="col-span-2 grid grid-cols-[1fr_auto]">
			<h2 class="font-header text-4xl font-bold">Pack ({data.pack.length})</h2>
			<div>
				<a href="/trip/{data.trip.id}/pack" class="btn btn-primary flex items-center gap-2"
					>Add Item<svg
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
		{#if data.pack.length > 0}
			{#each data.pack as pack}{/each}
		{:else}
			<div class="col-span-2 grid content-center justify-items-center gap-8 py-12">
				<span class="text-neutral"><EmptyState /></span>
				<h3 class="-mt-2 text-center text-lg font-medium">There's nothing here!</h3>
			</div>
		{/if}
	</section>
</main>
