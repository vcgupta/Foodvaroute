import * as React from 'react'
import { IRecipes, IStoreState } from '../dataDefinitions';
import { connect } from 'react-redux';
//MAP State exists at bottom
import FavoriteItem from './FavoriteItem';


export interface IFavoriteProps {
    //recipeList: IRecipes[],
    //onAddToCart: (id: string) => void
    favoriteList?: IRecipes[]
}

class Favorites extends React.Component<IFavoriteProps>{

    render() {
        const favItems = this.props.favoriteList!
            .map(recipe => {
                return <FavoriteItem isFavoriteList={true} recipe={recipe} key={recipe.id} />
            })
        return <div className="favourites">
            <div className="header-title"><h2>FAVORITES</h2>
                <span className="fav-desc">Enjoy what you have been ordering</span>
                {/* Bag icon here */}
            </div><div className="clear" />
            <div className="fav-items"> {favItems} </div>

        </div>
    };
}


function mapStateToProps(state: IStoreState, ownProps: IFavoriteProps) {
    return {
        favoriteList: state.recipeList.filter(recipe => recipe.isFavourite)
    }
}

function mapDispatchToProps(dispatch: any) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
