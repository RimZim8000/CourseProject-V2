import  {mainStore, isUserAuthenticated, getUserGoogID, getShoppingCart,getShoppingCartPayment} from '../mainStore';

import axios from 'axios';

export function getAllItemsFromDB()
{
    var url = process.env.REACT_APP_GET_ALL_LIST_ITEMS;
    axios.get(url)
        . then(
        function(response)
        {
            console.log('axios getAllItemsFromDB response  ', response);
            var json = response.data;
            console.log('########################### Data gathering of getAllItemsFromDB Ended  at - ', Date.now());
            console.log("getAllItemsFromDB() has ended -  returned json: " , json);
               
               var items = json;  
               let payloadData = [...items];
               mainStore.dispatch({type: 'LIST_OF_ALL_PRODUCT_ITEMS',payLoad:payloadData});

            
        })
        .catch(error =>{
            console.log('error in axios getAllItemsFromDB ', error);
        });
}

export function getOrdersFromDB()
{
    var url = process.env.REACT_APP_GET_USER_ORDERS;
    axios.get(url)
        . then(
        function(response)
        {
            console.log('axios getOrdersFromDB response  ', response);
            var json = response.data;
            console.log('########################### Data gathering of getDataDB() Ended  at - ', Date.now());
            console.log("getDataDB() has ended -  returned json: " , json);
               var payloadData = [...json.reverse()];
               console.log("getDataDB() has ended -  returned json: " , payloadData);
               mainStore.dispatch({type: 'LIST_OF_USER_ORDERS',payLoad:payloadData});

            
        })
        .catch(error =>{
            console.log('error in axios post charge ', error);
        });
}
export function createOrdersInDB(dataIn)
{
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    var itemsToSave = [...dataIn.filter(item => (item.q > 0))];
    if(itemsToSave === null || itemsToSave === undefined || itemsToSave.length ===0)
    {
        console.log('itemsToSave has no items slected... ');
        mainStore.dispatch({type: 'ADD_SHOPPING_CART',payLoad:[]});
        return;
    }
    console.log('dataIn = ', dataIn);
    console.log('itemsToSave (q>0) = ', itemsToSave);
    var dataToSave = {
        id: uniqid, 
        usergoogid:getUserGoogID(),
        date:new Date().toLocaleString(),
        Items: itemsToSave
   };
      
    var strUrl = process.env.REACT_APP_DATASOURCE_ORDERS;
    console.log('post:: url = ', strUrl);
    console.log('Axios post started with createOrdersInDB = ', dataToSave, ' time is - ', Date.now() );
    axios.post(strUrl, dataToSave)
     .then(function (response) {
            console.log('createOrdersInDB completed with response= ', response, ' time is - ', Date.now() );
            mainStore.dispatch({type: 'ADD_SHOPPING_CART',payLoad:dataToSave});
        })
        .catch(function (error) {
          console.log('postDataDB()  ', error, ' time is - ', Date.now() );
        });
}
export function chargeCreditcard(token)
{
    var amountToCharge= getShoppingCartPayment();
    var order = getShoppingCart();
    console.log('getShoppingCart();  ', getShoppingCart());
    console.log('getShoppingCartPayment();  ', getShoppingCartPayment());
    var url = process.env.REACT_APP_CHARGE_STRIPE;
    axios.get(url 
            + "?email='" + token.email + "'"
            + "&token=" +  token.id 
            + "&amount=" + amountToCharge*100 
            + "&orderid='" + order.id +"'"
            )
        . then(
        function(response)
        {
            console.log('axios post charge response  ', response);
            saveOrdersToDB(token.email, token.id, amountToCharge*100, order.id, order );
            
        })
        .catch(error =>{
            console.log('error in axios post charge ', error);
        });
    console.log('submit clicked   token= ', token);

}
export function saveOrdersToDB(tokenemail, tokenid, amountToCharge, id, dataIn)
{
    console.log('dataIn = ', dataIn);
    var dataToSave = {
        id: dataIn.id, 
        email: tokenemail,
        usergoogid: dataIn.usergoogid,
        amount: amountToCharge,
        token: tokenid, 
        date:new Date().toLocaleString(),
        Items: dataIn.Items
    };

    var url = process.env.REACT_APP_SAVE_ORDER;
    var strUrl = url+'/'+id;
    console.log('put:: url = ', strUrl);
    console.log('Axios put started with saveOrderInDB = ', dataToSave, ' time is - ', Date.now() );
    axios.put(strUrl, dataToSave)
     .then(function (response) {
            console.log('saveOrderInDB completed with response= ', response, ' time is - ', Date.now() );
            mainStore.dispatch({type: 'ADD_SHOPPING_CART',payLoad:dataToSave});
            //forceGotoMain();
            //Response.redirect('/products');
        })
        .catch(function (error) {
          console.log('postDataDB()  ', error, ' time is - ', Date.now() );
        });
}

export function forceGotoMain()
{
    axios.get('/forceGotoMain')
    .then(function (response) {
  
        console.log('forceGotoMain completed with response= ', response, ' time is - ', Date.now() );
       
    })
    .catch(function (error) {
      console.log('forceGotoMain  ', error, ' time is - ', Date.now() );
    });
}


 