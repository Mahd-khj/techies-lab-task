"use client"

import { useEffect, useRef, useState } from "react";
import List from "./list";
import Card from "./recipeCard";
import { Recipes } from "../type/index";

interface Props{
    recipes: Recipes[]
}

const ITEMS_PER_PAGE = 8;

const RecipeDisplay = ({recipes}: Props) => {
    const [mode, setMode] = useState<"infante" | "pages">("infante");
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [currentPage, setCurrentPage] = useState(1);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    // reset when the underlying recipe list changes 
    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
        setCurrentPage(1)
    }, [recipes]);

    // infinite scroll: watch sentinel div load more when it comes into view
    useEffect(() => {
        if(mode !== "infante") return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, recipes.length));
                }
            },
            { threshold: 1 }
        );

        const el = sentinelRef.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.observe(el);
        };
    }, [mode, recipes.length]);

    const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);

    const visibleRecipes =
        mode === "infante"
        ? recipes.slice(0, visibleCount)
        : recipes.slice((currentPage -1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return(
        <div className="grid gap-4">
            <div className="relative grid grid-cols-2 w-56 rounded-full border bg-[#FFA400] p-1 self-end">
                <span
                    className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-black transition-transform duration-300"
                    style={{ transform: mode === "pages" ? "translateX(100%)" : "translateX(0)"}}
                />

                <button
                    onClick={() => setMode("infante")}
                    className={`relative z-10 py-1 text-center transition-colors duration-300 ${
                            mode === "infante" ? "text-white font-bold" : ""
                        }`}
                >
                    Infante
                </button>

                <button
                    onClick={() => setMode("pages")}
                    className={`relative z-10 py-1 text-center transition-colors duration-300 ${
                            mode === "pages" ? "text-white font-bold" : ""
                        }`}
                >
                    Pages
                </button>
            </div>
            <List>
                <div className="grid lg:grid-cols-4 grid-cols-2 gap-2">
                    {visibleRecipes.map((recipes) => (
                        <Card key={recipes.id} item={recipes} />
                    ))}
                </div>
            </List>

            {mode === "infante" && visibleCount < recipes.length && (
                <div ref={sentinelRef} className="h-10"/>
            )}

            {mode === "pages" && (
                <div className="flex justify-center items-center gap-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="border px-3 py-3 rounded-full disabled:hidden"
                    >
                        <img className="w-2.5" src="previous-svgrepo-com.svg" alt="previous" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i+1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`border px-3 py-1 rounded-full ${
                                currentPage === page ? "bg-[#FFA400] text-black" : ""}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="border px-3 py-3 rounded-full disabled:hidden"
                    >
                        <img className="w-2.5" src="next-svgrepo-com.svg" alt="next" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default RecipeDisplay;