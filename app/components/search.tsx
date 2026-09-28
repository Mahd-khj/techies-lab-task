"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get("search") ?? "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);

        try {
            const params = new URLSearchParams(searchParams.toString());
            if (newValue) {
                params.set("search", newValue);
                params.delete("category");
            } else {
                params.delete("search");
            }
            router.push(`${pathname}?${params.toString()}`);
        } catch (error) {
            console.error("Search navigation failed", error);
        }
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Search recipes..."
            className="p-1 border rounded-full text-black w-28 text-sm sm:w-40 sm:text-base md:w-56"
        />
    );
};

export default SearchBar;