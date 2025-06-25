import { db } from '$lib/drizzle/db';
import { flight, pack, stay, trip, tripRelations } from '$lib/drizzle/schema';
import { eq, getTableColumns } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';
import type { TripRelationsDB } from '../../../ambient';

dayjs.extend(relativeTime);

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(307, '/login');
	}

	// const tripRows = await db
	// 	.select({
	// 		...getTableColumns(trip),
	// flightCount: db.$count(flight, eq(flight.tripId, trip.id)),
	// stayCount: db.$count(stay, eq(stay.tripId, trip.id)),
	// packCount: db.$count(pack, eq(pack.tripId, trip.id)),
	// 		flight: flight,
	// 	})
	// 	.from(trip)
	// 	.where(eq(trip.userId, locals.user.id))
	// 	.leftJoin(flight, eq(flight.tripId, trip.id))
	// 	.all();

	const tripRows = await db.query.trip.findMany({
		where: eq(trip.userId, locals.user.id),
		with: {
			flights: true,
			stays: true,
			packs: true
		}
		// extras: {
		// 	flightCount: db.$count(flight, eq(flight.tripId, trip.id)),
		// 	stayCount: db.$count(stay, eq(stay.tripId, trip.id)),
		// 	packCount: db.$count(pack, eq(pack.tripId, trip.id))
		// }
	});

	const tripRecords = tripRows.map((trip) => {
		const sorted = getTripStartAndEndDates(trip);
		return {
			...trip,
			createdAtSemantic: dayjs(trip.createdAt).fromNow(),
			createdAtFormatted: dayjs(trip.createdAt).format('DD MMM YY'),
			tripStartFormatted: sorted[0].format('DD MMM YY'),
			tripEndFormatted: sorted[1].format('DD MMM YY'),
			tripDuration: sorted[1].diff(sorted[0], 'days')
		};
	});

	return { trips: tripRecords };
};

function getTripStartAndEndDates(trip: TripRelationsDB) {
	const dates = [];
	for (const f of trip.flights) {
		dates.push(dayjs(f.departureTimestamp));
		dates.push(dayjs(f.arrivalTimestamp));
	}

	const sorted = dates.sort((a, b) => a.diff(b));
	return [sorted[0], sorted[sorted.length - 1]];
}
