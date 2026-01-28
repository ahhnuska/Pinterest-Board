"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanCard } from "./KanbanCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Product {
    id: number;
    name: string;
    price: number;
    desc: string | null;
    colors: string[] | null;
    status: "backlog" | "doing" | "done" | null;
}

interface ColumnProps {
    id: string;
    title: string;
    products: Product[];
    bgColor: string;
}

export function KanbanColumn({ id, title, products, bgColor }: ColumnProps) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div className="flex flex-col h-full w-full min-w-[300px] bg-slate-50/50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full {bgColor}`} />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">{title}</h2>
                <span className="ml-auto text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {products.length}
                </span>
            </div>

            <ScrollArea className="flex-1 pr-2">
                <div ref={setNodeRef} className="min-h-[200px]">
                    <SortableContext items={products.map(p => p.id)} strategy={verticalListSortingStrategy}>
                        {products.map((product) => (
                            <KanbanCard key={product.id} product={product} />
                        ))}
                    </SortableContext>
                </div>
            </ScrollArea>
        </div>
    );
}
