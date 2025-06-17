<script>
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	onMount(async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					goto('/login');
				}
			}
		});
	});
</script>
