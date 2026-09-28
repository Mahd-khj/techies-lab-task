"use client"

import React, { createContext, useContext, useState } from 'react';
import { Favorite, Recipes } from '../type/index';

interface CartContextValue {
    Favorite: Favorite[]
    addToFavorite: (recipe: Recipes) => void;
    removeFromFavorite: (recipesId: number) => void;
}

const FavoriteContext = createContext<CartContextValue>({
    Favorite: [],
    addToFavorite: () => {},
    removeFromFavorite: () => {},
});

interface Props {
    children: React.ReactNode;
}

export const RecipesProvider = ({ children }: Props) => {
    const [Favorite, setFavorite] = useState<Favorite[]>([]);

    const addToFavorite = (Recipes: Recipes) => {
        const existingFavoriteIndex = Favorite.findIndex(
            (item) => item.recipes.id === Recipes.id
        );
        if (existingFavoriteIndex !== -1) return;
        else {
            setFavorite([...Favorite, { recipes: Recipes }])
        }
    };

    const removeFromFavorite = (recipesId: number) => {
        const updateFavorite = Favorite.filter(
            (item) => item.recipes.id !== recipesId
        );
        setFavorite(updateFavorite);
    };

    return(
        <FavoriteContext.Provider
            value={{
                Favorite,
                addToFavorite,
                removeFromFavorite,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorite = () => {
    if (FavoriteContext === undefined) {
        throw new Error(`useFavorite must be used within a FavoriteProvider`)
    }
    return useContext(FavoriteContext)
}