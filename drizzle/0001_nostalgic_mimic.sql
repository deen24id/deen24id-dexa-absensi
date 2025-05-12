CREATE TYPE "public"."status" AS ENUM('ditunggu', 'diterima', 'tidak ada');--> statement-breakpoint
CREATE TABLE "tickets_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"name" text NOT NULL,
	"sesi_tanggal" date NOT NULL,
	"status" "status",
	"absen_t_w" timestamp with time zone,
	"lat" double precision,
	"lng" double precision
);
--> statement-breakpoint
DROP TABLE "posts_table" CASCADE;--> statement-breakpoint
DROP TABLE "users_table" CASCADE;