/* eslint-disable no-console */
// This script create a new upon execution

import "@/envConfig";
import { drizzle } from "drizzle-orm/neon-http";
import chalk from "chalk";

import { tickets } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);
const users = [
  {
    username: "testuser1",
    name: "John Doe",
  },
  {
    username: "testuser2",
    name: "Noa Lowery",
  },
  {
    username: "testuser3",
    name: "Jaxxon Hart",
  },
  {
    username: "testuser4",
    name: "Gemma Griffin",
  },
  {
    username: "testuser5",
    name: "Ayden Patel",
  },
  {
    username: "testuser6",
    name: "Madeline Mejia",
  },
  {
    username: "testuser7",
    name: "Atticus Perkins",
  },
  {
    username: "testuser8",
    name: "Sage Peralta",
  },
  {
    username: "testuser9",
    name: "Dangelo Frazier",
  },
  {
    username: "testuser10",
    name: "Octavia Sanford",
  },
];

async function main() {
  try {
    const ticketEntry: typeof tickets.$inferInsert = {
      name: users[9].name,
      username: users[9].username,
      sesiTanggal: new Date().toISOString().substring(0, 10),
      status: "ditunggu",
    };

    const data = await db.insert(tickets).values(ticketEntry);

    console.log(chalk.bgGreenBright("NEW TICKET CREATED!"), "\n");
    console.log(ticketEntry, "\n");
    console.log(data);
  } catch (err) {
    console.log(chalk.bgRedBright(err));
  }
}

main();
