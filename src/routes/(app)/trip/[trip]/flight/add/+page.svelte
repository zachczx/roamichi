<script lang="ts">
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import { countries } from '$lib/countries';
	import AddView from '$lib/view/AddView.svelte';
	let { data } = $props();
	let timer = $state(5);

	const { form, errors, enhance, constraints, message } = superForm(data.form, {
		onUpdated({ form }) {
			if (form.message && form.message.status === 'success') {
				setInterval(() => {
					timer -= 1;
					if (timer === 0) {
						goto(`/trip/${data.trip?.id}`);
					}
				}, 950);
			}
		}
	});
</script>

<AddView mode="flight" tripId={data.trip.id} tripName={data.trip.tripName}>
	{#snippet breadcrumbs()}
		<li><a href="/trip">Trips</a></li>
		<li><a href="/trip/{data.trip.id}">{data.trip.tripName}</a></li>
		<li><a href="/trip/{data.trip.id}/flight">Flight</a></li>
		<li>Add</li>
	{/snippet}

	<main class="content-height grid w-full max-w-xl content-start gap-8 justify-self-start">
		<ul class="stepped-progress">
			<li>+ Trip</li>
			<li class={[data.step === 'outbound' && 'current']}>+ Outbound</li>
			<li class={[data.step === 'return' && 'current']}>+ Return</li>
			<li>+ Stay</li>
		</ul>

		<h2 class="font-header text-7xl font-bold">Add Flight</h2>

		<section class="">
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
						<span>Flight added! Redirecting you in {timer}s...</span>
					</div>
				</div>
			{/if}

			<form method="post" class="grid w-full gap-8" use:enhance>
				{#if data.step === 'outbound'}
					<h3 class="text-2xl">Let's add your outbound flight...</h3>
				{/if}
				{#if data.step === 'return'}
					<h3 class="text-2xl">Let's add your return flight...</h3>
				{/if}
				<div class="bg-base-300/20 lg: grid gap-4 rounded-xl p-4 lg:p-6">
					<h3 class="text-2xl">Plane</h3>
					<fieldset class="fieldset">
						<legend class="fieldset-legend">Airline</legend>
						<input
							type="text"
							name="airline"
							class="input w-full"
							placeholder="Type here"
							aria-invalid={$errors.airline ? 'true' : undefined}
							bind:value={$form.airline}
							{...$constraints.airline}
						/>
						{#if $errors.airline}<span class="invalid text-error">{$errors.airline}</span>{/if}
					</fieldset>

					<fieldset class="fieldset">
						<legend class="fieldset-legend">Flight No.</legend>
						<input
							type="text"
							name="flightNumber"
							class="input w-full"
							placeholder="Type here"
							aria-invalid={$errors.flightNumber ? 'true' : undefined}
							bind:value={$form.flightNumber}
							{...$constraints.flightNumber}
						/>
						{#if $errors.flightNumber}<span class="invalid text-error">{$errors.flightNumber}</span
							>{/if}
					</fieldset>
				</div>

				<div class="bg-base-300/20 grid gap-4 rounded-xl p-4 lg:p-6">
					<h3 class="text-2xl">Locations</h3>
					<fieldset class="fieldset">
						<legend class="fieldset-legend">From Country</legend>
						<select
							class="select w-full {$errors.fromCountry ? 'select-error text-error' : undefined}"
							name="fromCountry"
							bind:value={$form.fromCountry}
							{...$constraints.fromCountry}
							aria-invalid={$errors.fromCountry ? 'true' : undefined}
						>
							{#each countries as country}
								<option value={country}>{country}</option>
							{/each}
						</select>
						{#if $errors.fromCountry}<span class="invalid text-error">{$errors.fromCountry}</span
							>{/if}
					</fieldset>

					<fieldset class="fieldset">
						<legend class="fieldset-legend">From City</legend>
						<input
							type="text"
							name="fromCity"
							class="input w-full"
							placeholder="Type here"
							aria-invalid={$errors.fromCity ? 'true' : undefined}
							bind:value={$form.fromCity}
							{...$constraints.fromCity}
						/>
						{#if $errors.fromCity}<span class="invalid text-error">{$errors.fromCity}</span>{/if}
					</fieldset>

					<!-- <fieldset class="fieldset">
			<legend class="fieldset-legend">From Airport</legend>
			<input
				type="text"
				name="fromAirport"
				class="input w-full"
				placeholder="Type here"
				aria-invalid={$errors.fromAirport ? 'true' : undefined}
				bind:value={$form.fromAirport}
				{...$constraints.fromAirport}
			/>
			{#if $errors.fromAirport}<span class="invalid text-error">{$errors.fromAirport}</span>{/if}
		</fieldset> -->

					<fieldset class="fieldset">
						<legend class="fieldset-legend">To Country</legend>
						<select
							class="select w-full {$errors.toCountry ? 'select-error text-error' : undefined}"
							name="toCountry"
							bind:value={$form.toCountry}
							{...$constraints.toCountry}
							aria-invalid={$errors.toCountry ? 'true' : undefined}
						>
							{#each countries as country}
								<option value={country}>{country}</option>
							{/each}
						</select>
						{#if $errors.toCountry}<span class="invalid text-error">{$errors.toCountry}</span>{/if}
					</fieldset>

					<fieldset class="fieldset">
						<legend class="fieldset-legend">To City</legend>
						<input
							type="text"
							name="toCity"
							class="input w-full"
							placeholder="Type here"
							aria-invalid={$errors.toCity ? 'true' : undefined}
							bind:value={$form.toCity}
							{...$constraints.toCity}
						/>
						{#if $errors.toCity}<span class="invalid text-error">{$errors.toCity}</span>{/if}
					</fieldset>

					<!-- <fieldset class="fieldset">
			<legend class="fieldset-legend">To Airport</legend>
			<input
				type="text"
				name="toAirport"
				class="input w-full"
				placeholder="Type here"
				aria-invalid={$errors.toAirport ? 'true' : undefined}
				bind:value={$form.toAirport}
				{...$constraints.toAirport}
			/>
			{#if $errors.toAirport}<span class="invalid text-error">{$errors.toAirport}</span>{/if}
		</fieldset> -->
				</div>

				<div class="bg-base-300/20 grid gap-4 rounded-xl p-4 lg:p-6">
					<h3 class="text-2xl">Departure & Arrival</h3>
					<fieldset class="fieldset">
						<legend class="fieldset-legend {$errors.departureTimestamp ? 'text-error' : undefined}"
							>Departure Date & Time*</legend
						>
						<input
							type="datetime-local"
							name="departureTimestamp"
							class="input w-full {$errors.departureTimestamp
								? 'input-error text-error'
								: undefined}"
							aria-invalid={$errors.departureTimestamp ? 'true' : undefined}
							bind:value={$form.departureTimestamp}
							{...$constraints.departureTimestamp}
						/>

						{#if $errors.departureTimestamp}<span class="invalid text-error"
								>{$errors.departureTimestamp}</span
							>{/if}
					</fieldset>

					<fieldset class="fieldset">
						<legend class="fieldset-legend {$errors.arrivalTimestamp ? 'text-error' : undefined}"
							>Arrival Date & Time*</legend
						>
						<input
							type="datetime-local"
							name="arrivalTimestamp"
							class="input w-full {$errors.arrivalTimestamp ? 'input-error text-error' : undefined}"
							aria-invalid={$errors.arrivalTimestamp ? 'true' : undefined}
							bind:value={$form.arrivalTimestamp}
							{...$constraints.arrivalTimestamp}
						/>
						{#if $errors.arrivalTimestamp}<span class="invalid text-error"
								>{$errors.arrivalTimestamp}</span
							>{/if}
					</fieldset>
				</div>

				<div class="bg-base-300/20 grid gap-4 rounded-xl p-4 lg:p-6">
					<h3 class="text-2xl">Cost</h3>
					<fieldset class="fieldset">
						<legend class="fieldset-legend"
							>Ticket Price
							<span class="label text-xs">(optional)</span></legend
						>
						<input
							type="text"
							name="cost"
							class="input w-full"
							placeholder="Type here"
							aria-invalid={$errors.cost ? 'true' : undefined}
							bind:value={$form.cost}
							{...$constraints.cost}
						/>

						{#if $errors.cost}<span class="invalid text-error">{$errors.cost}</span>{/if}
					</fieldset>
				</div>

				<input type="hidden" value={data.tripId} name="tripId" />
				{#if data.step}
					<input type="hidden" value={data.step} name="step" />
				{/if}
				<button class="btn btn-primary"
					>Add Trip{#if $message}{$message}{/if}</button
				>
			</form>
		</section>
	</main>
</AddView>
