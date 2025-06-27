import { db } from '$lib/drizzle/db';
import { flight, pack, stay, trip } from '$lib/drizzle/schema';
import { and, eq, getTableColumns } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(minMax);

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(307, '/login');
	}

	const tripRows: TripDBWithCounts[] = await db
		.select({
			...getTableColumns(trip),
			flightCount: db.$count(flight, eq(flight.tripId, trip.id)),
			stayCount: db.$count(stay, and(eq(stay.tripId, trip.id), eq(stay.tripId, trip.id))),
			packedCount: db.$count(pack, and(eq(pack.tripId, trip.id), eq(pack.done, true))),
			packCount: db.$count(pack, eq(pack.tripId, trip.id))
		})
		.from(trip)
		.where(eq(trip.userId, locals.user.id));

	const flightsDb = await db.select().from(flight).where(eq(flight.userId, locals.user.id));

	const tripRecords = tripRows.map((trip): TripPropsExtra => {
		const flights = flightsDb.filter((flight) => flight.tripId === trip.id);

		const [start, end] = getTripStartAndEndDates(flights);
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
			flights: flights,
			createdAtSemantic: dayjs(trip.createdAt).fromNow(),
			createdAtFormatted: dayjs(trip.createdAt).format('DD MMM YYYY'),
			tripStartFormatted: start ? start.format('DD MMM YYYY') : undefined,
			tripEndFormatted: end ? end.format('DD MMM YYYY') : undefined,
			tripStartAndEndFormatted: tripStartAndEndFormatted,
			tripDuration: start && end ? end.diff(start, 'days') : undefined,
			tripStartInDays: dayjs(start).fromNow()
		};
	});

	// Filter those that are not in past, then Sort by start date
	const futureTrips = tripRecords
		.filter((trip) => !dayjs(trip.tripStartFormatted).isBefore(dayjs()))
		.sort((a, b) => {
			const startA = dayjs(a.tripStartFormatted);
			const startB = dayjs(b.tripStartFormatted);

			return startA.diff(startB);
		});

	// Get the first one that's not past
	const nextTrip = futureTrips.length > 0 ? futureTrips[0] : undefined;

	// Filter past trips, then Sort by start date
	const pastTrips = tripRecords
		.filter((trip) => dayjs(trip.tripStartFormatted).isBefore(dayjs()))
		.sort((a, b) => {
			const startA = dayjs(a.tripStartFormatted);
			const startB = dayjs(b.tripStartFormatted);

			return startA.diff(startB);
		});

	return { trips: tripRecords, nextTrip, futureTrips, pastTrips };
};

function getTripStartAndEndDates(flights: FlightDB[]) {
	if (!flights || flights.length === 0) return [null, null];

	const departures = flights.map((f) => dayjs(f.departureTimestamp));
	const arrivals = flights.map((f) => dayjs(f.arrivalTimestamp));

	const earliestDeparture = dayjs.min(departures);
	const latestArrival = dayjs.max(arrivals);

	return [earliestDeparture, latestArrival];
}
