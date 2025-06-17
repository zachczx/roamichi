<script lang="ts">
	let { data } = $props();
</script>

{#each data.trips as trip}
	<li><a href="/trip/{trip.id}">{trip.id} - {trip.tripName}</a></li>
{/each}
