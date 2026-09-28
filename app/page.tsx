import { Suspense } from "react";
import RecipeCall from "./components/RecipeCall"
import LoadingCircleSpinner from "./components/loading"
import CategoryView from "./components/categories"

export default async function HomePage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; search?: string }>;
}) {
    const { category, search } = await searchParams;

    return (
        <div className="flex flex-col gap-8 px-4 py-8 sm:px-6 md:flex-row">
            <aside className="shrink-0 md:w-48">
                {/* small screens: foldable */}
                <details className="md:hidden border rounded-xl">
                    <summary className="cursor-pointer px-3 py-1">Categories</summary>
                    <div className="max-h-64 overflow-y-auto p-2">
                        <Suspense fallback={<LoadingCircleSpinner />}>
                            <CategoryView selected={category} />
                        </Suspense>
                    </div>
                </details>

                {/* md and up: always visible */}
                <div className="hidden md:block">
                    <Suspense fallback={<LoadingCircleSpinner />}>
                        <CategoryView selected={category} />
                    </Suspense>
                </div>
            </aside>
            <section className="flex-1">
                <Suspense fallback={<LoadingCircleSpinner />}>
                    <RecipeCall category={category} search={search} />
                </Suspense>
            </section>
        </div>
    );
}