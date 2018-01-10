import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import  {getShoppingCart,getShoppingCartPayment, getUserRegStatus, getUserRegInfo} from '../mainStore';
import {getAllItemsFromDB, createOrdersInDB, saveOrdersToDB, getOrdersFromDB, chargeCreditcard} from '../Data/Order';
import {connect} from 'react-redux';
import axios from 'axios';
//import { Alert } from './C:/Users/Shree/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/react-bootstrap';
//import * as actions from '../actions';  
class Payments extends Component
{
    constructor(props){
        super(props);
        this.state ={
            paymentSucceeded:-1
        }
    }
    onMySubmit(token)
    {
        chargeCreditcard(token);
        this.setState({paymentSucceeded:1});
    }
    renderComponents()
    {
        var amountToCharge= getShoppingCartPayment();
        console.log('getShoppingCart()  =', getShoppingCart());
        console.log('amountToCharge  =', amountToCharge);
        
        var desc = 'Just $' + amountToCharge + ' for the Magic!!'
        if(this.state.paymentSucceeded ===1)
        {
            var userInfo = getUserRegInfo();
            return (
                <div>
                    <h5>Payment Succeeded, Please go to the Products page to keep shopping.</h5>
                    <hr />
                    <h6>Your OrderID is {getShoppingCart().id}
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
                        Welcome to the Payment form. 
                    </h5>
                    <hr />
                    <h6>Please click on the Pay using Credit Card button to start the payment processing...</h6>
                    <hr />
                    {paymentComponent}
                </div>
            );
        };
    }
    render(){
        
        return (
            <div className='myContainer'  style={{border:'1px solid black'}}>
                {this.renderComponents()}
            </div>
        );
    }
}

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/charge', token);
    dispatch({type: "ADD_CHARGE", payload:res.data});
    }
   

export default Payments;