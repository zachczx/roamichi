<script lang="ts">
	import { enhance } from '$app/forms';
	import { authClient } from '$lib/auth-client';

	let status = $state('');
	let email = $state('');
	let password = $state('');
	let errorResponse = $state(false);

	async function submitHandler() {
		const { data, error } = await authClient.signIn.magicLink({
			email: email,
			callbackURL: '/'
		});

		console.log(data);

		if (error) {
			errorResponse = true;
			status = 'error';
		}

		if (data?.status) {
			status = 'success';
		}
	}
</script>

<section class="grid w-full content-center justify-items-center gap-8 p-4">
	<h1 class="text-4xl font-bold">Get Email Login Link</h1>
	<form
		class="grid w-full max-w-lg gap-4"
		onsubmit={() => {
			status = 'submitted';
			submitHandler();
		}}
	>
		<label class="input validator input-primary w-full">
			<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<g
					stroke-linejoin="round"
					stroke-linecap="round"
					stroke-width="2.5"
					fill="none"
					stroke="currentColor"
				>
					<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
					<circle cx="12" cy="7" r="4"></circle>
				</g>
			</svg>
			<input
				bind:value={email}
				type="email"
				required
				placeholder="Email"
				title="Only letters, numbers or dash"
			/>
		</label>
		<p class="validator-hint hidden">Must be a valid email</p>

		{#if errorResponse}
			<div class="text-error font-semibold">Login error with the email or password entered.</div>
		{/if}
		<div class="grid">
			<button class="btn {status === 'success' ? 'btn-success' : 'btn-primary'}">
				{#if status === 'success'}
					<div class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1.3em"
							height="1.3em"
							class="carbon:checkmark"
							viewBox="0 0 32 32"
							><path
								fill="currentColor"
								d="m13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9z"
							/></svg
						>
						<span>Sent!</span>
					</div>
				{:else if status === 'submitted'}
					<span class="loading loading-spinner loading-sm"></span>
				{:else}
					Get Login Link
				{/if}</button
			>
			<a href="/register" class="text-primary mt-2 text-center text-sm underline"
				>Use username & password</a
			>
		</div>
	</form>
</section>
