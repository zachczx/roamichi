<script>
	import EmptyState from '$lib/assets/svg/EmptyState.svelte';
	import { stay } from '$lib/drizzle/schema.js';
	import TripView from '$lib/ui/TripView.svelte';
	import { checkIfHistory } from '$lib/helpers';

	let { data } = $props();

	let completed = $derived.by(() => {
		if (data.flight) {
			let completed = data.flight.filter((flight) => {
				if (checkIfHistory(flight.departureTimestamp)) return flight;
			});
			return completed;
		}
	});

	let progress = $derived(Math.floor((completed?.length / data.flight?.length) * 100));
</script>

<TripView mode="flight" tripId={data.trip.id}>
	{#snippet breadcrumbs()}
		<li><a href="/trip">Trips</a></li>
		<li><a href="/trip/{data.trip.id}">{data.trip.tripName}</a></li>
		<li>Flight</li>
	{/snippet}

	<main class="content-height grid w-full content-start gap-12 justify-self-center">
		<header>
			<h1 class="font-header text-4xl font-bold">{data.trip.tripName}</h1>
			<span class="text-base-content/50 text-sm">Created {data.trip.createdAtSemantic}</span>
		</header>

		<!-- New -->
		<div class="grid w-full grid-cols-1 content-start gap-8">
			<div class="col-span-1 grid grid-cols-[1fr_auto]">
				<h2 class="font-header text-7xl font-bold">
					<a href="/trip/{data.trip.id}/flight">Flights ({data.flight.length})</a>
				</h2>
				<div class="flex items-end">
					<a
						href="/trip/{data.trip.id}/flight/add"
						class="btn btn-primary btn-lg flex items-center gap-2"
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

			<aside
				class="bg-base-200/70 border-base-300/30 grid h-fit content-start items-start rounded-xl border p-4 shadow-md"
			>
				<h3 class="font-semibold">Flights Completed</h3>
				<div>
					<progress class="progress progress-success w-full" value={progress} max="100"></progress>
				</div>
				<p>
					{completed.length > 0 ? data.flight.length - completed.length : '0'} of {data.flight
						.length} flights remaining
				</p>
			</aside>

			<section class="grid content-start gap-8">
				{#if data.flight.length > 0}
					{#each data.flight as flight}
						<div
							class="border-base-300/30 grid content-start gap-x-8 rounded-xl border shadow-md hover:opacity-100 xl:grid-cols-[2fr_3fr] {checkIfHistory(
								flight.departureTimestamp
							)
								? 'bg-gray-400/10 opacity-[0.6]'
								: 'bg-base-200/70'}"
						>
							<div
								class="{checkIfHistory(flight.departureTimestamp)
									? 'bg-primary/50'
									: 'bg-base-400'} text-primary-content flex content-center items-center justify-center rounded-t-xl px-4 py-2 xl:col-span-2"
							>
								<span class="grow font-semibold">{flight.flightNumber} ({flight.airline})</span>
								{#if checkIfHistory(flight.departureTimestamp)}
									<span
										class="text-success-content bg-success flex items-center justify-end gap-2 rounded-full px-4 py-1 text-base"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											width="1.3em"
											height="1.3em"
											class="material-symbols:check"
											viewBox="0 0 24 24"
											><path
												fill="currentColor"
												d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"
											/></svg
										>Completed</span
									>
								{/if}
							</div>
							<div class="grid grid-cols-[1fr_auto_1fr] content-start gap-2 p-4">
								<div class="grid content-start justify-items-start">
									<div class="text-4xl font-bold">{flight.fromCity}</div>
									<div class="mt-4">
										<div>{flight.departureTimestampFormatted}</div>
										<div class="text-base-content/60">
											{!flight.fromAirport ? 'Nil' : flight.fromAirport}
										</div>
									</div>
								</div>
								<div class="self-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										class="material-symbols:arrow-forward ic:round-airplanemode-active h-16 w-16 rotate-90"
										viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M21.48 13.7L13.5 9V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9l-7.98 4.7c-.32.18-.52.53-.52.9c0 .7.67 1.2 1.34 1.01l7.16-2.1V19l-2.26 1.35c-.15.09-.24.26-.24.43v.58c0 .33.31.57.62.49l2.92-.73L12 21l.38.09l.42.11l1.9.48l.67.17c.32.08.62-.16.62-.49v-.58c0-.18-.09-.34-.24-.43L13.5 19v-5.5l7.16 2.1c.67.2 1.34-.3 1.34-1c0-.37-.2-.72-.52-.9"
										/></svg
									>
									<!-- (Flight duration) -->
								</div>
								<div class="ml-auto grid content-start">
									<div class="text-4xl font-bold">{flight.toCity}</div>
									<div class="mt-4">
										<div>{flight.arrivalTimestampFormatted}</div>
										<div class="text-base-content/60">
											{!flight.toAirport ? 'Nil' : flight.toAirport}
										</div>
									</div>
								</div>
							</div>
							<div class="border-l-base-300/20 grid grid-cols-4 p-4 xl:ms-8 xl:border-l-4 xl:ps-8">
								<div class="h-full">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										class="material-symbols:login h-10 w-10"
										viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"
										/></svg
									>
									<h4 class="font-bold">Online Check In</h4>
									<p>{flight.timestampOnlineCheckInFormatted}</p>
									<p>({flight.timestampOnlineCheckInSemantic})</p>
								</div>
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										class="material-symbols:local-taxi h-10 w-10"
										viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M6 19v1q0 .425-.288.713T5 21H4q-.425 0-.712-.288T3 20v-8l2.1-6q.15-.45.538-.725T6.5 5H9V3h6v2h2.5q.475 0 .863.275T18.9 6l2.1 6v8q0 .425-.287.713T20 21h-1q-.425 0-.712-.288T18 20v-1zm-.2-9h12.4l-1.05-3H6.85zm1.7 6q.625 0 1.063-.437T9 14.5t-.437-1.062T7.5 13t-1.062.438T6 14.5t.438 1.063T7.5 16m9 0q.625 0 1.063-.437T18 14.5t-.437-1.062T16.5 13t-1.062.438T15 14.5t.438 1.063T16.5 16"
										/></svg
									>
									<h4 class="font-bold">Book Taxi</h4>
									<p>{flight.timestampBookTaxiFormatted}</p>
									<p>({flight.timestampBookTaxiSemantic})</p>
								</div>
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										class="mdi:airport h-10 w-10"
										viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M14.97 5.92a.967.967 0 0 0-1.18-.68l-3.4.91l-4.44-4.12l-1.23.33l2.66 4.59l-3.19.85l-1.26-.98l-.93.25l1.66 2.88l10.62-2.84c.52-.15.82-.68.69-1.19M21 10l-1 2h-5l-1-2l1-1h2V7h1v2h2zm1 10v2H2v-2h13v-7h5v7z"
										/></svg
									>

									<h4 class="font-bold">Reach Airport</h4>
									<p>{flight.timestampReachAirportFormatted}</p>
									<p>({flight.timestampReachAirportSemantic})</p>
								</div>
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										class="material-symbols:gate h-10 w-10"
										viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M5 19V9q0-1.65 1.175-2.825T9 5h2v6H9v2h2v6zm8 0v-6h2v-2h-2V5h2q1.65 0 2.825 1.175T19 9v10zM2 17V7h2v10zm18 0V7h2v10z"
										/></svg
									>
									<h4 class="font-bold">Reach Gate</h4>
									<p>{flight.timestampReachGateFormatted}</p>
									<p>({flight.timestampReachGateSemantic})</p>
								</div>
								<!-- {flight.cost} -->
							</div>
						</div>
					{/each}
				{:else}
					<div class="grid content-center justify-items-center gap-8 py-12">
						<span class="text-base-300"><EmptyState /></span>
						<h3 class="-mt-2 text-center text-lg font-medium">There's nothing here!</h3>
					</div>
				{/if}
			</section>
		</div>
	</main>
</TripView>

<style>
	.content-height {
		min-height: calc(100vh - 7rem);
	}
</style>
