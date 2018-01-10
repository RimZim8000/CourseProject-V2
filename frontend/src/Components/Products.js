import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import  {mainStore, getListOfAllProductItems, isUserAuthenticated, isDataActive, getUserRegStatus, isDataActiveCheckOnlyData} from '../mainStore';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {getAllItemsFromDB, createOrdersInDB, getOrdersFromDB} from '../Data/Order';
import 'materialize-css/dist/css/materialize.min.css';
import '../index.css';
import axios from 'axios';
import SkyLight from 'react-skylight';
//import { Alert } from     './C:/Users/Shree/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/react-bootstrap';
//import * as actions from '../actions';  
class Products extends Component
{
    constructor(props)
    {
        super(props);
        console.log(" in Products::constructor:: this.props.listOfAllProductItems ", this.props.listOfAllProductItems);
        console.log(" in Products::constructor:: getListOfAllProductItems() ", getListOfAllProductItems());
        
        //if(getListOfAllProductItems() == null)
                getAllItemsFromDB();
        //if(getListOfAllProductItems()==undefined || getListOfAllProductItems()==null)
        {
            this.state = {
                mock:0,
                items: [
                    {id:"001", name:"Ducky", price:"1.00" , picture:'images\\ducky.jpg', 
                        description:"Lucky Ducky - If you buy this ducky, there will be no limit to your luck! It is very similar to the 'Felix Felicis' that Harry drank to get lucky! "+
                        " Yes, if you have this Ducky, you can get your professor to tell you the deepest React programming secretes. I did use it. Shuuuu! Steve doesn't know it!", 
                    q:0, flip:-1 }
                    
                    ,{id:"002", name:"Camera", price:"1.00" , picture:"images\\camera.jpg", 
                        description:"X-Ray Camera - This camera looks an ordinary one."+
                        " But, beware. It can help you see things that your eyes can't see. "+
                        " Shuuuu! I know that Steve has it.  How else will he know where I made mistake in my program?", 
                    q:0, flip:-1 }
                    
                    ,{id:"003", name:"dump-truck", price:"1.00" , picture:"images\\dump-truck.jpg", 
                        description:"Dump Truck that can carry the whole Earth - If you buy this dump-truck, you can carry Earth in this truck!"+
                        " Who says Atlas has monopoly on carrying around the Earth.", 
                    q:0, flip:-1 }
                    
                    ,{id:"004", name:"minion", price:"1.00" , picture:"images\\minion.jpg", 
                        description:"Shuuuu! Minions are immprtals and this one is as well. You can use it, if you want to go swimming."+
                        " Who knows, when you may need it's help!", 
                    q:0, flip:-1 }
                    
                    ,{id:"005", name:"PinWheel", price:"1.00" , picture:"images\\PinWheel.jpg", 
                    description:"This pin wheel actually can give you light when the lights go off in heary storms!"+
                    " How do you think I learnt the Deepest React programming secretes. I did use it when the lights went off in the heavy snow.", 
                    q:0, flip:-1 }
                    
                    ,{id:"006", name:"Ship", price:"1.00" , picture:"images\\Ship.png", 
                        description:"Want to go in galaxy far far away? This ship is really the 'millenium falcon', the fastest ship "+
                        " in this side of the world - Own this ship to go where no one has gone before!", 
                    q:0, flip:-1 }
                ]
            }
        }
        // else
        // {
        //     this.state = {
        //         mock:0,
        //         items:getListOfAllProductItems()
        //     }
        // }
    }
    componentWillMount()
    {
        getAllItemsFromDB();
        console.log(" in Products::componentWillMount:: getListOfAllProductItems() ", getListOfAllProductItems())
        console.log(" in Products::componentWillMount:: this.props.listOfAllProductItems ", this.props.listOfAllProductItems);
        this.setState({mock:0});
        //this.setState({items:getListOfAllProductItems()});
    }
    numberOfSelectedItemsInProductsList()
    {
        console.log(" in Products::numberOfSelectedItemsInProductsList:: getListOfAllProductItems() ", getListOfAllProductItems())
        console.log(" in Products::numberOfSelectedItemsInProductsList:: this.props.listOfAllProductItems ", this.props.listOfAllProductItems);

        if(this.state.items == null)
        {
            this.setState({items:getListOfAllProductItems()});
        }
        else
        {
            let item = this.state.items.reduce((a,b) => ({q: a.q+b.q}));
            return item.q ;
        }
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
    showLastColumn(item)
    {
        if (getUserRegStatus() >= 40) 
        return (
            <div style={{border:'1px solid black', backgroundColor:'white'}}>
            <div style={{display:'inline'}} >
                <button className='btn-small red' 
                    onClick={this.OnClickDBOperation.bind(this,item, false)}>
                    <i className='tiny material-icons'>&darr;</i>
                </button>
                <label id={item.id} name={item.id} placeholder='0' style={{margin:'6px' , color:'black'}} >{item.q}</label>
                <button className='btn-small red'
                    onClick={this.OnClickDBOperation.bind(this,item, true)}>
                    <i className='tiny material-icons'>&uarr;</i>
                </button>
            </div>
            </div>
        );
    }
    showLastColumnInTable(item)
    {
        if (getUserRegStatus() >= 40) 
        return (
            <td style={{border:'1px solid black', backgroundColor:'white'}}>
            <div style={{display:'inline'}} >
                <button className='btn-small red' 
                    onClick={this.OnClickDBOperation.bind(this,item, false)}>
                    <i className='tiny material-icons'>&darr;</i>
                </button>
                <label id={item.id} name={item.id} placeholder='0' style={{margin:'6px' , color:'black'}} >{item.q}</label>
                <button className='btn-small red'
                    onClick={this.OnClickDBOperation.bind(this,item, true)}>
                    <i className='tiny material-icons'>&uarr;</i>
                </button>
            </div>
            </td>
        );
    }
    showLastColumnHeader(item)
    {
       if (getUserRegStatus() >= 40) 
       return (
                <th style={{border:'1px solid black', backgroundColor:'white'}}>
                    <div style={{display:'inline'}} >
                            <label style={{color:'black'}}>Qty</label>
                    </div>
                </th>
            );
    }
    renderHeaders()
    {
        return (
                <tr key="ZZZZZ" style={{border:'1px solid black', backgroundColor:'white'}}>
                <th style={{border:'1px solid black', backgroundColor:'white'}}>
                <div style={{display:'inline'}} >
                        <img style={{color:'black'}}  
                        style={{width:'60px', height:'60px'}}
                        className={"App-logo responsive-img" } alt="" />
                    </div>
                    
                </th>
                <th style={{border:'1px solid black', backgroundColor:'white'}}>
                <div style={{display:'inline'}} >
                        <label style={{color:'black'}} >Name</label>
                    </div>
                </th>
                <th style={{border:'1px solid black', backgroundColor:'white'}}>
                <div style={{display:'inline'}} >
                        <label style={{color:'black'}}>Price($)</label>
                    </div>
                </th>
                <th style={{border:'1px solid black', backgroundColor:'white'}}>
                    <div>
                        <label style={{color:'black'}}>Description</label>
                    </div>
                </th>
                {this.showLastColumnHeader()}
            </tr>
        )
    }
    renderItems()
    {
        console.log(" in Products::renderItems():: getListOfAllProductItems() ", getListOfAllProductItems());
        console.log(" in Products::renderItems():: this.state.items ", this.state.items);
        console.log(" in Products::renderItems():: this.props.listOfAllProductItems ", this.props.listOfAllProductItems);
        var v = [...this.state.items];
        // if (getListOfAllProductItems() != null)
        //     v= [...getListOfAllProductItems()];
        var retArrayOfRows = [];
        
        
        for (var i=0; i< v.length; i++)
        {
            var item = v[i];
            var retValRow = 
                <tr key={item.id} style={{border:'1px solid black', backgroundColor:'white'}}>
                    <td style={{border:'1px solid black', backgroundColor:'white'}}>
                        <div style={{display:'inline'}} >
                            <img style={{color:'black'}} src={item.picture}  
                                onClick={this.onAnimate.bind(this, item)}
                                style={{width:'60px', height:'60px'}}
                                className={"App-logo responsive-img" 
                            + " " + (item.flip === 0 ? "bflip": "") + " " + (item.flip === 1 ? "slidehard": "")
                            + " " + (item.flip === 2 ? "fflip": "") + " " + (item.flip === 3 ? "trumble": "")
                            + " " + (item.flip === 4 ? "flip": "")
                            }
                       
                            alt="logo" />
                        </div>
                    </td>
                    <td style={{border:'1px solid black', backgroundColor:'white'}}>
                        <div style={{display:'inline'}} data-tooltip={item.description} >
                            <label style={{color:'black'}} >{item.name}</label>
                        </div>
                    </td>
                    <td style={{border:'1px solid black', backgroundColor:'white'}}>
                        <div style={{display:'inline'}} >
                            <label style={{color:'black'}}>{item.price}</label>
                        </div>
                    </td>
                    <td style={{border:'1px solid black', backgroundColor:'white'}}>
                        {/* <div style={{display:'inline', minWidth:'50%'}} >
                            <label style={{margin:'10px' , color:'black'}}>{item.description}</label>
                        </div> */}
                        <div class="demo">
                            <label data-tooltip={item.description} style={{color:'black'}}>
                            {item.description.slice(0,37)+'...'}
                            </label>
                            
                        </div>
                    </td>
                    {this.showLastColumn(item)}
                </tr>;
            retArrayOfRows.push(retValRow);
        }
        return retArrayOfRows;
    }
    RenderAsTable()
    {
        return(
            <table className='bordered highlight responsive-table' 
                    style={{ height: '200px', display: 'block',  overflowY:'scroll' }}
                        // style={{fontSize:'16px',  border:"1px solid black", width:'100%',  backgroundColor:'white'}}
                        >
                        <tbody>
                        {/* {this.renderHeaders()} */}
                        {/* </thead>
                        <tbody> */}
                            
                        {this.renderItems()}
                        </tbody>
                    </table>
        )
    }
    goToShoppingCart()
    {
        console.log('goToShoppingCart()');
        createOrdersInDB(this.state.items);
        //mainStore.dispatch({type: 'ADD_SHOPPING_CART',payLoad:this.state.items});
    }
    showShoppingCartLink()
    {
        if(getUserRegStatus() > 30 )
        return (
            <div >
                    <Link data-tooltip="Add chosen Magical Items in the shopping cart" 
                            onClick={this.goToShoppingCart.bind(this)}
                            to={'/ShoppingCart'}
                            >
                            <i class="medium material-icons">add_shopping_cart</i>
                    </Link>
            </div>
        );
    }
    RenderOneItem(index)
    {
        var item = this.state.items[index];
        return (
            < div style={{border:'1px solid black', backgroundColor:'white'}}>
                    <div style={{ backgroundColor:'white'}}>
                        <div style={{display:'inline'}} >
                            <img style={{color:'black'}} src={item.picture}  
                                onClick={this.onAnimate.bind(this, item)}
                                style={{width:'100px', height:'100px'}}
                                className={"App-logo responsive-img" 
                            + " " + (item.flip === 0 ? "bflip": "") + " " + (item.flip === 1 ? "slidehard": "")
                            + " " + (item.flip === 2 ? "fflip": "") + " " + (item.flip === 3 ? "trumble": "")
                            + " " + (item.flip === 4 ? "flip": "")
                            }
                       
                            alt="logo" />
                        </div>
                    </div>
                    <div style={{ backgroundColor:'white'}}>
                        <div style={{display:'inline'}} data-tooltip={item.description} >
                            <label style={{color:'black'}} >{item.name}</label>
                        </div>
                    </div>
                    <div style={{ backgroundColor:'white'}}>
                        <div style={{display:'inline'}} >
                            <label style={{color:'black'}}>{item.price}</label>
                        </div>
                    </div>
                    <div style={{backgroundColor:'white'}}>
                        {/* <div style={{display:'inline', minWidth:'50%'}} >
                            <label style={{margin:'10px' , color:'black'}}>{item.description}</label>
                        </div> */}
                        <div class="demo">
                            <label data-tooltip={item.description} style={{color:'black'}}>
                            {item.description.slice(0,37)+'...'}
                            </label>
                            
                        </div>
                    </div>
                    {this.showLastColumn(item)}
                </div>
        )
    }
    render(){
        return (
            <div>
                {
                    /* <nav >
                    <div className="nav-wrapper">
                        <div className="left" 
                            data-tooltip= {(getUserRegStatus() > 30)?
                            "Choose quantities of the Magical Products and click on the shoppping cart to add the items in the cart"
                            : "Please login using google account and complete the registration process to be able to buy the Magical Toys!"
                            }
                            >
                            <h4 className={"blurOut" }>Magical Products</h4>
                        </div>
                        {this.showShoppingCartLink()}
                    </div>
                </nav> */}
                {/* <div className='myContainer' style={{display:'inline'}}  > */}
                 {/* {this.RenderAsTable()} */}
                    <div class="text-center">
                            <div  >
                                <div 
                                data-tooltip= {(getUserRegStatus() > 30)?
                                    "Choose quantities of the Magical Products and click on the shoppping cart to add the items in the cart"
                                    : "Please login using google account and complete the registration process to be able to buy the Magical Toys!"
                                    } 
                                >
                                <div style={{display:'inline'}}>
                                   <div ><h4> Magical Products </h4></div>
                                   
                                 </div>
                                </div>
                                
                            </div>
                    </div>
  
                    <div class="container">
                    <div className="row">
                        <div className="col-sm-8 textRotate" style={{overflow:'hidden'}}>
                        Today's magical surprise... Buy one ducky and DOUBLE your luck! Another Duck will come with the order for free!!
                        </div>
                        <div class="col-sm-4" > {this.showShoppingCartLink()}</div>
                    </div>
                        <div class="row">
                            <div class="col-sm-4">
                                {this.RenderOneItem(0)}
                            </div>
                            <div class="col-sm-4">
                                {this.RenderOneItem(1)}
                            </div>
                            <div class="col-sm-4">
                                {this.RenderOneItem(2)}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                {this.RenderOneItem(3)}
                            </div>
                            <div class="col-sm-4">
                                {this.RenderOneItem(4)}
                            </div>
                            <div class="col-sm-4">
                                {this.RenderOneItem(5)}
                            </div>
                        </div>
                    </div>
                
                 {/* {this.RenderOneItem(0)}
                 {this.RenderOneItem(1)} */}
                    
                {/* </div> */}
            </div>
        );
    }
}

function mapReduxStateToComponentProp(state)
  {
      console.log('connect(mapReduxStateToComponentProp)(Products); :: mapReduxStateToComponentProp(state) ', state);
    return ({ listOfAllProductItems:state.order.listOfAllProductItems});
  }

export default connect(mapReduxStateToComponentProp,null)(Products);

