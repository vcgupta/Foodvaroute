import * as React from "react";
import { IRecipes, IStoreState } from "../dataDefinitions";
import { SET_RECIPES } from "../constants";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IAction, updateCart } from "../Actions";
import OrderButtons from "./OrderButtons";

export interface ICartItemProps {
    recipeId: string,
    recipe?: IRecipes,
    quantity: number,
}
class CartItem extends React.Component<ICartItemProps>{

    public static defaultProps = {
        quantity: 0,
    }
    constructor(props: any) {
        super(props);
    }

    render() {
        if (!this.props.recipe) return null;
        return <div className="cart-item">
            <div className="img-column">
                <img src={this.props.recipe.image} className="cart-image" />
                <span className="item-name">{this.props.recipe.name}</span>
            </div>
            <OrderButtons recipeId={this.props.recipeId} isCart={true} />

            <div className="order-calculation">
                {this.props.quantity * this.props.recipe.price}
            </div>
        </div>
    }

}


function mapStateToProps(state: IStoreState, ownProps: ICartItemProps) {
    const props: any = {};
    const item = state.recipeList.find(recipe => recipe.id === ownProps.recipeId);
    if (item) {
        props.recipe = item;
    }

    const itemCart = state.cartItems[ownProps.recipeId];
    if (itemCart) {
        props.quantity = itemCart.quantity;
    }

    return props;
}

function mapStateToDispatch(dispatch: Dispatch<IAction>, ownProps: ICartItemProps) {
    return {
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(CartItem);