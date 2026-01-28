"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getUsers() {
    return await db.query.user.findMany();
}

export async function createUser(formData: FormData) {
    const name = formData.get("username") as string;
    const role = formData.get("role") as "admin" | "staff" | "content";

    await db.insert(user).values({
        id: crypto.randomUUID(),
        name: name,
        username: name,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`, // Fallback email
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: role
    });

    revalidatePath("/");
}

export async function updateUser(id: string, role: "admin" | "staff" | "content") {
    await db.update(user).set({ role }).where(eq(user.id, id));
    revalidatePath("/");
}

export async function deleteUser(id: string) {
    await db.delete(user).where(eq(user.id, id));
    revalidatePath("/");
}
