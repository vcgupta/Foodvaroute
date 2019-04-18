import {IStoreState} from './dataDefinitions'
import { createStore } from 'redux';
import { IAction, ISetCategoryAction, ISetRecipesAction, IAddToCartAction, IRemoveFromCartAction } from './Actions';
import { SET_CATEGORIES, SET_RECIPES, ADD_TO_CART, REMOVE_FROM_CART } from './constants';


export const initialState: IStoreState = {
    categories: [],
    cartItems: {},
    recipeList: []
}

function rootReducer(state = initialState, action:IAction) {
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
    else if(action.type == REMOVE_FROM_CART){
        const removeFromCartAction = action as IRemoveFromCartAction
        const newCart = {
            ...state.cartItems
        };
        delete newCart[removeFromCartAction.recipeId];
        return {
            ...state,
            cartItems : newCart
        }
    }
    return state;
}
const store = createStore(rootReducer);
export default store;
