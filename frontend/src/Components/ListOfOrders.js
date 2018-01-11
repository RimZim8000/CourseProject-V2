import React, { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import  {mainStore, isUserAuthenticated, getShoppingCart,getShoppingCartPayment, getUserRegStatus, getUserName,getUserRegInfo,getListOfUserOrders} from '../mainStore';
import {getAllItemsFromDB, createOrdersInDB, saveOrdersToDB, chargeCreditcard,getOrdersFromDB} from '../Data/Order';

class ListOfOrders extends Component
{
    constructor(props)
    {
        super(props);
        this.state ={mock:0};
    }
    componentWillMount()
    {
        getOrdersFromDB();
    }
    OnClickDBOperation(item,e)
    {
      //
      mainStore.dispatch({type: 'ADD_SHOPPING_CART',payLoad:item});
    }

    
    showPictures(items)
    {
        var pictures = [];
        if(items != null)
        {
            for(var i =0; i<items.length; i++)
            {
                if (items[i] != null)
                {
                    var item = items[i];
                    pictures.push(
                        <div style={{ display:'inline'}}>
                            <img style={{color:'black'}} 
                                src={item.picture}
                                onClick={this.onAnimate.bind(this,item)}
                                style={{width:'40px', height:'40px'}}
                                className={"App-logo responsive-img " 
                                + " " + (item.flip === 4 ? "bflip": "") + " " + (item.flip === 3 ? "slidehard": "")
                                + " " + (item.flip === 2 ? "fflip": "") + " " + (item.flip === 1 ? "trumble": "")
                                + " " + (item.flip === 0 ? "flip": "")
                                }
                                alt="logo" 
                            /> 
                            <lable>qty:{item.q}&nbsp; &nbsp; </lable>
                        </div>
                    );
                }
            }
        }
        return pictures;
    }
    onAnimate(item, e)
    {
        //this.changeFlipState(item);
        var x = Math.floor((Math.random() * 5));
        item.flip = x;
        if (item.flip >4) item.flip=0;
        if (item.flip <0) item.flip=4;
        if (this.state.mock ==0)
            this.setState({mock:1}); //(item);
        else this.setState({mock:0});
      //console.log('flip status = ', this.state.flip);
    }
    goToShoppingCart(item,e)
    {
        console.log('goToShoppingCart()');
        createOrdersInDB(item.Items);
        //mainStore.dispatch({type: 'ADD_SHOPPING_CART',payLoad:this.state.items});
    }
    showShoppingCartLink(item)
    {
        if(getUserRegStatus() > 30)
        return (
            <div style={{maxWidth:'100px', maxHeight:'40px', 
                    border:'1px solid black', backgroundColor:'rgb(233, 91, 91)', 
                    color:'white', marginRight:"60px"}}>
                    <Link  data-tooltip="Loved these items? Repeat the order just by clicking this button" 
                            onClick={this.goToShoppingCart.bind(this, item)}
                            to={'/ShoppingCart'}
                            >
                            Reorder
                            {/* <i class="medium material-icons">add_shopping_cart</i> */}
                    </Link>
            </div>
        );
    }
    renderItems()
    {
        var v = getListOfUserOrders();
        console.log('this.props.listOfUserOrders  ', this.props.listOfUserOrders);
        console.log('getListOfUserOrders  ', v);
        //console.log('getListOfUserOrders[0]  ',);
        if(this.props.listOfUserOrders != null)
        {
            return (
                <div>
                    List of past orders for userid = {getUserName()}
                    <ul >
                        {v.map((item) => 
                        <li style={{backgroundColor:'white', fontSize:'14px', color:'black', border:'1px solid gray' }}> 
                            <div>
                                {'  Order id:'+ item.id },  {'   Order was created on Date:'+ item.date}
                                    {(item.amount<=0) 
                                        ? "   Incomplete Order" 
                                        : '   Email:'+ item.email  + '   Amount: $'+ (item.amount/100)
                                    }  
                                <p>
                                    
                                        {this.showPictures(item.Items)}
                                </p>
                                <p>
                                        {this.showShoppingCartLink(item)}
                                 
                                </p>
                            </div>    
                        </li> )}
                    </ul>
                </div>
            );
        }
        else
        {
            return (
                <div>
                    {isUserAuthenticated() ?
                    <div>
                        <div class="progress">
                            <div class="indeterminate"></div>
                        </div>  
                        <div  style={{textAlign:'center'}}>                
                            <h5> Wait... we are retriving the past orders for you. 
                                If this page don't get populated within 1 min, 
                                Please either go back to the Products page and return to this page once again, or restart the application.
                            </h5>
                        </div>  
                    </div>
                    :
                    <div>
                        <h5> Please login with google and complete the registration process to enter the site. </h5>
                    </div>
                    }
                </div>
            )
        }
    }

    render(){
        
        return (
            <div className='myContainer'  style={{border:'1px solid black'}}>
                {isUserAuthenticated() ?
                <div>
                    <div style={{fontSize:'5vw',background:'white', fontFamily:'script mt bold', color:'red'}}> Magic Toy Store : List of Orders</div>
                                    
                    {this.renderItems()}
                </div>
                :
                <div>
                    <h5> Please login with google and complete the registration process to enter the site. </h5>
                </div>
                }
            </div>
        );
    }
}
function mapReduxStateToComponentProp(state)
  {
    return ({ listOfUserOrders:state.order.listOfUserOrders});
  }

export default connect(mapReduxStateToComponentProp)(ListOfOrders);
