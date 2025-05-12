ALTER TABLE "tickets_table" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('ditunggu', 'diterima', 'hilang');--> statement-breakpoint
ALTER TABLE "tickets_table" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";