import { createStore } from 'redux';
import {combineReducers} from 'redux';
import reducers from './reducers';
import _ from 'underscore';
export var mainStore;
export default function initiateMainStore()
{
    mainStore = createStore(reducers);
    return mainStore;
}

export function getMainStore() 
{ 
    return mainStore;
}

export function isUserAuthenticated()
{
    var myState = mainStore.getState();
    if (
        myState !== null
        && myState !== undefined
        && myState !== false
        && myState.login !== null 
        && myState.login !== undefined 
        && myState.login !== false
        && myState.login.payLoad !== null 
        && myState.login.payLoad !== undefined
        && myState.login.payLoad !== '' 
        && myState.login.payLoad !== false 
        && myState.login.payLoad.displayname !== null 
        && myState.login.payLoad.displayname !== undefined 
        && myState.login.payLoad.displayname !== '' 
        && myState.login.payLoad.displayname !== false 
    )
        {
            return true;
        }
    return false;
}

export function getUserName()
{
    if (isUserAuthenticated() )
        {
            return mainStore.getState().login.payLoad.displayname;
        }
    return '';
}
export function getUserRegInfo()
{
    if (isUserAuthenticated() )
        {
            return mainStore.getState().login.payLoad;
        }
    return '';
}

export function getUserOtherInfo()
{
    if (isUserAuthenticated() )
        {
            let otherinfo = "Email: " + mainStore.getState().login.payLoad.email 
            + " Registration Status: " + mainStore.getState().login.payLoad.regStatus;
            return otherinfo;
        }
    return '';
}

export function getListOfUserOrders()
{
    var myState = mainStore.getState();
    if ( 
        myState.order !== null
        && myState.order !== undefined
        && myState.order !== false
        && myState.order.listOfUserOrders !== null
        && myState.order.listOfUserOrders !== undefined
        && myState.order.listOfUserOrders !== false 
        && myState.order.listOfUserOrders !== [] 
        && myState.order.listOfUserOrders.length !== 0 
    )
    return mainStore.getState().order.listOfUserOrders;
    return null;
}
export function getShoppingCart()
{
    var myState = mainStore.getState();
    if ( 
        myState.order !== null
        && myState.order !== undefined
        && myState.order !== false
        && myState.order.shoppingCart !== null
        && myState.order.shoppingCart !== undefined
        && myState.order.shoppingCart !== false 
        && myState.order.shoppingCart !== [] 
        && myState.order.shoppingCart.length !== 0 
    )
    return mainStore.getState().order.shoppingCart;
    return null;
}

export function getShoppingCartPayment()
{
    var myState = mainStore.getState();
    if ( 
        myState.order !== null
        && myState.order !== undefined
        && myState.order !== false
        && myState.order.shoppingCart !== null
        && myState.order.shoppingCart !== undefined
        && myState.order.shoppingCart !== false 
        && myState.order.shoppingCart !== [] 
        && myState.order.shoppingCart.length !== 0 
    )
    {
        let item = mainStore.getState().order.shoppingCart.Items.reduce((a,b) => ({q: a.q+b.q}));
        return item.q ;
    }
    return 0;
}

export function getListOfAllProductItems()
{
    var myState = mainStore.getState();
    if ( 
        myState.order !== null
        && myState.order !== undefined
        && myState.order !== false
        && myState.order.listOfAllProductItems !== null
        && myState.order.listOfAllProductItems !== undefined
        && myState.order.listOfAllProductItems !== false 
        && myState.order.listOfAllProductItems !== [] 
        && myState.order.listOfAllProductItems.length !== 0 
    )
    {
        return myState.order.listOfAllProductItems;
    }
    return null;
}
export function getUserGoogID()
{
    if (isUserAuthenticated() )
        {
            return mainStore.getState().login.payLoad.usergoogid;
        }
    return '';
}
export function getUserRegStatus()
{
    if (isUserAuthenticated() )
        {
            return mainStore.getState().login.payLoad.regStatus;
        }
    return '';
}
export function isDataActive()
{
    var myState = mainStore.getState();
    if ( isUserAuthenticated() 
        && myState.data !== null
        && myState.data !== undefined
        && myState.data !== false
        && myState.data.payLoad !== null
        && myState.data.payLoad !== undefined
        && myState.data.payLoad !== false 
        && myState.data.payLoad !== [] 
        && myState.data.payLoad.length !== 0 
        
    )
    {
        return true;
    }
    return false;
}

export function isDataActiveCheckOnlyData()
{
    var myState = mainStore.getState();
    if ( 
        myState !== null
        && myState !== undefined
        && myState !== false
        && myState.data !== null
        && myState.data !== undefined
        && myState.data !== false
        && myState.data.payLoad !== null
        && myState.data.payLoad !== undefined
        && myState.data.payLoad !== false 
        && myState.data.payLoad !== [] 
        && myState.data.payLoad.length !== 0 
        
    )
    {
        return true;
    }
    return false;
}
export function getDataFromMainStore()
{
    if (isDataActive())
    {
        return mainStore.getState().data.payLoad;
    }
    return false;
}

export function getIDfromRowID(tempRowID)
{
    var nRetID =  0;
    if  (isDataActive()) 
    {
        var data  = mainStore.getState().data.payLoad;
        nRetID = _.findLastIndex(data, {
        id: tempRowID
      });
      for(var i=0; i < data.length; i++)
      {
          if (data.id === tempRowID)
          nRetID =i;
          break;
      }
    }
    return ((nRetID <0) ? 0 :nRetID);
}