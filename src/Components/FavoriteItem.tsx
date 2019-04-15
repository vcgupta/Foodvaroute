
import * as React from 'react';
import { IRecipes, IStoreState } from '../dataDefinitions';
import { func } from 'prop-types';
import  {  updateCart , IAction } from '../Actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

export interface IFavoriteItemProps{
    recipe: IRecipes,
    quantity?: number,
    reorder?:(curQuantity:number)=>void
}
class FavoriteItem extends React.Component<IFavoriteItemProps>{

    public static defaultProps ={
        quantity: 0
    }
     
    constructor(props: IFavoriteItemProps) {
        super(props);
        this.reorder = this.reorder.bind(this);
    }

    public render() {
        return <div className="fav-item" key={this.props.recipe.id}>
            <div className="fav-img">
                <img src={this.props.recipe.image} alt={this.props.recipe.name} />
            </div>
            <div className="fav-shortdetails">
                <div className="name-price">
                    <div className="name">{this.props.recipe.name}</div>
                    <div className="price">{this.props.recipe.price}</div>
                </div>
                <div className="order-button">
                    <button className="btn order" onClick={this.reorder}>REORDER</button>
                </div>
            </div>
        </div>
    }
    private reorder(){
        this.props.reorder!(this.props.quantity !== undefined ? this.props.quantity : 0);
    }
}

function mapStateToProps(state: IStoreState, ownProps: IFavoriteItemProps){
    const props : any ={};
    props.quantity = 0;
    if(state.cartItems[ownProps.recipe.id]){
        props.quantity = state.cartItems[ownProps.recipe.id].quantity;
    }
    return props;
}

function mapStateToDispatch(dispatch:Dispatch<IAction>, ownProps: IFavoriteItemProps){
    return {
        reorder: (curQuantity:number)=>{
            //const quanity = (ownProps.quantity? ownProps.quantity : 0)+1
            dispatch(updateCart(ownProps.recipe.id, curQuantity + 1));
        }
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(FavoriteItem);