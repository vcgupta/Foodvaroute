import {IStoreState} from './dataDefinitions'
import { createStore } from 'redux';
import { IAction, ISetCategoryAction, ISetRecipesAction, IAddToCartAction } from './Actions';
import { SET_CATEGORIES, SET_RECIPES, ADD_TO_CART } from './constants';


export const initialState: IStoreState = {
    categories: [],
    cartItems: {},
    recipeList: []
}

function rootReducer(state = initialState, action:IAction) {
    console.log(state, action);
    if(action.type === SET_CATEGORIES){
        const myAction = action as ISetCategoryAction
        return {
            ...state,
            categories: myAction.categories
        }
    }else if(action.type === SET_RECIPES){
        const recipeAction = action as ISetRecipesAction
        return {
            ...state,
            recipeList: recipeAction.recipes
        }
    }
    else if(action.type == ADD_TO_CART){
        const addToCartAction = action as IAddToCartAction
        return {
            ...state,
            cartItems : {
                ...state.cartItems,
                [addToCartAction.recipeId]: {
                    quantity: addToCartAction.quantity,
                    id: addToCartAction.recipeId
                }
            }
        }
    }
    return state;
}
const store = createStore(rootReducer);
export default store;
