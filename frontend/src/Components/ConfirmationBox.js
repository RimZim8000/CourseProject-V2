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
      <div id="modal1"  style={{position: 'fixed',top:'2px', bottom:'1px',left:'1px', right:'1px',
      border:'2px solid black',
      marginLeft:'1px', marginRight:'1px', marginBottom:'1px', marginTop:'5px', display: 'block',
      backgroundColor:'blue', zIndex:'99'
      }} >
        <header className="App-header">
            <h1 className="App-title">Please Confirm</h1>
        </header>
        <div >
          <h5>You have clicked on the {this.props.childItem.operation} button. </h5>
          <h6><br/>
          If you you want to continue with the change, please click Ok. Please remember that the changes are permenent.
          <br/>
          Cancelling the {this.props.childItem.operation} operation will keep the system as it was.
          <br/>
          Please press Ok to confirm to {this.props.childItem.operation} the record.
          <br/>
          Please press Cancel to cancel the {this.props.childItem.operation} operation.
          <br/>
          </h6>
        </div>
        <div style={{position: 'absolute', bottom:'10px', width:'100%' , display: 'block'}} >
           <button className="btn modal-trigger"  
            style={{margin :'20px', right:'120px' }} 
            onClick={this.OnClickCancel.bind(this)}>Cancel</button>

          <button className="btn modal-trigger" 
            style={{right:'200px'}} 
            onClick={this.OnClickOk.bind(this)}>Ok</button>
          </div>
      </div>
    );
  }
  render(operationIn, parentState) {
    return <div className="App">{this.showConfirmation(operationIn)}</div>;
  }
}
export default ConfirmationBox;
