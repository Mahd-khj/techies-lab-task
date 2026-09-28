import { unstable_cache } from "next/cache";
import { Recipes } from "../type/index";
import axios from "axios";

export const API_URL = "https://dummyjson.com/recipes";

interface RecipesResponse {
    recipes: Recipes[];
    total: number;
    skip: number;
    limit: number;
}

// get all recipes
export const getRecipes = unstable_cache(
    async () => {
        const { data } = await axios.get<RecipesResponse>(API_URL, {
            params: { limit: 100 },
        });
        return data.recipes;
    },
    ["recipes"],
    { revalidate: 120 }
);

// get all categories for the recipes
export const getCategories = unstable_cache(
    async () => {
        const { data } = await axios.get<string[]>(`${API_URL}/tags`);
        return data;
    },
    ["recipe-tags"],
    { revalidate: 120 }
);

// get all recipes in a category
export const getCategoryRecipes = unstable_cache(
    async (categoryName: string) => {
        const { data } = await axios.get<RecipesResponse>(`${API_URL}/tag/${categoryName}`);
        return data.recipes;
    },
    ["recipes-by-tag"],
    { revalidate: 120 }
);

// get Recipe by id
export const getRecipesById = unstable_cache(
    async (id: string) => {
        const { data } = await axios.get<Recipes>(`${API_URL}/${id}`);
        return data;
    },
    ["recipe-by-id"],
    { revalidate: 120 }
);

// search recipes by query
export const searchRecipes = unstable_cache(
    async (query: string) => {
        const { data } = await axios.get<RecipesResponse>(`${API_URL}/search`, {
            params: { q: query },
        });
        return data.recipes;
    },
    ["recipes-search"],
    { revalidate: 120 }
);