"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/actions";

interface Product {
    id: number;
    name: string;
    price: number;
    desc: string | null;
    colors: string[] | null;
    status: "backlog" | "doing" | "done" | null;
}

export function KanbanCard({ product }: { product: Product }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: product.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const color = product.colors?.[0] || "#fecaca"; // default pastel red

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-4 touch-none">
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow" style={{ backgroundColor: color + "33" }}>
                <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                    <CardTitle className="text-sm font-semibold text-slate-700">{product.name}</CardTitle>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteProduct(product.id);
                        }}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                    >
                        <Trash2 size={14} />
                    </button>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p className="text-xs text-slate-500 line-clamp-2 mb-2">{product.desc}</p>
                    <p className="text-xs font-bold text-slate-600">${product.price}</p>
                </CardContent>
            </Card>
        </div>
    );
}
