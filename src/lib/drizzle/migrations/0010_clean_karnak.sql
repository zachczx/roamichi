CREATE TABLE "activity" (
	"id" varchar(30) PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"trip_id" varchar NOT NULL,
	"name" text NOT NULL,
	"location" text,
	"cost" real,
	"done" boolean DEFAULT false NOT NULL,
	"remark" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "activity" ADD CONSTRAINT "activity_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity" ADD CONSTRAINT "activity_trip_id_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trip"("id") ON DELETE cascade ON UPDATE no action;