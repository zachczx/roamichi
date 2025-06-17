<script lang="ts">
	let { children } = $props();
</script>

<div class="grid min-h-dvh grid-cols-[auto_1fr]">
	<nav class="bg-base-200 grid h-full w-[300px] grid-rows-[auto_1fr_auto] content-start gap-4 p-4">
		<div class="font-logo text-primary px-2 text-4xl font-extrabold tracking-tighter">
			<a href="/" class="flex items-center gap-4">Roamiko</a>
		</div>
		<ul class="">
			<li
				class="hover:bg-primary hover:text-primary-content w-full cursor-pointer rounded-lg px-2 py-4 text-lg"
			>
				<a href="/" class="flex items-center gap-4"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.3em"
						height="1.3em"
						class="material-symbols:dashboard"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z"
						/></svg
					>Dashboard</a
				>
			</li>
			<li
				class="hover:bg-primary hover:text-primary-content w-full cursor-pointer rounded-lg px-2 py-4 text-lg"
			>
				<a href="/" class="flex items-center gap-4"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.3em"
						height="1.3em"
						class="material-symbols:your-trips"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M8 18h8v-2H8zm-1 4q-.825 0-1.412-.587T5 20v-8q0-2.125 1.113-3.8T9 5.7V5q0-1.25.875-2.125T12 2t2.125.875T15 5v.7q1.775.825 2.888 2.5T19 12v8q0 .825-.587 1.413T17 22zm4-16.9q.275-.05.5-.075T12 5t.5.025t.5.075V5q0-.425-.288-.713T12 4t-.712.288T11 5zm-.85 9.4L12 13.1l1.85 1.4l-.7-2.275L15 10.9h-2.275L12 8.5l-.725 2.4H9l1.85 1.325z"
						/></svg
					>Trip</a
				>
			</li>
			<li
				class="hover:bg-primary hover:text-primary-content w-full cursor-pointer rounded-lg px-2 py-4 text-lg"
			>
				<a href="/" class="flex items-center gap-4"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.3em"
						height="1.3em"
						class="material-symbols:flight-takeoff"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z"
						/></svg
					>Flight</a
				>
			</li>
			<li
				class="hover:bg-primary hover:text-primary-content w-full cursor-pointer rounded-lg px-2 py-4 text-lg"
			>
				<a href="/" class="flex items-center gap-4"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.3em"
						height="1.3em"
						class="material-symbols:hotel"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M1 19V4h2v10h8V6h8q1.65 0 2.825 1.175T23 10v9h-2v-3H3v3zm6-6q-1.25 0-2.125-.875T4 10t.875-2.125T7 7t2.125.875T10 10t-.875 2.125T7 13"
						/></svg
					>Stay</a
				>
			</li>
			<li
				class="hover:bg-primary hover:text-primary-content w-full cursor-pointer rounded-lg px-2 py-4 text-lg"
			>
				<a href="/" class="flex items-center gap-4"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.3em"
						height="1.3em"
						class="material-symbols:luggage"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M7 21q-.825 0-1.412-.587T5 19V8q0-.825.588-1.412T7 6h2V4q0-.825.588-1.412T11 2h2q.825 0 1.413.588T15 4v2h2q.825 0 1.413.588T19 8v11q0 .825-.587 1.413T17 21q0 .425-.288.713T16 22t-.712-.288T15 21H9q0 .425-.288.713T8 22t-.712-.288T7 21m2-3h2V9H9zm4 0h2V9h-2zM11 6h2V4h-2z"
						/></svg
					>Pack</a
				>
			</li>
			<li class="bg-base-content/15 my-4 h-0.5 w-full"></li>
			<li
				class="hover:bg-primary hover:text-primary-content w-full cursor-pointer rounded-lg px-2 py-4 text-lg"
			>
				<a href="/" class="flex items-center gap-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.3em"
						height="1.3em"
						class="material-symbols:add"
						viewBox="0 0 24 24"
						><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg
					>New</a
				>
			</li>
		</ul>
		<ul>
			<li
				class="hover:bg-primary hover:text-primary-content w-full cursor-pointer rounded-lg px-2 py-4 text-lg"
			>
				<a href="/" class="flex items-center gap-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.3em"
						height="1.3em"
						class="material-symbols:luggage"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"
						/></svg
					>Contact</a
				>
			</li>
		</ul>
	</nav>
	<main class="bg-base-200 grid content-center justify-items-center gap-8 p-4">
		<section
			class="bg-base-100 main-container-height border-base-content/10 grid w-full content-center justify-items-center gap-8 rounded-2xl border-2 p-4"
		>
			{@render children()}
		</section>
	</main>
</div>

<style>
	.main-container-height {
		min-height: calc(100vh - 2rem);
	}
</style>
