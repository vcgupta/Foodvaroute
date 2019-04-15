import React from "react";
import { IRecipes, IStoreState } from "../dataDefinitions";
import { IAction } from "../Actions";
import { connect } from "react-redux";

export interface IFilteredItems {
    recipeList?: IRecipes[],
    filteredCategoryId?: string
}
export class FilteredItems extends React.Component<IFilteredItems>{

    render() {
        if (this.props.recipeList && this.props.recipeList.length > 0) {
            const filteredItems = this.props.recipeList!//.filter(recipe => recipe.isFavourite)
                .map(recipe => {
                    //return <FavoriteItem recipe={recipe} />
                    return this.filteredItemRenderer(recipe);
                });

            return <div className="filtered-Data">

                <div className="filter-items"> {filteredItems} </div>

            </div>
        } else {
            return <div className="filtered-Data is-empty" >No</div>
        }
    }


    filteredItemRenderer(recipe: IRecipes) {
        return (<div className="filter-item" key={recipe.name}>
            <div className="filter-img">
                <img src={recipe.image} alt={recipe.name} />
            </div>
            <div className="filter-shortdetails">
                <div className="name-price">
                    <div className="name">{recipe.name}</div>
                    <div className="price">{recipe.price}</div>
                </div>
                <div className="order-button">
                    <button className="btn order">ADD TO BAG</button>
                </div>
            </div>
        </div>);
    }
}



function mapStateToProps(state: IStoreState, ownProps: IFilteredItems) {
    const props: any = {};
    if (ownProps.filteredCategoryId) {
        const categoryName = state.categories.filter(c => c.id == ownProps.filteredCategoryId)[0].name;
        props.recipeList = state.recipeList.filter(recipe => recipe.category == categoryName);
    }
    return props;
}

function mapStateToDispatch(dispatch: React.Dispatch<IAction>, ownProps: IFilteredItems) {
    return {

    }
}

export default connect(mapStateToProps, mapStateToDispatch)(FilteredItems);