"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getAdminSession() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session || session.user.role !== "admin") {
        throw new Error("Unauthorized: Only admins can manage users and roles");
    }
    return session;
}

export async function getUsers() {
    await getAdminSession();
    return await db.query.user.findMany();
}

export async function createUser(formData: FormData) {
    await getAdminSession();

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
    await getAdminSession();

    await db.update(user).set({ role }).where(eq(user.id, id));
    revalidatePath("/");
}

export async function deleteUser(id: string) {
    await getAdminSession();

    await db.delete(user).where(eq(user.id, id));
    revalidatePath("/");
}
