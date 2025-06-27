import { db } from '$lib/drizzle/db';
import { flight, pack, stay, trip, tripRelations } from '$lib/drizzle/schema';
import { and, eq, getTableColumns } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

import relativeTime from 'dayjs/plugin/relativeTime';
import type { FlightDB, TripRelationsDB } from '../../../ambient';

dayjs.extend(relativeTime);
dayjs.extend(minMax);

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(307, '/login');
	}

	/**
	 * Long term I don't want to use the relational api, because it's more overhead to maintain
	 */

	// const tripRows = await db.query.trip.findMany({
	// 	where: eq(trip.userId, locals.user.id),
	// 	with: {
	// 		flights: true,
	// 		stays: true,
	// 		packs: true
	// 	}
	// });

	// const tripRecords = tripRows.map((trip) => {
	// 	const sorted = getTripStartAndEndDates(trip);
	// 	return {
	// 		...trip,
	// 		createdAtSemantic: dayjs(trip.createdAt).fromNow(),
	// 		createdAtFormatted: dayjs(trip.createdAt).format('DD MMM YY'),
	// 		tripStartFormatted: sorted.length > 0 ? sorted[0].format('DD MMM YY') : undefined,
	// 		tripEndFormatted: sorted.length > 1 ? sorted[1].format('DD MMM YY') : undefined,
	// 		tripDuration: sorted[1].diff(sorted[0], 'days')
	// 	};
	// });

	const tripRows = await db
		.select({
			...getTableColumns(trip),
			flightCount: db.$count(flight, eq(flight.tripId, trip.id)),
			stayCount: db.$count(stay, and(eq(stay.tripId, trip.id), eq(stay.tripId, trip.id))),
			packedCount: db.$count(pack, and(eq(pack.tripId, trip.id), eq(pack.done, true))),
			packCount: db.$count(pack, eq(pack.tripId, trip.id))
		})
		.from(trip)
		.where(eq(trip.userId, locals.user.id));

	const flights = await db.select().from(flight).where(eq(flight.userId, locals.user.id));

	const tripMerged = tripRows.map((trip) => {
		trip.flights = flights.filter((flight) => flight.tripId === trip.id);
		return trip;
	});

	const tripRecords = tripMerged.map((trip) => {
		const [start, end] = getTripStartAndEndDates(trip.flights);

		let tripStartAndEndFormatted = '';

		if (start && end) {
			if (dayjs(start).get('year') === dayjs(end).get('year')) {
				tripStartAndEndFormatted = start.format('DD MMM') + ' – ' + end.format('DD MMM YYYY');
			} else {
				tripStartAndEndFormatted = start.format('DD MMM YYYY') + '–' + end.format('DD MMM YYYY');
			}
		}
		return {
			...trip,
			createdAtSemantic: dayjs(trip.createdAt).fromNow(),
			createdAtFormatted: dayjs(trip.createdAt).format('DD MMM YYYY'),
			tripStartFormatted: start ? start.format('DD MMM YYYY') : undefined,
			tripEndFormatted: end ? end.format('DD MMM YYYY') : undefined,
			tripStartAndEndFormatted: tripStartAndEndFormatted,
			tripDuration: start && end ? end.diff(start, 'days') : undefined,
			tripStartInDays: dayjs(start).fromNow()
		};
	});

	console.log('tripRecords: ', tripRecords);

	return { trips: tripRecords };
};

function getTripStartAndEndDates(flights: FlightDB[]) {
	if (!flights || flights.length === 0) return [null, null];

	const departures = flights.map((f) => dayjs(f.departureTimestamp));
	const arrivals = flights.map((f) => dayjs(f.arrivalTimestamp));

	const earliestDeparture = dayjs.min(departures);
	const latestArrival = dayjs.max(arrivals);

	return [earliestDeparture, latestArrival];
}
