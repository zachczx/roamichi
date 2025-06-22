import { db } from '$lib/drizzle/db';
import { trip, gift } from '$lib/drizzle/schema';
import { eq, and } from 'drizzle-orm';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { error } from '@sveltejs/kit';
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
	 * Flights
	 */
	const giftRows = await db
		.select()
		.from(gift)
		.where(and(eq(gift.tripId, tripId), eq(gift.userId, locals.user.id)));

	return { trip: tripRecord, gift: giftRows };
};
