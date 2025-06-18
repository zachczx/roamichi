ALTER TABLE "flight" ADD COLUMN "from_airport" text NOT NULL;--> statement-breakpoint
ALTER TABLE "flight" ADD COLUMN "to_airport" text NOT NULL;--> statement-breakpoint
ALTER TABLE "flight" DROP COLUMN "airport";