import React, { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import  {mainStore, isUserAuthenticated, getShoppingCart,getShoppingCartPayment, getListOfAllProductItems, getUserRegStatus, getUserName,getUserRegInfo,getListOfUserOrders} from '../mainStore';
import {getAllItemsFromDB, createOrdersInDB, saveOrdersToDB, chargeCreditcard,getOrdersFromDB} from '../Data/Order';
import {Badge} from 'reactstrap';
import 'materialize-css/dist/css/materialize.min.css';
class Products extends Component
{
    constructor(props)
    {
        super(props);
        this.state ={mock:0};
    }
    componentWillMount()
    {
        getAllItemsFromDB();
    }
    numberOfSelectedItemsInProductsList()
    {
        var v = getListOfAllProductItems();
        var item;
        if(this.props.listOfAllProductItems !== null)
        {
            if(v !== null && v !== undefined && v.length > 0)
            {
                let item = v.reduce((a,b) => ({q: a.q+b.q}));
                console.log('Products:: numberOfSelectedItemsInProductsList() ', item.q)
                return item.q ;
            }
        }
        return 0;
    }
    OnClickDBOperation(item,toAdd,e)
    {
      //
      //mainStore.dispatch({type: 'ADD_SHOPPING_CART',payLoad:item});
      if(item !== null && item !== undefined)
      {
        if(toAdd === true) item.q++;
          else item.q--;
        if(item.q <0) item.q=0;
      }
      if (this.state.mock ==0)
            this.setState({mock:1}); //(item);
        else this.setState({mock:0});
    }
    showPictures(item)
    {
        if(item != null)
        {
            return(     
                <div style={{ display:'inline'}}>
                    <img style={{color:'black'}} 
                        src={item.picture}
                        onMouseEnter={this.onAnimate.bind(this,item)}
                        style={{width:'100px', height:'100px'}}
                        className={"App-logo responsive-img " 
                        + " " + (item.flip === 4 ? "bflip": "") + " " + (item.flip === 3 ? "slidehard": "")
                        + " " + (item.flip === 2 ? "fflip": "") + " " + (item.flip === 1 ? "trumble": "")
                        + " " + (item.flip === 0 ? "flip": "") + " " + (item.flip === 5 ? "fliOnXaxis": "")
                        }
                        onMouseLeave={this.onDontAnimate.bind(this,item)}
                        alt="logo" 
                    /> 
                </div>
            )
        }
        
    }
    onAnimate(item, e)
    {
        //this.changeFlipState(item);
        let animations = 6;
        var x = Math.floor((Math.random() * animations));
        item.flip = x;
        if (item.flip >(animations-1)) item.flip=0;
        if (item.flip <0) item.flip=(animations-1);
        if (this.state.mock ==0)
            this.setState({mock:1}); //(item);
        else this.setState({mock:0});
      //console.log('flip status = ', this.state.flip);
    }
    onDontAnimate(item, e)
    {
        //this.changeFlipState(item);
        
        item.flip = -1;
        
        if (this.state.mock ==0)
            this.setState({mock:1}); //(item);
        else this.setState({mock:0});
      //console.log('flip status = ', this.state.flip);
    }
    goToShoppingCart()
    {
        console.log('goToShoppingCart(): var v = getListOfAllProductItems();', getListOfAllProductItems() );
        if(this.numberOfSelectedItemsInProductsList()>0)
            createOrdersInDB(getListOfAllProductItems());
    }
    showShoppingCartLink()
    {
        if(getUserRegStatus() > 30 && this.numberOfSelectedItemsInProductsList()>0)
        return (
            <div >
                <Link  data-tooltip="Add the selected items to the Shopping cart" 
                        onClick={this.goToShoppingCart.bind(this)}
                        to={(this.numberOfSelectedItemsInProductsList()>0) ?'/ShoppingCart' : ''}
                        >
                        <i class="medium material-icons">add_shopping_cart</i> 
                </Link>
            </div>
        );
    }
    showQuntityButtons(item)
    {
        if(getUserRegStatus() > 30 )
        return(
            <div style={{border:'1px solid lightgray', backgroundColor:'white'}}>
                <div style={{display:'inline'}} >
                    <button className='btn-small red' 
                        onClick={this.OnClickDBOperation.bind(this,item, false)}
                    >
                        <i className='tiny material-icons'>&darr;</i>
                    </button>
                    <label id={item.id} name={item.id} placeholder='0' style={{margin:'6px' , color:'black'}} >{item.q}</label>
                    <button className='btn-small red'
                        onClick={this.OnClickDBOperation.bind(this,item, true)}
                    >
                        <i className='tiny material-icons'>&uarr;</i>
                    </button>
                </div>
            </div>
        )
    }
    showMessage()
    {
        return(
        <div className="col-sm-8 textRotate" style={{fontWeight:'bold', overflow:'hidden'}}>
            Today's magical deal... Buy one ducky and get one for free!!
        </div>
        )          
    }
    RenderOneItem(index)
    {
        var v = getListOfAllProductItems();
        var item;
        if(this.props.listOfAllProductItems != null)
        {
            if(v != null && v.length > index)
            {
                var item = v[index];
            }
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
                    {this.showQuntityButtons(item)}
                    
        </div>
        )
    }
    renderRows(numberOfItemsInARow=3)
    {
        var v = getListOfAllProductItems();
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
        var v = getListOfAllProductItems();
        console.log('this.props.listOfUserOrders  ', this.props.listOfUserOrders);
        console.log('getListOfUserOrders  ', v);
        if(this.props.listOfAllProductItems != null)
        {
            if(v != null && v.length > 0)
            {
            return (
                <div>
                    <div class="text-center">
                            <div >
                                <div style={{display:'inline'}}>
                                   <div>
                                       <div style={{fontSize:'5vw',background:'white', fontFamily:'script', color:'red'}}> Magical Toys </div>
                                    <h6> Welcome &nbsp; 
                                    {isUserAuthenticated() ? getUserName()
                                    : "to Magic Toy Store. Please login using google account and complete the registration process to be able to buy the Magical Toys!"}</h6>
                                   </div>
                                 </div>
                            </div>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-10">
                                {this.showMessage()}
                            </div>
                            <div class="col-sm-2">
                                {this.showShoppingCartLink()}
                            </div>
                        </div>
                        {this.renderRows()}
                    </div>
                </div>
            );
            }
        }
    }
    render(){
        return (
            <div className='myContainer'  >
                {this.renderItems()}
            </div>
        );
    }
}
function mapReduxStateToComponentProp(state)
  {
    return ({ listOfAllProductItems:state.order.listOfAllProductItems});
  }

export default connect(mapReduxStateToComponentProp)(Products);
