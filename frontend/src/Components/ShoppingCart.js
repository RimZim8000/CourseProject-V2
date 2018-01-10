import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import  {mainStore, isUserAuthenticated, isDataActive, getShoppingCart, getUserRegStatus, isDataActiveCheckOnlyData} from '../mainStore';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import Payments from './Payments';
import 'materialize-css/dist/css/materialize.min.css';
import '../index.css';
import axios from 'axios';
import SkyLight from 'react-skylight';
//import { Alert } from     './C:/Users/Shree/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/react-bootstrap';
//import * as actions from '../actions';  
class ShoppingCart extends Component
{
    constructor(props)
    {
        console.log('ShoppingCart constructor');
        super(props);
        this.state ={mock:0};
    }
      
    OnClickDBOperation(item,toAdd, e)
    {
        console.log('%%%%%%%%%%% OnClickDBOperation(operationIn,e)::hi there  e= '
        , e, '     item = ',item, '  toAdd=', toAdd);
        this.changeCounter(item, toAdd);
      //this.setState({modalOperation: {showModal: true, operation:operationIn }});
    }
    changeCounter(item, toAdd)
    {
        var v= [...this.state.items];
        var retArrayOfRows = [];
        let found = -1;
        for (var i=0; i< v.length; i++)
        {
            if(v[i].id === item.id)
            {
                found = i;
                break;
            }
        }
        if (found > -1)
        {
            var x = {...v[found]};
            if(toAdd)
                x.q++;
            else 
            {
                if(x.q >0)
                    x.q--;
            }
            v.splice(i,1,x);
            this.setState({items:v});
        }
    }
    
    showDescription(item, e)
    {
        this.simpleDialog.title = "item.name";
        
        this.simpleDialog.show();
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

    renderItems()
    {
        var s= getShoppingCart();
        if(s ==null)
        {
            console.log('renderItems() in ShoppingCart ------  v = getShoppingCart() is null');
        }
        //var v= [...this.state.items];
        var retArrayOfRows = [];
        if(s != null)
        {
            var v = s.Items;
            for (var i=0; i< v.length; i++)
            {
                var item = v[i];
                if(item.q <= 0) continue;
                var retValRow = 
                    <tr key={item.id} style={{border:'1px solid black', backgroundColor:'while'}}>
                        <td style={{border:'1px solid black', backgroundColor:'while'}}>
                            <div style={{display:'inline'}} >
                                <img style={{color:'black'}} src={item.picture}  onClick={this.onAnimate.bind(this, item)}
                                style={{width:'60px', height:'60px'}}
                                className={"App-logo responsive-img" 
                                + " " + (item.flip === 0 ? "bflip": "") + " " + (item.flip === 1 ? "slidehard": "")
                                + " " + (item.flip === 2 ? "fflip": "") + " " + (item.flip === 3 ? "trumble": "")
                                + " " + (item.flip === 4 ? "flip": "")
                                }
                        
                                alt="logo" />
                            </div>
                        </td>
                        <td style={{border:'1px solid black', backgroundColor:'while'}}>
                            <div style={{display:'inline'}} data-tooltip={item.description} >
                                <label style={{color:'black'}} >{item.name}</label>
                            </div>
                        </td>
                        <td style={{border:'1px solid black', backgroundColor:'while'}}>
                            <div style={{display:'inline'}} >
                                <label style={{color:'black'}}>{item.price}</label>
                            </div>
                        </td>
                        <td style={{border:'1px solid black', backgroundColor:'while'}}>
                            {/* <div style={{display:'inline', minWidth:'50%'}} >
                                <label style={{margin:'10px' , color:'black'}}>{item.description}</label>
                            </div> */}
                            <div class="demo">
                                <label data-tooltip={item.description} style={{color:'black'}}>
                                {item.description.slice(0,37)+'...'}
                                </label>
                                
                            </div>
                        </td>
                        <td style={{border:'1px solid black', backgroundColor:'while'}}>
                            <div style={{display:'inline'}} >
                                <button className='btn-small red' disabled={true}
                                    onClick={this.OnClickDBOperation.bind(this,item, false)}>
                                    <i className='tiny material-icons'>-</i>
                                </button>
                                <label id={item.id} name={item.id} placeholder='0' style={{margin:'6px' , color:'black'}} >{item.q}</label>
                                <button className='btn-small red' disabled={true}
                                    onClick={this.OnClickDBOperation.bind(this,item, true)}>
                                    <i className='tiny material-icons'>+</i>
                                </button>
                            </div>
                        </td>
                    </tr>;
                retArrayOfRows.push(retValRow);
            }
        }
        return retArrayOfRows;
    }
    
    render(){
        return (
            <div>
                <nav >
                    <div className="nav-wrapper">
                        <div className="left" 
                            data-tooltip="Magical Products in your shopping cart"
                        >
                            <h4>Shopping Cart</h4>
                        </div>
                        <div data-tooltip2="Pay using your credit card" 
                            className="right" style={{marginRight:"60px"}}>
                                <Link to={'/Payments'}>
                                    Payments
                                </Link>
                        </div>
                    </div>
              </nav>
                
                <div className='myContainer'  style={{border:'1px solid black', backgroundColor:'lightblue'}}>
                    <table className='bordered highlight responsive-table' style={{border:"1px solid black",  backgroundColor:'white'}}>
                        <thead>
                        <tr key="ZZZZZ" style={{border:'1px solid black', backgroundColor:'while'}}>
                                <th style={{border:'1px solid black', backgroundColor:'while'}}>
                                <div style={{display:'inline'}} >
                                        <img style={{color:'black'}}  
                                        style={{width:'60px', height:'60px'}}
                                        className={"App-logo responsive-img" } alt="" />
                                    </div>
                                    
                                </th>
                                <th style={{border:'1px solid black', backgroundColor:'while'}}>
                                <div style={{display:'inline'}} >
                                        <label style={{color:'black'}} >Name</label>
                                    </div>
                                </th>
                                <th style={{border:'1px solid black', backgroundColor:'while'}}>
                                <div style={{display:'inline'}} >
                                        <label style={{color:'black'}}>Price($)</label>
                                    </div>
                                </th>
                                <th style={{border:'1px solid black', backgroundColor:'while'}}>
                                    <div>
                                        <label style={{color:'black'}}>Description</label>
                                    </div>
                                </th>
                                <th style={{border:'1px solid black', backgroundColor:'while'}}>
                                    <div style={{display:'inline'}} >
                                        
                                            <label style={{color:'black'}}>Qty</label>
                                        
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        {this.renderItems()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


export default ShoppingCart;