import React, { Component } from "react";
import  { isUserAuthenticated,  getUserOtherInfo, getUserName} from '../mainStore';
import {Modal, Button} from 'react-bootstrap';
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
      
    );
    }
    
  }
  handleChildClickCancel(xx)
  {
    this.setState({modalOperation: {showModal: false, operation:'' }});
  }
    renderModal()
    {
        return (
            <div 
            >
                <div className="modal fade in" id="exampleModal" tabindex="-1" 
                role="dialog" aria-labelledby="exampleModalLabel" style={{  backgroundColor:'Red', zIndex:'1022' }}
                >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button> 
                    </div>
                    <div className="modal-body">
                    Hello ...  this is a trial dialog box. this worked in the plain React app. 
                    now it is not working when we have put the react app inside the web app
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            Inner Launch demo modal
                            </button>
            </div>
            );
    }
    render()
    {
       
        return(
            <div>
                <h4>UserInfo</h4>
                {(!this.state.modalOperation.showModal) ?
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            Outer Launch demo modal
                            </button>
                            : <div></div>
                }
                 <div className='myContainer'>
                 {(!this.state.modalOperation.showModal) ?
                  <Button onClick={this.OnClickDelete.bind(this, 'delete')} bsStyle="primary">Show Modal</Button>
                                      :
                    <div></div>
                 }
                    {this.showConfirmation()}
                   
                </div>
            </div>
        );
    }
}

export default UserInfo;