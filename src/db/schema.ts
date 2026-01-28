import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const user = sqliteTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
    image: text("image"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
    username: text("username"),
    role: text("role").$type<"admin" | "staff" | "content">().default("staff"),
});

export const session = sqliteTable("session", {
    id: text("id").primaryKey(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id").notNull().references(() => user.id),
});

export const account = sqliteTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id").notNull().references(() => user.id),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
    refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
    scope: text("scope"),
    password: text("password"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }),
    updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const products = sqliteTable("products", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    price: real("price").notNull(),
    desc: text("desc"),
    colors: text("colors", { mode: "json" }).$type<string[]>().default([]),
    imageUrl: text("image_url"),
    status: text("status").$type<"doing" | "done" | "backlog">().default("backlog"),
    notes: text("notes"),
    createdBy: text("created_by").references(() => user.id),
    inspo: text("inspo", { mode: "json" }).$type<{
        source: "insta" | "tiktok" | "own";
        platformLink?: string;
        compareLink?: string;
    }>(),
});

export const productsRelations = relations(products, ({ one }) => ({
    creator: one(user, {
        fields: [products.createdBy],
        references: [user.id],
    }),
}));

export const usersRelations = relations(user, ({ many }) => ({
    products: many(products),
}));