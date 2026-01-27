"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getUser() {
    return await db.query.users.findMany();
}

export async function createUser(formData: FormData) {
    const name = formData.get("username") as string;
    const role = formData.get("role") as "admin" | "staff" | "content";

    await db.insert(users).values({
        username: name,
        role: role
    });

    revalidatePath("/");
}

export async function updateUser(id: number, role: "admin" | "staff" | "content") {
    await db.update(users).set({ role }).where(eq(users.id, id));
    revalidatePath("/");
}

export async function deleteUser(id: number) {
    await db.delete(users).where(eq(users.id, id));
    revalidatePath("/");
}
