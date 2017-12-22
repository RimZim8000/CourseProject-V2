import React, { Component } from "react";



class Test extends Component
{

    render()
    {
        var data = 
        {
            "name" : 'svs',
            "uid" : ' is mad '
        };
        return (
            <div>
                <table className="m-table">
                    <thead>
                            <tr>
                                <th>Event</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                    <tbody>
                    {data.map(function(d, i){
                   return (
                        <tr>
                            <td title="Name" key={i}>{d.name}</td>
                            <td title="Uid">{d.uid}</td>
                        </tr>
                    )
                })}

                </tbody>
                </table>
        
            </div>
        );
    }
}


export default Test;