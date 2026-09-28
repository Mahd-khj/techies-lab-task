"use client"
import { useFavorite } from "../contexts/recipesContext"
import { Recipes } from "../type/index"
import { useState } from "react"
import toast from "react-hot-toast";
import style from  "./card.module.css"

interface Props {
    item: Recipes
}

const Card = ({item}: Props) => {
    const { addToFavorite, removeFromFavorite , Favorite } = useFavorite();
    const isFavorite = Favorite.some(fav => fav.recipes.id === item.id)

    const [isOpen, setIsOpen] = useState(false);

    const handleFavoriteToggle = () => {
        try {
            if (isFavorite) {
                removeFromFavorite(item.id);
                toast.success("Removed from favorite!")
            } else {
                addToFavorite(item);
                toast.success("Added to favorite!")
            }
        } catch (error) {
            toast.error("Something went Wrong, please try again!")
        }
    };

    return(
        <div className={`${style.wrapper}`}>
            <div className={`${style.slider} ${isOpen ? style.sliderOpen : ''}`}>
                <div className={`${style.card} grid gap-0.5`} onClick={() => setIsOpen(true)}>
                    <h2>{item.name}</h2>
                    <p className="text-sm">{item.cuisine}</p>
                    <img src={item.image} alt={item.name} className="aspect-4/3 w-full rounded-xl object-cover"/>
                    <div className="text-sm">
                        <div className="lg:grid grid-cols-2 py-1">
                            <p>Prep: {item.cookTimeMinutes} min</p>
                            <p>Cook: {item.cookTimeMinutes} min</p>
                            <p>Servings: {item.servings}</p>
                            <p>Calories: {item.caloriesPerServing}</p>
                            <p>Difficulty: {item.difficulty}</p>
                            <p>Rating: {item.rating}</p>
                        </div>
                        <p className="flex gap-2 py-1">
                            Meal type:
                            {item.mealType.map((mealType) =>(
                                <span key={mealType} >
                                    {mealType}
                                </span>
                            ))}
                        </p>
                        <div className="flex flex-wrap gap-1 py-1">
                            {item.tags.map((tag) => (
                                <span key={tag} className="bg-black text-white border rounded-2xl p-1">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={`${style.card}`} onClick={() => setIsOpen(false)}>
                    <h2>{item.name}</h2>
                    <div className="py-1">
                        Ingredients: 
                        <ul className="list-disc list-inside text-sm">
                            {item.ingredients.map((ingredients) =>(
                                <li key={ingredients}>
                                    {ingredients}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="py-1">
                        Instructions:
                        <ol className="list-decimal list-inside text-sm">
                            {item.instructions.map((instruction, index) => (
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
                    onClick={handleFavoriteToggle}
                >
                    <img
                        src={isFavorite ? "/heart-svgrepo-com.svg" : "/heart-svgrepo-com(1).svg"}
                        alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    />
                </button>
                <p className="text-sm">
                    {isOpen ? "Click to go back to basic info" : "Click to see recipe"}
                </p>
            </div>
        </div>
    )
}

export default Card;