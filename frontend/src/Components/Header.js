import React, {Component} from 'react';
import  {mainStore, isUserAuthenticated, isDataActive, isDataActiveCheckOnlyData} from '../mainStore';
import { Link } from "react-router-dom";
import isUserAuthenticatedInGoogle, {signOutUserFromGoogle} from '../Auth/QueryGoogAuth';
// import logo from './logo.svg';
class Header extends Component
{
  constructor(props)
  {
    super(props);
    console.log('Header:: constructor  time - ', Date.now() );
    
  }

  componentWillMount()
  {
    isUserAuthenticatedInGoogle();
  }
  renderPreLoader(){
    var toRet = <div></div>;
    if(isUserAuthenticated() && !isDataActiveCheckOnlyData())
    {
      toRet =  <div class="progress">
                  <div class="indeterminate"></div>
                </div>;
    }
    return toRet;
  }
  
  doCheckLoggingUser()
  {
    isUserAuthenticatedInGoogle();
  }


  doLogoutGoogle()
  {
    signOutUserFromGoogle();
  }
  renderContent(){
    console.log('in Header component renderContent  '+ mainStore.getState().login.payLoad);
    if(!isUserAuthenticated()){
            return [
              <li key='10001'>
               <a href='/SignIn'>Login With Google</a>
              </li>
              
           ];
          }
          else {
            return [
              <li key='2'>
                <Link to={isDataActive()  ? '/MyItems/0': '/'}>MyItems</Link>
              </li>,
                <li key='30003'>
                <Link to={'/UserInfo'}>User Info</Link>
                </li>,
                <li key='44'><a id='btnLogoutG' onClick={this.doLogoutGoogle.bind(this)}>Logout</a></li>
              ];
          }
  }

    render(){
        return (
            <nav >
            <div className="nav-wrapper">
              <a className="myleftlogo">
              <img src='favicon.ico' className="App-logo" alt="logo" />
              </a>
              <ul id="nav-mobile" class="right ">
                {this.renderContent()}
              </ul>
            </div>
              {this.renderPreLoader()}
          </nav>
        );
    }
}

export default Header;