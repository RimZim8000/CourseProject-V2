import React, {Component} from 'react';
import  {mainStore, isUserAuthenticated, isDataActive, getUserRegStatus, isDataActiveCheckOnlyData} from '../mainStore';
import { Link } from "react-router-dom";
import GetUserRegistrationInfo, {signOutUserFromGoogle} from '../Auth/QueryGoogAuth';
import 'materialize-css/dist/css/materialize.min.css';
import '../index.css';
import Payments from './Payments';

class Header extends Component
{
  constructor(props)
  {
    super(props);
    //console.log('Header:: constructor  time - ', Date.now() );
    this.state ={
      flip: -1
     }    
  }

  componentWillMount()
  {
    GetUserRegistrationInfo(true);
  }
  renderPreLoader(){
    console.log('preloader isUserAuthenticated() ', isUserAuthenticated(), '  isDataActiveCheckOnlyData()  =', isDataActiveCheckOnlyData());
    var toRet = <div></div>;
    if(isUserAuthenticated())// && !isDataActiveCheckOnlyData())
    {
      toRet =  <div class="progress">
                  <div class="indeterminate"></div>
                </div>;
    }
    return toRet;
  }
  
 
  doLogoutGoogle()
  {
    signOutUserFromGoogle();
  }

  onAnimate()
  {
      let f = this.state.flip;
      if (f <= 0) f=true;
      else f = false;
      this.setState({flip:f});
      //console.log('flip status = ', this.state.flip);
    }

  renderContent(){
    //console.log('in Header component renderContent  '+ mainStore.getState().login.payLoad);
    var urlSignIn = process.env.REACT_APP_SIGN_IN;
    console.log('REACT_APP_SIGN_IN', urlSignIn);
    if(!isUserAuthenticated()){
            return [
              <li key='12345'>
                <div>
                  <Link to={'/Products'}>
                    Products
                  </Link>
                </div>
              </li>,
              <li key='10001'>
               <a href={urlSignIn}>Login With Google</a>
              </li>
              
           ];
          }
          else {
            if (getUserRegStatus() < 40)
            {
            return [
              <li key='30003'>
              <Link to={'/Registration'}>Register</Link>
              </li>,
              <li key='40004'>
                <Link to={'/Products'}>Products</Link>
              </li>,
              <li key='50005'><a id='btnLogoutG' onClick={this.doLogoutGoogle.bind(this)}>Logout</a></li>
              ];
            }
            else
            {
            return [
              
              <li key='12345'>
                <div>
                  <Link to={'/Products'}>
                    Products
                  </Link>
                </div>
              </li>,
              <li key='30003'>
                <Link to={'/Registration'}>My Info</Link>
              </li>,
              <li key='3003'>
                <div>
                    <Link to={'/ListOfOrders'}>
                      ListOfOrders
                    </Link>
                </div>
              </li>,
              <li key='50005'><a id='btnLogoutG' onClick={this.doLogoutGoogle.bind(this)}>Logout</a></li>
              ];
            }
        }
  }

    render(){
        return (
            <nav >
            <div className="nav-wrapper">
              <a className="myleftlogo" onClick={this.onAnimate.bind(this)}> 
                <img src='favicon.ico'  width='44px' height='44px'
                  className={"App-logo" + " " + (this.state.flip == 1 ? "slidehardAndLong": "") + " " + (this.state.flip == 0 ? "bflip": "")} 
                  alt="logo" />
              </a> 
              <ul id="nav-mobile" class="right ">
                {this.renderContent()}
              </ul>
            </div>
              {/* {this.renderPreLoader()} */}
          </nav>
        );
    }
}

export default Header;