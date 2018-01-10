import React, { Component } from 'react';
import  {isDataActive, getDataFromMainStore, isUserAuthenticated} from '../mainStore';
import  {putDataDB, deleteDataDB, postDataDB } from '../Data/Data';
import ConfirmationBox from './ConfirmationBox';
import Payments from './Payments';
//import "bootstrap";
export class AddItem extends Component{
    constructor(props)
    {
      super(props);
      //console.log('AddItem:: constructor  time - ', Date.now() );
      //this.handleChange = this.handleChange.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
      // this.onAuthStateChanged = this.processLogIn.bind(this);
      var tempRow = (props.dataId !== undefined) ? props.dataId :0;
      var data = getDataFromMainStore()[tempRow];
     
      if (isDataActive()  && data !== null && data !== undefined )
      {
          this.state = {
              modalOperation : {
                showModal:false,
                operation:''
              },
              row:props.dataId,
              id: data.id,
              first_name: data.first_name,
              last_name:data.last_name,
              email:data.email,
              subject:data.subject,
              description:data.description
          }
        }
        else
        {
          this.state = {
            modalOperation : {
              showModal:false,
              operation:''
            },
            row:props.dataId,
            id:props.dataId,
            first_name: '',
            last_name:'',
            email:'',
            subject:'',
            description:''
          }      
        }
      }

    processLogIn(result) {this.setState({props:result.user});};
    componentWillMount () {
      this.changStateData();
    }
    
    OnClickDBOperation(operationIn,e)
    {
      this.setState({modalOperation: {showModal: true, operation:operationIn }});
    }

    handleDelete(rowIn, e) {
      deleteDataDB(this.state.id);
    }

    handleUpdate(rowIn, e) {
      putDataDB(this.state);
    }

    handleCreate(rowIn, e) {
      var changedState = this.state;
      this.changStateData();
      postDataDB(changedState);
    }

    handleChange(rowIn,e) {
      this.setState({[e.target.name]: e.target.value});
    }
    changStateData()
    {
      var tempRow = (this.props.dataId !== undefined) ? this.props.dataId :0;
      var data = getDataFromMainStore()[tempRow];
      if (this.state.row !== tempRow)
      {
        this.setState({row: tempRow});
        this.setState({id: data.id});
        this.setState({first_name: data.first_name});
        this.setState({last_name: data.last_name});
        this.setState({email: data.email});
        this.setState({subject: data.subject});
        this.setState({description: data.description});
      }
    }
    handleChildClickCancel(xx)
    {
      this.setState({modalOperation: {showModal: false, operation:'' }});
    }
    handleChildClickOk(xx)
    {
      //if (confirm('Are you sure ?') === true)
      var operation = this.state.modalOperation.operation;
      //alert(xx);
      switch (operation){
        case 'delete':
        {
          deleteDataDB(this.state.id);
          break;
        }
        case 'create':
        {
          //console.log('create - ok pressed');
          var changedState = this.state;
          postDataDB(changedState);
          break;
        }
        case 'update':
        {
          //console.log('update - ok pressed');
          putDataDB(this.state);
          break;
        }
        default:
        {
        }
      }
      this.handleChildClickCancel(xx);
    }
    OnUClick() {
        alert("in Update Click Ok event");
        //console.log('update - ok pressed');
        putDataDB(this.state);
    }
    showConfirmation()
    {
      if(this.state.modalOperation.showModal) 
      {
        const item = {'operation':this.state.modalOperation.operation,'text':'hello'};
        return (
          <ConfirmationBox  
            sendBackOk = {this.handleChildClickOk.bind(this)}
            sendBackCancel = {this.handleChildClickCancel.bind(this)}
            childItem ={item} />
        
      );
      }
    }
    
    showModalBox() {
      return (
        <div></div>
         
      );
    }

    renderComponent( dataId)
    {

      
      //console.log('AddItem:renderComponent(): this.props.dataId ', dataId, ' time is - ', Date.now() );
     
      var mainStoreData = getDataFromMainStore();
      var row = (dataId !== undefined &&  mainStoreData.length > dataId) ? dataId :0;
     
      //console.log ('AddItem:renderComponent(): selected row = ', row, ' time is - ', Date.now() );
      // console.log ('AddItem:renderComponent(): data  = ', 
      //       (isDataActive()  && mainStoreData[row] !== null && mainStoreData[row] !== undefined ) 
      //       ? mainStoreData[row] : 'Data is not available');
       var data =  mainStoreData[row];
  
      if(isUserAuthenticated() && isDataActive()  &&  data !== null && data !== undefined )
      {
        var f = this.state.first_name;
        var l = this.state.last_name;
        var e = this.state.email;
        var s = this.state.subject;
        var d = this.state.description;
        if (row !== this.state.row ){ 
          this.changStateData();
        }     
        return (
        <div style={{border:'1px solid lightgrey'}}>
            <div>
            {this.showConfirmation()}
                <div style={{display: 'block'}}>
                <label for="first_name" style={{width:'10%'}} >First Name:  </label>
                <input id='first_name' type="text" style={{width:'40%'}} name="first_name" 
                  placeholder='First Name'
                  onChange={this.handleChange.bind(this,row)} 
                  value={f}
                   />
                </div>
                <div>
                <label for='last_name' style={{width:'10%'}} >Last Name:  </label>
                <input id='last_name' type="text" style={{width:'40%'}} name="last_name" 
                   placeholder='Last Name'
                   onChange={this.handleChange.bind(this,row)} 
                    value={l}
                   />
                </div>
                <div>
                <label for="email" style={{width:'10%'}} >Email:  </label>
                <input id="email" style={{width:'90%'}}  type="text" name="email" 
                   placeholder='Email'
                   onChange={this.handleChange.bind(this,row)} 
                   value={e}                
                   />
                </div>
                <div>
                <label for="subject" style={{width:'10%'}} >Subject:  </label>
                <input id="subject" style={{width:'90%'}} type="text" name="subject" 
                   placeholder="Subject :" 
                   onChange={this.handleChange.bind(this,row)} 
                   value={s}
                />
                </div>
                <div>
                <label for="description" style={{width:'10%'}}>Description:  </label>
                <textarea id="description" style={{width:'90%'}} rows="4" name="description" 
                  placeholder="Description" 
                  onChange={this.handleChange.bind(this,row)} 
                  value={d}
                />
                </div>
              <button style={{margin:'10px'}} 
                className="btn waves-effect waves-light small" 
                onClick={this.OnClickDBOperation.bind(this,'update')}
                type="button" name="Update">Update</button>
              <button style={{margin:'10px'}} 
                className="btn waves-effect waves-light  small" 
                onClick={this.OnClickDBOperation.bind(this,'create')}
                type="button" name="CreateNew">Create New</button>
              
              <button style={{margin:'10px'}} 
                className="btn waves-effect waves-light  small" 
                onClick={this.OnClickDBOperation.bind(this,'delete')}
                type="button" name="Delete">Delete</button>
               
          </div>
        </div>
        )
      }
      else
      {
        return (
          <div>
            <h3>Data is not available</h3>
          </div>
        )
      }
    }
    render(dataId){
      return (
        this.renderComponent(this.props.dataId)
      );
    };
  }
  export default AddItem;