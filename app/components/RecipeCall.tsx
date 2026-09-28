import { getRecipes, getCategoryRecipes } from "../services/recipes.services";
import RecipeDisplay from "./recipeDisplay"

interface Props {
    category?: string;
    search?: string;
}

const RecipeCall = async ({ category, search}: Props) => {
    const baseList = category ? await getCategoryRecipes(category) : await getRecipes();

    const list = search
        ? baseList.filter((recipes) => {
            const query = search.toLocaleLowerCase();
            return (
                recipes.name.toLocaleLowerCase().includes(query) ||
                recipes.cuisine.toLocaleLowerCase().includes(query) ||
                recipes.tags.some((tag) => tag.toLocaleLowerCase().includes(query))
            );
        })
        : baseList;
    return<RecipeDisplay recipes={list}/>
}

export default RecipeCall;