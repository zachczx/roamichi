CREATE TABLE "gift" (
	"id" varchar(30) PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"trip_id" varchar NOT NULL,
	"item" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"remark" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "flight" ALTER COLUMN "departure_timestamp" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "flight" ALTER COLUMN "arrival_timestamp" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "pack" ADD COLUMN "category" text;--> statement-breakpoint
ALTER TABLE "gift" ADD CONSTRAINT "gift_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gift" ADD CONSTRAINT "gift_trip_id_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trip"("id") ON DELETE cascade ON UPDATE no action;