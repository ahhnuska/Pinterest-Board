"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { createUser } from "./action";
import { ComboStaff } from "./comboStaff";


export default function RolesPage() {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <div className="w-[350px] flex flex-col gap-6 border-r border-slate-100 p-6 h-full bg-white">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
                    <PlusCircle size={20} />
                </div>
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">User Management</h1>
            </div>

            <Card className="border-none shadow-none bg-slate-50/50 rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500">New User</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        ref={formRef}
                        action={async (formData) => {
                            await createUser(formData);
                            formRef.current?.reset();
                        }}
                        className="flex flex-col gap-4"
                    >
                        <div className="grid gap-2">
                            <Label htmlFor="username" className="text-xs font-bold text-slate-400">User Name</Label>
                            <Input
                                id="username"
                                name="username"
                                placeholder="Enter full name"
                                required
                                className="bg-white border-none shadow-sm focus-visible:ring-indigo-400"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label className="text-xs font-bold text-slate-400">Assign Role:</Label>
                            <div className="flex flex-wrap gap-2">
                                <ComboStaff />
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 font-bold py-6 rounded-xl mt-2 transition-all active:scale-95 shadow-lg shadow-indigo-100">
                            Create User
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="mt-auto">
                <p className="text-[10px] text-slate-400 text-center font-medium">Design by Antigravity AI • 2026</p>
            </div>
        </div>
    );
}
