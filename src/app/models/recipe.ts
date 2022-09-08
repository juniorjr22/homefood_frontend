import { Ingredient } from "./ingredient";
import { RecipeIngredient } from "./recipeIngredient";

export interface Recipe {
    id: number;
    name: String;
    preparationTime: String;
    preparationMode: String;
    ingredients: RecipeIngredient[];
}