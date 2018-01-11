import React, { Component } from "react";

// import 'materialize-css/dist/css/materialize.min.css';
class About extends Component
{
    render()
    {
        
        return(
            <div className='myContainer'  style={{textAlign:'center', border:'1px solid lightgrey'}}>
                <div style={{fontSize:'4vw',background:'white', fontFamily:'script mt bold', color:'purple'}}> About : Magic Toy Store </div>
                    <hr />
                <div > 
                    Magic Toy Store is dedicated to provide truely magical toys to the the brightest and most imaginative minds. 
                    Our belief is that magic can potentially open our minds to improve our creativity and imaginative spirits. 
                    
                    <hr />
                    Redmond WA
                </div>
                {/* <div className='fixed-action-btn'>
                    <a className='btn-floating btn-large red'>
                        <i className='material-icons'>+</i>
                    </a>
                </div> */}
            </div>
        );
    }
}

export default About;