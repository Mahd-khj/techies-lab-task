"use client"

import { useFavorite } from "../contexts/recipesContext";
import { Favorite } from "../type/index";
import { useState } from "react"
import style from "./card.module.css"
import toast from "react-hot-toast";

interface Props {
    item: Favorite;
}

export default function Favorites({item}: Props) {
    const { removeFromFavorite } = useFavorite();

    const handleRemoveFromFavorite = () => {
        try{
            removeFromFavorite(item.recipes.id)
            toast.success("Removed from favorites!")
        } catch (error) {
            toast.error("could not remove from favorites!")
        }
    }
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className={`${style.wrapper}`}>
            <div className={`${style.slider} ${isOpen ? style.sliderOpen : ''}`}>
                <div className={`${style.card} grid gap-0.5`} onClick={() => setIsOpen(true)}>
                    <h2>{item.recipes.name}</h2>
                    <p className="text-sm">{item.recipes.cuisine}</p>
                    <img src={item.recipes.image} alt={item.recipes.name} className="aspect-4/3 w-full rounded-xl object-cover"/>
                    <div className="text-sm">
                        <div className="grid grid-cols-2 py-1">
                            <p>Prep: {item.recipes.cookTimeMinutes} min</p>
                            <p>Cook: {item.recipes.cookTimeMinutes} min</p>
                            <p>Servings: {item.recipes.servings}</p>
                            <p>Calories: {item.recipes.caloriesPerServing}</p>
                            <p>Difficulty: {item.recipes.difficulty}</p>
                            <p>Rating: {item.recipes.rating}</p>
                        </div>
                        <p className="flex gap-2 py-1">
                            Meal type:
                            {item.recipes.mealType.map((mealType) =>(
                                <span key={mealType} >
                                    {mealType}
                                </span>
                            ))}
                        </p>
                        <div className="flex flex-wrap gap-1 py-1">
                            {item.recipes.tags.map((tag) => (
                                <span key={tag} className="border rounded-2xl p-1 ">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={`${style.card}`} onClick={() => setIsOpen(false)}>
                    <h2>{item.recipes.name}</h2>
                    <div className="py-1">
                        Ingredients: 
                        <ul className="list-disc list-inside text-sm">
                            {item.recipes.ingredients.map((ingredients) =>(
                                <li key={ingredients}>
                                    {ingredients}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="py-1">
                        Instructions:
                        <ol className="list-decimal list-inside text-sm">
                            {item.recipes.instructions.map((instruction, index) => (
                                <li key={index}>
                                    {instruction}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                
            </div>
            <div className="flex items-center gap-2 px-2 pb-2">
                <button
                    className="w-10 shrink-0"
                    onClick={handleRemoveFromFavorite}
                >
                    <img src="/heart-svgrepo-com.svg" alt="Remove from favorites" />
                </button>
                <p className="text-sm">
                    {isOpen ? "Click to go back to basic info" : "Click to see recipe"}
                </p>
            </div>
        </div>
    )
}