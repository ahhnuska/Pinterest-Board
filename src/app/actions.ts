"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getProducts() {
    return await db.query.products.findMany();
}

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const desc = formData.get("desc") as string;
    const color = formData.get("color") as string;

    await db.insert(products).values({
        name,
        price,
        desc,
        colors: [color],
        status: "backlog",
    });

    revalidatePath("/");
}

export async function updateProductStatus(id: number, status: "backlog" | "doing" | "done") {
    await db.update(products).set({ status }).where(eq(products.id, id));
    revalidatePath("/");
}

export async function deleteProduct(id: number) {
    await db.delete(products).where(eq(products.id, id));
    revalidatePath("/");
}
