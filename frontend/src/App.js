import React, { Component } from "react";
import { Route, BrowserRouter, Switch  } from "react-router-dom";
//import {connect} from 'react-redux'
import Header from './Components/Header';
import Landing from './Components/Landing';
import Dashboard from './Components/Dashboard';
import MyNewItem from './Components/MyNewItem';
import Payments from './Components/Payments';
import UserInfo from './Components/UserInfo';
import Products from './Components/Products';
import Registration from './Components/Registration';
import ShoppingCart from './Components/ShoppingCart';
import About from './Components/About';
import ContactUs from './Components/ContactUs';
import ListOfOrders from './Components/ListOfOrders';
import  {mainStore, getUserRegStatus} from './mainStore';
import  {getAllItemsFromDB} from './Data/Order';

import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    console.log('App::constructor:: calling getAllItemsFromDB();');
  }
  componentWillMount()
  {
    console.log('App::componentWillMount::props ', this.props);
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
            <Route exact path='/' component={Products}> </Route>
            <Route path='/MyItems' component={Landing}> </Route>
            <Route path='/Payments' component={Payments}> </Route>
            <Route path='/ContactUs' component={ContactUs}> </Route>
            <Route path='/About' component={About}> </Route>
            <Route path='/Products' component={Products}> </Route>
            <Route path='/ListOfOrders' component={ListOfOrders}> </Route>
            <Route path='/ShoppingCart' component={ShoppingCart}> </Route>
            <Route path='/Registration' component={Registration}> </Route>
            <Route path='/MyNewItem' component={MyNewItem}> </Route>
            <Route path='/UserInfo' component={UserInfo}> </Route>
            <Route path='/Settings' component={Dashboard}> </Route>
          </Switch>
         </div>
      </BrowserRouter>
    );
  }
}

export default App;
