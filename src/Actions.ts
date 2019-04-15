import { IRecipes, ICategories } from "./dataDefinitions";
import { SET_CATEGORIES, SET_RECIPES, ADD_TO_CART } from "./constants";

export interface ISetCategoryAction {
    categories: ICategories[],
    type: string
}
export interface ISetRecipesAction {
    recipes: IRecipes[],
    type: string
}
export interface IAddToCartAction {
    recipeId: string,
    quantity: number,
    type: string
}

export type IAction = ISetCategoryAction | ISetRecipesAction | IAddToCartAction;

export function setCategories(categories: ICategories[]): ISetCategoryAction {
    return {
        categories,
        type: SET_CATEGORIES
    }
}
export function setRecipes(recipes: IRecipes[]): ISetRecipesAction {
    return {
        recipes,
        type: SET_RECIPES
    }
}
export function updateCart(recipeId: string, quantity: number): IAddToCartAction {
    return {
        recipeId,
         quantity,
        type: ADD_TO_CART
    }
}

