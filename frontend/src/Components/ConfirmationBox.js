import React, { Component } from "react";
import {Modal, Button} from 'react-bootstrap';
import 'materialize-css/dist/css/materialize.min.css';
import '../index.css';

class ConfirmationBox extends Component {
  constructor(props) {
    super(props);
    this.state ={
      flip: false,
      degrees:0,
      scale:1,
      trumble:-1
    } 
  }

  OnClickCancel() {
    this.props.sendBackCancel(this.props.childItem.operation);
  }

  OnClickOk() {
    this.props.sendBackOk(this.props.childItem.operation);
  }
// 
  onAnimate()
  {
    var s = this.state.scale;
      this.setState({scale:s+0.05});
    let f = this.state.flip;
      this.setState({flip:!f});
      if(this.state.trumble <1)
        this.setState({trumble:this.state.trumble+1});
      else
        this.setState({trumble:0});
      if(this.state.degrees==0)
    {
      this.setState({degrees:180});
    }
  }
showConfirmation() {
    return (
      <div id="modal1" style={{    
        position: 'fixed', 
        top:'0px',
        bottom:'0px',
        left:'0px',
        right:'0px',
        border:'2px solid black',
        textAlign:'center',
        margin:'0px',
        display: 'block',
        zIndex:'99',
        opacity: '1',
        backgroundColor:'white'}} >
      
      <div style={{
        backgroundColor:'lightblue',
        top:'0px',
        bottom:'0px',
        left:'0px',
        right:'0px',
        position:'absolute',
        margin:'auto',
        borderRadius:'25px',
        border:'2px solid black',
        display: 'block',
        width:'50%',
        height:'50%',
        textAlign:'center',
        opacity: '1',
        zIndex:'999'
      }} 
      className={(this.state.trumble===0 ? "slide1": "") + " " + (this.state.trumble>0 ? "slide2": "") } >
        <br />
        <header className="App-header">
            <h4>Please Confirm</h4>
        </header>
        <div>
          <h5>You have clicked on the {this.props.childItem.operation} button. </h5>
          <h6>
              <br/>
              Please press Ok to confirm to {this.props.childItem.operation} the record.
              <br/>
              Please press Cancel to cancel the {this.props.childItem.operation} operation.
              <br/>
          </h6>
        </div>
        <div>
           <button className="btn modal-trigger"  
              style={{margin :'20px', right:'120px' }} 
              onClick={this.OnClickCancel.bind(this)}>Cancel</button>

            <button className={"btn modal-trigger "}
              style={{margin:'20px'}} 
              onClick={this.OnClickOk.bind(this)}>Ok</button>

            <button className={"btn modal-trigger"}
              style={{margin:'20px'}} 
              onClick={this.onAnimate.bind(this)}>Animate</button>
          </div>
         </div>
      </div>
    );
  }
  render(operationIn, parentState) {
    return <div className="App">{this.showConfirmation(operationIn)}</div>;
  }
}
export default ConfirmationBox;
