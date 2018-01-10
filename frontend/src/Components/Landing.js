import React, {Component} from 'react';
import  {mainStore, getDataFromMainStore, isDataActive, getUserName, getUserRegStatus, isUserAuthenticated} from '../mainStore';
import AddItem from './AddItem';
import {connect} from 'react-redux';
import _ from 'underscore';
import GetUserRegistrationInfo from '../Auth/QueryGoogAuth';
class Landing extends Component { 
  constructor(props)
  {
    super(props);
    // console.log('Landing:: constructor  time - ', Date.now() );
    
  }
  componentWillMount()
  {
    GetUserRegistrationInfo();
  }
  changeSel(i, e)
  {
    mainStore.dispatch({type: 'FORM_SELECTION_CHANGED',payLoad:i});
  }
  getGridRows(arrayOfJSONObjects)
  {
    // console.log('Landing:getGridRows(): this.props.location ', this.props.selectedRow, ' time is - ', Date.now());
    var mykeys = _.values(arrayOfJSONObjects);
    // console.log('Landing: getGridRows(arrayOfJSONObjects) - mykeys.length', mykeys.length, ' time is - ', Date.now());
    var retArrayOfRows = [];
    var mainStoreState = mainStore.getState();
    // console.log('mainStoreState = ', mainStoreState);
    let highlightedRow = this.props.selectedRow;
    // console.log('highlightedRow = ', highlightedRow);
    for (var i=0; i < arrayOfJSONObjects.length; i++)
    {
      var row = _.mapObject(arrayOfJSONObjects[i], function(val, key) {
        // if the row is selected, make its background blue, else leave it alone
        if (highlightedRow === i){
          if(val.length > 40) val= val.slice(0,37) +'...'; 
          return (<td style={{color:'#4a148c',fontWeight:'bold', backgroundColor:'#ffcdd2', textDecoration: 'underline'}}>
                      {val}
                  </td>);
        }
        else 
        {
        if(val.length > 40) val= val.slice(0,37) +'...'; 
        return (<td >
                  {val}
                </td>);
        }
      });
      var values = _.values(row);
      retArrayOfRows.push(
              <tr onClick={this.props.changeSelection.bind(this, i)}>
                        {values}
                        </tr>);
    }
    return retArrayOfRows;
   
  }
  getGridHeaders(arrayOfJSONObjects)
  {
    var columns=[];
    var firstRow = arrayOfJSONObjects[0];
    if (firstRow !== null && firstRow !== undefined)
    { 
      //console.log(firstRow.length);
      for (var name in firstRow){
        columns.push(<th >{name}</th>);
      }
      //columns.push(<th>Actions</th>);
    }
    return columns;
  }
    //className='blueTable'// class="bordered highlight responsive-table"style={{overflowY:'auto', border:'1px solid lightgrey'}
   //<table style={{ height: '200px', display: 'block',  overflowY:'scroll' }}>
    myRenderData() {
        return ( 
        <div>
          {(isUserAuthenticated() && isDataActive()) 
          ?
          <div>
          <table className='bordered highlight responsive-table' style={{ height: '200px', display: 'block',  overflowY:'scroll' }}>
          
          <tbody >
          <tr>{this.getGridHeaders(getDataFromMainStore())} </tr>
            {this.getGridRows(getDataFromMainStore())}
            </tbody>
          </table> 
          </div>
          : '.... So that we can get your data from the datastore'
          }
        </div>
        );
    }
    getHeaderTitle()
    {
      if (isUserAuthenticated() && isDataActive() && (getUserRegStatus() >= 20 && getUserRegStatus() < 30 ))
      {
        return (
        <div>
            Hello,  {getUserName()}  <hr/>  Please go to the registration page to register
        </div>);
      }
      if (isUserAuthenticated() && isDataActive() && (getUserRegStatus() === 30 ))
      {
        return (
        <div>
            Hello,   {getUserName()} <hr/> We have sent you an email with a hyperlink to confirm your email address..,
            <br />Please confirm your email using the link we sent you in the email to complete the registration.
        </div>);
      }
      if (isUserAuthenticated() && isDataActive() && (getUserRegStatus() > 30 ))
      {
        return (
          <div>
              Hello,   {getUserName()} 
          </div>);
      }
      
      return ("Please login with Google ");
 
    }
    render(){
      // console.log('in Landing:render(): this.props.location ', this.props.location, ' time is - ', Date.now());
      var mainStoreState = mainStore.getState();
      // console.log('Landing - render - mainStoreState = ', mainStoreState);
      let selectedRow = this.props.selectedRow;
      // console.log('Landing - render - mainStoreState.form.payLoad = ', selectedRow);
      
    return (
      <div className='myContainer' style={{border:'1px solid lightgrey'}}>
        <div className='App App-title' >
        <h5>Welcome to the CourseProject 2018  </h5>
        </div>
        <div className='App-title' style={{textAlign:'right', fontWeight:'bold', fontSize:'large', marginRight:'10px'}}>
          {  this.getHeaderTitle()}
        </div>
        <div >
          {(isUserAuthenticated() && isDataActive() && getUserRegStatus() > 30) ?
          <div>
            <div style={{borderTop:'1px solid black', borderBottom:'2px solid black'}}>
              { this.myRenderData() }
            </div>
            
            <div style={{borderTop:'2px solid black', borderBottom:'1px solid black'}}>
            { <AddItem 
                dataId={(selectedRow !== undefined) ?
                  selectedRow : '0'} 
              />} 
            </div>
          </div>
          :
          <div style={{textAlign:'right', marginRight:'10px'}}>
          </div>
          }
        </div>
      </div>
    ); 
  }     
  };
  function mapReduxStateToComponentProp(state)
  {
    return ({ selectedRow:state.form.payLoad});
  }
  function mapReduxDispatchToComponentProp(dispatch)
  {
    return { changeSelection: (m) => dispatch({type:'FORM_SELECTION_CHANGED', payLoad:m})}
  }
  export default connect(mapReduxStateToComponentProp, mapReduxDispatchToComponentProp)(Landing);