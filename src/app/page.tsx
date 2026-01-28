import { db } from "@/db";
import { ProductSidebar } from "@/components/kanban/ProductSidebar";
import { KanbanBoard, Product } from "@/components/kanban/KanbanBoard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const products = await db.query.products.findMany({
    with: {
      creator: true
    }
  });
  const users = await db.query.user.findMany();

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect("/home"); // Redirecting to roles for now as there's no login page yet
  }

  // Ensuring types match expectations
  const typedProducts: Product[] = products.map(p => ({
    ...p,
    status: (p.status || "backlog") as "backlog" | "doing" | "done"
  }));

  return (
    <main className="flex h-screen w-full bg-[#fcfcfd] overflow-hidden font-sans">
      <ProductSidebar users={users} />
      <div className="flex-1 p-8 overflow-hidden flex flex-col">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Workflow</h2>
            <p className="text-sm text-slate-400 font-medium">Manage your product pipeline visually</p>
          </div>
          <div className="flex gap-4">
            {/* Add filters if needed */}
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <KanbanBoard initialProducts={typedProducts} />
        </div>
      </div>
    </main>
  );
}
