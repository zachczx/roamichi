<script>
	let { data } = $props();
</script>

{data.trip.id} - {data.trip.tripName}

<ul>
	<li><a href="/trip/{data.trip.id}/flight">Add A Flight</a></li>

	<li>Add A Stay</li>

	<li>Add A Pack</li>
</ul>
