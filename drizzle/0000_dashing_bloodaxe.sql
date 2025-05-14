CREATE TYPE "public"."statusEnum" AS ENUM('ditunggu', 'diterima', 'hilang');--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"name" text NOT NULL,
	"sesi_tanggal" date NOT NULL,
	"status" "statusEnum",
	"absen_t_w" timestamp with time zone,
	"lat" double precision,
	"lng" double precision,
	"image_kit_id" text,
	"image_kit_url" text
);
