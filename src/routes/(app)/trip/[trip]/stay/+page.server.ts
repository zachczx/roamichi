import { db } from '$lib/drizzle/db';
import { trip, stay } from '$lib/drizzle/schema';
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
	 * Stays
	 */
	const stayRows = await db
		.select()
		.from(stay)
		.where(and(eq(stay.tripId, tripId), eq(stay.userId, locals.user.id)))
		.orderBy(stay.checkIn);

	const stayRecords = stayRows.map((stay) => {
		const checkInSemantic = dayjs(stay.checkIn).fromNow();
		const checkInFormatted = dayjs(stay.checkIn).format('DD MMM, YYYY, hh:mma');
		const checkOutSemantic = dayjs(stay.checkOut).fromNow();
		const checkOutFormatted = dayjs(stay.checkOut).format('DD MMM, YYYY, hh:mma');
		return {
			checkInSemantic,
			checkInFormatted,
			checkOutSemantic,
			checkOutFormatted,
			...stay
		};
	});

	return { trip: tripRecord, stay: stayRecords };
};
