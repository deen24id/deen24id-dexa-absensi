/* eslint-disable no-console */
"use server";

import { drizzle } from "drizzle-orm/neon-http";
import { currentUser } from "@clerk/nextjs/server";
import { sql } from "drizzle-orm";

import { tickets } from "@/db/schema";

const db = drizzle(process.env.DATABASE_URL!);

const sesiTanggal = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Jakarta",
}).format(new Date());

type TUpdateTicket = {
  lat: number;
  lng: number;
};

export async function updateTicket(props: TUpdateTicket) {
  try {
    const user = await currentUser();

    const data = await db
      .update(tickets)
      .set({
        status: "diterima",
        lat: props.lat,
        lng: props.lng,
        absenTW: new Date(),
      })
      .where(
        sql`${tickets.username} = ${user?.username} and ${tickets.sesiTanggal} = ${sesiTanggal}`
      );

    console.log("TICKET UPDATED!");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
