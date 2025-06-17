import { pgTable, timestamp, varchar, text, boolean, date, decimal } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

export const trip = pgTable('trip', {
	id: varchar('id', { length: 30 })
		.primaryKey()
		.$defaultFn(() => nanoid(10)),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	tripName: text('trip_name').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
});

export const flight = pgTable('flight', {
	id: varchar('id', { length: 30 })
		.primaryKey()
		.$defaultFn(() => nanoid(10)),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	tripId: varchar('trip_id')
		.notNull()
		.references(() => trip.id, { onDelete: 'cascade' }),
	airline: text('airline').notNull(),
	flightNumber: text('flight_number').notNull(),
	fromCity: text('from_city').notNull(),
	fromCountry: text('from_country').notNull(),
	toCity: text('to_city').notNull(),
	toCountry: text('to_country').notNull(),
	airport: text('airport').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
});

export const stay = pgTable('stay', {
	id: varchar('id', { length: 30 })
		.primaryKey()
		.$defaultFn(() => nanoid(10)),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	tripId: varchar('trip_id')
		.notNull()
		.references(() => trip.id, { onDelete: 'cascade' }),
	type: text('type').notNull(),
	stayName: text('stay_name').notNull(),
	address: text('address'),
	city: text('city').notNull(),
	country: text('country').notNull(),
	checkIn: date('check_in').notNull(),
	checkOut: date('check_out').notNull(),
	cost: decimal('cost').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
});

export const pack = pgTable('pack', {
	id: varchar('id', { length: 30 })
		.primaryKey()
		.$defaultFn(() => nanoid(10)),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	tripId: varchar('trip_id')
		.notNull()
		.references(() => trip.id, { onDelete: 'cascade' }),
	item: text('item').notNull(),
	done: boolean('done').notNull().default(false),
	remark: text('remark'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
});

// Better Auth

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	isAnonymous: boolean('is_anonymous').default(false)
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' })
});

export const account = pgTable('account', {
	id: text('id').primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at')
});
