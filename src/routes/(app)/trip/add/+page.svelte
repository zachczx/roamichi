<script lang="ts">
	import { goto } from '$app/navigation';
	import TripView from '$lib/view/TripView.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { countries } from '$lib/countries';
	let { data } = $props();
	let timer = $state(5);
	const { form, errors, enhance, constraints, message } = superForm(data.form, {
		onUpdated({ form }) {
			if (form.message && form.message.status === 'success') {
				setInterval(() => {
					timer -= 1;
					if (timer === 0) {
						goto(`/trip/${form.message?.insertedId}`);
					}
				}, 950);
			}
		}
	});

	let suggestions = $derived.by(() => {
		let suggestions = [];
		if ($form.tripName.length === 0) return [];
		suggestions = countries.filter((country) => {
			if (country.toLowerCase().includes($form.tripName.toLowerCase())) return country;
		});

		return suggestions;
	});
</script>

{#if $message?.status === 'success'}
	<div class="toast toast-top toast-center">
		<div class="alert alert-success flex items-center gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				class="material-symbols:check-circle"
				viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
				/></svg
			>
			<span>Trip added! Redirecting you in {timer}s...</span>
		</div>
	</div>
{/if}

<TripView mode="trips" tripId="" tripName="" showSidebar={false}>
	{#snippet breadcrumbs()}
		<li><a href="/trip">Trips</a></li>
		<li>Add Trip</li>
	{/snippet}

	<div class="grid max-w-xl gap-8 p-4">
		<ul class="stepped-progress">
			<li class="current">+ Trip</li>
			<li>+ Outbound</li>
			<li>+ Return</li>
			<li>+ Stay</li>
		</ul>
		<h2 class="font-header text-7xl font-bold">Add Trip</h2>

		<form method="post" class="grid w-full gap-4" use:enhance>
			{#if data.step === 'trip'}<h3 class="text-2xl">Let's give your trip a name...</h3>{/if}
			<fieldset class="fieldset">
				<!-- <legend class="fieldset-legend">Name of Trip</legend> -->
				<input
					type="text"
					name="tripName"
					class="input w-full"
					aria-invalid={$errors.tripName ? 'true' : undefined}
					bind:value={$form.tripName}
					{...$constraints.tripName}
				/>
				<p class="label">Required</p>
				{#if $errors.tripName}<span class="invalid text-error">{$errors.tripName}</span>{/if}
			</fieldset>

			<ul class="bg-base-200 h-32 max-h-36 list-disc overflow-y-auto rounded-lg p-4">
				<h3 class="font-semibold">Suggestions</h3>
				{#if suggestions.length > 0}
					{#each suggestions as suggestion}
						<li class="ms-6">
							<button
								type="button"
								class="cursor-pointer"
								onclick={() => {
									console.log(suggestion);
									$form.tripName = suggestion;
								}}>{suggestion}</button
							>
						</li>
					{/each}
				{:else}
					<li class="ms-6">Type something above to get country name suggestions.</li>
				{/if}
			</ul>

			<button class="btn btn-primary mt-2 flex items-center gap-2">
				{#if $message?.status === 'success'}
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
					>Added
				{:else}
					Add
				{/if}
			</button>
		</form>
	</div>
</TripView>
