import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema"

const client = createClient({
    // Use a local file path
    url: "file:local.db",
});

export const db = drizzle(client, { schema });