<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	let { data } = $props();
	const { form, errors, enhance, constraints, message } = superForm(data.form);
</script>

<h1 class="font-header text-6xl font-bold">Add Trip</h1>
<form method="post" class="grid w-full grid-cols-2 gap-4" use:enhance>
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
		<p class="label">Required</p>
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
		<p class="label">Required</p>
		{#if $errors.flightNumber}<span class="invalid text-error">{$errors.flightNumber}</span>{/if}
	</fieldset>

	<fieldset class="fieldset">
		<legend class="fieldset-legend">Airport</legend>
		<input
			type="text"
			name="airport"
			class="input w-full"
			placeholder="Type here"
			aria-invalid={$errors.airport ? 'true' : undefined}
			bind:value={$form.airport}
			{...$constraints.airport}
		/>
		<p class="label">Required</p>
		{#if $errors.airport}<span class="invalid text-error">{$errors.airport}</span>{/if}
	</fieldset>

	<div></div>

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
		<p class="label">Required</p>
		{#if $errors.fromCity}<span class="invalid text-error">{$errors.fromCity}</span>{/if}
	</fieldset>

	<fieldset class="fieldset">
		<legend class="fieldset-legend">From Country</legend>
		<input
			type="text"
			name="fromCountry"
			class="input w-full"
			placeholder="Type here"
			aria-invalid={$errors.fromCountry ? 'true' : undefined}
			bind:value={$form.fromCountry}
			{...$constraints.fromCountry}
		/>
		<p class="label">Required</p>
		{#if $errors.fromCountry}<span class="invalid text-error">{$errors.fromCountry}</span>{/if}
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
		<p class="label">Required</p>
		{#if $errors.toCity}<span class="invalid text-error">{$errors.toCity}</span>{/if}
	</fieldset>

	<fieldset class="fieldset">
		<legend class="fieldset-legend">To Country</legend>
		<input
			type="text"
			name="toCountry"
			class="input w-full"
			placeholder="Type here"
			aria-invalid={$errors.toCountry ? 'true' : undefined}
			bind:value={$form.toCountry}
			{...$constraints.toCountry}
		/>
		<p class="label">Required</p>
		{#if $errors.toCountry}<span class="invalid text-error">{$errors.toCountry}</span>{/if}
	</fieldset>
	<input type="hidden" value={data.tripId} name="tripId" />
	<button class="btn btn-primary"
		>Add Trip{#if $message}{$message}{/if}</button
	>
</form>
