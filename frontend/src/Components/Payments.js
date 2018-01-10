import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import  {getShoppingCart,getUserName, isUserAuthenticated, getShoppingCartPayment, getUserRegStatus, getUserRegInfo} from '../mainStore';
import {getAllItemsFromDB, createOrdersInDB, saveOrdersToDB, getOrdersFromDB, chargeCreditcard} from '../Data/Order';
import {connect} from 'react-redux';
import axios from 'axios';

class Payments extends Component
{
    constructor(props){
        super(props);
        this.state ={
            paymentSucceeded:-1,
            mock:0
        }
    }
    onMySubmit(token)
    {
        chargeCreditcard(token);
        this.setState({paymentSucceeded:1});
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
    showPictures(items)
    {
        console.log('showPictures: items', items);
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
    renderItems()
    {
        var amountToCharge= getShoppingCartPayment();
        var v = getShoppingCart();
        console.log('Payments::renderComponents():: getShoppingCart().Items  =', getShoppingCart().Items);
        console.log('amountToCharge  =', amountToCharge);
        
        var desc = 'Just $' + amountToCharge + ' for the Magic!!'
        if(this.state.paymentSucceeded ===1)
        {
            var userInfo = getUserRegInfo();
            return (
                <div>
                    <h5>Payment Succeeded, Please go to the Products page to keep shopping.</h5>
                    <hr />
                    <h6>Your OrderID is {v.id}
                    <hr />
                    Your order will be shipped to the following address you have put in the Registration info.
                    <hr />
                    {userInfo.address1 + ',  '}
                    <br />
                    {(userInfo.address2 != undefined && userInfo.address2 != null) ? userInfo.address2+ ',  ': ''}
                    <br />
                    {userInfo.city + ' '}, {userInfo.state+ ' '}, {userInfo.zip}</h6>
                    
                </div>
            );
        };
        var paymentComponent =
                 <div> 
                    <StripeCheckout 
                        name="Magic Toys!"
                        description={desc}
                        amount={amountToCharge*100} 
                        token={(token) => this.onMySubmit(token)}
                        stripeKey={process.env.REACT_APP_STRIPE_KEY}>
                        
                        <button style={{margin:'10px'}} 
                        className="btn waves-effect waves-light  Medium" 
                        type="button" name="Payment">Pay using Credit Card</button>
                    </StripeCheckout>
                </div>;
        
        if(this.state.paymentSucceeded === 0)
        {
            return (
                <div>
                    Payment failed, Please try again. {paymentComponent}
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <h5> 
                        Welcome {getUserName()} to the Payment form. Your shopping cart contains following items
                    </h5>
                    <hr />
                        {this.showPictures(v.Items)}
                    <hr />
                        <h6>
                            You will be charged ${amountToCharge} for the Magical toys you are about to buy.
                        </h6>
                    <hr />
                        <h6>
                            If you need to change the order, you can go directly to the Products screen and start another order. 
                            Alternatively, you can go to the List Of Orders screen to reorder the past orders.
                        </h6>
                    <hr />
                        <h6>
                            If you want to continue with this order, Please click on the below "Pay using Credit Card" button 
                            to start the payment processing...
                        </h6>
                    <hr />
                    {paymentComponent}
                </div>
            );
        };
    }
    render(){
        
        return (
            <div className='myContainer'  style={{border:'1px solid black'}}>
                {isUserAuthenticated() ?
                <div>
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

export default Payments;