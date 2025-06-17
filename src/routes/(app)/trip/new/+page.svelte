<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	let { data } = $props();
	const { form, errors, enhance, constraints, message } = superForm(data.form);
</script>

{#if $message}{$message}{/if}
<h1 class="font-header text-6xl font-bold">Add Trip</h1>
<form method="post" class="grid w-full gap-4" use:enhance>
	<fieldset class="fieldset">
		<legend class="fieldset-legend">Trip Name</legend>
		<input
			type="text"
			name="tripName"
			class="input w-full"
			placeholder="Type here"
			aria-invalid={$errors.tripName ? 'true' : undefined}
			bind:value={$form.tripName}
			{...$constraints.tripName}
		/>
		<p class="label">Required</p>
		{#if $errors.tripName}<span class="invalid text-error">{$errors.tripName}</span>{/if}
	</fieldset>
	<button class="btn btn-primary">Add Trip</button>
</form>
