import React, {Component} from 'react';
import  {mainStore, isUserAuthenticated, isDataActive, getUserRegStatus, isDataActiveCheckOnlyData} from '../mainStore';
import { Link } from "react-router-dom";
import GetUserRegistrationInfo, {signOutUserFromGoogle} from '../Auth/QueryGoogAuth';
import {
  Badge,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';

import '../index.css';
import Payments from './Payments';

class Header extends Component
{
  constructor(props)
  {
    super(props);
    this.toggle = this.toggle.bind(this);

    //console.log('Header:: constructor  time - ', Date.now() );
    this.state ={
      flip: -1,
      isOpen: false

     }    
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  close() {
    this.setState({
      isOpen: false
    });
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
      toRet =  <div className="progress">
                  <div className="indeterminate"></div>
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
      var x = Math.floor((Math.random() * 3));
      let f = x;
      if (f >2) f=0;
      if (f <0) f=2;
      
      this.setState({flip:f});
      
    }

  renderContent_old()
  {
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
  renderContent()
  {
    //console.log('in Header component renderContent  '+ mainStore.getState().login.payLoad);
    var urlSignIn = process.env.REACT_APP_SIGN_IN;
    console.log('REACT_APP_SIGN_IN', urlSignIn);
    if(!isUserAuthenticated()){
            return [
              <NavItem key='12345' onClick={this.close.bind(this)}>
                  <Link to={'/Products'}>Products</Link>
              </NavItem>,
              <NavItem key='10001' onClick={this.close.bind(this)}>
               <a  href={urlSignIn}>Login With Google</a>
              </NavItem>
           ];
          }
          else {
            if (getUserRegStatus() < 40)
            {
            return [
              <NavItem key='30003' onClick={this.close.bind(this)}>
                <Link to={'/Registration'}>Register</Link>
              </NavItem>,
              <NavItem key='40004' onClick={this.close.bind(this)}>
                <Link to={'/Products'}>Products</Link> 
              </NavItem>,
              <NavItem key='50005' onClick={this.close.bind(this)}><a id='btnLogoutG' onClick={this.doLogoutGoogle.bind(this)}>Logout</a></NavItem> 
              ];
            }
            else
            {
            return [
              <NavItem key='12345' onClick={this.close.bind(this)}>
                  <Link to={'/Products'}>
                    Products
                  </Link> 
              </NavItem>,
              <NavItem key='30003' onClick={this.close.bind(this)}>
                  <Link to={'/Registration'}>My Info</Link>
              </NavItem>,
              <NavItem key='3003' onClick={this.close.bind(this)}>
                   <Link to={'/ListOfOrders'}>
                      ListOfOrders
                    </Link>
              </NavItem>,
              <NavItem key='50005' onClick={this.close.bind(this)}>
                 <a id='btnLogoutG' onClick={this.doLogoutGoogle.bind(this)}>Logout</a> 
              </NavItem>
              ];
            }
        }
  }
  
  renderNavbar()
  {
    return(
      <div>
      <Navbar color="faded" light expand="md">
        <NavbarBrand href="/" ><Badge style={{fontFamily:'script',  fontSize:'3vw',background:'rgb(233, 91, 91)', color:'darkgreen'}}
        onClick={this.onAnimate.bind(this)}
        className={"App-logo" 
        + " " + (this.state.flip == -1 ? "fliOnXaxis": "") 
        + " " + (this.state.flip == 0 ? "fflip": "") 
        + " " + (this.state.flip == 1 ? "slidehard": "")
        + " " + (this.state.flip == 2 ? "fliOnXaxis": "")
      } 
        >Magic Toy Store</Badge></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar onMouseLeave={this.close.bind(this)} style={{zIndex:'999'}}   >
          <div style={{float:'right'}}  >
          <Nav className="ml-auto " navbar >
            {this.renderContent()}
            <NavItem key='9999' onClick={this.close.bind(this)}>
            <Link to={'/ContactUs'}>ContactUs</Link> 
            </NavItem>
            <NavItem key='9998' onClick={this.close.bind(this)}>
             <Link to={'/About'}>About</Link> 
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle style={{color:'white'}} nav caret>
                More 
              </DropdownToggle>
              <DropdownMenu >
                <DropdownItem>
                <NavLink href="https://learnovica.com/" onClick={this.close.bind(this)} target="_blank">Learnovica</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          </div>
        </Collapse>
      </Navbar>
    </div>

     )
  }
  

renderNavbar_old()
{
  return (
    <nav className="nav-extended">
                <div className="nav-wrapper">
                
                  <a className="myleftlogo" onClick={this.onAnimate.bind(this)}> 
                    <img src='favicon.ico'  width='46px' height='46px'
                      className={"App-logo" 
                        + " " + (this.state.flip == -1 ? "bflip": "") 
                        + " " + (this.state.flip == 0 ? "fflip": "") 
                        + " " + (this.state.flip == 1 ? "slidehard": "")
                        + " " + (this.state.flip == 2 ? "fliOnXaxis": "")
                      } 
                      alt="logo" />
                  </a> 
                  <ul id="nav-mobile" className="right ">
                      
                    {this.renderContent_old()}
                  </ul>
                  
                </div>
                
                  {/* {this.renderPreLoader()} */}
            </nav>
  )
}
    render(){
      return(
       this.renderNavbar()
      )
    }
}

export default Header;