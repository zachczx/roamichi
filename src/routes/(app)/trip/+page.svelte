<script lang="ts">
	import TripView from '$lib/view/TripView.svelte';

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
	<div class="p-4">
		{#each data.trips as trip}
			<li><a href="/trip/{trip.id}">{trip.id} - {trip.tripName}</a></li>
		{/each}
	</div>
</TripView>
<!-- <input bind:value={inat} type="text" class="input input-lg" onkeyup={handleCity} /> -->
