import * as React from 'react';
import '../App.scss';
import Favorites from '../Components/Favorites';
import Filter from '../Components/Filter';
import FilteredItems from '../Components/FilteredItems';
import { IStoreState, ICategories, IRecipes } from '../dataDefinitions';
import { v4 as GuidV4 } from 'uuid';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export interface IHomePageProps extends IStoreState {
  setCategories: (categories: ICategories[]) => void,
  setRecipes: (recipes: IRecipes[]) => void,
}


class HomePage extends React.Component<IHomePageProps> {
  public static defaultProps = {
    categories: [],
    cartItems: {},
    recipeList: [],
    setCategories: (categories: ICategories[]) => { },
    setRecipes: (recipes: IRecipes[]) => { },
  }
  constructor(props: IHomePageProps) {
    super(props);
    if (this.props.categories.length == 0) {
      setTimeout(async () => {
        fetch("/recipeData.json").then(async response => {
          const data = await response.json();
          const modifiedCat = data.categories.map((cat: any) => { cat.id = GuidV4(); return cat; })
          const modifiedRecipes = data.recipes.map((cat: any) => { cat.id = GuidV4(); return cat; })
          this.props.setCategories(modifiedCat);
          this.props.setRecipes(modifiedRecipes);
        });
      });
    }
  }

  componentWillMount() {
  }
  render() {
    return (
      <div className="App">
        <Link to="/Cart">Cart</Link><br />
        {/* <Favorites recipeList={this.props.recipeList} /> */}
        <Favorites />
        <Filter categoryList={this.props.categories} />
      </div>
    );
  }
}



function mapStateToProps(state: IStoreState, ownProps: IHomePageProps) {
  return {
    categories: state.categories
  }
}


export default connect(mapStateToProps, null)(HomePage);

