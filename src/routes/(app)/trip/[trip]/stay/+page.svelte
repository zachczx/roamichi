<script lang="ts">
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
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

<div class="breadcrumbs text-sm">
	<ul>
		<li>
			<a href="/" class="hover:text-primary" aria-label="home"
				><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M5 20v-9.15L2.2 13L1 11.4L12 3l4 3.05V4h3v4.35l4 3.05l-1.2 1.6l-2.8-2.15V20h-5v-6h-4v6zm5-9.975h4q0-.8-.6-1.313T12 8.2t-1.4.513t-.6 1.312"
					/></svg
				></a
			>
		</li>
		<li><a href="/trip" class="hover:text-primary hover:underline">Trips</a></li>
		<li>
			<a href="/trip/{data.trip?.id}" class="hover:text-primary hover:underline"
				>{data.trip?.tripName}</a
			>
		</li>
		<li>Add Stay</li>
	</ul>
</div>
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
			<span>Stay added! Redirecting you in {timer}s...</span>
		</div>
	</div>
{/if}
<h1 class="font-header text-6xl font-bold">Add Stay</h1>
<form method="post" class="grid w-full gap-8" use:enhance>
	<div class="bg-base-300/20 grid gap-4 rounded-xl p-4">
		<h3 class="font-header text-2xl">Property</h3>
		<fieldset class="fieldset">
			<legend class="fieldset-legend {$errors.type ? 'text-error' : undefined}">Type*</legend>
			<select
				class="select w-full {$errors.type ? 'select-error text-error' : undefined}"
				name="type"
				aria-invalid={$errors.type ? 'true' : undefined}
				bind:value={$form.type}
				{...$constraints.type}
			>
				<option value="hotel">Hotel</option>
				<option value="airbnb">Airbnb</option>
				<option value="hostel">Hostel</option>
			</select>
			{#if $errors.type}<span class="invalid text-error">{$errors.type}</span>{/if}
		</fieldset>

		<fieldset class="fieldset">
			<legend class="fieldset-legend {$errors.stayName ? 'text-error' : undefined}"
				>Property Name*</legend
			>
			<input
				type="text"
				name="stayName"
				class="input w-full {$errors.stayName ? 'input-error text-error' : undefined}"
				aria-invalid={$errors.stayName ? 'true' : undefined}
				bind:value={$form.stayName}
				{...$constraints.stayName}
			/>
			{#if $errors.stayName}<span class="invalid text-error">{$errors.stayName}</span>{/if}
		</fieldset>
	</div>

	<div class="bg-base-300/20 grid gap-4 rounded-xl p-4">
		<h3 class="font-header text-2xl">Location</h3>
		<fieldset class="fieldset">
			<legend class="fieldset-legend {$errors.country ? 'text-error' : undefined}">Country*</legend>
			<input
				type="text"
				name="country"
				class="input w-full {$errors.country ? 'input-error text-error' : undefined}"
				aria-invalid={$errors.country ? 'true' : undefined}
				bind:value={$form.country}
				{...$constraints.country}
			/>

			{#if $errors.country}<span class="invalid text-error">{$errors.country}</span>{/if}
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend {$errors.city ? 'text-error' : undefined}">City*</legend>
			<input
				type="text"
				name="city"
				class="input w-full {$errors.city ? 'input-error text-error' : undefined}"
				aria-invalid={$errors.city ? 'true' : undefined}
				bind:value={$form.city}
				{...$constraints.city}
			/>
			{#if $errors.city}<span class="invalid text-error">{$errors.city}</span>{/if}
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend {$errors.address ? 'text-error' : undefined}"
				>Address<span class="label">(optional)</span></legend
			>
			<input
				type="text"
				name="address"
				class="input w-full {$errors.address ? 'input-error text-error' : undefined}"
				aria-invalid={$errors.address ? 'true' : undefined}
				bind:value={$form.address}
				{...$constraints.address}
			/>
			{#if $errors.address}<span class="invalid text-error">{$errors.address}</span>{/if}
		</fieldset>
	</div>

	<div class="bg-base-300/20 grid gap-4 rounded-xl p-4">
		<h3 class="font-header text-2xl">Check-In & Check-Out</h3>
		<fieldset class="fieldset">
			<legend class="fieldset-legend {$errors.checkIn ? 'text-error' : undefined}"
				>Check-in Date*</legend
			>
			<input
				type="date"
				name="checkIn"
				class="input w-full {$errors.checkIn ? 'input-error text-error' : undefined}"
				aria-invalid={$errors.checkIn ? 'true' : undefined}
				bind:value={$form.checkIn}
				{...$constraints.checkIn}
			/>

			{#if $errors.checkIn}<span class="invalid text-error">{$errors.checkIn}</span>{/if}
		</fieldset>

		<fieldset class="fieldset">
			<legend class="fieldset-legend {$errors.checkOut ? 'text-error' : undefined}"
				>Check-out Date*</legend
			>
			<input
				type="date"
				name="checkOut"
				class="input w-full {$errors.checkOut ? 'input-error text-error' : undefined}"
				aria-invalid={$errors.checkOut ? 'true' : undefined}
				bind:value={$form.checkOut}
				{...$constraints.checkOut}
			/>
			{#if $errors.checkOut}<span class="invalid text-error">{$errors.checkOut}</span>{/if}
		</fieldset>
	</div>

	<div class="bg-base-300/20 grid gap-4 rounded-xl p-4">
		<h3 class="font-header text-2xl">Cost</h3>
		<fieldset class="fieldset">
			<legend class="fieldset-legend {$errors.cost ? 'text-error' : undefined}"
				>Booking Price<span class="label">(optional)</span></legend
			>
			<input
				type="text"
				name="cost"
				class="input w-full {$errors.cost ? 'input-error text-error' : undefined}"
				placeholder="Total cost"
				aria-invalid={$errors.cost ? 'true' : undefined}
				bind:value={$form.cost}
				{...$constraints.cost}
			/>
			{#if $errors.cost}<span class="invalid text-error">{$errors.cost}</span>{/if}
		</fieldset>
	</div>

	<input type="hidden" value={data.tripId} name="tripId" />

	<button class="btn btn-primary"
		>Add Stay{#if $message}{$message}{/if}</button
	>
</form>
