import { db } from '$lib/drizzle/db';
import { flight, pack, stay, trip } from '$lib/drizzle/schema';
import { and, eq, getTableColumns } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error, fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';
import { message } from 'sveltekit-superforms';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(minMax);

const tripFormSchema = z.object({
	tripName: z.string()
});

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(307, '/login');
	}

	const form = await superValidate(zod4(tripFormSchema));

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
	const futureTripsIncludingHightlighted = tripRecords
		.filter((trip) => {
			if (!dayjs(trip.tripStartFormatted).isBefore(dayjs())) return trip;
		})
		.sort((a, b) => {
			if (!a.tripStartFormatted) return 1;
			if (!b.tripStartFormatted) return -1;

			// We compare if there are actual tripStart values
			const startA = dayjs(a.tripStartFormatted);
			const startB = dayjs(b.tripStartFormatted);
			return startA.diff(startB);
		});

	// for (const x of futureTrips) {
	// 	console.log(x.tripName);
	// }

	// Get the first one that's not past
	const nextTrip =
		futureTripsIncludingHightlighted.length > 0 ? futureTripsIncludingHightlighted[0] : undefined;

	const futureTrips = futureTripsIncludingHightlighted.filter((trip) => trip.id !== nextTrip?.id);

	// Filter past trips, then Sort by start date
	const pastTrips = tripRecords
		.filter((trip) => dayjs(trip.tripStartFormatted).isBefore(dayjs()))
		.sort((a, b) => {
			const startA = dayjs(a.tripStartFormatted);
			const startB = dayjs(b.tripStartFormatted);

			return startA.diff(startB);
		});

	return { form, trips: tripRecords, nextTrip, futureTrips, pastTrips };
};

function getTripStartAndEndDates(flights: FlightDB[]) {
	if (!flights || flights.length === 0) return [null, null];

	const departures = flights.map((f) => dayjs(f.departureTimestamp));
	const arrivals = flights.map((f) => dayjs(f.arrivalTimestamp));

	const earliestDeparture = dayjs.min(departures);
	const latestArrival = dayjs.max(arrivals);

	return [earliestDeparture, latestArrival];
}

export const actions = {
	add: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(tripFormSchema));
		if (!locals.user) {
			return fail(403, { form });
		}
		if (!form.valid) {
			return fail(400, { form });
		}

		const inserted = await db
			.insert(trip)
			.values({
				userId: locals.user?.id,
				tripName: form.data.tripName
			})
			.returning();
		console.log(inserted);
		if (inserted.length === 0) {
			return error(500, 'Server error!');
		}

		return message(form, {
			status: 'success',
			text: 'Form posted successfully!',
			insertedId: inserted[0].id
		});
	}
} satisfies Actions;
