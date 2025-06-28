<script lang="ts">
	let { value, target } = $props();

	let percentage = $derived(Math.round((value / target) * 100));
</script>

{#if value === 0}
	<div
		class="radial-progress text-primary-content/30"
		style="--value:100"
		aria-valuenow="100"
		role="progressbar"
	>
		<span class="text-primary-content/80">Pending</span>
	</div>
	<!-- {:else if value >= target}
	<div class="radial-progress" style="--value:100" aria-valuenow="100" role="progressbar">100%</div> -->
{:else}
	<div
		class="radial-progress text-primary-content/80"
		style={`--value:${percentage}`}
		aria-valuenow={percentage}
		role="progressbar"
	>
		<span class="text-primary-content">{percentage}%</span>
	</div>
{/if}
