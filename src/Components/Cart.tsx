import * as React from "react";
import { connect } from "react-redux";
import { IStoreState } from "../dataDefinitions";
import CartItem from "./CartItem";
import { Dispatch } from "redux";
import { IAction } from "../Actions";
import { IFavoriteItemProps } from "./FavoriteItem";
import './Cart.scss';
import { Link } from "react-router-dom";


export interface ICartProps {
    recipeIds: string[],
    totalPrice: number
}
class Cart extends React.Component<ICartProps>{
    render() {
        const items = this.props.recipeIds.map(item => <CartItem key={item} recipeId={item} />)
        return (<div><h1>Cart</h1>
            {this.props.recipeIds.length > 0 ? (
                <div> <div className="cart">
                    {items}
                </div>
                    <div>Total amount is: {this.props.totalPrice}</div>
                </div>
            ) : (<div className="empty-cart">
                There is no item in cart. <Link to="/"> Shop some more</Link>
            </div>
                )}
        </div>);
    }
}


function mapStateToProps(state: IStoreState, ownProps: ICartProps) {
    const props: any = {};
    let totalPrice = 0;
    props.recipeIds = [];
    for (let key in state.cartItems) {
        props.recipeIds.push(key);
        totalPrice += (state.cartItems[key].quantity * state.recipeList.find(u => u.id == key)!.price);
    }
    props.totalPrice = totalPrice;

    return props;
}

function mapStateToDispatch(dispatch: Dispatch<IAction>, ownProps: IFavoriteItemProps) {
    return {

    }
}

export default connect(mapStateToProps, mapStateToDispatch)(Cart);

//export default Cart;