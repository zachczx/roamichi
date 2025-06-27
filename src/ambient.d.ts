interface TripDB {
	id: string;
	userId: string;
	tripName: string;
	createdAt: string;
	updatedAt: string | null;
}

interface FlightDB {
	id: string;
	userId: string;
	tripId: string;
	airline: string;
	flightNumber: string;
	fromCity: string;
	fromCountry: string;
	fromAirport: string | null;
	toCity: string;
	toCountry: string;
	departureTimestamp: string;
	arrivalTimestamp: string;
	toAirport: string | null;
	cost: number | null;
	createdAt: string;
	updatedAt: string | null;
}

interface StayDB {
	id: string;
	userId: string;
	tripId: string;
	type: string;
	stayName: string;
	address: string | null;
	city: string;
	country: string;
	checkIn: Date;
	checkOut: Date;
	cost: number | null;
	createdAt: string;
	updatedAt: string | null;
}

interface PackDB {
	id: string;
	userId: string;
	tripId: string;
	item: string;
	done: boolean;
	remark: string | null;
	category: string | null;
	createdAt: string;
	updatedAt: string | null;
}

interface TripDBWithCounts extends TripDB {
	flightCount: number;
	stayCount: number;
	packedCount: number;
	packCount: number;
}

interface TripProps extends TripDB {
	createdAtFormatted: string;
	updatedAtFormatted?: string;
	createdAtSemantic: string;
	updatedAtSemantic?: string;
}

interface TripPropsExtra extends TripProps {
	flights: FlightDB[];

	flightCount: number;
	stayCount: number;
	packedCount: number;
	packCount: number;

	tripStartFormatted?: string;
	tripEndFormatted?: string;
	tripStartAndEndFormatted?: string;
	tripDuration?: number;
	tripStartInDays?: string;
}

interface FlightProps extends FlightDB {
	departureTimestampFormatted: string;
	arrivalTimestampFormatted: string;
	departureTimestampSemantic?: string;
	arrivalTimestampSemantic?: string;
	createdAtFormatted?: string;
	updatedAtFormatted?: string;
	createdAtSemantic?: string;
	updatedAtSemantic?: string;
}

interface FlightPropsCard extends FlightProps {
	timestampOnlineCheckInFormatted: string;
	timestampOnlineCheckInSemantic: string;
	timestampBookTaxiFormatted: string;
	timestampBookTaxiSemantic: string;
	timestampReachAirportFormatted: string;
	timestampReachAirportSemantic: string;
	timestampReachGateFormatted: string;
	timestampReachGateSemantic: string;
}

interface StayProps extends StayDB {
	checkInSemantic: string;
	checkOutSemantic: string;
	createdAtFormatted?: string;
	updatedAtFormatted?: string;
	createdAtSemantic?: string;
	updatedAtSemantic?: string;
	stayNightsCount?: string;
}

interface PackProps extends PackDB {
	createdAtFormatted?: string;
	updatedAtFormatted?: string;
	createdAtSemantic?: string;
	updatedAtSemantic?: string;
}

interface TripDBCounts extends TripDB {
	flightCount: number;
	stayCount: number;
	packCount: number;
}
