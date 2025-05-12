import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@heroui/button";
import { SignOutButton } from "@clerk/nextjs";
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";

import { title, subtitle } from "@/components/primitives";
import { Form } from "@/components/form";
import { tickets } from "@/db/schema";

const session = new Date().toISOString().substring(0, 10);
const db = drizzle(process.env.DATABASE_URL!);

export default async function Home() {
  const user = await currentUser();
  const ticket = (
    await db
      .select({ status: tickets.status })
      .from(tickets)
      .where(
        sql`${tickets.username} = ${user?.username} and ${tickets.sesiTanggal} = ${session}`
      )
  )[0];

  return (
    <section className="flex flex-col md:flex-row items-center gap-8 md:gap-0 py-4 md:py-6 h-[100%]">
      <div className="flex flex-col w-full md:w-[50%] text-center justify-center md:h-[100%] md:gap-2">
        <span className={title({ size: "sm" })}>
          Hai{" "}
          <span className={title({ color: "violet", size: "sm" })}>
            {user?.username}
          </span>
        </span>
        <span className={title({ color: "violet", size: "sm" })}>
          {user?.fullName}
        </span>
        <span className={subtitle()}>Lakukan absensi kamu</span>
        <div className="flex flex-row justify-center gap-4">
          <span>Sesi: {session}</span>
          <span>
            Status:{" "}
            <span
              className={
                ticket.status === "ditunggu" ? "text-warning" : "text-success"
              }
            >
              {ticket.status}
            </span>
          </span>
        </div>
        <div>
          <SignOutButton>
            <Button
              disableRipple
              className="mt-4"
              color="danger"
              variant="shadow"
            >
              Keluar
            </Button>
          </SignOutButton>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-[50%] text-center justify-center md:h-[100%]">
        <Form status={ticket.status} />
      </div>
    </section>
  );
}
