import React, { Component } from "react";
import  { isUserAuthenticated,  getUserOtherInfo, getUserName} from '../mainStore';
import {Modal, Button} from 'react-bootstrap';
import GetUserRegistrationInfo from '../Auth/QueryGoogAuth';
// import 'materialize-css/dist/css/materialize.min.css';
import 'bootstrap';
class UserInfo extends Component
{
    constructor(props)
  {
    super(props);
    this.state = {
      Counter:100,
      modalOperation: {
        showModal:false,
        operation:''
      }
    }
  }
  componentWillMount()
  {
    GetUserRegistrationInfo();
  }
  OnClickDelete(xx, e)
  {
    alert(xx);
    this.setState({modalOperation: {showModal: true, operation:'delete' }});
  }
  showConfirmation()
  {

    if(this.state.modalOperation.showModal) 
    {
      const item = {'operation':this.state.modalOperation.operation,'text':'hello'};
      return (
      //   <div id="modal1"  style={{position: 'fixed',top:'0px', bottom:'0px',left:'0px', right:'0px',
      // border:'2px solid black', textAlign:'center',
      // marginLeft:'0px', marginRight:'0px', marginBottom:'0px', marginTop:'0px', display: 'block',
      // backgroundColor:'white', zIndex:'99', opacity: '0'

      // }} >
      
        <div className="static-modal">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
      
            <Modal.Body>
              One fine body...
            </Modal.Body>
      
            <Modal.Footer>
              <Button onClick={this.handleChildClickCancel.bind(this)}>Close</Button>
              <Button bsStyle="primary">Save changes</Button>
            </Modal.Footer>
      
          </Modal.Dialog>
    </div>
    // </div>
      
    );
    }
    
  }
  handleChildClickCancel(xx)
  {
    this.setState({modalOperation: {showModal: false, operation:'' }});
  }
    
    renderItens()
    {
       
        return(
            <div>
                <h4>UserInfo</h4>
                
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            Outer Launch demo modal
                            </button>
                            
                }
                 <div className='myContainer'>
                 
                  <Button onClick={this.OnClickDelete.bind(this, 'delete')} bsStyle="primary">Show Modal</Button>
                                      
                 }
                    {this.showConfirmation()}
                   
                </div>
            </div>
        );
    }

render()
{
  return(
  <div className='myContainer'>
  <h4>UserInfo</h4>
    {isUserAuthenticated() ?
    <div>
      <h5>  UserName : {getUserName()} </h5> 
      <hr />
      <h6> User email: {getUserOtherInfo()}</h6>
    </div>
     : <div></div>}
  </div>
  );
}
}
export default UserInfo;