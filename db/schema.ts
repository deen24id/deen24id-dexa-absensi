import {
  pgTable,
  text,
  timestamp,
  uuid,
  date,
  pgEnum,
  doublePrecision,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["ditunggu", "diterima", "hilang"]);

export const tickets = pgTable("tickets", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  username: text("username").notNull(),
  name: text("name").notNull(),
  sesiTanggal: date("sesi_tanggal").notNull(),
  status: statusEnum(),
  absenTW: timestamp("absen_t_w", { withTimezone: true }),
  lat: doublePrecision(),
  lng: doublePrecision(),
});
