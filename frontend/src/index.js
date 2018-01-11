import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// import 'materialize-css/dist/css/materialize.min.css';
import './index.css';
import App from './App';
import {Provider } from 'react-redux';
import  {getAllItemsFromDB} from './Data/Order';
//import 'https://ajax.aspnetcdn.com/ajax/bootstrap/3.3.7/css/bootstrap.min.css';
import initiateMainStore, {mainStore } from './mainStore';

initiateMainStore();




ReactDOM.render(<Provider store={mainStore}><App /></Provider>, document.getElementById('root'));

registerServiceWorker();

console.log('in index.js mainStore.state is - ', mainStore.getState()|| "not set");

console.log('In Index.js. REACT_APP_GOOGLE_KEY is ', process.env.REACT_APP_GOOGLE_KEY);
console.log('our env is ', process.env.NODE_ENV);
console.log('our env is userds datya source ', process.env.REACT_APP_DATASOURCE_USERS);
console.log('our env Contacts data source ', process.env.REACT_APP_DATASOURCE_CONTACTS);

console.log('our all env variables are  ', process.env);
