"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getSession() {
    return await auth.api.getSession({
        headers: await headers(),
    });
}

export async function getProducts() {
    return await db.query.products.findMany({
        with: {
            creator: true
        }
    });
}

export async function createProduct(formData: FormData) {
    const session = await getSession();
    if (!session || (session.user.role !== "admin")) {
        throw new Error("Unauthorized: Only admins can create products");
    }

    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const desc = formData.get("desc") as string;
    const color = formData.get("color") as string;
    const createdByStr = formData.get("createdBy") as string;
    const createdBy = createdByStr || null;

    await db.insert(products).values({
        name,
        price,
        desc,
        colors: [color],
        status: "backlog",
        createdBy,
    });

    revalidatePath("/");
}

export async function updateProductStatus(id: number, status: "backlog" | "doing" | "done") {
    const session = await getSession();
    if (!session || (session.user.role !== "admin" && session.user.role !== "staff")) {
        throw new Error("Unauthorized: You don't have permission to update status");
    }

    await db.update(products).set({ status }).where(eq(products.id, id));
    revalidatePath("/");
}

export async function deleteProduct(id: number) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        throw new Error("Unauthorized: Only admins can delete products");
    }

    await db.delete(products).where(eq(products.id, id));
    revalidatePath("/");
}
