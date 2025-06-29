<script lang="ts">
	import { enhance } from '$app/forms';
	import MaterialSymbolsArrowRightAlt from '$lib/assets/svg/MaterialSymbolsArrowRightAlt.svelte';
	import MaterialSymbolsFeaturedSeasonalAndGifts from '$lib/assets/svg/MaterialSymbolsFeaturedSeasonalAndGifts.svelte';
	import MaterialSymbolsFlightTakeoff from '$lib/assets/svg/MaterialSymbolsFlightTakeoff.svelte';
	import MaterialSymbolsHotel from '$lib/assets/svg/MaterialSymbolsHotel.svelte';
	import MaterialSymbolsLuggage from '$lib/assets/svg/MaterialSymbolsLuggage.svelte';
	import MaterialSymbolsMoreVert from '$lib/assets/svg/MaterialSymbolsMoreVert.svelte';
	import { id } from 'zod/v4/locales';
	let { trip, type }: { trip: TripPropsExtra; type: 'past' | 'future' } = $props();

	let classColorProps = $derived.by(() => {
		if (type === 'future') return 'bg-base-200';
		if (type === 'past') return 'bg-neutral/10 text-base-content/70';
	});
</script>

<div
	class={[
		'border-base-300/30 grid content-start rounded-xl border bg-linear-to-tr p-4 shadow-md hover:opacity-100',
		classColorProps
	]}
>
	<div>
		{#if !trip.tripStartFormatted}
			<div
				class="btn border-error-content text-error-content btn-sm bg-alert m-4 w-fit max-w-72 rounded-full border-0 shadow-none"
			>
				Details Needed
			</div>
		{/if}

		<div class="dropdown dropdown-end float-right cursor-pointer">
			<div tabindex="0" role="button" class="-me-2">
				<MaterialSymbolsMoreVert class="h-6 w-6" />
			</div>
			<ul
				tabindex="-1"
				class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
			>
				<form method="post" action="?/delete" class="w-full" use:enhance>
					<li><button class="w-full hover:bg-red-100">Delete</button></li>
					<input type="hidden" value={trip.id} name="deleteId" />
				</form>
			</ul>
		</div>
	</div>
	<div class="mt-4 grid content-start gap-4 p-4">
		<h2 class="text-6xl font-bold"><a href="/trip/{trip.id}">{trip.tripName}</a></h2>
		<div class="flex flex-wrap items-center gap-4">
			{#if trip.tripStartAndEndFormatted}
				<a href="/trip/{trip.id}"
					><span>
						{trip.tripStartAndEndFormatted}
					</span>
					&nbsp;&nbsp;<span>•</span>&nbsp;&nbsp;<span>{trip.tripDuration} days</span></a
				>
			{:else}
				<span
					>No dates yet (<a href="/trip/{trip.id}/flight/add" class="underline"
						>add flights to get started &rarr;</a
					>)</span
				>
			{/if}
		</div>
		<div class="grid grid-cols-4 rounded-lg py-1">
			<a
				href="/trip/{trip.id}/flight"
				class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-1 rounded-lg"
			>
				<MaterialSymbolsFlightTakeoff class="h-6 w-6" />
				<div>
					<p class="flex items-center gap-2">
						<!-- <MaterialSymbolsCheck class="text-primary-content h-[1.3em] w-[1.3em]" /> -->
						{trip.flightCount} flights
					</p>
				</div>
			</a>

			<a
				href="/trip/{trip.id}/stay"
				class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-1 rounded-lg"
			>
				<MaterialSymbolsHotel class="h-6 w-6" />
				<p class="flex items-center gap-2">
					{trip.stayCount} stays
				</p>
			</a>

			<a
				href="/trip/{trip.id}/pack"
				class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-1 rounded-lg"
			>
				<MaterialSymbolsLuggage class="h-6 w-6" />
				<p class="flex items-center gap-2">
					{trip.packedCount}/{trip.packCount} packed
				</p>
			</a>

			<a
				href="/trip/{trip.id}/gift"
				class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-1 rounded-lg"
			>
				<MaterialSymbolsFeaturedSeasonalAndGifts class="h-6 w-6" />
				<p class="flex items-center gap-2">0 gifts</p>
			</a>
		</div>
	</div>
</div>
