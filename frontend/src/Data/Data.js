import  {mainStore, isUserAuthenticated, getUserGoogID} from '../mainStore';

import axios from 'axios';


export function getDataDB()
 {
     //get Data from DB on;y is you have an authenticated user.... defense in depth. This is UI level defense.
     if (!isUserAuthenticated()) 
     {
         console.log('getDataDB() - We dont have any authenticated user in the system yet.. Login is needed to run the getDataDB function');
        return;
     }
    var url = process.env.REACT_APP_DATASOURCE_CONTACTS;
    console.log('getDataDB() - our data source is ', url);//urlForGetUserData);
    console.log('########################### Data gathering started getDataDB() at - ', Date.now());
    axios.get(url)
    .then(function(response)      // 1
          {                    // 2
            var json = response.data;
            console.log('########################### Data gathering of getDataDB() Ended  at - ', Date.now());
            console.log("getDataDB() has ended -  returned json: " + json);
               
               var items = json;  
               let payloadData = [...items];
               mainStore.dispatch({type: 'DATA_READY',payLoad:payloadData});
              // mainStore.dispatch({type: 'FORM_SELECTION_CHANGED',payLoad:0});
               
          })
          .catch(error => {                  // 3
           console.log('Error is getDataDB() - ',error, ' time is - ', Date.now() );
          });
 }

 export function putDataDB(dataIn)
{
    var dataToSave = {id: dataIn.id, 
        first_name: dataIn.first_name, 
        last_name:dataIn.last_name,
        email:dataIn.email,
        subject: dataIn.subject,
        description: dataIn.description };
    var url = process.env.REACT_APP_DATASOURCE_CONTACTS;
    
    console.log('put:: dataToSave.id = ', dataToSave.id)
    var strUrl = url + '/' + dataToSave.id;
    console.log('put:: url = ', strUrl);
    console.log('Axios:put:: started with dataToSave = ', dataToSave, ' time is - ', Date.now() );
    axios.put(strUrl, dataToSave)
    .then(function (response) {
         console.log('DataCollector:putData() ', response, ' time is - ', Date.now() );
         //mainStore.dispatch({type: 'DATA_READY',payLoad:payloadData});
         //mainStore.dispatch({type: 'FORM_SELECTION_CHANGED',payLoad:0});
         getDataDB();// refesh the app with latest data from the datastore
       })
       .catch(function (error) {
            //mainStore.dispatch({type: 'DATA_READY',payLoad:payloadData});
            console.log('putDataDB   ', error, ' time is - ', Date.now() );

       });
     
}

export function deleteDataDB(idIn)
{
   var url = process.env.REACT_APP_DATASOURCE_CONTACTS;
   console.log('delete:: idIn = ', idIn)
   var strUrl = url + '/' + idIn;
   console.log('Axios: delete started with url = ', strUrl, ' time is - ', Date.now() );
   axios.delete(strUrl)
    .then(function (response) {
            console.log('deleteDataDB() completed '
            , response, ' time is - ', Date.now() );
            // var nextSel = idIn;
            // if(mainStore.getDataDB().length === idIn+1) nextSel = idIn-1;
            // if(nextSel <0) nextSel =0;
            mainStore.dispatch({type: 'FORM_SELECTION_CHANGED',payLoad:0});
            getDataDB();// refesh the app with latest data from the datastore
       })
       .catch(function (error) {
         console.log('deleteDataDB  ',error , ' time is - ', Date.now() );
       });
     
}
export function postDataDB(dataIn)
 {
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
      var dataToSave = {id: uniqid, 
      first_name: dataIn.first_name, 
      last_name:dataIn.last_name,
      email:dataIn.email,
      subject: dataIn.subject,
      description: dataIn.description };
      
    var strUrl = process.env.REACT_APP_DATASOURCE_CONTACTS;
    console.log('post:: url = ', strUrl);
    console.log('Axios post started with dataToSave = ', dataToSave, ' time is - ', Date.now() );
    axios.post(strUrl, dataToSave)
     .then(function (response) {
            console.log('postDataDB() completed with response= ', response, ' time is - ', Date.now() );
      mainStore.dispatch({type: 'FORM_SELECTION_CHANGED',payLoad:dataIn.row});
            getDataDB();// refesh the app with latest data from the datastore
        })
        .catch(function (error) {
          console.log('postDataDB()  ', error, ' time is - ', Date.now() );
        });
      
 }

 
export default getDataDB;