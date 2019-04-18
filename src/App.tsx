import * as React from 'react';
import './App.scss'; 
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomePage from './Components/HomePageContainer';
import Cart from './Components/Cart';

class App extends React.Component {
  public static defaultProps = {

  }
  

  componentWillMount() {

  }
  render() {
    return (
       <BrowserRouter>
       <Switch>
         <Route path="/"  exact={true}  component={HomePage} />
         <Route path="/Cart"  component={Cart} />
         </Switch>
       </BrowserRouter>
    );
  }
}



export default App;
