<script lang="ts">
	import MaterialSymbolsFlightTakeoff from '$lib/assets/svg/MaterialSymbolsFlightTakeoff.svelte';
	import MaterialSymbolsHotel from '$lib/assets/svg/MaterialSymbolsHotel.svelte';
	import MaterialSymbolsLuggage from '$lib/assets/svg/MaterialSymbolsLuggage.svelte';
	import { checkIfHistory } from '$lib/helpers.js';
	import TripView from '$lib/view/TripView.svelte';
	import dayjs from 'dayjs';
	let { data } = $props();

	let inat = $state();

	async function handleCity() {
		const url = `https://locapi.zixian.dev/country/${inat}`;
		const resp = await fetch(url);
		const item = await resp.json();
		console.log(item);
	}
</script>

<TripView mode="trips" tripId="">
	{#snippet breadcrumbs()}
		<li>Trips</li>
	{/snippet}
	<div class="grid grid-cols-3 p-4">
		{#each data.trips as trip}
			<a
				href="/trip/{trip.id}"
				class="border-base-300/30 bg-base-200/70 grid content-start gap-x-8 rounded-xl border p-4 shadow-md hover:opacity-100"
			>
				<div class="grid content-start gap-2 p-4">
					<h2 class="text-6xl font-semibold">{trip.tripName}</h2>
					<div class="flex flex-wrap gap-4">
						<span>{trip.tripStartFormatted} - {trip.tripEndFormatted}</span>
						<span>•</span><span>{trip.tripDuration} days</span>
					</div>
					<div class="border-l-base-300/20 grid grid-cols-3 p-4">
						<div class="h-full">
							<MaterialSymbolsFlightTakeoff class="h-10 w-10" />
							<h4 class="font-bold">Flight</h4>
							<!-- <p class="text-6xl">{#each trip.flights as flight}{flight}{/each}</p> -->
						</div>
						<div>
							<MaterialSymbolsHotel class="h-10 w-10" />
							<h4 class="font-bold">Stay</h4>
							<!-- <p>{trip.stayCount}</p> -->
						</div>
						<div>
							<MaterialSymbolsLuggage class="h-10 w-10" />
							<h4 class="font-bold">Pack</h4>
							<!-- <p>{trip.packCount}</p> -->
						</div>
					</div>
				</div></a
			>
		{/each}
	</div>
</TripView>
<!-- <input bind:value={inat} type="text" class="input input-lg" onkeyup={handleCity} /> -->
