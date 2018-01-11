import React, { Component } from "react";

// import 'materialize-css/dist/css/materialize.min.css';
class ContactUs extends Component
{
    render()
    {
        
        return(
            <div className='myContainer'  style={{textAlign:'center', border:'1px solid lightgrey'}}>
                <div style={{fontSize:'4vw',background:'white', fontFamily:'script mt bold', color:'Violet'}}> Contact us : Magic Toy Store </div>
                
                    <hr />
                <div > 
                    Email: contact@learnovica.com
                    <hr />
                    Phone: (425)233-8153 or (512)666-1804
                    <hr />
                    Redmond WA
                </div>
               
            </div>
        );
    }
}

export default ContactUs;