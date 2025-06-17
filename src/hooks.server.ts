import { auth } from '$lib/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const fetchedSession = await auth.api.getSession({
		headers: event.request.headers
	});

	if (fetchedSession) {
		const { user, session } = fetchedSession;
		event.locals.session = session;
		event.locals.user = user;
	}
	return svelteKitHandler({ event, resolve, auth });
};
