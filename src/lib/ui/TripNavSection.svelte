<script lang="ts">
	import MaterialSymbolsFeaturedSeasonalAndGifts from '$lib/assets/svg/MaterialSymbolsFeaturedSeasonalAndGifts.svelte';
	import MaterialSymbolsFlightTakeoff from '$lib/assets/svg/MaterialSymbolsFlightTakeoff.svelte';
	import MaterialSymbolsHotel from '$lib/assets/svg/MaterialSymbolsHotel.svelte';
	import MaterialSymbolsLuggage from '$lib/assets/svg/MaterialSymbolsLuggage.svelte';
	import MaterialSymbolsSurfing from '$lib/assets/svg/MaterialSymbolsSurfing.svelte';

	interface TripNavSectionProps {
		mode: 'trips' | 'trip' | 'flight' | 'stay' | 'pack' | 'activity' | 'gift';
		tripId: string;
		tripName: string;
	}
	let { mode, tripId = '', tripName }: TripNavSectionProps = $props();
</script>

<nav
	class="bg-base-700/30 sticky top-0 hidden h-full w-72 content-start border-r border-r-black/10 lg:grid lg:max-h-dvh lg:min-h-dvh"
>
	<!-- <h3 class="flex w-full min-w-56 items-center gap-4 rounded-lg px-4 py-3 text-2xl font-bold">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1.3em"
					height="1.3em"
					class="material-symbols:add"
					viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg
				>
				New
			</h3> -->
	<ul class="grid">
		<span class="border-b-primary/15 border-b-2 px-4 pt-4 pb-4 text-4xl font-bold">{tripName}</span>
		{#if mode === 'trips'}
			<li>
				<a
					href="/trip/{tripId}"
					class="{mode === 'trips'
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} flex w-full cursor-pointer items-center gap-8 py-4 ps-8 pe-4 text-lg"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						class="material-symbols:border-all h-7 w-7"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M13 21v-8h8v8zm0-10V3h8v8zM3 11V3h8v8zm0 10v-8h8v8z"
						/></svg
					>Overview</a
				>
			</li>
		{/if}
		{#if mode !== 'trips'}
			<li>
				<a
					href="/trip/{tripId}"
					class="{mode === 'trip'
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} flex w-full cursor-pointer items-center gap-8 py-4 ps-8 pe-4 text-lg"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						class="material-symbols:border-all h-7 w-7"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M13 21v-8h8v8zm0-10V3h8v8zM3 11V3h8v8zm0 10v-8h8v8z"
						/></svg
					>Overview</a
				>
			</li>
			<li>
				<a
					href="/trip/{tripId}/flight"
					class="{mode === 'flight'
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} flex w-full cursor-pointer items-center gap-8 py-4 ps-8 pe-4 text-lg"
					><MaterialSymbolsFlightTakeoff class="h-7 w-7" /><span>Flight</span></a
				>
			</li>
			<li>
				<a
					href="/trip/{tripId}/stay"
					class="{mode === 'stay'
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} flex w-full cursor-pointer items-center gap-8 py-4 ps-8 pe-4 text-lg"
					><MaterialSymbolsHotel class="h-7 w-7" />Stay</a
				>
			</li>
			<li>
				<a
					href="/trip/{tripId}/pack"
					class="{mode === 'pack'
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} flex w-full cursor-pointer items-center gap-8 py-4 ps-8 pe-4 text-lg"
					><MaterialSymbolsLuggage class="h-7 w-7" />Pack</a
				>
			</li>
			<li>
				<a
					href="/trip/{tripId}/activity"
					class="{mode === 'activity'
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} flex w-full cursor-pointer items-center gap-8 py-4 ps-8 pe-4 text-lg"
					><MaterialSymbolsSurfing class="h-7 w-7" />Activity</a
				>
			</li>
			<li>
				<a
					href="/trip/{tripId}/gift"
					class="{mode === 'gift'
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} flex w-full cursor-pointer items-center gap-8 py-4 ps-8 pe-4 text-lg"
					><MaterialSymbolsFeaturedSeasonalAndGifts class="h-7 w-7" />Gift</a
				>
			</li>
		{/if}
	</ul>
</nav>
