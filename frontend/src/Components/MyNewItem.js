import React, {Component} from 'react';
import {isUserAuthenticated} from '../mainStore';

class MyNewItem extends Component
{
    componentWillMount()
    {
        if (!isUserAuthenticated)
        {
            this.context.router.transitionTo('/');
        }
    }
    render(){
        return(
            <div>
                Hi From New Item!
            </div>
        );

    }
}
export default MyNewItem;