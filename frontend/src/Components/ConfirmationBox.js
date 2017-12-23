import React, { Component } from "react";

class ConfirmationBox extends Component {
  constructor(props) {
    super(props);
  }

  OnClickCancel() {
    //this.setState({modalOperation: {showModal: false, operation:''}});
    this.props.sendBackCancel(this.props.childItem.operation);
  }

  OnClickOk() {
    //

    this.props.sendBackOk(this.props.childItem.operation);
  }
// 
  showConfirmation() {
    return (
      <div id="modal1"  style={{position: 'fixed',top:'0px', bottom:'0px',left:'0px', right:'0px',
      border:'2px solid black', textAlign:'center',
      marginLeft:'0px', marginRight:'0px', marginBottom:'0px', marginTop:'0px', display: 'block',
      backgroundColor:'white', zIndex:'99', opacity: '1'

      }} >
      
      <div style={{ backgroundColor:'lightblue', margin:'auto', border:'2px solid black',position:'float', display: 'block',width:'50%',  
      textAlign:'center'}}>
        <header className="App-header">
            <h1 className="App-title">Please Confirm</h1>
        </header>
        <div >
          <h5>You have clicked on the {this.props.childItem.operation} button. </h5>
          <h6><br/>
          Please press Ok to confirm to {this.props.childItem.operation} the record.
          <br/>
          Please press Cancel to cancel the {this.props.childItem.operation} operation.
          <br/>
          </h6>
        </div>
        <div >
           <button className="btn modal-trigger"  
              style={{margin :'20px', right:'120px' }} 
              onClick={this.OnClickCancel.bind(this)}>Cancel</button>

            <button className="btn modal-trigger" 
              style={{right:'200px'}} 
              onClick={this.OnClickOk.bind(this)}>Ok</button>
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
