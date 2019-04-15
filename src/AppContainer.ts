import { initialState } from "./store";
import { IStoreState, ICategories, IRecipes } from "./dataDefinitions";
import { connect } from "react-redux";
import App, { IAppProps } from "./App";
import { Dispatch } from "react";
import { ISetCategoryAction, IAction, setCategories, setRecipes } from "./Actions";

function mapStateToProps(state: IStoreState = initialState, ownProps: IAppProps) 
{
    console.log(state);
    const {recipeList, cartItems, categories} =  state  ;
    return  {recipeList, cartItems, categories};
}

function mapDispatchToProps(dispatch: Dispatch<IAction>, ownProps: IAppProps){
    return {
        setCategories: function(categories: ICategories[]) {
            dispatch(setCategories(categories));
        },
        setRecipes: function (recipes: IRecipes[]) {
            dispatch(setRecipes(recipes));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);