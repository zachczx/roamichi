import { db } from '$lib/drizzle/db';
import { trip } from '$lib/drizzle/schema';
import { eq, and } from 'drizzle-orm';

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		return error(403, { message: 'Not authenticated!' });
	}
	const tripId = params.trip;

	const results = await db
		.select()
		.from(trip)
		.where(and(eq(trip.id, tripId), eq(trip.userId, locals.user.id)));
	const tripDb = results[0];
	console.log(results);
	return { trip: tripDb };
};
