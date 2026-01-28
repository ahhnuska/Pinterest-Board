"use client";

import { useRef } from "react";
import { createProduct } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, LogOut } from "lucide-react";
import { ComboboxBasic, type User } from "../ui/combo";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const PASTEL_COLORS = [
    "#fecaca", // red
    "#fed7aa", // orange
    "#fef08a", // yellow
    "#bbf7d0", // green
    "#bfdbfe", // blue
    "#ddd6fe", // purple
    "#fbcfe8", // pink
];

export function ProductSidebar({ users }: { users: User[] }) {
    const formRef = useRef<HTMLFormElement>(null);
    const { data: session } = authClient.useSession() as { data: { user: { role?: string; name: string; email: string; image?: string | null } } | null };
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut();
        router.refresh(); // Refresh to trigger the redirect in layout/page
    };

    return (
        <div className="w-[350px] flex flex-col gap-6 border-r border-slate-100 p-6 h-full bg-white">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
                    <PlusCircle size={20} />
                </div>
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">Product Lab</h1>
            </div>

            {session?.user.role === "admin" ? (
                <Card className="border-none shadow-none bg-slate-50/50 rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500">New Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            ref={formRef}
                            action={async (formData) => {
                                await createProduct(formData);
                                formRef.current?.reset();
                            }}
                            className="flex flex-col gap-4"
                        >
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-xs font-bold text-slate-400">Product Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Air Max 270..."
                                    required
                                    className="bg-white border-none shadow-sm focus-visible:ring-indigo-400"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="price" className="text-xs font-bold text-slate-400">Price (NPR)</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    placeholder="129.99"
                                    required
                                    className="bg-white border-none shadow-sm focus-visible:ring-indigo-400"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="desc" className="text-xs font-bold text-slate-400">Description</Label>
                                <Textarea
                                    id="desc"
                                    name="desc"
                                    placeholder="Breathable mesh upper..."
                                    className="bg-white border-none shadow-sm focus-visible:ring-indigo-400 resize-none h-24"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-xs font-bold text-slate-400">Card Color</Label>
                                <div className="flex flex-wrap gap-2">
                                    {PASTEL_COLORS.map((color) => (
                                        <label key={color} className="relative cursor-pointer">
                                            <input
                                                type="radio"
                                                name="color"
                                                value={color}
                                                className="peer sr-only"
                                                defaultChecked={color === PASTEL_COLORS[0]}
                                            />
                                            <div
                                                className="w-6 h-6 rounded-full border-2 border-transparent peer-checked:border-slate-400 transition-all"
                                                style={{ backgroundColor: color }}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-xs font-bold text-slate-400">Assigned to:</Label>
                                <div className="flex flex-wrap gap-2">
                                    <ComboboxBasic users={users} name="createdBy" />
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 font-bold py-6 rounded-xl mt-2 transition-all active:scale-95 shadow-lg shadow-indigo-100">
                                Add to Backlog
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            ) : (
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-xs text-slate-400 text-center font-medium">
                        Only admins can create new products.
                        Contact your admin for assistance.
                    </p>
                </div>
            )}

            <div className="mt-auto space-y-4">
                {session?.user && (
                    <div className="flex items-center gap-3 p-2 rounded-2xl bg-slate-50/50 border border-slate-50 transition-colors group">
                        <img
                            src={session.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.name}`}
                            alt={session.user.name || "User"}
                            className="w-10 h-10 rounded-xl bg-slate-200 object-cover shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-800 truncate">{session.user.name}</p>
                            <p className="text-xs text-slate-400 truncate font-medium">{session.user.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all active:scale-90"
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                )}
                <p className="text-[10px] text-slate-400 text-center font-medium">Design by Antigravity AI • 2026</p>
            </div>
        </div>
    );
}
