<script lang="ts">
	import { enhance } from '$app/forms';
	import EmptyState from '$lib/assets/svg/EmptyState.svelte';
	import { stay } from '$lib/drizzle/schema.js';
	import TripView from '$lib/ui/TripView.svelte';
	import { checkIfHistory } from '$lib/helpers';
	import { formFieldProxy } from 'sveltekit-superforms';
	import type { PageProps } from '../$types';
	import PackCard from '$lib/ui/PackCard.svelte';

	let { data, form }: PageProps = $props();

	let packed: PackProps[] = $derived.by(() => {
		let packed = data.pack.filter((pack) => pack.done);
		return packed;
	});

	let packEssentials: PackProps[] = $derived.by(() => {
		return data.pack.filter((pack) => pack.category === 'essentials');
	});
	let packElectronics: PackProps[] = $derived.by(() => {
		return data.pack.filter((pack) => pack.category === 'electronics');
	});
	let packHealth: PackProps[] = $derived.by(() => {
		return data.pack.filter((pack) => pack.category === 'health');
	});
	let packOthers: PackProps[] = $derived.by(() => {
		let packOthers = data.pack.filter((pack) => {
			if (!pack.category) return pack;

			const categories = ['essentials', 'electronics', 'health'];
			return !categories.includes(pack.category);
		});
		return packOthers;
	});
</script>

{#if form?.success}
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
			<span>Item added!</span>
		</div>
	</div>
{/if}

<TripView mode="pack" tripId={data.trip.id}>
	{#snippet breadcrumbs()}
		<li><a href="/trip" class="hover:text-primary">Trips</a></li>
		<li>{data.trip.tripName}</li>
	{/snippet}

	<main class="grid w-full grid-cols-2 content-start gap-12 justify-self-center">
		<header class="col-span-2">
			<h1 class="font-header text-7xl font-bold">{data.trip.tripName}</h1>
			<span class="text-base-content/50 text-sm">Created {data.trip.createdAtSemantic}</span>
		</header>

		<div class="col-span-2 grid grid-cols-2 gap-8">
			<h2 class="font-header col-span-2 grid text-4xl font-bold">
				Pack ({packed.length > 0 ? packed.length : '?'}/{data.pack.length})
			</h2>

			<!-- NEW -->

			{#snippet packItem(pack: PackProps)}
				<form
					method="post"
					action="?/pack"
					class="flex items-center"
					use:enhance
					onchange={(evt: Event) => {
						if (evt.currentTarget instanceof HTMLFormElement) {
							evt.currentTarget.requestSubmit();
						}
					}}
				>
					<label class="flex grow cursor-pointer flex-wrap gap-2"
						><input
							name="done"
							type="checkbox"
							class="checkbox"
							checked={pack.done ? true : false}
						/><span>{pack.item}</span>
						{#if pack.remark}<span class="text-base-content/70 font-light">({pack.remark})</span
							>{/if}
						<input type="hidden" name="id" value={pack.id} /></label
					>
					<select name="category" class="select select-sm max-w-32" bind:value={pack.category}>
						<option value="essentials">Essentials</option>
						<option value="electronics">Electronics</option>
						<option value="health">Health</option>
						<option value="others">Others</option>
					</select>
				</form>
			{/snippet}

			<div class="grid content-start gap-8">
				{#key data.pack}
					<PackCard title="Essentials">
						{#if packEssentials.length > 0}
							{#each packEssentials as pack}
								{@render packItem(pack)}
							{/each}
						{/if}
						<form method="post" action="?/add" class="" use:enhance>
							<label class="input w-full max-w-96">
								<input type="text" class="grow" name="item" />
								<button aria-label="add"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="1.3em"
										height="1.3em"
										class="material-symbols:add cursor-pointer"
										viewBox="0 0 24 24"
										><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg
									></button
								>

								<input type="hidden" value={data.trip.id} name="tripId" />
								<input type="hidden" value="essentials" name="category" />
							</label>
						</form>
					</PackCard>
					<PackCard title="Electronics">
						{#if packElectronics.length > 0}
							{#each packElectronics as pack}
								{@render packItem(pack)}
							{/each}
						{/if}
						<form method="post" action="?/add" class="" use:enhance>
							<label class="input w-full max-w-96">
								<input type="text" class="grow" name="item" />
								<button aria-label="add"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="1.3em"
										height="1.3em"
										class="material-symbols:add cursor-pointer"
										viewBox="0 0 24 24"
										><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg
									></button
								>

								<input type="hidden" value={data.trip.id} name="tripId" />
								<input type="hidden" value="electronics" name="category" />
							</label>
						</form>
					</PackCard>

					<PackCard title="Health">
						{#if packHealth.length > 0}
							{#each packHealth as pack}
								{@render packItem(pack)}
							{/each}
						{/if}
						<form method="post" action="?/add" class="" use:enhance>
							<label class="input w-full max-w-96">
								<input type="text" class="grow" name="item" />
								<button aria-label="add"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="1.3em"
										height="1.3em"
										class="material-symbols:add cursor-pointer"
										viewBox="0 0 24 24"
										><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg
									></button
								>

								<input type="hidden" value={data.trip.id} name="tripId" />
								<input type="hidden" value="health" name="category" />
							</label>
						</form>
					</PackCard>

					<PackCard title="Others">
						{#if packOthers.length > 0}
							{#each packOthers as pack}
								{@render packItem(pack)}
							{/each}
						{/if}
						<form method="post" action="?/add" class="" use:enhance>
							<label class="input w-full max-w-96">
								<input type="text" class="grow" name="item" />
								<button aria-label="add"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="1.3em"
										height="1.3em"
										class="material-symbols:add cursor-pointer"
										viewBox="0 0 24 24"
										><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg
									></button
								>
								<input type="hidden" value={data.trip.id} name="tripId" />
								<input type="hidden" value="others" name="category" />
							</label>
						</form>
					</PackCard>
				{/key}
			</div>

			<PackCard title="Advice" type="warning">
				<div class="collapse-arrow bg-base-100 border-base-content/20 collapse border">
					<input type="radio" name="advice-accordion" />
					<div class="collapse-title bg-warning/30 font-semibold">Essentials</div>
					<div class="collapse-content text-sm">
						<ul class="grid list-disc gap-2 p-4">
							<li>
								<strong>Liquids, Aerosols, and Gels (LAGs):</strong> All liquids must be in containers
								of 100ml (3.4 ounces) or less. All these containers must fit into a single, transparent,
								resealable plastic bag (no larger than one litre). You must present this bag separately
								at the security checkpoint.
							</li>
							<li>
								<strong>Passport &amp; Visa Validity:</strong> Your passport must be valid for at
								least six months beyond your intended period of stay in most countries. You must
								also secure any required visas for your destination <em>before</em> you travel.
							</li>
							<li>
								<strong>Prohibited Items:</strong> You are strictly forbidden from carrying items that
								could be used as weapons. This includes firearms, explosives, sharp objects (like knives
								or scissors with blades over 6cm), and self-defense sprays.
							</li>

							<li>
								<strong>Prohibited Hazardous Materials:</strong> You are forbidden from packing dangerous
								goods, which include flammable liquids (e.g., lighter fluid), explosives (e.g., fireworks),
								compressed gases (e.g., bear spray), and certain chemicals.
							</li>
						</ul>
					</div>
				</div>

				<div class="collapse-arrow bg-base-100 border-base-content/20 collapse border">
					<input type="radio" name="advice-accordion" />
					<div class="collapse-title bg-warning/30 font-semibold">Electronics</div>
					<div class="collapse-content text-sm">
						<ul class="grid list-disc gap-2 p-4">
							<li>
								<strong>Spare Lithium Batteries &amp; Power Banks:</strong> Loose lithium-ion
								batteries (including power banks and portable chargers) are prohibited in checked
								luggage due to fire risk. They <strong>must</strong> be carried in your carry-on bag
								and should be individually protected from short-circuiting.
							</li>
							<li>
								<strong>Pack Appropriate Power Adapters</strong>.
							</li>
						</ul>
					</div>
				</div>

				<div class="collapse-arrow bg-base-100 border-base-content/20 collapse border">
					<input type="radio" name="advice-accordion" />
					<div class="collapse-title bg-warning/30 font-semibold">Health</div>
					<div class="collapse-content text-sm">
						<ul class="grid list-disc gap-2 p-4">
							<li>Keep medication in its original, labeled container.</li>
							<li>
								For controlled substances, you may need to apply for a specific import permit in
								advance (e.g., when entering Singapore, check requirements from HSA).
							</li>
						</ul>
					</div>
				</div>

				<div class="collapse-arrow bg-base-100 border-base-content/20 collapse border">
					<input type="radio" name="advice-accordion" />
					<div class="collapse-title bg-warning/30 font-semibold">Others</div>
					<div class="collapse-content text-sm">
						<ul class="grid list-disc gap-2 p-4">
							<li>
								<strong>Valuables in Carry-On:</strong> Always pack critical and high-value items in
								your carry-on bag, not your checked luggage. This includes your passport, money, credit
								cards, jewelry, electronics, and house/car keys.
							</li>
							<li>
								<strong>Medication in Carry-On:</strong> While regulations govern <em>how</em> you carry
								medicine, it is a best practice to pack all essential medications in your carry-on bag
								to avoid a health crisis if your checked bag is lost or delayed.
							</li>
							<li>
								<strong>Pack a Change of Clothes:</strong> Having at least one change of clothes and
								basic toiletries in your carry-on is a lifesaver if your checked luggage is delayed.
							</li>
							<li>
								<strong>Inform Your Bank:</strong> Allow foreign transactions on your credit cards.
							</li>
						</ul>
					</div>
				</div>
			</PackCard>
		</div>
	</main>
</TripView>
