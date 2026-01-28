"use client"

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import { useState } from "react";

export interface User {
    id: string;
    username: string | null;
    image: string | null;
    role: "admin" | "staff" | "content" | null;
}

export function ComboboxBasic({ users, name }: { users: User[], name?: string }) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const displayNames = users.map(u => u.username || "Unknown User");

    return (
        <div className="w-full">
            {name && <input type="hidden" name={name} value={selectedId ?? ""} />}
            <Combobox
                items={displayNames}
                onValueChange={(val) => {
                    const user = users.find(u => (u.username || "Unknown User") === val);
                    setSelectedId(user?.id ?? null);
                }}
            >
                <ComboboxInput placeholder="Select a user" className="w-full bg-white border-none shadow-sm focus-visible:ring-indigo-400" />
                <ComboboxContent>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                        {(item) => (
                            <ComboboxItem key={item} value={item}>
                                {item}
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </div>
    )
}
