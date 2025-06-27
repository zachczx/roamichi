import { db } from '$lib/drizzle/db';
import { trip, flight } from '$lib/drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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
	const flightRows = await db
		.select()
		.from(flight)
		.where(and(eq(flight.tripId, tripId), eq(flight.userId, locals.user.id)));

	const flightRecords: FlightPropsCard[] = flightRows.map((flight): FlightPropsCard => {
		const departureTimestampSemantic = dayjs(flight.departureTimestamp).fromNow();
		const departureTimestampFormatted = dayjs(flight.departureTimestamp).format(
			'DD MMM, YYYY, hh:mma'
		);
		const arrivalTimestampSemantic = dayjs(flight.arrivalTimestamp).fromNow();
		const arrivalTimestampFormatted = dayjs(flight.arrivalTimestamp).format('DD MMM, YYYY, hh:mma');

		// Key Timings
		const timestampOnlineCheckIn = dayjs(flight.departureTimestamp).subtract(48, 'hours');
		const timestampOnlineCheckInFormatted = timestampOnlineCheckIn.format('DD MMM, YYYY, hh:mma');
		const timestampOnlineCheckInSemantic = timestampOnlineCheckIn.fromNow();

		const timestampBookTaxi = dayjs(flight.departureTimestamp).subtract(3, 'hours');
		const timestampBookTaxiFormatted = timestampBookTaxi.format('DD MMM, YYYY, hh:mma');
		const timestampBookTaxiSemantic = timestampBookTaxi.fromNow();

		const timestampReachAirport = dayjs(flight.departureTimestamp).subtract(2.5, 'hours');
		const timestampReachAirportFormatted = timestampReachAirport.format('DD MMM, YYYY, hh:mma');
		const timestampReachAirportSemantic = timestampReachAirport.fromNow();

		const timestampReachGate = dayjs(flight.departureTimestamp).subtract(45, 'minutes');
		const timestampReachGateFormatted = timestampReachGate.format('DD MMM, YYYY, hh:mma');
		const timestampReachGateSemantic = timestampReachGate.fromNow();

		return {
			departureTimestampSemantic,
			departureTimestampFormatted,
			arrivalTimestampSemantic,
			arrivalTimestampFormatted,

			timestampOnlineCheckInFormatted,
			timestampOnlineCheckInSemantic,
			timestampBookTaxiFormatted,
			timestampBookTaxiSemantic,
			timestampReachAirportFormatted,
			timestampReachAirportSemantic,
			timestampReachGateFormatted,
			timestampReachGateSemantic,
			...flight
		};
	});

	return { trip: tripRecord, flight: flightRecords };
};
