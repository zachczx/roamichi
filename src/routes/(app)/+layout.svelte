<script lang="ts">
	let { children, data } = $props();
</script>

<div class="grid min-h-dvh grid-cols-[auto_1fr]">
	<!-- <div
			class="font-logo text-primary col-span-2 h-full max-h-20 px-2 py-4 text-4xl font-extrabold tracking-tighter"
		>
			<a href="/" class="flex items-center justify-center gap-4">Roamiko</a>
		</div> -->
	<nav
		class="bg-base-700 sticky top-0 z-[1] grid h-full max-h-dvh w-full max-w-[200px] content-start border-r border-r-black/5"
	>
		<div
			class="bg-base-700 border-b-base-300/30 font-header flex h-16 items-center justify-center border-b-0 text-5xl font-bold"
		>
			R
		</div>
		<ul class="mt-4">
			<li class="">
				<a
					aria-label="dashboard"
					href="/"
					class="{data.paths.includes('dashboard')
						? 'bg-primary/60 text-primary-content'
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
			<li class="">
				<a
					aria-label="trips"
					href="/trip"
					class="{data.paths.includes('trip')
						? 'bg-primary/60 text-primary-content'
						: 'hover:bg-primary hover:text-primary-content'} flex min-h-20 w-full min-w-20 cursor-pointer items-center justify-center gap-4 p-4 text-lg"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.3em"
						height="1.3em"
						class="material-symbols:your-trips h-8 w-8"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M8 18h8v-2H8zm-1 4q-.825 0-1.412-.587T5 20v-8q0-2.125 1.113-3.8T9 5.7V5q0-1.25.875-2.125T12 2t2.125.875T15 5v.7q1.775.825 2.888 2.5T19 12v8q0 .825-.587 1.413T17 22zm4-16.9q.275-.05.5-.075T12 5t.5.025t.5.075V5q0-.425-.288-.713T12 4t-.712.288T11 5zm-.85 9.4L12 13.1l1.85 1.4l-.7-2.275L15 10.9h-2.275L12 8.5l-.725 2.4H9l1.85 1.325z"
						/></svg
					></a
				>
			</li>

			<!-- <li class="bg-base-content/15 my-4 h-0.5 w-full"></li> -->
			<li class="">
				<a
					aria-label="contact"
					href="/contact"
					class="{data.paths.includes('contact')
						? 'bg-primary/60 text-primary-content'
						: 'hover:bg-primary hover:text-primary-content'} flex min-h-20 w-full min-w-20 cursor-pointer items-center justify-center gap-4 p-4 text-lg"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.3em"
						height="1.3em"
						class="material-symbols:luggage h-8 w-8"
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
