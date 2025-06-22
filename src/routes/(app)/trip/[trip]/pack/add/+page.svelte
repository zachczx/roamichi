<script lang="ts">
	import { goto } from '$app/navigation';
	import { countries } from '$lib/countries.js';
	import TripView from '$lib/ui/TripView.svelte';
	import { superForm } from 'sveltekit-superforms';
	let { data } = $props();
	let timer = $state(5);

	const { form, errors, enhance, constraints, message } = superForm(data.form, {
		onUpdated({ form }) {
			if (form.message && form.message.status === 'success') {
				goto(`/trip/${data.trip?.id}/pack`);
			}
		}
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
			<span>Stay added! Redirecting you in {timer}s...</span>
		</div>
	</div>
{/if}

<TripView mode="flight" tripId={data.trip.id}>
	{#snippet breadcrumbs()}
		<li><a href="/trip">Trips</a></li>
		<li><a href="/trip/{data.trip.id}">{data.trip.tripName}</a></li>
		<li>Add Packing Item</li>
	{/snippet}

	<main class="content-height grid w-full content-start gap-12 justify-self-center">
		<header>
			<h1 class="font-header text-7xl font-bold">Add Stay</h1>
		</header>

		<form method="post" class="grid w-full max-w-2xl gap-8" use:enhance>
			<div class="bg-base-300/20 grid gap-4 rounded-xl p-4 lg:p-6">
				<h3 class="font-header text-2xl">Property</h3>
				<fieldset class="fieldset">
					<legend class="fieldset-legend {$errors.item ? 'text-error' : undefined}"
						>Item Name*</legend
					>
					<input
						type="text"
						name="item"
						class="input w-full {$errors.item ? 'input-error text-error' : undefined}"
						aria-invalid={$errors.item ? 'true' : undefined}
						bind:value={$form.item}
						{...$constraints.item}
					/>
					{#if $errors.item}<span class="invalid text-error">{$errors.item}</span>{/if}
				</fieldset>

				<fieldset class="fieldset">
					<legend class="fieldset-legend {$errors.remark ? 'text-error' : undefined}"
						>Remarks</legend
					>
					<input
						type="text"
						name="remark"
						class="input w-full {$errors.remark ? 'input-error text-error' : undefined}"
						aria-invalid={$errors.remark ? 'true' : undefined}
						bind:value={$form.remark}
						{...$constraints.remark}
					/>
					{#if $errors.remark}<span class="invalid text-error">{$errors.remark}</span>{/if}
				</fieldset>

				<fieldset class="fieldset">
					<!-- <legend class="fieldset-legend {$errors.done ? 'text-error' : undefined}">Done</legend> -->
					<label class="label {$errors.done ? 'text-error' : undefined}"
						><input
							type="checkbox"
							name="done"
							class="checkbox {$errors.done ? 'input-error text-error' : undefined}"
							aria-invalid={$errors.done ? 'true' : undefined}
							bind:checked={$form.done}
							{...$constraints.done}
						/>Packed</label
					>
					{#if $errors.item}<span class="invalid text-error">{$errors.done}</span>{/if}
				</fieldset>
			</div>

			<input type="hidden" value={data.tripId} name="tripId" />

			<button class="btn btn-primary"
				>Add Stay{#if $message}{$message}{/if}</button
			>
		</form>
	</main>
</TripView>
