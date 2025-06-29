<script>
	import EmptyState from '$lib/assets/svg/EmptyState.svelte';
	import ReshotIconHotel from '$lib/assets/svg/ReshotIconHotel.svelte';
	import { stay } from '$lib/drizzle/schema.js';
	import { checkIfHistory } from '$lib/helpers.js';
	import TripView from '$lib/view/TripView.svelte';

	let { data } = $props();

	let stayed = $derived.by(() => {
		return data.stay.filter((stay) => checkIfHistory(stay.checkOut));
	});

	let progress = $derived.by(() => {
		if (!data.stay || data.stay.length === 0) return 0;

		return Math.floor((stayed?.length / data.stay?.length) * 100);
	});
</script>

<TripView mode="stay" tripId={data.trip.id} tripName={data.trip.tripName}>
	{#snippet breadcrumbs()}
		<li><a href="/trip">Trips</a></li>
		<li><a href="/trip/{data.trip.id}">{data.trip.tripName}</a></li>
		<li>Stay</li>
	{/snippet}

	<main class="content-height grid w-full content-start gap-8 justify-self-center">
		<div class="grid grid-cols-[1fr_auto]">
			<h2 class="font-header text-7xl font-bold">Stays</h2>
			<div class="flex h-full items-end">
				<a
					href="/trip/{data.trip.id}/stay/add"
					class="btn btn-primary btn-lg flex items-center gap-2"
					>Add Stay<svg
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
		<div
			class="bg-base-200/70 border-base-300/30 grid h-fit content-start items-start rounded-xl border p-4 shadow-md"
		>
			<h3 class="font-semibold">Progress</h3>
			<div>
				<progress class="progress progress-success w-full" value={progress} max="100"></progress>
			</div>
			<p>
				{stayed.length > 0 ? stayed.length : '0'} of {data.stay.length} completed
			</p>
		</div>
		{#if data.stay.length > 0}
			{#each data.stay as stay}
				<section
					class="bg-base-200/70 border-base-300/30 grid h-fit grid-cols-[1rem_1fr] content-start rounded-xl border shadow-md"
				>
					<div
						class="bg-base-400 text-primary-content flex items-center gap-2 rounded-l-xl px-4 py-2 font-semibold"
					></div>

					<div class="bg-base-200 border-base-300/30 grid gap-8 rounded-r-xl border p-4">
						<div class="grid grid-cols-[1fr_auto] content-start">
							<div class="grid content-start">
								<div class="text-4xl font-bold">{stay.stayName}</div>
								<div>{stay.city}, {stay.country}</div>
								<!-- <div class="mt-2">
									<span class="btn-primary btn-outline btn btn-xs rounded-full px-4 py-1"
										>{stay.type[0].toUpperCase() + stay.type.slice(1, stay.type.length)}
									</span>
								</div> -->
							</div>
							<div>
								<details class="dropdown dropdown-bottom dropdown-end">
									<summary
										class="btn btn-ghost hover:border-transparent hover:bg-transparent"
										aria-label="drop down action"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											class="material-symbols:more-vert h-7 w-7"
											viewBox="0 0 24 24"
											><path
												fill="currentColor"
												d="M12 20q-.825 0-1.412-.587T10 18t.588-1.412T12 16t1.413.588T14 18t-.587 1.413T12 20m0-6q-.825 0-1.412-.587T10 12t.588-1.412T12 10t1.413.588T14 12t-.587 1.413T12 14m0-6q-.825 0-1.412-.587T10 6t.588-1.412T12 4t1.413.588T14 6t-.587 1.413T12 8"
											/></svg
										></summary
									>
									<ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
										<li>
											<a href="/trip/{data.trip.id}/stay/{stay.id}/edit">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="1.3em"
													height="1.3em"
													class="material-symbols:edit"
													viewBox="0 0 24 24"
													><path
														fill="currentColor"
														d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
													/>
												</svg>Edit
											</a>
										</li>
										<li>
											<a href="/trip/{data.trip.id}/stay/{stay.id}/delete">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="1em"
													height="1em"
													class="material-symbols:close"
													viewBox="0 0 24 24"
													><path
														fill="currentColor"
														d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
													/>
												</svg>Delete
											</a>
										</li>
									</ul>
								</details>
							</div>
						</div>

						<div class="grid auto-cols-fr grid-flow-col gap-8">
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									class="material-symbols:location-on h-10 w-10"
									viewBox="0 0 24 24"
									><path
										fill="currentColor"
										d="M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m0 10q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22"
									/></svg
								>
								<h4 class="font-bold">Location</h4>
								<p>
									{#if stay.address}
										{stay.address}
									{:else}
										Unspecified
									{/if}
								</p>
							</div>

							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="1em"
									height="1em"
									class="material-symbols:hotel h-10 w-10"
									viewBox="0 0 24 24"
									><path
										fill="currentColor"
										d="M1 19V4h2v10h8V6h8q1.65 0 2.825 1.175T23 10v9h-2v-3H3v3zm6-6q-1.25 0-2.125-.875T4 10t.875-2.125T7 7t2.125.875T10 10t-.875 2.125T7 13"
									/></svg
								>
								<h4 class="font-bold">Nights</h4>
								<p>{stay.stayNightsCount}</p>
							</div>

							<div>
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
								<h4 class="font-bold">Check-In</h4>
								<p>{stay.checkInFormatted}</p>
							</div>

							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									class="material-symbols:logout h-10 w-10"
									viewBox="0 0 24 24"
									><path
										fill="currentColor"
										d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
									/></svg
								>
								<h4 class="font-bold">Check-Out</h4>
								<p>{stay.checkOutFormatted}</p>
							</div>

							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									class="material-symbols:attach-money h-10 w-10"
									viewBox="0 0 24 24"
									><path
										fill="currentColor"
										d="M11.025 21v-2.15q-1.325-.3-2.287-1.15t-1.413-2.4l1.85-.75q.375 1.2 1.113 1.825t1.937.625q1.025 0 1.738-.462t.712-1.438q0-.875-.55-1.387t-2.55-1.163q-2.15-.675-2.95-1.612t-.8-2.288q0-1.625 1.05-2.525t2.15-1.025V3h2v2.1q1.25.2 2.063.913t1.187 1.737l-1.85.8q-.3-.8-.85-1.2t-1.5-.4q-1.1 0-1.675.488T9.825 8.65q0 .825.75 1.3t2.6 1q1.725.5 2.613 1.588t.887 2.512q0 1.775-1.05 2.7t-2.6 1.15V21z"
									/></svg
								>
								<h4 class="font-bold">Price</h4>
								<p>
									{#if stay.cost}
										{stay.cost}
									{:else}
										Unspecified
									{/if}
								</p>
							</div>
						</div>
					</div>
				</section>

				<!-- Travel dates, no. of nights, weather -->
			{/each}
		{:else}
			<div class="grid content-center justify-items-center gap-8 py-12">
				<span class="text-primary/70"><ReshotIconHotel class="h-96 w-96 scale-[0.7]" /></span>

				<div class="-mt-8 text-center">
					<h4 class="text-2xl font-bold">Nothing here yet</h4>
					<span class="">Start planning your next adventure now!</span>
				</div>
				<a
					href="/trip/{data.trip.id}/stay/add"
					class="btn btn-primary btn-lg flex items-center gap-2">Add Stay</a
				>
			</div>
		{/if}
	</main>
</TripView>

<style>
	.content-height {
		min-height: calc(100vh - 7rem);
	}
</style>
