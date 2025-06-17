import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/drizzle/schema.ts',
	out: './src/lib/drizzle/migrations',
	dbCredentials: {
		host: process.env.DB_HOST as string,
		port: Number(process.env.DB_PORT),
		user: process.env.DB_USER as string,
		password: process.env.DB_PASSWORD as string,
		database: process.env.DB_NAME as string,
		ssl: false
	}
});
