"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/actions";
import { Product } from "./KanbanBoard";

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
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-600">${product.price}</p>
                        {product.creator && (
                            <div className="flex items-center gap-1.5 grayscale-[0.5] opacity-80">
                                {product.creator.image ? (
                                    <img
                                        src={product.creator.image}
                                        alt={product.creator.username || "User"}
                                        className="w-5 h-5 rounded-full object-cover border border-slate-200"
                                    />
                                ) : (
                                    <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                        {(product.creator.username || "?")[0].toUpperCase()}
                                    </div>
                                )}
                                <span className="text-[10px] font-medium text-slate-500">{product.creator.username || "Unknown"}</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
