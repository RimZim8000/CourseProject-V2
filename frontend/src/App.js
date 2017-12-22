import React, { Component } from "react";
import { Route, BrowserRouter, Switch  } from "react-router-dom";
//import {connect} from 'react-redux'
import Header from './Components/Header';
import Landing from './Components/Landing';
import Dashboard from './Components/Dashboard';
import MyNewItem from './Components/MyNewItem';
import UserInfo from './Components/UserInfo';
import  {mainStore} from './mainStore';

import './App.css';

const Settings = () => <h1>Settings</h1>;
class App extends Component {
  componentWillMount()
  {
    mainStore.subscribe(() =>{
      //refresh the screen
      console.log('in App:componentWillMount():mainStore.subscribe(() =>loggedin user is - '
      , mainStore.getState().login, ' time is - ', Date.now() );
      console.log('in App:componentWillMount():mainStore.subscribe(() =>arrrived data is  - '
      , mainStore.getState().data, ' time is - ', Date.now()  );
      this.forceUpdate(()=> {
        console.log('App::componentWillMount():mainStore.subscribe:: after forced the update time ', Date.now())
      }
      );
    });
    console.log('App::Header componentWillMount() - loggedin user is - '
    , mainStore.getState().login, ' time is - ', Date.now() );
  }
  componentDidMount()
  {
    console.log('in----- class App extends Component::componentDidMount() ' 
    , mainStore.getState().login, ' time is - ', Date.now() );
  }
  render() {
     return (
      <BrowserRouter>
        <div className='myContainer'>
          <Header />
          <Switch>
            <Route exact path='/' component={Landing}> </Route>
            <Route path='/MyItems' component={Landing}> </Route>
            <Route path='/MyNewItem' component={MyNewItem}> </Route>
            <Route path='/UserInfo' component={UserInfo}> </Route>
            <Route path='/Settings' component={Dashboard}> </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
//<div className='myContainer'> </div>
export default App;
