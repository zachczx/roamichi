import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './drizzle/db';
import { BETTER_AUTH_URL } from '$env/static/private';

export const auth = betterAuth({
	baseURL: BETTER_AUTH_URL,
	database: drizzleAdapter(db, {
		provider: 'pg'
	}),
	emailAndPassword: {
		enabled: true
		// requireEmailVerification: false
	},
	advanced: {
		cookiePrefix: 'towelie'
	}
});
