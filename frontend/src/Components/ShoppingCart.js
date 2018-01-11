import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import  {mainStore, isUserAuthenticated, getUserName, isDataActive, getShoppingCartPayment, getShoppingCart, getUserRegStatus, isDataActiveCheckOnlyData} from '../mainStore';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import Payments from './Payments';


class ShoppingCart extends Component
{
    constructor(props)
    {
        console.log('ShoppingCart constructor');
        super(props);
        this.state ={mock:0};
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
    showPictures(item)
    {
        if(item != null)
        {
            return(     
                <div style={{ display:'inline'}}>
                    <img style={{color:'black'}} 
                        src={item.picture}
                        onClick={this.onAnimate.bind(this,item)}
                        style={{width:'100px', height:'100px'}}
                        className={"App-logo responsive-img " 
                        + " " + (item.flip === 4 ? "bflip": "") + " " + (item.flip === 3 ? "slidehard": "")
                        + " " + (item.flip === 2 ? "fflip": "") + " " + (item.flip === 1 ? "trumble": "")
                        + " " + (item.flip === 0 ? "flip": "")
                        }
                        alt="logo" 
                    /> 
                </div>
            )
        }
        
    }
    RenderOneItem(index)
    {
        var s = getShoppingCart();
        var v ;
        if (s !== null)
            v = getShoppingCart().Items;
        console.log('getShoppingCart() ', getShoppingCart());
        var item;
        if(v !== null && v !== undefined && v.length > index)
        {
            item = v[index];
        }
    
        if(item !== null && item !== undefined )
        return (
            < div style={{borderBottom:'1px solid lightgray', backgroundColor:'white'}}>
                    <div >
                        {this.showPictures(item)}
                    </div>
                    <div style={{ backgroundColor:'white'}}>
                        <div style={{display:'inline'}}  >
                            <label style={{color:'black'}} >{item.name}</label>
                        </div>
                    </div>
                    <div style={{ backgroundColor:'white'}}>
                        <div style={{display:'inline'}} >
                            <label style={{color:'black'}}>${item.price}</label>
                        </div>
                    </div>
                    <div style={{backgroundColor:'white'}}>
                          <div class="demo">
                            <label data-tooltip={item.description} style={{color:'black'}}>
                            {item.description.slice(0,37)+'...'}
                            </label>
                            
                        </div>
                    </div>
                    <div style={{border:'1px solid lightgray', backgroundColor:'white'}}>
                        <div style={{display:'inline'}} >
                            <label id={item.id} name={item.id} placeholder='0' style={{margin:'6px' , color:'black'}} >{item.q}</label>
                            
                        </div>
                    </div>
                    
            </div>
        )
    }
    renderRows(numberOfItemsInARow=3)
    {
        var s = getShoppingCart();
        var v ;
        if (s !== null)
            v = getShoppingCart().Items;
        
        console.log('renderRows:: getShoppingCart() ', getShoppingCart());
        var divs = [];
        var numberOfCompleteDivs=0;
        if(v != null && v != undefined)
        {
            numberOfCompleteDivs = Math.floor(v.length/numberOfItemsInARow);
        }
        for (let i=0; i<numberOfCompleteDivs; i++)
        {
            let counter=0;
            divs.push(
                <div className="row">
                    <div className="col-sm-4">
                        {this.RenderOneItem(numberOfItemsInARow*i+counter)}
                    </div>
                    <div className="col-sm-4">
                        {this.RenderOneItem(numberOfItemsInARow*i+counter+1)}
                    </div>
                
                    <div className="col-sm-4">
                        {this.RenderOneItem(numberOfItemsInARow*i+counter+2)}
                    </div>
                </div>
            );
        }
        let rem = v.length%numberOfItemsInARow;
        if(rem > 0)
        {//last div has less than 3 items
            var cls = "col-sm-6";
            if(rem===1) 
            {
                cls = "col-sm-12";
                divs.push(
                    <div className="row">
                        <div className={cls}>
                            {this.RenderOneItem(numberOfItemsInARow*numberOfCompleteDivs)}
                        </div>
                    </div>
                );
            }
            if(rem===2) 
            {
                divs.push(
                    <div className="row">
                        <div className={cls}>
                            {this.RenderOneItem(numberOfItemsInARow*numberOfCompleteDivs)}
                        </div>
                        <div className={cls}>
                            {this.RenderOneItem(numberOfItemsInARow*numberOfCompleteDivs+1)}
                        </div>

                    </div>
                );
            }
        }
        return divs;          
    }
    renderItems()
    {
        var v= getShoppingCart();
        if(v === null || v === undefined)
        {
            console.log('getShoppingCart() is null');
            return (
                <div>
                    <div class="progress">
                        <div class="indeterminate"></div>
                    </div>                    
                    <h5> Wait... Perhaps You have not selected anything yet. 
                        If you haven't selected in the shopping cart yet, Please go back to the Products screen and put some Magic Toys in the shopping cart. 
                    </h5>
                </div>
            )
        }
        console.log('getShoppingCart()  ', getShoppingCart());
        if(v != null)
        {
            return (
                <div>
                    <div class="text-center">
                            <div style={{display:'inline'}}
                                data-tooltip="Magical Toys in your shopping cart"
                            >
                            <div style={{fontSize:'4vw',background:'white', fontFamily:'script', color:'hsla(244, 71%, 49%, 0.9)'}}> Magic Toy Store : Shopping Cart </div>
                    
                               
                                <h6> Hello {getUserName()}</h6>
                            </div>
                    </div>
                    <div className="container">
                        <div className="row">
                                <div className="col-sm-8">
                                    Total amount = ${getShoppingCartPayment()}
                                </div>
                                <div className="col-sm-4">
                                    <div data-tooltip="Pay with credit card" >
                                            <Link className="btn waves-effect waves-light"
                                            to={'/Payments'}>
                                                Payments
                                            </Link>
                                    </div>
                                </div>
                        </div>
                        {this.renderRows()}
                    </div>
                </div>
            );
        }
    }
    render()
    {
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


export default ShoppingCart;