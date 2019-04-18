import React from "react";
import { connect } from "react-redux";
import { IStoreState } from "../dataDefinitions";
import { Dispatch } from "redux";
import { IAction, updateCart, removeFromCart } from "../Actions";

export interface IOrderButtonsProps {
    isFavourite: boolean,
    recipeId: string,
    quantity: number,
    isCart: boolean,
    increase: (curQuantity: number) => void,
    decrease: (curQuantity: number) => void,
    removeCartItem: () => void
}

class OrderButons extends React.Component<IOrderButtonsProps> {
    public static defaultProps = {
        quantity: 0,
        isFavourite: false,
        isCart: false,

        increase: (curQuantity: number) => { },
        decrease: (curQuantity: number) => { },
        removeCartItem: () => { }
    }
    constructor(props: IOrderButtonsProps) {
        super(props);

        this.increaseCount = this.increaseCount.bind(this);
        this.decreaseCount = this.decreaseCount.bind(this);
    }
    render() {
        if (!this.props.isCart && this.props.quantity === 0) {
            return (
                <div className="order-button">
                    <button className="btn order" onClick={this.increaseCount}>{this.props.isFavourite ? "REORDER" : "ADD TO CART"}</button>
                </div>
            )
        }
        return (
            <div className="order-buttons">
                {this.props.quantity > 0 && <button onClick={this.decreaseCount}>-</button>}
                {this.props.quantity == 0 && <button className="remove-cart-item" onClick={this.decreaseCount}>x</button>}
                <span className="count">{this.props.quantity}</span>
                <button onClick={this.increaseCount}>+</button>
            </div>
        )
    }


    private increaseCount() {
        this.props.increase(this.props.quantity);
    }
    private decreaseCount() {

        if (this.props.quantity == 1) {
            this.props.removeCartItem();
        } else {
            this.props.decrease(this.props.quantity);
        }
    }
}


function mapStateToProps(state: IStoreState, ownProps: IOrderButtonsProps) {
    const props: any = {};
    props.quantity = 0;
    if (state.cartItems[ownProps.recipeId]) {
        props.quantity = state.cartItems[ownProps.recipeId].quantity;
    }

    return props;
}

function mapStateToDispatch(dispatch: Dispatch<IAction>, ownProps: IOrderButtonsProps) {
    return {
        increase: (curQuantity: number) => {
            dispatch(updateCart(ownProps.recipeId, curQuantity + 1));
        },
        decrease: (curQuantity: number) => {
            dispatch(updateCart(ownProps.recipeId, curQuantity - 1));
        },
        removeCartItem() {
            dispatch(removeFromCart(ownProps.recipeId));
        }
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(OrderButons);
