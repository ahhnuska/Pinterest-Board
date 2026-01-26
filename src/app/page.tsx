import { db } from "@/db";
import { ProductSidebar } from "@/components/kanban/ProductSidebar";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";

export default async function Home() {
  const products = await db.query.products.findMany();

  // Ensuring types match expectations (converting colors if needed, though schema says it's mode: json string[])
  const typedProducts = products.map(p => ({
    ...p,
    status: (p.status || "backlog") as "backlog" | "doing" | "done"
  }));

  return (
    <main className="flex h-screen w-full bg-[#fcfcfd] overflow-hidden font-sans">
      <ProductSidebar />
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
