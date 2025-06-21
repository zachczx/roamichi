import { db } from '$lib/drizzle/db';
import { pack, trip } from '$lib/drizzle/schema';
import { error, fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';
import { message } from 'sveltekit-superforms';
import { and, eq } from 'drizzle-orm';

const packFormSchema = z.object({
	tripId: z.string(),
	item: z.string().min(1, 'Item name is required!'),
	done: z.boolean().default(false),
	remark: z.string().optional()
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

	const form = await superValidate(zod4(packFormSchema));

	return { form, tripId, trip: tripRecord };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(packFormSchema));
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
		const insert = await db.insert(pack).values({
			userId: locals.user?.id,
			tripId: form.data.tripId,
			item: form.data.item,
			done: form.data.done,
			remark: form.data.remark
		});
		console.log(insert);

		return message(form, {
			status: 'success',
			text: 'Form posted successfully!'
		});
	}
} satisfies Actions;
