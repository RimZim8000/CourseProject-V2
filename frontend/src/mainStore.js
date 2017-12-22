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
        && myState.login.payLoad.name !== null 
        && myState.login.payLoad.name !== undefined 
        && myState.login.payLoad.name !== '' 
        && myState.login.payLoad.name !== false 
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
            return mainStore.getState().login.payLoad.name;
        }
    return '';
}

export function getUserOtherInfo()
{
    if (isUserAuthenticated() )
        {
            return mainStore.getState().login.payLoad.otherInfo;
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