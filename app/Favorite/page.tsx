"use client"
import { useSearchParams } from "next/navigation";
import List from "../components/list";
import Favorites from "../components/favoriteCard"
import toast from "react-hot-toast";
import { useFavorite } from "../contexts/recipesContext";

export default function FavoritesPage() {
    const { Favorite } = useFavorite();
    const searchParams = useSearchParams();
    const search = searchParams.get("search")?.toLowerCase() ?? "";

    const filtered = search
    ? Favorite.filter(
            (fav) =>
                fav.recipes.name.toLowerCase().includes(search) ||
                fav.recipes.cuisine.toLowerCase().includes(search) ||
                fav.recipes.tags.some((tag) => tag.toLowerCase().includes(search))
        )
    : Favorite;

    return (
        <div className="px-4 py-8 sm:px-6">
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center gap-1 bg-[#FFA400] rounded-2xl border border-canvas-line py-16 text-center">
                    <p className="font-display text-xl">No favorites yet</p>
                    <p className="text-sm text-paper-dim">
                        Tap the heart on any recipe to save it here.
                    </p>
                    <button className="border p-1 rounded-xl">
                        <a href="/">Click here to see recipes</a>
                    </button>
                </div>
            ) : (
                <List>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((fav) => (
                            <Favorites key={fav.recipes.id} item={fav} />
                        ))}
                    </div>
                </List>
            )}
        </div>
    )
}