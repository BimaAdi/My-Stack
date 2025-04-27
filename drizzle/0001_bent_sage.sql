CREATE TABLE "todo" (
	"id" uuid PRIMARY KEY NOT NULL,
	"todo" text NOT NULL,
	"is_done" boolean DEFAULT false,
	"created_at" timestamp,
	"updated_at" timestamp,
	"user_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "todo" ADD CONSTRAINT "todo_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;