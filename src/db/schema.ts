import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    price: real("price").notNull(), // real is used for decimal/float numbers
    desc: text("desc"),

    // SQLite stores arrays as JSON strings
    // We'll type this as string[] in TS
    colors: text("colors", { mode: "json" }).$type<string[]>().default([]),

    imageUrl: text("image_url"),

    // Status with a union type constraint
    status: text("status").$type<"doing" | "done" | "backlog">().default("backlog"),

    notes: text("notes"),

    // Complex nested object stored as JSON
    inspo: text("inspo", { mode: "json" }).$type<{
        source: "insta" | "tiktok" | "own";
        platformLink?: string;
        compareLink?: string;
    }>(),
});