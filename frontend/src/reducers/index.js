import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import dataReducer from './dataReducer';
import formReducer from './formReducer';
import orderReducer from './orderReducer';


export default combineReducers({
    login: loginReducer,
    data: dataReducer,
    form: formReducer,
    order: orderReducer
});