import { pgTable, uuid, text, date, timestamp, doublePrecision, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const status = pgEnum("status", ['ditunggu', 'diterima', 'hilang'])


export const tickets = pgTable("tickets", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	username: text().notNull(),
	name: text().notNull(),
	sesiTanggal: date("sesi_tanggal").notNull(),
	status: status(),
	absenTW: timestamp("absen_t_w", { withTimezone: true, mode: 'string' }),
	lat: doublePrecision(),
	lng: doublePrecision(),
	imageKitId: text("image_kit_id"),
	imageKitUrl: text("image_kit_url"),
});
