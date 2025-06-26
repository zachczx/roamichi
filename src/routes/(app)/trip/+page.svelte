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
	<div class="grid grid-cols-1 gap-8 p-4">
		<header class="col-span-1 grid grid-cols-[1fr_auto]">
			<div>
				<h2 class="font-header text-7xl font-bold">Your Trips</h2>
				<p class="text-base-content/60 mt-2">Plan, track, and relive your adventures</p>
			</div>
			<div class="flex items-end">
				<a href="/trip/add" class="btn btn-primary btn-lg flex items-center gap-2"
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
		</header>

		{#each data.trips as trip, i}
			{#if i === 0}
				<!-- Next trip highlight -->
				<div
					class="border-base-300/30 from-base-500 text-primary-content to-base-600/90 grid content-start gap-x-8 rounded-xl border bg-linear-to-tr to-70% p-4 shadow-md hover:opacity-100"
				>
					<div class="grid content-start gap-4 p-4">
						<span
							class="btn border-primary-content text-primary-content w-fit max-w-72 rounded-full border-0 bg-white/20 shadow-none"
							>NEXT TRIP <span>•</span> XX days</span
						>
						<h2 class="text-6xl font-bold"><a href="/trip/{trip.id}">{trip.tripName}</a></h2>
						<div class="flex flex-wrap gap-4">
							<span>{trip.tripStartFormatted}&nbsp;&nbsp;–&nbsp;&nbsp;{trip.tripEndFormatted}</span>
							<span>•</span><span>{trip.tripDuration} days</span>
						</div>

						{#snippet cardCol(header: string, count: number)}
							<div>
								<h4 class="text-2xl font-bold">{header}</h4>
								<p class="flex items-center gap-2">
									{#if count > 0}
										<MaterialSymbolsCheckCircle class="text-primary-content h-[1.3em] w-[1.3em]" />
									{:else}
										<MaterialSymbolsWarning class="text-warning" />
									{/if}{count} entries added
								</p>
							</div>
						{/snippet}

						<div class="border-l-base-300/20 grid grid-cols-2 gap-4 xl:grid-cols-4">
							<a
								href="/trip/{trip.id}/flight"
								class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg bg-white/20 p-4"
							>
								<MaterialSymbolsFlightTakeoff class="h-12 w-12" />
								<div>
									<h4 class="flex items-center gap-2 text-2xl font-bold">Flights</h4>

									<p class="flex items-center gap-2">
										<!-- <MaterialSymbolsCheck class="text-primary-content h-[1.3em] w-[1.3em]" /> -->
										{trip.flightCount} flights saved
									</p>
								</div>
								<div
									class="radial-progress"
									style="--value:{trip.flightCount >= 2 ? 100 : trip.flightCount === 1 ? 50 : 0};"
									aria-valuenow={trip.flightCount >= 2 ? 100 : trip.flightCount === 1 ? 50 : 0}
									role="progressbar"
								>
									{trip.flightCount >= 2 ? 100 : trip.flightCount === 1 ? 50 : 0}%
								</div>
							</a>

							<a
								href="/trip/{trip.id}/stay"
								class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg bg-white/20 p-4"
							>
								<MaterialSymbolsHotel class="h-12 w-12" />
								<div>
									<h4 class="flex items-center gap-2 text-2xl font-bold">Stays</h4>

									<p class="flex items-center gap-2">
										{trip.stayCount} stays saved
									</p>
								</div>
								<div
									class="radial-progress"
									style="--value:{trip.stayCount >= 1 ? 100 : 0};"
									aria-valuenow={trip.stayCount >= 1 ? 100 : 0}
									role="progressbar"
								>
									{trip.stayCount >= 1 ? 100 : 0}%
								</div>
							</a>

							<a
								href="/trip/{trip.id}/pack"
								class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg bg-white/20 p-4"
							>
								<MaterialSymbolsLuggage class="h-12 w-12" />
								<div>
									<h4 class="flex items-center gap-2 text-2xl font-bold">Packing</h4>

									<p class="flex items-center gap-2">
										{trip.packedCount} / {trip.packCount} items packed
									</p>
								</div>
								<div
									class="radial-progress"
									style="--value:{Math.round((trip.packedCount / trip.packCount) * 100)};"
									aria-valuenow={Math.round((trip.packedCount / trip.packCount) * 100)}
									role="progressbar"
								>
									{Math.round((trip.packedCount / trip.packCount) * 100)}%
								</div>
							</a>

							<a
								href="/trip/{trip.id}/gift"
								class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg bg-white/20 p-4"
							>
								<MaterialSymbolsFeaturedSeasonalAndGifts class="h-12 w-12" />
								<div>
									<h4 class="flex items-center gap-2 text-2xl font-bold">Gifts</h4>

									<p class="flex items-center gap-2">No gifts added</p>
								</div>
								<div
									class="radial-progress"
									style="--value:0;"
									aria-valuenow="0"
									role="progressbar"
								>
									0%
								</div>
							</a>
						</div>
					</div>
				</div>
			{/if}
		{/each}

		<!-- Remaining cards -->
		{#each data.trips as trip, i}
			{#if i > 0}
				<div
					class="border-base-300/30 from-base-500 text-primary-content to-base-600/90 grid content-start gap-x-8 rounded-xl border bg-linear-to-tr to-70% p-4 shadow-md hover:opacity-100"
				>
					<div class="grid content-start gap-4 p-4">
						<span
							class="btn border-primary-content text-primary-content max-w-72 rounded-full border-0 bg-white/20 shadow-none"
							>Next trip in XX</span
						>
						<h2 class="text-6xl font-bold"><a href="/trip/{trip.id}">{trip.tripName}</a></h2>
						<div class="flex flex-wrap gap-4">
							<span>{trip.tripStartFormatted}&nbsp;&nbsp;–&nbsp;&nbsp;{trip.tripEndFormatted}</span>
							<span>•</span><span>{trip.tripDuration} days</span>
						</div>

						{#snippet cardCol(header: string, count: number)}
							<div>
								<h4 class="text-2xl font-bold">{header}</h4>
								<p class="flex items-center">
									{#if count > 0}
										<MaterialSymbolsCheck class="text-success" />
									{:else}
										<MaterialSymbolsWarning class="text-warning" />
									{/if}{count}
								</p>
							</div>
						{/snippet}

						<div class="border-l-base-300/20 grid grid-cols-2 gap-4 xl:grid-cols-4">
							<a
								class="flex h-full items-center gap-4 rounded-lg bg-white/20 p-4"
								href="/trip/{trip.id}/flight"
							>
								<div><MaterialSymbolsFlightTakeoff class="h-10 w-10" /></div>
								{@render cardCol('Flight', trip.flights.length)}
							</a>
							<a
								class="flex h-full items-center gap-4 rounded-lg bg-white/20 p-4"
								href="/trip/{trip.id}/stay"
							>
								<div><MaterialSymbolsHotel class="h-10 w-10" /></div>
								{@render cardCol('Stay', trip.stays.length)}
							</a>
							<a
								class="flex h-full items-center gap-4 rounded-lg bg-white/20 p-4"
								href="/trip/{trip.id}/pack"
							>
								<div><MaterialSymbolsLuggage class="h-10 w-10" /></div>
								{@render cardCol('Pack', trip.packs.length)}
							</a>
							<a
								class="flex h-full items-center gap-4 rounded-lg bg-white/20 p-4"
								href="/trip/{trip.id}/gift"
							>
								<div><MaterialSymbolsFeaturedSeasonalAndGifts class="h-10 w-10" /></div>
								{@render cardCol('Gift', 0)}
							</a>
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</TripView>
<!-- <input bind:value={inat} type="text" class="input input-lg" onkeyup={handleCity} /> -->
