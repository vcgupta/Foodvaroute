import * as React from 'react';
import './App.css';
import Favorites from './Components/Favorites';
import Filter from './Components/Filter';
import FilteredItems from './Components/FilteredItems';
import { IStoreState, ICategories, IRecipes } from './dataDefinitions';
import {v4 as GuidV4} from 'uuid';

export interface IAppProps extends IStoreState {
  setCategories: (categories: ICategories[]) => void,
  setRecipes: (recipes: IRecipes[]) => void,
}

class App extends React.Component<IAppProps> {
  public static defaultProps = {
    categories: [],
    cartItems: {},
    recipeList: [],
    setCategories: (categories: ICategories[]) => { },
    setRecipes: (recipes: IRecipes[]) => { },
  }
  constructor(props: IAppProps) {
    super(props);
  }

  componentWillMount() {
    setTimeout(async () => {
      fetch("http://temp.dash.zeta.in/food.php").then(async response => {
        const data = await response.json();
        const modifiedCat = data.categories.map((cat:any) =>{ cat.id = GuidV4(); return cat; })
        const modifiedRecipes = data.recipes.map((cat:any) =>{ cat.id = GuidV4(); return cat; })
        console.log("Data is received", data);
        this.props.setCategories(modifiedCat);
        this.props.setRecipes(modifiedRecipes);       
      });
    });
  }
  render() {
    return (
      <div className="App">
        {/* <Favorites recipeList={this.props.recipeList} /> */}
        <Favorites />
        <Filter categoryList={this.props.categories} />
      </div>
    );
  }
}



export default App;
