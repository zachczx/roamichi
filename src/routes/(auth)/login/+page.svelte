<script lang="ts">
	import { enhance } from '$app/forms';
	import { authClient } from '$lib/auth-client';

	let status = $state('');
	let email = $state('');
	let password = $state('');
	let errorResponse = $state(false);

	async function submitHandler() {
		const { data, error } = await authClient.signIn.email({
			email: email,
			password: password,
			callbackURL: '/'
		});

		if (error) {
			errorResponse = true;
			status = 'error';
		}
	}
</script>

<h1 class="text-6xl font-bold">Login</h1>
<form
	class="grid w-full max-w-96 gap-4"
	onsubmit={() => {
		status = 'submitted';
		submitHandler();
	}}
>
	<div>
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
	</div>
	<div>
		<label class="input validator input-primary w-full">
			<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<g
					stroke-linejoin="round"
					stroke-linecap="round"
					stroke-width="2.5"
					fill="none"
					stroke="currentColor"
				>
					<path
						d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
					></path>
					<circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
				</g>
			</svg>
			<input
				type="password"
				bind:value={password}
				required
				placeholder="Password"
				minlength="8"
				title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
			/>
		</label>
		<p class="validator-hint hidden">
			Must be more than 8 characters, including
			<br />At least one number <br />At least one lowercase letter <br />At least one uppercase
			letter
		</p>
	</div>
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
					<span>Success!</span>
				</div>
			{:else if status === 'submitted'}
				<span class="loading loading-spinner loading-sm"></span>
			{:else}
				Login
			{/if}</button
		>
		<a href="/register" class="text-primary text-center text-sm underline">Or register here</a>
	</div>
</form>
