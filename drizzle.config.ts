import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dialect: "sqlite", // Works for both standard sqlite and libsql
    dbCredentials: {
        url: "file:local.db",
    },
});