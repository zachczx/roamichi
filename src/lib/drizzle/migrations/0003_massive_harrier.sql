ALTER TABLE "trip" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "trip" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "trip" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;