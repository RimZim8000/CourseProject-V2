import React, { Component } from "react";

// import 'materialize-css/dist/css/materialize.min.css';
class Dashboard extends Component
{
    render()
    {
        
        return(
            <div>
                <h1>Dash board - data is arrived</h1>
                <div className='fixed-action-btn'>
                    <a className='btn-floating btn-large red'>
                        <i className='material-icons'>+</i>
                    </a>
                </div>
            </div>
        );
    }
}

export default Dashboard;