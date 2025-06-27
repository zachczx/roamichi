<script lang="ts">
	import MaterialSymbolsFeaturedSeasonalAndGifts from '$lib/assets/svg/MaterialSymbolsFeaturedSeasonalAndGifts.svelte';
	import MaterialSymbolsFlightTakeoff from '$lib/assets/svg/MaterialSymbolsFlightTakeoff.svelte';
	import MaterialSymbolsHotel from '$lib/assets/svg/MaterialSymbolsHotel.svelte';
	import MaterialSymbolsLuggage from '$lib/assets/svg/MaterialSymbolsLuggage.svelte';
	let { trip, type }: { trip: TripPropsExtra; type: 'past' | 'future' } = $props();

	let classColorProps = $derived.by(() => {
		if (type === 'future') return 'bg-base-200';
		if (type === 'past') return 'bg-neutral/20 text-base-content/70';
	});
</script>

<div
	class={[
		'border-base-300/30 grid content-start rounded-xl border bg-linear-to-tr p-4 shadow-md hover:opacity-100',
		classColorProps
	]}
>
	<div class="grid content-start gap-4 p-4">
		<h2 class="text-6xl font-bold"><a href="/trip/{trip.id}">{trip.tripName}</a></h2>
		<div class="flex flex-wrap gap-4">
			<span>{trip.tripStartAndEndFormatted}</span>
			<span>•</span><span>{trip.tripDuration} days</span>
		</div>

		<a
			href="/trip/{trip.id}/flight"
			class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg"
		>
			<MaterialSymbolsFlightTakeoff class="h-6 w-6" />
			<div>
				<p class="flex items-center gap-2">
					<!-- <MaterialSymbolsCheck class="text-primary-content h-[1.3em] w-[1.3em]" /> -->
					{trip.flightCount} flights saved
				</p>
			</div>
		</a>

		<a
			href="/trip/{trip.id}/stay"
			class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg"
		>
			<MaterialSymbolsHotel class="h-6 w-6" />
			<p class="flex items-center gap-2">
				{trip.stayCount} stays saved
			</p>
		</a>

		<a
			href="/trip/{trip.id}/pack"
			class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg"
		>
			<MaterialSymbolsLuggage class="h-6 w-6" />
			<p class="flex items-center gap-2">
				{trip.packedCount} / {trip.packCount} items packed
			</p>
		</a>

		<a
			href="/trip/{trip.id}/gift"
			class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg"
		>
			<MaterialSymbolsFeaturedSeasonalAndGifts class="h-6 w-6" />
			<p class="flex items-center gap-2">No gifts added</p>
		</a>
	</div>
</div>
