import { db } from '$lib/drizzle/db';
import { trip } from '$lib/drizzle/schema';
import { error, fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';
import { message } from 'sveltekit-superforms';

const tripFormSchema = z.object({
	tripName: z.string()
});

export const load = async () => {
	const form = await superValidate(zod4(tripFormSchema));
	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
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
