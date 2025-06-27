<script lang="ts">
	import MaterialSymbolsCheck from '$lib/assets/svg/MaterialSymbolsCheck.svelte';
	import MaterialSymbolsCheckCircle from '$lib/assets/svg/MaterialSymbolsCheckCircle.svelte';
	import MaterialSymbolsCircle from '$lib/assets/svg/MaterialSymbolsCircle.svelte';
	import MaterialSymbolsFeaturedSeasonalAndGifts from '$lib/assets/svg/MaterialSymbolsFeaturedSeasonalAndGifts.svelte';
	import MaterialSymbolsFlightTakeoff from '$lib/assets/svg/MaterialSymbolsFlightTakeoff.svelte';
	import MaterialSymbolsHotel from '$lib/assets/svg/MaterialSymbolsHotel.svelte';
	import MaterialSymbolsLuggage from '$lib/assets/svg/MaterialSymbolsLuggage.svelte';
	import MaterialSymbolsWarning from '$lib/assets/svg/MaterialSymbolsWarning.svelte';
	import { checkIfHistory } from '$lib/helpers.js';
	import DashboardTripCard from '$lib/ui/DashboardTripCard.svelte';
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

<TripView mode="trips" tripId="" tripName="" showSidebar={false}>
	{#snippet breadcrumbs()}
		<li>Trips</li>
	{/snippet}
	<div class="grid grid-cols-1 gap-12 p-4">
		<header class="col-span-1 grid grid-cols-[1fr_auto]">
			<div>
				<h2 class="font-header text-7xl font-bold">Your Trips</h2>
				<p class="text-base-content/60 mt-2">Plan, track, and relive your adventures</p>
			</div>
			<div class="flex items-end">
				<a href="/trip/add" class="btn btn-primary btn-lg flex items-center gap-2"
					>Add Trip<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.3em"
						height="1.3em"
						class="material-symbols:add"
						viewBox="0 0 24 24"
						><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg
					></a
				>
			</div>
		</header>

		<!-- Next trip highlight -->
		{#if data.nextTrip}
			<div
				class="border-base-300/30 from-base-500 text-primary-content to-base-600/90 grid content-start gap-x-8 rounded-xl border bg-linear-to-tr to-70% p-4 shadow-md hover:opacity-100"
			>
				<div class="grid content-start gap-4 p-4">
					<span
						class="btn border-primary-content text-primary-content w-fit max-w-72 rounded-full border-0 bg-white/20 shadow-none"
						>NEXT TRIP&nbsp;<span>•</span>&nbsp;{data.nextTrip.tripStartInDays}</span
					>
					<h2 class="text-6xl font-bold">
						<a href="/trip/{data.nextTrip.id}">{data.nextTrip.tripName}</a>
					</h2>
					<div class="flex flex-wrap gap-4">
						<span>{data.nextTrip.tripStartAndEndFormatted}</span>
						<span>•</span><span>{data.nextTrip.tripDuration} days</span>
					</div>

					<div class="border-l-base-300/20 grid grid-cols-2 gap-4 xl:grid-cols-4">
						<a
							href="/trip/{data.nextTrip.id}/flight"
							class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg bg-white/20 p-4"
						>
							<MaterialSymbolsFlightTakeoff class="h-12 w-12" />
							<div>
								<h4 class="flex items-center gap-2 text-2xl font-bold">Flights</h4>

								<p class="flex items-center gap-2">
									<!-- <MaterialSymbolsCheck class="text-primary-content h-[1.3em] w-[1.3em]" /> -->
									{data.nextTrip.flightCount} flights saved
								</p>
							</div>
							<div
								class="radial-progress"
								style="--value:{data.nextTrip.flightCount >= 2
									? 100
									: data.nextTrip.flightCount === 1
										? 50
										: 0};"
								aria-valuenow={data.nextTrip.flightCount >= 2
									? 100
									: data.nextTrip.flightCount === 1
										? 50
										: 0}
								role="progressbar"
							>
								{data.nextTrip.flightCount >= 2 ? 100 : data.nextTrip.flightCount === 1 ? 50 : 0}%
							</div>
						</a>

						<a
							href="/trip/{data.nextTrip.id}/stay"
							class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg bg-white/20 p-4"
						>
							<MaterialSymbolsHotel class="h-12 w-12" />
							<div>
								<h4 class="flex items-center gap-2 text-2xl font-bold">Stays</h4>

								<p class="flex items-center gap-2">
									{data.nextTrip.stayCount} stays saved
								</p>
							</div>
							<div
								class="radial-progress"
								style="--value:{data.nextTrip.stayCount >= 1 ? 100 : 0};"
								aria-valuenow={data.nextTrip.stayCount >= 1 ? 100 : 0}
								role="progressbar"
							>
								{data.nextTrip.stayCount >= 1 ? 100 : 0}%
							</div>
						</a>

						<a
							href="/trip/{data.nextTrip.id}/pack"
							class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg bg-white/20 p-4"
						>
							<MaterialSymbolsLuggage class="h-12 w-12" />
							<div>
								<h4 class="flex items-center gap-2 text-2xl font-bold">Packing</h4>

								<p class="flex items-center gap-2">
									{data.nextTrip.packedCount} / {data.nextTrip.packCount} items packed
								</p>
							</div>
							<div
								class="radial-progress"
								style="--value:{Math.round(
									(data.nextTrip.packedCount / data.nextTrip.packCount) * 100
								)};"
								aria-valuenow={Math.round(
									(data.nextTrip.packedCount / data.nextTrip.packCount) * 100
								)}
								role="progressbar"
							>
								{data.nextTrip.packCount >= 1
									? Math.round((data.nextTrip.packedCount / data.nextTrip.packCount) * 100)
									: 0}%
							</div>
						</a>

						<a
							href="/trip/{data.nextTrip.id}/gift"
							class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg bg-white/20 p-4"
						>
							<MaterialSymbolsFeaturedSeasonalAndGifts class="h-12 w-12" />
							<div>
								<h4 class="flex items-center gap-2 text-2xl font-bold">Gifts</h4>

								<p class="flex items-center gap-2">No gifts added</p>
							</div>
							<div class="radial-progress" style="--value:0;" aria-valuenow="0" role="progressbar">
								0%
							</div>
						</a>
					</div>
				</div>
			</div>
		{/if}

		<section>
			<h2 class="col-span-3 mb-4 text-4xl">Future Trips</h2>
			<div class="grid grid-cols-3 gap-8">
				{#each data.futureTrips as trip, i}
					{#if i === 0}
						Nothing here!
					{/if}
					{#if i > 0}
						<!-- Next trip highlight -->
						<DashboardTripCard {trip} type="past" />
					{/if}
				{/each}
			</div>
		</section>

		<section>
			<h2 class="col-span-3 mb-4 text-4xl">Past Trips</h2>
			<div class="grid grid-cols-3 gap-8">
				{#each data.pastTrips as trip}
					<!-- Next trip highlight -->
					<DashboardTripCard {trip} type="past" />
				{/each}
			</div>
		</section>
	</div>
</TripView>
<!-- <input bind:value={inat} type="text" class="input input-lg" onkeyup={handleCity} /> -->
