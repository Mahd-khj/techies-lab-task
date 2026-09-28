"use client"
import { usePathname } from "next/navigation";
import Link from "next/link"
import SearchBar from "./search"
import { Suspense } from "react";

export default function Nav() {
    const pathname = usePathname();
    const navItem = [
        { name: "Recipes", href: "/"},
        { name: "Favorite", href: "/Favorite"}
    ]

    return(
        <header className="fixed top-0 left-0 right-0 z-50 border h-15 p-3 flex items-center gap-2 bg-white">
            <div className="shrink-0">
                <img className="w-8 sm:w-10" src="food-svgrepo-com.svg" alt="food" />
            </div>

            <nav className="flex gap-2 sm:gap-4 mx-auto md:absolute md:left-1/2 md:-translate-x-1/2">
                <Link
                    href="/"
                    className={`h-8 flex justify-center items-center rounded-xl px-2 text-sm sm:text-base ${
                        pathname === "/"
                        ? "bg-black text-white border-t-4 border-l-4"
                        : "hover:bg-blue-500 text-black bg-[#FFA400] hover:text-white border-b-4 border-r-4"
                        }`}
                >
                    Home
                </Link>
                <Link
                    href="/Favorite"
                    className={`h-8 flex justify-center items-center rounded-xl px-2 text-sm sm:text-base ${
                        pathname === "/Favorite"
                        ? "bg-black text-white border-t-4 border-l-4"
                        : "hover:bg-blue-500 text-black bg-[#FFA400] hover:text-white  border-b-4 border-r-4"
                        }`}
                >
                    Favorite
                </Link>
            </nav>

            <div className="ml-auto min-w-0">
                <Suspense>
                    <SearchBar />
                </Suspense>
            </div>
        </header>
    )
}