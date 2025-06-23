<script lang="ts">
	import Toaster from '$lib/ui/Toaster.svelte';

	let { children, data } = $props();
</script>

<div class="grid min-h-dvh grid-cols-[auto_1fr]">
	<!-- <div
			class="font-logo text-primary col-span-2 h-full max-h-20 px-2 py-4 text-4xl font-extrabold tracking-tighter"
		>
			<a href="/" class="flex items-center justify-center gap-4">Roamichi</a>
		</div> -->
	<nav
		class="to-base-700 from-base-700/50 sticky top-0 z-[1] grid h-full max-h-dvh w-full max-w-[200px] content-start border-r border-r-black/20 bg-linear-to-br"
	>
		<div
			class="border-b-base-300/30 font-header flex h-16 items-center justify-center border-b-0 text-6xl font-bold"
		>
			R
		</div>
		<ul class="mt-4">
			<li>
				<a
					aria-label="dashboard"
					href="/"
					class="{data.paths.includes('dashboard')
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} flex min-h-20 w-full min-w-20 cursor-pointer items-center justify-center gap-4 p-4 text-lg"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.3em"
						height="1.3em"
						class="material-symbols:dashboard h-8 w-8"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z"
						/></svg
					></a
				>
			</li>
			<li>
				<a
					aria-label="trips"
					href="/trip"
					class="{data.paths.includes('trip')
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} flex min-h-20 w-full min-w-20 cursor-pointer items-center justify-center gap-4 p-4 text-lg"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.3em"
						height="1.3em"
						class="material-symbols:travel-luggage-and-bags h-8 w-8"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M11 6h2V4h-2zm1 6q-1.9 0-3.625-.788T5 9.45V8q0-.825.588-1.412T7 6h2V3q0-.425.288-.712T10 2h4q.425 0 .713.288T15 3v3h2q.825 0 1.413.588T19 8v1.45q-1.65.975-3.375 1.763T12 12M7 22v-1q-.825 0-1.412-.587T5 19v-7.3q1.4.85 2.888 1.45t3.112.8V15h2v-1.05q1.625-.2 3.113-.8T19 11.7V19q0 .825-.587 1.413T17 21v1h-2v-1H9v1z"
						/></svg
					>
				</a>
			</li>

			<!-- <li class="bg-base-content/15 my-4 h-0.5 w-full"></li> -->
			<li>
				<a
					aria-label="contact"
					href="/contact"
					class="{data.paths.includes('contact')
						? 'to-primary from-primary/50 text-primary-content bg-linear-to-br'
						: 'hover:bg-primary hover:text-primary-content'} flex min-h-20 w-full min-w-20 cursor-pointer items-center justify-center gap-4 p-4 text-lg"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.3em"
						height="1.3em"
						class="material-symbols:mail h-8 w-8"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"
						/></svg
					></a
				>
			</li>
		</ul>
	</nav>
	<!-- <main class="bg-base-200 grid content-center justify-items-center gap-8 p-4">
		<section
			class="bg-base-100 main-container-height border-base-content/10 grid w-full content-start justify-items-center rounded-2xl border-2 p-4"
		>
			<div class="grid w-full max-w-3xl gap-8">
				{@render children()}
			</div>
		</section>
	</main> -->
	{@render children()}
</div>

<style>
	.main-container-height {
		min-height: calc(100vh - 2rem);
	}

	.nav-full-height {
		min-height: calc(100vh - 5rem);
	}
</style>
