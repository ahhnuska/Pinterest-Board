"use client"

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"

interface User {
    id: number;
    username: string;
    imageUrl: string | null;
    role: "admin" | "staff" | "content" | null;
}

export function ComboboxBasic({ users }: { users: User[] }) {
    const usernames = users.map(u => u.username);

    return (
        <Combobox items={usernames}>
            <ComboboxInput placeholder="Select a user" />
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
    )
}
