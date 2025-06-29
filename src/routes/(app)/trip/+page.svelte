<script lang="ts">
	import MaterialSymbolsCheck from '$lib/assets/svg/MaterialSymbolsCheck.svelte';
	import MaterialSymbolsCheckCircle from '$lib/assets/svg/MaterialSymbolsCheckCircle.svelte';
	import MaterialSymbolsCircle from '$lib/assets/svg/MaterialSymbolsCircle.svelte';
	import MaterialSymbolsFeaturedSeasonalAndGifts from '$lib/assets/svg/MaterialSymbolsFeaturedSeasonalAndGifts.svelte';
	import MaterialSymbolsFlightTakeoff from '$lib/assets/svg/MaterialSymbolsFlightTakeoff.svelte';
	import MaterialSymbolsHotel from '$lib/assets/svg/MaterialSymbolsHotel.svelte';
	import MaterialSymbolsLuggage from '$lib/assets/svg/MaterialSymbolsLuggage.svelte';
	import MaterialSymbolsWarning from '$lib/assets/svg/MaterialSymbolsWarning.svelte';
	import ReshotIconSunnyBeach from '$lib/assets/svg/ReshotIconSunnyBeach.svelte';
	import ReshotIconSummerHolidays from '$lib/assets/svg/ReshotIconSummerHolidays.svelte';
	import { checkIfHistory } from '$lib/helpers.js';
	import DashboardTripCard from '$lib/ui/DashboardTripCard.svelte';
	import { countries } from '$lib/countries';
	import RadialProgress from '$lib/ui/RadialProgress.svelte';
	import TripView from '$lib/view/TripView.svelte';

	import MaterialSymbolsClose from '$lib/assets/svg/MaterialSymbolsClose.svelte';
	import Toaster from '$lib/ui/Toaster.svelte';
	let { data, form } = $props();
	let inat = $state();

	async function handleCity() {
		const url = `https://locapi.zixian.dev/country/${inat}`;
		const resp = await fetch(url);
		const item = await resp.json();
		console.log(item);
	}

	let nextTripPriority = $derived.by(() => {
		if (!data.nextTrip?.flightCount || data.nextTrip?.flightCount < 2) {
			return 'flight';
		}
		if (!data.nextTrip?.stayCount || data.nextTrip?.stayCount === 0) {
			return 'stay';
		}
		if (!data.nextTrip?.packCount || data.nextTrip?.packCount === 0) {
			return 'pack';
		}
	});
</script>

{#if form?.success}
	<Toaster status="success" description="Successfully deleted!" />
{/if}

<TripView mode="trips" tripId="" tripName="" showSidebar={false}>
	{#snippet breadcrumbs()}
		<li>Trips</li>
	{/snippet}
	<div class="grid grid-cols-1 gap-12">
		<header class="col-span-1 grid grid-cols-[1fr_auto]">
			<div>
				<h2 class="font-header text-7xl font-bold">Your Trips</h2>
				<p class="text-base-content/60 mt-2">Plan, track, and relive your adventures</p>
			</div>
			<div class="flex items-end">
				<a href="/trip/add?step=trip" class="btn btn-primary btn-lg flex items-center gap-2"
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
					<a
						href="/trip/{data.nextTrip.id}"
						class="btn border-primary-content text-primary-content w-fit max-w-72 rounded-full border-0 bg-white/20 shadow-none"
						>NEXT TRIP&nbsp;<span>•</span>&nbsp;{data.nextTrip.tripStartInDays?.toUpperCase()}</a
					>
					<div>
						<h2 class="text-6xl font-bold">
							<a href="/trip/{data.nextTrip.id}">{data.nextTrip.tripName}</a>
						</h2>
						<a href="/trip/{data.nextTrip.id}" class="flex flex-wrap gap-4">
							<span>{data.nextTrip.tripStartAndEndFormatted}</span>
							<span>•</span><span>{data.nextTrip.tripDuration} days</span>
						</a>
					</div>

					<div class="border-l-base-300/20 grid grid-cols-2 gap-4 xl:grid-cols-4">
						<a
							href="/trip/{data.nextTrip.id}/flight"
							class={[
								'grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg p-4',
								data.nextTrip.flightCount > 0 && 'bg-white/20',
								data.nextTrip.flightCount === 0 && 'hover:bg-alert bg-alert/70',
								nextTripPriority === 'flight' &&
									'shadow-primary-content/20 outline-primary-content/40 shadow-lg outline-2'
							]}
						>
							<MaterialSymbolsFlightTakeoff class="h-12 w-12" />
							<div>
								<h4 class="flex items-center gap-2 text-2xl font-bold">Flights</h4>

								<p class="flex items-center gap-2">
									<!-- <MaterialSymbolsCheck class="text-primary-content h-[1.3em] w-[1.3em]" /> -->
									{data.nextTrip.flightCount} flights saved
								</p>
							</div>
							<RadialProgress value={data.nextTrip.flightCount} target={2} />
						</a>

						<a
							href="/trip/{data.nextTrip.id}/stay"
							class={[
								'grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg p-4',
								data.nextTrip.stayCount > 0 && 'bg-white/20',
								data.nextTrip.stayCount === 0 && 'hover:bg-alert/70 bg-alert/60',
								nextTripPriority === 'stay' &&
									'shadow-primary-content/20 outline-primary-content/60 shadow-lg outline-2'
							]}
						>
							<MaterialSymbolsHotel class="h-12 w-12" />
							<div>
								<h4 class="flex items-center gap-2 text-2xl font-bold">Stays</h4>

								<p class="flex items-center gap-2">
									{data.nextTrip.stayCount} stays saved
								</p>
							</div>
							<!-- <RadialProgress value={data.nextTrip.stayCount} target={1} /> -->
							<RadialProgress value={data.nextTrip.stayCount} target={1} />
						</a>

						<!-- Logic for this is to make it shine if stays are settled. Need to consider whether to make this dynamically calculated in some var. -->
						<a
							href="/trip/{data.nextTrip.id}/pack"
							class={[
								'grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg p-4',
								data.nextTrip.packCount > 0 && 'bg-white/20',
								data.nextTrip.packCount === 0 && 'hover:bg-alert/70 bg-alert/45',
								nextTripPriority === 'pack' &&
									'shadow-primary-content/20 outline-primary-content/40 shadow-lg outline-2'
							]}
						>
							<MaterialSymbolsLuggage class="h-12 w-12" />
							<div>
								<h4 class="flex items-center gap-2 text-2xl font-bold">Packing</h4>
								<p class="flex items-center gap-2">
									{data.nextTrip.packedCount} / {data.nextTrip.packCount} items packed
								</p>
							</div>
							<RadialProgress value={data.nextTrip.packedCount} target={data.nextTrip.packCount} />
						</a>

						<a
							href="/trip/{data.nextTrip.id}/gift"
							class={[
								'grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg p-4',
								data.nextTrip.stayCount > 0 && 'bg-white/20',
								data.nextTrip.stayCount === 0 && 'hover:bg-alert/70 bg-alert/45'
							]}
						>
							<MaterialSymbolsFeaturedSeasonalAndGifts class="h-12 w-12" />
							<div>
								<h4 class="flex items-center gap-2 text-2xl font-bold">Gifts</h4>

								<p class="flex items-center gap-2">0 gifts added</p>
							</div>
							<RadialProgress value={0} target={0} />
						</a>
					</div>
				</div>
			</div>
		{/if}

		<section>
			<h2 class="col-span-3 mb-4 text-4xl">Future Trips</h2>
			<div class="grid grid-cols-3 gap-8">
				{#key data.futureTrips}
					{#if data.futureTrips.length > 0}
						{#each data.futureTrips as trip}
							<DashboardTripCard {trip} type="future" />
						{/each}
					{:else}
						<div class="col-span-3 grid w-fit justify-items-center justify-self-center py-8">
							<ReshotIconSunnyBeach class="text-primary/70 h-64 w-64" />
							<div class="mb-8 text-center">
								<h4 class="text-2xl font-bold">Nothing here yet</h4>
								<span class="">Start planning your next adventure now!</span>
							</div>
							<a href="/trip/add?step=trip" class="btn btn-primary btn-lg flex items-center gap-2"
								>Add Trip</a
							>
						</div>
					{/if}
				{/key}
			</div>
		</section>

		<section>
			<h2 class="col-span-3 mb-4 text-4xl">Past Trips</h2>
			<div class="grid grid-cols-3 gap-8">
				{#key data.pastTrips}
					{#if data.pastTrips.length === 0}
						<div class="col-span-3 grid w-fit justify-items-center justify-self-center py-8">
							<ReshotIconSummerHolidays class="text-primary/70 mb-8 h-56 w-56" />
							<div class="mb-8 text-center">
								<h4 class="text-2xl font-bold">Nothing here yet</h4>
								<span class="">Get started with new adventures now!</span>
							</div>
							<a href="/trip/add?step=trip" class="btn btn-primary btn-lg flex items-center gap-2"
								>Add Trip</a
							>
						</div>
					{:else}
						{#each data.pastTrips as trip, i}
							<DashboardTripCard {trip} type="past" />
						{/each}
					{/if}
				{/key}
			</div>
		</section>
	</div>
</TripView>
