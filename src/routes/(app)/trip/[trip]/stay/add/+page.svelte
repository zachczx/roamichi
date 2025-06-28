<script lang="ts">
	import { goto } from '$app/navigation';
	import { countries } from '$lib/countries.js';
	import { trip } from '$lib/drizzle/schema.js';
	import AddView from '$lib/view/AddView.svelte';
	import { superForm } from 'sveltekit-superforms';
	import dayjs from 'dayjs';
	import isBetween from 'dayjs/plugin/isBetween';
	import MaterialSymbolsWarning from '$lib/assets/svg/MaterialSymbolsWarning.svelte';
	dayjs.extend(isBetween);

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

	let checkInReactive = $derived($form.checkIn);
	let checkInClashes = $derived.by(() => {
		const clash = data.stay.filter((stay) => {
			return dayjs(checkInReactive).isBetween(stay.checkIn, stay.checkOut, 'day');
		});
		return clash;
	});

	let checkOutReactive = $derived($form.checkOut);
	let checkOutClashes = $derived.by(() => {
		const clash = data.stay.filter((stay) => {
			return dayjs(checkOutReactive).isBetween(stay.checkIn, stay.checkOut, 'day');
		});

		return clash;
	});

	let checkInOutClashes = $derived.by(() => {
		return [...new Set([...checkInClashes, ...checkOutClashes])];
	});
</script>

<AddView mode="stay" tripId={data.trip.id} tripName={data.trip.tripName}>
	{#snippet breadcrumbs()}
		<li><a href="/trip">Trips</a></li>
		<li><a href="/trip/{data.trip.id}">{data.trip.tripName}</a></li>
		<li><a href="/trip/{data.trip.id}/stay">Stay</a></li>
		<li>Add</li>
	{/snippet}

	<main class="content-height grid w-full max-w-xl content-start gap-8 justify-self-start">
		<ul class="stepped-progress">
			<li>+ Trip</li>
			<li>+ Outbound</li>
			<li>+ Return</li>
			<li class={[data.step === 'stay' && 'current']}>+ Stay</li>
		</ul>

		<h2 class="font-header text-7xl font-bold">Add Stay</h2>

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
						<span>Stay added! Redirecting you in {timer}s...</span>
					</div>
				</div>
			{/if}

			<form method="post" class="grid w-full gap-8" use:enhance>
				{#if data.step === 'stay'}
					<h3 class="text-2xl">Let's add your stay...</h3>
				{/if}
				<div class="bg-base-300/20 grid gap-4 rounded-xl p-4 lg:p-6">
					<h3 class="text-2xl">Property</h3>
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
						<span class="label">E.g. InterContinental Bangkok</span>
						{#if $errors.stayName}<span class="invalid text-error">{$errors.stayName}</span>{/if}
					</fieldset>
				</div>

				<div class="bg-base-300/20 grid gap-4 rounded-xl p-4 lg:p-6">
					<h3 class="text-2xl">Location</h3>
					<fieldset class="fieldset">
						<legend class="fieldset-legend {$errors.country ? 'text-error' : undefined}"
							>Country*</legend
						>

						<select
							class="select w-full {$errors.country ? 'select-error text-error' : undefined}"
							name="country"
							aria-invalid={$errors.country ? 'true' : undefined}
							bind:value={$form.country}
							{...$constraints.country}
						>
							{#each countries as country}
								<option value={country}>{country}</option>
							{/each}
						</select>
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
						<span class="label"
							>E.g., 973 Phloen Chit Road, Lumpini, Pathum Wan, Siam, Bangkok, Thailand, 10330
						</span>
						{#if $errors.address}<span class="invalid text-error">{$errors.address}</span>{/if}
					</fieldset>
				</div>

				<div class="bg-base-300/20 grid gap-4 rounded-xl p-4 lg:p-6">
					<h3 class="text-2xl">Check-In & Check-Out</h3>
					<fieldset class="fieldset">
						<legend
							class="fieldset-legend {$errors.checkIn || checkInClashes.length > 0
								? 'text-error'
								: undefined}">Check-in Date*</legend
						>
						<input
							type="datetime-local"
							name="checkIn"
							class="input w-full {$errors.checkIn || checkInClashes.length > 0
								? 'input-error text-error'
								: undefined}"
							aria-invalid={$errors.checkIn ? 'true' : undefined}
							bind:value={$form.checkIn}
							{...$constraints.checkIn}
						/>
						{#if checkInClashes.length > 0}
							<div class="invalid text-error flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="1em"
									height="1em"
									class="material-symbols:warning"
									viewBox="0 0 24 24"
									><path
										fill="currentColor"
										d="M1 21L12 2l11 19zm11-3q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18m-1-3h2v-5h-2z"
									/></svg
								>Clashes with your stay:
								{#each checkInClashes as clash, i}
									<span class="text-error ms-1"
										>{clash.stayName} {i >= checkInClashes.length - 1 ? undefined : ', '}</span
									>
								{/each}
							</div>
						{/if}
						<span class="label">Tip: Time is optional, most hotels allow check-in after 3pm.</span>
						{#if $errors.checkIn}<span class="invalid text-error">{$errors.checkIn}</span>{/if}
					</fieldset>

					<fieldset class="fieldset">
						<legend
							class="fieldset-legend {$errors.checkOut || checkOutClashes.length > 0
								? 'text-error'
								: undefined}">Check-out Date*</legend
						>
						<input
							type="datetime-local"
							name="checkOut"
							class="input w-full {$errors.checkOut || checkOutClashes.length > 0
								? 'input-error text-error'
								: undefined}"
							aria-invalid={$errors.checkOut ? 'true' : undefined}
							bind:value={$form.checkOut}
							{...$constraints.checkOut}
						/>
						{#if checkOutClashes.length > 0}
							<div class="invalid text-error flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="1em"
									height="1em"
									class="material-symbols:warning"
									viewBox="0 0 24 24"
									><path
										fill="currentColor"
										d="M1 21L12 2l11 19zm11-3q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18m-1-3h2v-5h-2z"
									/></svg
								>Clashes with your stay:
								{#each checkOutClashes as clash, i}
									<span class="text-error ms-1"
										>{clash.stayName} {i >= checkOutClashes.length - 1 ? undefined : ', '}</span
									>
								{/each}
							</div>
						{/if}
						<span class="label">Tip: Time is optional, most hotels require check-out by 11am.</span>

						{#if $errors.checkOut}<span class="invalid text-error">{$errors.checkOut}</span>{/if}
					</fieldset>
				</div>

				<div class="bg-base-300/20 grid gap-4 rounded-xl p-4 lg:p-6">
					<h3 class="text-2xl">Cost</h3>
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
		</section>
	</main>

	{#snippet rightSidebar()}
		<aside class="grid gap-8 p-4">
			<h3 class="text-4xl">Existing Stays</h3>

			{#if data.stay.length > 0}
				{#each data.stay as stay}
					<div class="card bg-base-100 card-md w-96 shadow-sm">
						<div class="card-body gap-4">
							{#each checkInOutClashes as checkInOutClash}
								{#if checkInOutClash.id === stay.id}
									<div class="btn btn-error flex items-center gap-2">
										<MaterialSymbolsWarning height="1.3em" width="1.3em" />Clash
									</div>
								{/if}
							{/each}
							<header>
								<h2 class="card-title">{stay.stayName}</h2>
								<p>{stay.stayNightsCount} night(s)</p>
							</header>
							<section class="grid grid-cols-3">
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										class="material-symbols:login h-6 w-6"
										viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"
										/></svg
									>
									<h4 class="font-bold">Check-In</h4>
									<p>{stay.checkInFormatted}</p>
								</div>

								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										class="material-symbols:logout h-6 w-6"
										viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
										/></svg
									>
									<h4 class="font-bold">Check-Out</h4>
									<p>{stay.checkOutFormatted}</p>
								</div>

								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										class="material-symbols:attach-money h-6 w-6"
										viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M11.025 21v-2.15q-1.325-.3-2.287-1.15t-1.413-2.4l1.85-.75q.375 1.2 1.113 1.825t1.937.625q1.025 0 1.738-.462t.712-1.438q0-.875-.55-1.387t-2.55-1.163q-2.15-.675-2.95-1.612t-.8-2.288q0-1.625 1.05-2.525t2.15-1.025V3h2v2.1q1.25.2 2.063.913t1.187 1.737l-1.85.8q-.3-.8-.85-1.2t-1.5-.4q-1.1 0-1.675.488T9.825 8.65q0 .825.75 1.3t2.6 1q1.725.5 2.613 1.588t.887 2.512q0 1.775-1.05 2.7t-2.6 1.15V21z"
										/></svg
									>
									<h4 class="font-bold">Price</h4>
									<p>
										{#if stay.cost}
											{stay.cost}
										{:else}
											Unspecified
										{/if}
									</p>
								</div>
							</section>
							<div class="card-actions justify-end">
								<a href="/trip/{data.tripId}/stay" class="btn btn-primary">See More</a>
							</div>
						</div>
					</div>
				{/each}
			{:else}
				Nothing here!
			{/if}
		</aside>
	{/snippet}
</AddView>
