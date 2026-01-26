"use client";

import { useState, useEffect } from "react";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    DragOverEvent,
    defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";
import { updateProductStatus } from "@/app/actions";

interface Product {
    id: number;
    name: string;
    price: number;
    desc: string | null;
    colors: string[] | null;
    status: "backlog" | "doing" | "done" | null;
}

const COLUMNS = [
    { id: "backlog", title: "Backlog", bgColor: "bg-blue-300" },
    { id: "doing", title: "Doing", bgColor: "bg-amber-300" },
    { id: "done", title: "Done", bgColor: "bg-emerald-300" },
];

export function KanbanBoard({ initialProducts }: { initialProducts: Product[] }) {
    const [products, setProducts] = useState(initialProducts);
    const [activeProduct, setActiveProduct] = useState<Product | null>(null);
    const [originalStatus, setOriginalStatus] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setProducts(initialProducts);
    }, [initialProducts]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    if (!mounted) return null;

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const product = products.find((p) => p.id === active.id);
        if (product) {
            setActiveProduct(product);
            setOriginalStatus(product.status);
        }
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const activeProd = products.find((p) => p.id === activeId);
        if (!activeProd) return;

        // Check if dragging over a column
        const overColumn = COLUMNS.find(col => col.id === overId);
        if (overColumn) {
            if (activeProd.status !== overId) {
                setProducts(prev => prev.map(p => p.id === activeId ? { ...p, status: overId as any } : p));
            }
        } else {
            // Check if dragging over another card
            const overProd = products.find(p => p.id === overId);
            if (overProd && activeProd.status !== overProd.status) {
                setProducts(prev => prev.map(p => p.id === activeId ? { ...p, status: overProd.status } : p));
            }
        }
    }

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over || !activeProduct) {
            setActiveProduct(null);
            setOriginalStatus(null);
            return;
        }

        const activeId = active.id;
        const currentProduct = products.find(p => p.id === activeId);

        if (currentProduct && currentProduct.status !== originalStatus) {
            await updateProductStatus(activeId as number, currentProduct.status as any);
        }

        setActiveProduct(null);
        setOriginalStatus(null);
    }

    return (
        <DndContext
            id="kanban-board"
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex gap-6 h-full overflow-x-auto pb-4">
                {COLUMNS.map((col) => (
                    <KanbanColumn
                        key={col.id}
                        id={col.id}
                        title={col.title}
                        bgColor={col.bgColor}
                        products={products.filter((p) => p.status === col.id)}
                    />
                ))}
            </div>

            <DragOverlay dropAnimation={{
                sideEffects: defaultDropAnimationSideEffects({
                    styles: {
                        active: {
                            opacity: "0.5",
                        },
                    },
                }),
            }}>
                {activeProduct ? <KanbanCard product={activeProduct} /> : null}
            </DragOverlay>
        </DndContext>
    );
}
