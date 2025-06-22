<script lang="ts">
	import { enhance } from '$app/forms';
	import EmptyState from '$lib/assets/svg/EmptyState.svelte';
	import Toaster from '$lib/ui/Toaster.svelte';
	import TripView from '$lib/ui/TripView.svelte';
	import type { PageProps } from '../$types';
	import PackCard from '$lib/ui/PackCard.svelte';
	import PackAddCommonItems from '$lib/ui/PackAddCommonItems.svelte';

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

	let progress = $derived(Math.floor((packed?.length / data.pack?.length) * 100));
</script>

{#key form}
	{#if form?.success}
		<Toaster status="success" description="Success!" />
	{/if}
{/key}

<TripView mode="pack" tripId={data.trip.id}>
	{#snippet breadcrumbs()}
		<li><a href="/trip">Trips</a></li>
		<li><a href="/trip/{data.trip.id}">{data.trip.tripName}</a></li>
		<li>Pack</li>
	{/snippet}

	<main class="grid w-full grid-cols-2 content-start gap-12 justify-self-center">
		<header class="col-span-2">
			<h1 class="font-header text-4xl font-bold">{data.trip.tripName}</h1>
			<span class="text-base-content/50 text-sm">Created {data.trip.createdAtSemantic}</span>
		</header>

		<div class="col-span-2 grid grid-cols-2 gap-8">
			<h2 class="font-header col-span-2 grid text-7xl font-bold">Pack</h2>

			<div
				class="bg-base-200/70 border-base-300/30 col-span-2 grid h-fit content-start items-start rounded-xl border p-4 shadow-md"
			>
				<h3 class="font-semibold">Packing Progress</h3>
				<div>
					<progress class="progress progress-success w-full" value={progress} max="100"></progress>
				</div>
				<p>
					{packed.length > 0 ? data.pack.length - packed.length : '0'} of {data.pack.length} items remaining
				</p>
			</div>

			{#snippet packItem(pack: PackProps)}
				<li class="flex items-center gap-4">
					<form
						method="post"
						action="?/pack"
						class="flex grow items-center"
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
						</label><input type="hidden" name="id" value={pack.id} />
						<select name="category" class="select select-sm max-w-32" value={pack.category}>
							<option value="essentials">Essentials</option>
							<option value="electronics">Electronics</option>
							<option value="health">Health</option>
							<option value="others">Others</option>
						</select>
					</form>
					<form method="post" action="?/delete" class="flex items-center" use:enhance>
						<input type="hidden" name="id" value={pack.id} />
						<button aria-label="delete" class="hover:text-error cursor-pointer"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								class="material-symbols:close"
								viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
								/></svg
							></button
						>
					</form>
				</li>
			{/snippet}

			<div class="grid content-start gap-8">
				{#key data.pack}
					<PackCard title="Essentials" pack={packEssentials}>
						{#if packEssentials.length > 0}
							{#each packEssentials as pack}
								{@render packItem(pack)}
							{/each}
						{/if}
						<form method="post" action="?/add" class="" use:enhance>
							<label class="input w-full max-w-96">
								<input type="text" class="grow" placeholder="Add Item" name="item" />
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
					<PackCard title="Electronics" pack={packElectronics}>
						{#if packElectronics.length > 0}
							{#each packElectronics as pack}
								{@render packItem(pack)}
							{/each}
						{/if}
						<form method="post" action="?/add" class="" use:enhance>
							<label class="input w-full max-w-96">
								<input type="text" class="grow" placeholder="Add Item" name="item" />
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

					<PackCard title="Health" pack={packHealth}>
						{#if packHealth.length > 0}
							{#each packHealth as pack}
								{@render packItem(pack)}
							{/each}
						{/if}
						<form method="post" action="?/add" class="" use:enhance>
							<label class="input w-full max-w-96">
								<input type="text" class="grow" placeholder="Add Item" name="item" />
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

					<PackCard title="Others" pack={packOthers}>
						{#if packOthers.length > 0}
							{#each packOthers as pack}
								{@render packItem(pack)}
							{/each}
						{/if}
						<form method="post" action="?/add" class="" use:enhance>
							<label class="input w-full max-w-96">
								<input type="text" class="grow" placeholder="Add Item" name="item" />
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

			<aside class="grid content-start gap-8">
				<PackCard title="Advice" type="warning">
					<div class="collapse-arrow bg-base-100 border-base-content/20 collapse border">
						<input type="radio" name="advice-accordion" />
						<div class="collapse-title to-warning/60 from-warning/30 bg-linear-to-br font-semibold">
							Essentials
						</div>
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
						<div class="collapse-title to-warning/60 from-warning/30 bg-linear-to-br font-semibold">
							Electronics
						</div>
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
						<div class="collapse-title to-warning/60 from-warning/30 bg-linear-to-br font-semibold">
							Health
						</div>
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
						<div class="collapse-title to-warning/60 from-warning/30 bg-linear-to-br font-semibold">
							Others
						</div>
						<div class="collapse-content text-sm">
							<ul class="grid list-disc gap-2 p-4">
								<li>
									<strong>Valuables in Carry-On:</strong> Always pack critical and high-value items in
									your carry-on bag, not your checked luggage. This includes your passport, money, credit
									cards, jewelry, electronics, and house/car keys.
								</li>
								<li>
									<strong>Medication in Carry-On:</strong> While regulations govern <em>how</em> you
									carry medicine, it is a best practice to pack all essential medications in your carry-on
									bag to avoid a health crisis if your checked bag is lost or delayed.
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

				<PackCard title="Add Common Items">
					<div class="collapse-arrow bg-base-100 border-base-content/20 collapse border">
						<input type="radio" name="suggestions-accordion" checked />
						<div
							class="collapse-title from-base-400/20 to-base-400/40 bg-linear-to-br font-semibold"
						>
							Essentials
						</div>
						<div class="collapse-content">
							<div class="flex flex-wrap gap-4 pt-4 text-sm">
								<PackAddCommonItems item="Passports" tripId={data.trip.id} category="essentials" />
								<PackAddCommonItems item="Visas" tripId={data.trip.id} category="essentials" />
								<PackAddCommonItems
									item="Flight tickets"
									tripId={data.trip.id}
									category="essentials"
								/>
								<PackAddCommonItems
									item="Hotel reservation confirmations"
									tripId={data.trip.id}
									category="essentials"
								/>
								<PackAddCommonItems
									item="Driver's license"
									tripId={data.trip.id}
									category="essentials"
								/>
								<PackAddCommonItems
									item="Local currency"
									tripId={data.trip.id}
									category="essentials"
								/>
								<PackAddCommonItems
									item="Credit cards"
									tripId={data.trip.id}
									category="essentials"
								/>
								<PackAddCommonItems item="House keys" tripId={data.trip.id} category="essentials" />
								<PackAddCommonItems item="Car keys" tripId={data.trip.id} category="essentials" />
							</div>
						</div>
					</div>

					<div class="collapse-arrow bg-base-100 border-base-content/20 collapse border">
						<input type="radio" name="suggestions-accordion" />
						<div
							class="collapse-title from-base-400/20 to-base-400/40 bg-linear-to-br font-semibold"
						>
							Electronics
						</div>
						<div class="collapse-content">
							<div class="flex flex-wrap gap-4 pt-4 text-sm">
								<PackAddCommonItems item="Phone" tripId={data.trip.id} category="electronics" />
								<PackAddCommonItems
									item="Phone charger"
									tripId={data.trip.id}
									category="electronics"
								/>
								<PackAddCommonItems
									item="Spare cables"
									tripId={data.trip.id}
									category="electronics"
								/>
								<PackAddCommonItems
									item="Portable power bank"
									tripId={data.trip.id}
									category="electronics"
								/>
								<PackAddCommonItems
									item="Travel adapter"
									tripId={data.trip.id}
									category="electronics"
								/>
							</div>
						</div>
					</div>

					<div class="collapse-arrow bg-base-100 border-base-content/20 collapse border">
						<input type="radio" name="suggestions-accordion" />
						<div
							class="collapse-title from-base-400/20 to-base-400/40 bg-linear-to-br font-semibold"
						>
							Health
						</div>
						<div class="collapse-content">
							<div class="flex flex-wrap gap-4 pt-4 text-sm">
								<PackAddCommonItems item="Paracetamol" tripId={data.trip.id} category="health" />
								<PackAddCommonItems item="Antihistamines" tripId={data.trip.id} category="health" />
								<PackAddCommonItems
									item="Insect repellant"
									tripId={data.trip.id}
									category="health"
								/>
								<PackAddCommonItems
									item="Motion sickness pills"
									tripId={data.trip.id}
									category="health"
								/>
								<PackAddCommonItems
									item="Motion sickness medication"
									tripId={data.trip.id}
									category="health"
								/>
								<PackAddCommonItems item="Hand sanitizer" tripId={data.trip.id} category="health" />
								<PackAddCommonItems item="Sunscreen" tripId={data.trip.id} category="health" />
								<PackAddCommonItems item="Lip balm" tripId={data.trip.id} category="health" />
							</div>
						</div>
					</div>

					<div class="collapse-arrow bg-base-100 border-base-content/20 collapse border">
						<input type="radio" name="suggestions-accordion" />
						<div
							class="collapse-title from-base-400/20 to-base-400/40 bg-linear-to-br font-semibold"
						>
							Others
						</div>
						<div class="collapse-content">
							<div class="flex flex-wrap gap-4 pt-4 text-sm">
								<PackAddCommonItems item="Toothbrush" tripId={data.trip.id} category="others" />
								<PackAddCommonItems item="Toothpaste" tripId={data.trip.id} category="others" />
								<PackAddCommonItems item="Shampoo" tripId={data.trip.id} category="others" />
								<PackAddCommonItems item="Facial wash" tripId={data.trip.id} category="others" />
								<PackAddCommonItems item="Sunglasses" tripId={data.trip.id} category="others" />
								<PackAddCommonItems item="Water bottle" tripId={data.trip.id} category="others" />
							</div>
						</div>
					</div>
				</PackCard>
			</aside>
		</div>
	</main>
</TripView>
