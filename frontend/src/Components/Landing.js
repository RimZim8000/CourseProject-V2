import React, {Component} from 'react';
import  {mainStore, getDataFromMainStore, isDataActive,  isUserAuthenticated} from '../mainStore';
import AddItem from './AddItem';
import {connect} from 'react-redux';
import _ from 'underscore';
class Landing extends Component { 
  constructor(props)
  {
    super(props);
    console.log('Landing:: constructor  time - ', Date.now() );
    
  }
  componentWillMount()
  {
    mainStore.subscribe(() =>{
      console.log('in App:componentWillMount():mainStore.subscribe(() =>arrrived FormSelection is  - '
      , this.props.selectedRow, ' time is - ', Date.now()  );
    });
    console.log('Landing:componentWillMount(): this.props.selectedRow '
      , this.props.selectedRow, ' time is - ', Date.now());
  }
  changeSel(i, e)
  {
    mainStore.dispatch({type: 'FORM_SELECTION_CHANGED',payLoad:i});
  }
  getGridRows(arrayOfJSONObjects)
  {
    console.log('Landing:getGridRows(): this.props.location '
      , this.props.selectedRow, ' time is - ', Date.now());
    var mykeys = _.values(arrayOfJSONObjects);
    console.log('Landing: getGridRows(arrayOfJSONObjects) - mykeys.length'
      , mykeys.length, ' time is - ', Date.now());
    var retArrayOfRows = [];
    var mainStoreState = mainStore.getState();
    console.log('mainStoreState = ', mainStoreState);
    let highlightedRow = this.props.selectedRow;
    console.log('highlightedRow = ', highlightedRow);
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
  handleClick(i, e)
  {
    console.log("Landing extends Component: table row clicked event info (i) is = "
      , i , "   an e is ", e, ' time is - ', Date.now());
    
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
    render(){
      console.log('in Landing:render(): this.props.location ', this.props.location, ' time is - ', Date.now());
      var mainStoreState = mainStore.getState();
      console.log('Landing - render - mainStoreState = ', mainStoreState);
      let selectedRow = this.props.selectedRow;
      console.log('Landing - render - mainStoreState.form.payLoad = ', selectedRow);
      
    return (
      <div className='myContainer' style={{border:'1px solid lightgrey'}}>
        <div className='App-title'>
        <h5>Welcome to the CourseProject 2017  </h5>
          <h5>
          { (isUserAuthenticated() && isDataActive()) ? 'Hello, ' + mainStoreState.login.payLoad.name 
                              : 'Please login using your Google Account' } 
          </h5>
        </div>
        <div >
          {(isUserAuthenticated() && isDataActive()) ?
          <div>
            <div style={{borderTop:'1px solid black', borderBottom:'1px solid black'}}>
              { this.myRenderData() }
            </div>
            <br />
            <div style={{borderTop:'1px solid black', borderBottom:'1px solid black'}}>
            { <AddItem 
                dataId={(selectedRow !== undefined) ?
                  selectedRow : '0'} 
              />} 
            </div>
          </div>
          :
          <div>
            .... So that we can get your data from the datastore
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