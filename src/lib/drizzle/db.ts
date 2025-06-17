import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { DB_USER, DB_HOST, DB_PASSWORD, DB_PORT, DB_NAME } from '$env/static/private';

const connectionString = `postgresql://${DB_USER as string}:${DB_PASSWORD as string}@${DB_HOST as string}:${Number(DB_PORT)}/${DB_NAME as string}`;

const client = postgres(connectionString);

export const db = drizzle(client, { schema });
