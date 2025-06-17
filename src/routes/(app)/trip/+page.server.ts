import { db } from '$lib/drizzle/db';
import { trip } from '$lib/drizzle/schema';
import { eq, and } from 'drizzle-orm';

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(307, '/login');
	}
	const results = await db.select().from(trip).where(eq(trip.userId, locals.user.id));

	return { trips: results };
};
