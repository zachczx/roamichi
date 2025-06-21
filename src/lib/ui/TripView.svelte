<script lang="ts">
	import type { Snippet } from 'svelte';

	interface TripViewProps {
		mode: 'trips' | 'trip' | 'flight' | 'stay' | 'pack';
		tripId: string;
		breadcrumbs: Snippet;
		children: Snippet;
	}
	let { mode, breadcrumbs, children, tripId = '' }: TripViewProps = $props();
</script>

<div class="grid w-full content-start">
	<!-- <div class="bg-base-200 border-b-base-300/30 h-16 border-b-2"></div> -->

	<div class="flex">
		<nav
			class="bg-base-700/30 sticky top-0 hidden h-full w-full max-w-32 content-start border-r border-r-black/5 lg:grid lg:max-h-dvh lg:min-h-dvh"
		>
			<!-- <h3 class="flex w-full min-w-56 items-center gap-4 rounded-lg px-4 py-3 text-2xl font-bold">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1.3em"
					height="1.3em"
					class="material-symbols:add"
					viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg
				>
				New
			</h3> -->
			<ul class="grid">
				{#if mode === 'trips'}
					<li class="">
						<a
							aria-label="trips"
							href="/trip/add"
							class="hover:bg-primary hover:text-primary-content grid w-full cursor-pointer content-center justify-items-center gap-4 p-4 text-lg font-semibold"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								class="material-symbols:your-trips h-4 w-4"
								viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M8 18h8v-2H8zm-1 4q-.825 0-1.412-.587T5 20v-8q0-2.125 1.113-3.8T9 5.7V5q0-1.25.875-2.125T12 2t2.125.875T15 5v.7q1.775.825 2.888 2.5T19 12v8q0 .825-.587 1.413T17 22zm4-16.9q.275-.05.5-.075T12 5t.5.025t.5.075V5q0-.425-.288-.713T12 4t-.712.288T11 5zm-.85 9.4L12 13.1l1.85 1.4l-.7-2.275L15 10.9h-2.275L12 8.5l-.725 2.4H9l1.85 1.325z"
								/></svg
							>Trip</a
						>
					</li>
				{/if}
				{#if mode !== 'trips'}
					<li>
						<a
							href="/trip/{tripId}"
							class="{mode === 'trip'
								? 'bg-primary/60 text-primary-content font-semibold'
								: 'hover:bg-primary hover:text-primary-content'} grid w-full cursor-pointer content-center justify-items-center gap-2 p-4 text-lg"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								class="material-symbols:border-all h-7 w-7"
								viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M13 21v-8h8v8zm0-10V3h8v8zM3 11V3h8v8zm0 10v-8h8v8z"
								/></svg
							>All</a
						>
					</li>
					<li>
						<a
							href="/trip/{tripId}/flight"
							class="{mode === 'flight'
								? 'bg-primary/60 text-primary-content font-semibold'
								: 'hover:bg-primary hover:text-primary-content'} grid w-full cursor-pointer content-center justify-items-center gap-2 p-4 text-lg"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								class="material-symbols:flight-takeoff h-7 w-7"
								viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z"
								/></svg
							><span>Flight</span></a
						>
					</li>
					<li>
						<a
							href="/trip/{tripId}/stay"
							class="{mode === 'stay'
								? 'bg-primary/60 text-primary-content font-semibold'
								: 'hover:bg-primary hover:text-primary-content'} grid w-full cursor-pointer content-center justify-items-center gap-2 p-4 text-lg"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								class="material-symbols:hotel h-7 w-7"
								viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M1 19V4h2v10h8V6h8q1.65 0 2.825 1.175T23 10v9h-2v-3H3v3zm6-6q-1.25 0-2.125-.875T4 10t.875-2.125T7 7t2.125.875T10 10t-.875 2.125T7 13"
								/></svg
							>Stay</a
						>
					</li>
					<li>
						<a
							href="/trip/{tripId}/pack"
							class="{mode === 'pack'
								? 'bg-primary/60 text-primary-content font-semibold'
								: 'hover:bg-primary hover:text-primary-content'} grid w-full cursor-pointer content-center justify-items-center gap-2 p-4 text-lg"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								class="material-symbols:luggage h-7 w-7"
								viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M7 21q-.825 0-1.412-.587T5 19V8q0-.825.588-1.412T7 6h2V4q0-.825.588-1.412T11 2h2q.825 0 1.413.588T15 4v2h2q.825 0 1.413.588T19 8v11q0 .825-.587 1.413T17 21q0 .425-.288.713T16 22t-.712-.288T15 21H9q0 .425-.288.713T8 22t-.712-.288T7 21m2-3h2V9H9zm4 0h2V9h-2zM11 6h2V4h-2z"
								/></svg
							>Pack</a
						>
					</li>
				{/if}
			</ul>
		</nav>

		<div class="grid grow content-start justify-self-center">
			<div class="breadcrumbs mb-8 grid h-16 w-full content-center p-2 px-6 text-lg xl:px-16">
				<ul>
					<li>
						<a href="/" class="hover:text-primary" aria-label="home"
							><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M5 20v-9.15L2.2 13L1 11.4L12 3l4 3.05V4h3v4.35l4 3.05l-1.2 1.6l-2.8-2.15V20h-5v-6h-4v6zm5-9.975h4q0-.8-.6-1.313T12 8.2t-1.4.513t-.6 1.312"
								/></svg
							>Home</a
						>
					</li>

					{@render breadcrumbs()}
				</ul>
			</div>

			<div class="px-4 pb-4 xl:px-16">{@render children()}</div>
		</div>
	</div>
</div>

<style>
	.breadcrumbs {
		ul > li {
			a {
				display: flex;
				gap: 0.5rem;
				align-items: center;
			}
		}
	}
</style>
