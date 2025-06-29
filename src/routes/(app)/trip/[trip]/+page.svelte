<script lang="ts">
	import { enhance } from '$app/forms';
	import EmptyState from '$lib/assets/svg/EmptyState.svelte';
	import { stay } from '$lib/drizzle/schema.js';
	import TripView from '$lib/view/TripView.svelte';
	import { checkIfHistory } from '$lib/helpers';
	import ReshotIconRoundtrip from '$lib/assets/svg/ReshotIconRoundtrip.svelte';
	import ReshotIconBaggage from '$lib/assets/svg/ReshotIconBaggage.svelte';
	import ReshotIconHotel from '$lib/assets/svg/ReshotIconHotel.svelte';
	import '/node_modules/flag-icons/css/flag-icons.min.css';
	import { countries } from '$lib/countries';
	import MaterialSymbolsDelete from '$lib/assets/svg/MaterialSymbolsDelete.svelte';
	import MaterialSymbolsMoreVert from '$lib/assets/svg/MaterialSymbolsMoreVert.svelte';

	let { data } = $props();

	let packed: PackProps[] = $derived.by(() => {
		let packed = data.pack.filter((pack) => pack.done);
		return packed;
	});
	let toPack: PackProps[] = $derived.by(() => {
		let toPack = data.pack.filter((pack) => !pack.done);
		return toPack;
	});

	let flagIcon = $derived.by(() => {
		const found = countries.find((pair) => pair.name === data.trip.tripName);
		return `fi-${found?.code.toLowerCase()}`;
	});
</script>

<TripView mode="trip" tripId={data.trip.id} tripName={data.trip.tripName}>
	{#snippet breadcrumbs()}
		<li><a href="/trip" class="hover:text-primary">Trips</a></li>
		<li>{data.trip.tripName}</li>
	{/snippet}

	<main class="grid w-full content-start gap-12 justify-self-center">
		<header class="flex items-start">
			<div class="grow">
				<h1 class="font-header flex items-center gap-2 text-7xl font-bold">
					{data.trip.tripName} <span class="fi {flagIcon} h-[0.7em] w-[0.7em]"></span>
				</h1>
				<span class="text-base-content/50 text-sm">Created {data.trip.createdAtSemantic}</span>
			</div>
			<div class="dropdown dropdown-end cursor-pointer">
				<div tabindex="0" role="button">
					<MaterialSymbolsMoreVert class="h-8 w-8" />
				</div>
				<ul
					tabindex="-1"
					class="dropdown-content menu bg-base-100 text-base-content rounded-box border-base-content/20 z-1 w-52 border p-2 shadow-sm"
				>
					<form method="post" action="?/delete" class="w-full" use:enhance>
						<li>
							<button class="hover:bg-base-200 flex w-full items-center gap-2"
								><MaterialSymbolsDelete class="h-[1.3em] w-[1.3em]" />Delete</button
							>
						</li>
						<input type="hidden" value={data.trip.id} name="deleteId" />
					</form>
				</ul>
			</div>
		</header>

		<!-- Flights -->
		<div class="grid grid-cols-3 gap-12">
			<section class="grid w-full content-start gap-8">
				<h2 class="text-4xl font-bold">
					<a href="/trip/{data.trip.id}/flight">Flights</a>
				</h2>
				{#if data.flight.length > 0}
					{#each data.flight as flight}
						<div
							class="bg-base-200/70 border-base-300/30 {checkIfHistory(flight.departureTimestamp)
								? 'opacity-[0.6]'
								: undefined} grid content-start rounded-xl border shadow-md hover:opacity-100"
						>
							<div class="bg-base-400 text-primary-content rounded-t-xl p-2 text-center">
								<span class="font-semibold">Flight {flight.flightNumber}</span>
							</div>
							<div class="grid grid-cols-[1fr_auto_1fr] content-start gap-2 p-4">
								<div class="grid content-start justify-items-center">
									<div class="text-2xl">{flight.fromCity}</div>
									<div>{flight.departureTimestampFormatted}</div>
								</div>
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										class="material-symbols:arrow-forward ic:round-airplanemode-active h-12 w-12 rotate-90"
										viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M21.48 13.7L13.5 9V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9l-7.98 4.7c-.32.18-.52.53-.52.9c0 .7.67 1.2 1.34 1.01l7.16-2.1V19l-2.26 1.35c-.15.09-.24.26-.24.43v.58c0 .33.31.57.62.49l2.92-.73L12 21l.38.09l.42.11l1.9.48l.67.17c.32.08.62-.16.62-.49v-.58c0-.18-.09-.34-.24-.43L13.5 19v-5.5l7.16 2.1c.67.2 1.34-.3 1.34-1c0-.37-.2-.72-.52-.9"
										/></svg
									>
								</div>
								<div class="grid content-start justify-items-center">
									<div class="text-2xl">{flight.toCity}</div>
									<div>{flight.arrivalTimestampFormatted}</div>
								</div>
								{flight.cost}
							</div>
						</div>
					{/each}
				{:else}
					<div class="grid content-center justify-items-center gap-8 py-12">
						<span class="text-primary/70"><ReshotIconRoundtrip class="h-48 w-48" /></span>

						<div class="-mt-8 text-center">
							<h4 class="text-2xl font-bold">Nothing here yet</h4>
							<span class="">Start planning your next adventure now!</span>
						</div>
						<a
							href="/trip/{data.trip.id}/flight/add"
							class="btn btn-primary btn-lg flex items-center gap-2">Add Flight</a
						>
					</div>
				{/if}
			</section>

			<!-- Stays -->
			<section class="grid w-full content-start gap-8">
				<h2 class="text-4xl font-bold">
					<a href="/trip/{data.trip.id}/stay">Stays</a>
				</h2>

				{#if data.stay.length > 0}
					{#each data.stay as stay}
						<div
							class="{checkIfHistory(stay.checkIn)
								? 'opacity-[0.6]'
								: undefined} bg-base-200/70 border-base-300/30 grid rounded-xl border shadow-md hover:opacity-100"
						>
							<div
								class="bg-base-400 text-primary-content rounded-t-xl p-2 text-center font-semibold"
							>
								{stay.type[0].toUpperCase() + stay.type.slice(1, stay.type.length)}
							</div>
							<div class="grid grid-cols-2 gap-2 p-4">
								<div class="grid gap-0">
									<div class="text-2xl">{stay.stayName}</div>
									{#if stay.address}
										<div>
											{stay.address}
										</div>
									{/if}
									<div>{stay.city}, {stay.country}</div>
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
						</div>
					{/each}
				{:else}
					<div class="col-span-2 grid content-center justify-items-center gap-8 py-12">
						<span class="text-primary/70"><ReshotIconHotel class="h-48 w-48 scale-[0.7]" /></span>

						<div class="-mt-8 text-center">
							<h4 class="text-2xl font-bold">Nothing here yet</h4>
							<span class="">Start planning your next adventure now!</span>
						</div>
						<a
							href="/trip/{data.trip.id}/flight/add"
							class="btn btn-primary btn-lg flex items-center gap-2">Add Flight</a
						>
					</div>
				{/if}
			</section>

			<!-- Pack -->
			<section class="grid w-full content-start gap-8">
				<h2 class="font-header text-4xl font-bold">
					<a href="/trip/{data.trip.id}/stay">Pack</a>
				</h2>

				{#if data.pack.length > 0}
					<div
						class="bg-base-200/70 border-base-300/30 grid content-start rounded-xl border shadow-md"
					>
						<div
							class="bg-base-400 text-primary-content flex items-center justify-center gap-2 rounded-t-xl p-2 font-semibold"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1.3em"
								height="1.3em"
								class="material-symbols:hourglass-top"
								viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M8 20h8v-3q0-1.65-1.175-2.825T12 13t-2.825 1.175T8 17zm-4 2v-2h2v-3q0-1.525.713-2.863T8.7 12q-1.275-.8-1.987-2.137T6 7V4H4V2h16v2h-2v3q0 1.525-.712 2.863T15.3 12q1.275.8 1.988 2.138T18 17v3h2v2z"
								/></svg
							>To Pack
						</div>
						<ul class="grid gap-2 p-4">
							{#key toPack}
								{#if toPack.length > 0}
									{#each toPack as toPack}
										<li>
											<form
												method="post"
												action="?/pack"
												use:enhance
												onchange={(evt: Event) => {
													if (evt.currentTarget instanceof HTMLFormElement) {
														evt.currentTarget.requestSubmit();
													}
												}}
											>
												<label class="flex cursor-pointer flex-wrap gap-2"
													><input
														name="done"
														type="checkbox"
														class="checkbox"
														checked={toPack.done ? true : false}
													/><span>{toPack.item}</span>
													{#if toPack.remark}<span class="text-base-content/70 font-light"
															>({toPack.remark})</span
														>{/if}
													<input type="hidden" name="id" value={toPack.id} /></label
												>
											</form>
										</li>
									{/each}
								{:else}
									Nothing!
								{/if}
							{/key}
						</ul>
					</div>

					<div
						class="bg-base-200/70 border-base-300/30 grid content-start rounded-xl border shadow-md"
					>
						<div
							class="bg-base-400 text-primary-content flex items-center justify-center gap-2 rounded-t-xl p-2 font-semibold"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1.3em"
								height="1.3em"
								class="material-symbols:check"
								viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"
								/></svg
							>Packed
						</div>
						<ul class="grid gap-2 p-4">
							{#key packed}
								{#if packed.length > 0}
									{#each packed as packed}
										<li>
											<form
												method="post"
												action="?/pack"
												use:enhance
												onchange={(evt: Event) => {
													if (evt.currentTarget instanceof HTMLFormElement) {
														evt.currentTarget.requestSubmit();
													}
												}}
											>
												<label class="flex cursor-pointer flex-wrap gap-2"
													><input
														name="done"
														type="checkbox"
														class="checkbox"
														checked={packed.done ? true : false}
													/><span>{packed.item}</span>
													{#if packed.remark}<span class="text-base-content/70 font-light"
															>({packed.remark})</span
														>{/if}
													<input type="hidden" name="id" value={packed.id} /></label
												>
											</form>
										</li>
									{/each}
								{:else}
									Nothing!
								{/if}
							{/key}
						</ul>
					</div>
				{:else}
					<div class="col-span-2 grid content-center justify-items-center gap-8 py-12">
						<span class="text-primary/70"><ReshotIconBaggage class="h-48 w-48" /></span>

						<div class="-mt-8 text-center">
							<h4 class="text-2xl font-bold">Nothing here yet</h4>
							<span class="">Get started packing!</span>
						</div>
						<a
							href="/trip/{data.trip.id}/pack"
							class="btn btn-primary btn-lg flex items-center gap-2">Add to Pack</a
						>
					</div>
				{/if}
			</section>
		</div>
	</main>
</TripView>
