import { db } from '$lib/drizzle/db';
import { stay, trip } from '$lib/drizzle/schema';
import { error, fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';
import { message } from 'sveltekit-superforms';
import { and, eq } from 'drizzle-orm';

const stayFormSchema = z
	.object({
		tripId: z.string().min(1, 'Trip ID is required'),
		type: z.string().default('hotel'),
		stayName: z.string().min(1, 'Stay name is required'),
		address: z.string().optional(),
		city: z.string().min(1, 'City is required'),
		country: z.string().min(1, 'Country is required'),
		checkIn: z.string().min(1, 'Check-in date is required'),
		checkOut: z.string().min(1, 'Check-out date is required'),
		cost: z.number().positive().optional()
	})
	.refine((data) => new Date(data.checkIn) <= new Date(data.checkOut), {
		path: ['checkOut'],
		error: 'Check-out date must be after check-in date!'
	});

export const load = async ({ params, locals }) => {
	if (!locals.user) {
		error(403, { message: 'Not authenticated!' });
	}

	const tripId = params.trip;
	const tripRows = await db
		.select()
		.from(trip)
		.where(and(eq(trip.id, tripId), eq(trip.userId, locals.user.id)));
	const tripRecord = tripRows[0];

	const form = await superValidate(zod4(stayFormSchema));

	return { form, tripId, trip: tripRecord };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(stayFormSchema));
		if (!locals.user) {
			return fail(403, { form });
		}

		if (!form.valid) {
			console.log('failed');
			console.log(form);
			return fail(400, { form });
		}

		/**
		 * Postgres.js infers numeric as typescript string, so cost needs to be converted to string to prevent TS compiler complaining.
		 * https://github.com/drizzle-team/drizzle-orm/issues/1042
		 */
		const insert = await db.insert(stay).values({
			userId: locals.user?.id,
			tripId: form.data.tripId,
			type: form.data.type,
			stayName: form.data.stayName,
			address: form.data.address,
			city: form.data.city,
			country: form.data.country,
			checkIn: form.data.checkIn,
			checkOut: form.data.checkOut,
			cost: form.data.cost
		});
		console.log(insert);

		return message(form, {
			status: 'success',
			text: 'Form posted successfully!'
		});
	}
} satisfies Actions;
