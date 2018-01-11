import React, {Component, history} from 'react';
import {withRouter } from 'react-router-dom';
import {browserHistory, Redirect} from 'react-router';
import  {mainStore, getUserRegInfo, getDataFromMainStore, isDataActive, getUserName, getUserRegStatus, isUserAuthenticated} from '../mainStore';
import GetUserRegistrationInfo, {SaveUserRegistrationInfoToDB} from '../Auth/QueryGoogAuth';
import createHistory, {createBrowserHistory} from 'history/createBrowserHistory';

export default class Registration extends Component
{
    constructor(props) {
        super(props);
        var dataIn = getUserRegInfo();
        this.state = {
            modalOperation : {
              showModal:false,
              operation:''
            },
            savingComplete: false,
            id: dataIn.id, 
            phone: dataIn.phone, 
            cell1:dataIn.cell1,
            email2:dataIn.email2,
            address1:dataIn.address1,
            address2:dataIn.address2,
            city:dataIn.city,
            state:dataIn.state,
            zip:dataIn.zip,
            pet: dataIn.pet,
            mothersmaidenname: dataIn.mothersmaidenname };
    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
      }
    componentWillMount()
    {
      GetUserRegistrationInfo();
    }  
     
    handleSave()
    {
        SaveUserRegistrationInfoToDB(this.state);
        this.setState({savingComplete:true});
        Redirect('/');
        //RegistrationFormFilled
    }
    showSavedMessage()
    {
        if (this.state.savingComplete) 
        {
            return (<div> Record Saved... In a few minutes, you will receive a confirmation email. 
                Please click on the link we sent you in the email to complete the registration. 
            </div>);
        }
        else
        {
            return (
            <div>Once you click on the save button, the registration record will be saved in the database and you will receive a confirmation email in a few minutes. 
                Please click on the link we sent you in the email to complete the registration. 
            </div>
            );
        }
    }
    showHeaderEmailMessage()
    {
        if (getUserRegStatus() === 30)
        return (
            <div>
                <h6> Hello,   {getUserName()},  Your registartion record is already saved in the database. You can change the record using the following fields.
                    <br/> We have sent you an email with a hyperlink to confirm your email address..,
                    <br />Please click on the link we sent you in the email to complete the registration.
                    <hr />
                </h6>
            </div>
        )
        if (getUserRegStatus() > 30)
        return (
            <div style={{textAlign:'center'}}>
                <h6> Hello,   {getUserName()},  Your registartion record is already saved in the database. You can change the record using the following fields.
                    If you change and save your record, we highly recommend you to reconfirm your email address.
                    Once you receive the confirmation email, Please click on the link we sent you in the email to complete the registration.
                    In the meanwhile, you can keep on using the "Magic Toy Store".
                    <hr />
                </h6>
            </div>
        )
    }
    renderComponent()
    {
        if ((isUserAuthenticated() && getUserRegStatus() >= 20))
        {
            var c = this.state.cell1;
            var ph = this.state.phone;
            var e = this.state.email2;
            var a1 = this.state.address1;
            var a2 = this.state.address2;
            var city = this.state.city;
            var state = this.state.state;
            var zip = this.state.zip;
            var p = this.state.pet;
            var m = this.state.mothersmaidenname;
            return(
                <div style={{border:'1px solid lightgrey'}}>
                {this.showHeaderEmailMessage()}
                <div style={{color:'black'}}>
                    <div style={{display: 'block'}}>
                    <label for="phone" style={{width:'15%', color:'black'}} >Phone:  </label>
                    <input id='phone' type="text" style={{width:'35%', color:'black'}} name="phone" 
                    placeholder='111-222-3333'
                    onChange={this.handleChange.bind(this)} 
                    value={ph}
                    />
                    </div>
                    <div>
                    <label for='cell1' style={{width:'15%', color:'black'}} >Cell:  </label>
                    <input id='cell1' type="text" style={{width:'35%', color:'black'}} name="cell1" 
                    placeholder='111-222-3333'
                    onChange={this.handleChange.bind(this)} 
                        value={c}
                    />
                    </div>
                    <div>
                        <label for="email2" style={{width:'15%', color:'black'}} >Alternate Email:  </label>
                        <input id="email2" style={{width:'85%', color:'black'}}  type="text" name="email2" 
                        placeholder='Email2'
                        onChange={this.handleChange.bind(this)} 
                        value={e}                
                        />
                    </div>
                    <div>
                        <label for="address1" style={{width:'15%', color:'black'}} >Address1:  </label>
                        <input id="address1" style={{width:'85%', color:'black'}}  type="text" name="address1" 
                        placeholder='1234, Awesone Ln.'
                        onChange={this.handleChange.bind(this)} 
                        value={a1}                
                        />
                    </div>
                    <div>
                        <label for="address2" style={{width:'15%', color:'black'}} >Address2:  </label>
                        <input id="address2" style={{width:'85%', color:'black'}}  type="text" name="address2" 
                        placeholder='Apt. Z-123'
                        onChange={this.handleChange.bind(this)} 
                        value={a2}                
                        />
                    </div>
                    <div>
                        <label for="city" style={{width:'15%', color:'black'}} >City:  </label>
                        <input id="city" style={{width:'85%', color:'black'}}  type="text" name="city" 
                        placeholder='AwesomeVille'
                        onChange={this.handleChange.bind(this)} 
                        value={city}                
                        />
                    </div>
                    <div>
                        <label for="state" style={{width:'15%', color:'black'}} >State:  </label>
                        <input id="state" style={{width:'85%', color:'black'}}  type="text" name="state" 
                        placeholder='WA'
                        onChange={this.handleChange.bind(this)} 
                        value={state}                
                        />
                    </div>
                    <div>
                        <label for="zip" style={{width:'15%', color:'black'}} >Zip:  </label>
                        <input id="zip" style={{width:'85%', color:'black'}}  type="text" name="zip" 
                        placeholder='98052'
                        onChange={this.handleChange.bind(this)} 
                        value={zip}                
                        />
                    </div>
                    <div>
                    <label for="pet" style={{color:'black'}} >Name of your pet:  </label>
                    <input id="pet" type="text" style={{color:'black'}}  name="pet" 
                    placeholder="TomTheCat :" 
                    onChange={this.handleChange.bind(this)} 
                    value={p}
                    />
                    </div>
                    <div>
                    <label for="mothersmaidenname" style={{color:'black'}} >Mother's Maiden Name:  </label>
                    <textarea id="mothersmaidenname" style={{color:'black'}}  rows="3" name="mothersmaidenname" 
                    placeholder="mothersmaidenname" 
                    onChange={this.handleChange.bind(this)} 
                    value={m}
                    />
                    </div>
                    <button style={{margin:'10px'}} disabled={this.state.savingComplete}
                    className="btn waves-effect waves-light" 
                    onClick={this.handleSave.bind(this)}
                    type="button" name="Save">Save</button>
                    
                    {this.showSavedMessage()}
                </div>
                
            </div>
            )
        }
        if ((isUserAuthenticated() && getUserRegStatus() >= 30))
        {
            return (
                <div>
                   <h6> Hello,   {getUserName()} <hr/> We have sent you an email with a hyperlink to confirm your email address..,
                    <br />Please confirm your email using the link we sent you in the email to complete the registration.
                    </h6>
                </div>);
        }
        
        return <div></div>;
    }
    render()
    {
        return (        
            <div className='myContainer' style={{border:'1px solid lightgrey'}}>
            {isUserAuthenticated() ?
                <div>
                    <div className='App App-title' >
                    <div style={{fontSize:'4vw',background:'white', fontFamily:'script', color:'hsla(244, 71%, 49%, 0.9)'}}> Welcome to the Registration Form of the Magic Toy Store </div>
                        
                    </div>
                    <div >
                        {this.renderComponent()}
                    </div>
                </div>
                :
                <div>
                    <h5> Please login with google and complete the registration process to enter the site. </h5>
                </div>
                }
            </div>
        );
    }
}