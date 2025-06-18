<script lang="ts">
	let { data } = $props();
</script>

<div class="breadcrumbs text-sm">
	<ul>
		<li><a href="/trip" class="hover:text-primary underline">Trips</a></li>
		<li></li>
	</ul>
</div>
{#each data.trips as trip}
	<li><a href="/trip/{trip.id}">{trip.id} - {trip.tripName}</a></li>
{/each}
