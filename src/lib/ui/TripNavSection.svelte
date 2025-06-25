<script lang="ts">
	import MaterialSymbolsFlightTakeoff from '$lib/assets/svg/MaterialSymbolsFlightTakeoff.svelte';
	import MaterialSymbolsHotel from '$lib/assets/svg/MaterialSymbolsHotel.svelte';
	import MaterialSymbolsLuggage from '$lib/assets/svg/MaterialSymbolsLuggage.svelte';

	interface TripNavSectionProps {
		mode: 'trips' | 'trip' | 'flight' | 'stay' | 'pack' | 'gift';
		tripId: string;
	}
	let { mode, tripId = '' }: TripNavSectionProps = $props();
</script>

<nav
	class="bg-base-700/30 sticky top-0 hidden h-full w-full max-w-32 content-start border-r border-r-black/10 lg:grid lg:max-h-dvh lg:min-h-dvh"
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
		{#if mode === 'trips'}
			<li>
				<a
					href="/trip/{tripId}"
					class="{mode === 'trips'
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} grid w-full cursor-pointer content-center justify-items-center gap-2 p-4 text-lg"
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
						: 'hover:bg-primary hover:text-primary-content'} grid w-full cursor-pointer content-center justify-items-center gap-2 p-4 text-lg"
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
						: 'hover:bg-primary hover:text-primary-content'} grid w-full cursor-pointer content-center justify-items-center gap-2 p-4 text-lg"
					><MaterialSymbolsFlightTakeoff class="h-7 w-7" /><span>Flight</span></a
				>
			</li>
			<li>
				<a
					href="/trip/{tripId}/stay"
					class="{mode === 'stay'
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} grid w-full cursor-pointer content-center justify-items-center gap-2 p-4 text-lg"
					><MaterialSymbolsHotel class="h-7 w-7" />Stay</a
				>
			</li>
			<li>
				<a
					href="/trip/{tripId}/pack"
					class="{mode === 'pack'
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} grid w-full cursor-pointer content-center justify-items-center gap-2 p-4 text-lg"
					><MaterialSymbolsLuggage class="h-7 w-7" />Pack</a
				>
			</li>
			<li>
				<a
					href="/trip/{tripId}/gift"
					class="{mode === 'gift'
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} grid w-full cursor-pointer content-center justify-items-center gap-2 p-4 text-lg"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						class="material-symbols:featured-seasonal-and-gifts h-7 w-7"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M4 22V11H2V5h5.2q-.125-.225-.162-.475T7 4q0-1.25.875-2.125T10 1q.575 0 1.075.213T12 1.8q.425-.4.925-.6T14 1q1.25 0 2.125.875T17 4q0 .275-.05.513T16.8 5H22v6h-2v11zM14 3q-.425 0-.712.288T13 4t.288.713T14 5t.713-.288T15 4t-.288-.712T14 3M9 4q0 .425.288.713T10 5t.713-.288T11 4t-.288-.712T10 3t-.712.288T9 4M4 7v2h7V7zm7 13v-9H6v9zm2 0h5v-9h-5zm7-11V7h-7v2z"
						/></svg
					>Gift</a
				>
			</li>
		{/if}
	</ul>
</nav>
