import { db } from '$lib/drizzle/db';
import { trip, pack } from '$lib/drizzle/schema';
import { eq, and } from 'drizzle-orm';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { fail, error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

dayjs.extend(relativeTime);

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		return error(403, { message: 'Not authenticated!' });
	}
	const tripId = params.trip;

	/**
	 * Trip
	 */
	const tripRows = await db
		.select()
		.from(trip)
		.where(and(eq(trip.id, tripId), eq(trip.userId, locals.user.id)));
	const tripRecord: TripProps = {
		createdAtSemantic: dayjs(tripRows[0].createdAt).fromNow(),
		createdAtFormatted: dayjs(tripRows[0].createdAt).format('DD MMM, YYYY'),
		...tripRows[0]
	};

	/**
	 * Pack
	 */
	const packRows = await db
		.select()
		.from(pack)
		.where(and(eq(pack.tripId, tripId), eq(pack.userId, locals.user?.id)));

	return { trip: tripRecord, pack: packRows };
};

export const actions = {
	add: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(403);
		}

		const formData = await request.formData();
		const addItem = String(formData.get('item'));
		const tripId = String(formData.get('tripId'));
		await db.insert(pack).values({ tripId: tripId, userId: locals.user.id, item: addItem });

		return { success: true };
	},

	pack: async ({ locals, request }) => {
		if (!locals.user) {
			return fail(403);
		}

		const formData = await request.formData();
		const itemId = String(formData.get('id'));
		const done = formData.get('done') === 'on' ? true : false;
		const category = String(formData.get('category'));
		await db.update(pack).set({ done: done, category: category }).where(eq(pack.id, itemId));

		return { doneSuccess: true };
	}
} satisfies Actions;
