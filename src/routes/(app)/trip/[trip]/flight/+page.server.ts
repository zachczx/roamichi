import { db } from '$lib/drizzle/db';
import { flight } from '$lib/drizzle/schema';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';
import { message } from 'sveltekit-superforms';

const flightFormSchema = z.object({
	tripId: z.string().min(1, 'Trip ID is required'),
	airline: z.string().min(1, 'Airline is required'),
	flightNumber: z.string().min(1, 'Flight is required'),
	fromCity: z.string().min(1, 'From city is required'),
	fromCountry: z.string().min(1, 'From country is required'),
	toCity: z.string().min(1, 'To city is required'),
	toCountry: z.string().min(1, 'To country is required'),
	airport: z.string().min(1, 'Airport is required')
});

export const load = async ({ params }) => {
	const form = await superValidate(zod4(flightFormSchema));
	console.log(params.trip);
	const tripId = params.trip;
	return { form, tripId };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(flightFormSchema));
		if (!locals.user) {
			return fail(403, { form });
		}
		if (!form.valid) {
			return fail(400, { form });
		}

		const insert = await db.insert(flight).values({
			userId: locals.user?.id,
			tripId: form.data.tripId,
			airline: form.data.airline,
			flightNumber: form.data.flightNumber,
			fromCity: form.data.fromCity,
			fromCountry: form.data.fromCountry,
			toCity: form.data.toCity,
			toCountry: form.data.toCountry,
			airport: form.data.airport
		});
		console.log(insert);
		return message(form, 'Form posted successfully!');
	}
} satisfies Actions;
