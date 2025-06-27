import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './drizzle/db';
import { BETTER_AUTH_URL, RESEND_KEY } from '$env/static/private';
import { Resend } from 'resend';
import { magicLink } from 'better-auth/plugins';

const resend = new Resend(RESEND_KEY);

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
		cookiePrefix: 'roamichi'
	},
	plugins: [
		magicLink({
			sendMagicLink: async ({ email, token, url }, request) => {
				await resend.emails.send({
					from: 'Roamichi <no-reply@roamichi.com>',
					to: [email],
					subject: 'Login Link to Roamichi',
					html: `<h1>Your login request to Roamichi</h1><br><br>Hello!<br><br>Click the magic link below to log in.<br><br><a href="${url}">${url}</a>`
				});
			}
		})
	]
});
