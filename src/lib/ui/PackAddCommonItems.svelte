<script lang="ts">
	import { enhance } from '$app/forms';
	let { item, tripId, category }: { item: string; tripId: string; category: string } = $props();
</script>

<form method="post" action="?/addCommon" class="flex items-center" use:enhance>
	<button class="btn btn-primary btn-outline flex items-center gap-2" aria-label="add {item}"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.3em"
			height="1.3em"
			class="material-symbols:add cursor-pointer"
			viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg
		>
		{item}</button
	>
	<input type="hidden" name="item" value={item} />
	<input type="hidden" name="tripId" value={tripId} />
	<input type="hidden" name="category" value={category} />
</form>
