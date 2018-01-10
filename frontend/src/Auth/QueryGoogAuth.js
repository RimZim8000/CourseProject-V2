import axios from 'axios';
import  {mainStore} from '../mainStore';
import getDataDB from '../Data/Data';

export default function GetUserRegistrationInfo(fetchDataFromDB = false)
{
    var url = process.env.REACT_APP_GET_REGISTRATION_INFO;
    
    console.log('GetUserRegistrationInfo - our data source is ', url);//urlForGetUserData);
    console.log('........ GetUserRegistrationInfo in the function GetUserRegistrationInfo()........');
    console.log('########################### Login data gathering started  at - ', Date.now());
    axios.get(url)
    .then(function(response)      // 1
          {                    // 2
            var json = response.data;
            var inComingUserName = json.displayname;
            console.log('########################### Loging Data gathering Ended  at - ', Date.now());
            console.log('........ Data has arrived from Loing backend provider - just after .then(json => in the function getDataFromDB()........');
            console.log("GetUserRegistrationInfo- typeof json: " + typeof json);
               console.log(json);
               
               var retObj = 
               {
                   "name" : inComingUserName,
                   "otherInfo" : 'email: ' + json.email + ' google id :' +json.usergoogid
               };
               console.log(retObj);
               mainStore.dispatch({type: 'USER_LOGIN', payLoad: json } );
               console.log('GetUserRegistrationInfo function - user is - ', json, ' time is - ', Date.now() );
               if(inComingUserName.length >0 && fetchDataFromDB)
               {
                    //getDataDB();
               }
          })
          .catch(error => {                  // 3
           console.log('Error is GetUserRegistrationInfo - ',error, ' time is - ', Date.now() );
          });
}

export  function SaveUserRegistrationInfoToDB(dataIn)
{
    var url = process.env.REACT_APP_SAVE_REGISTRATION_INFO;
    url = url+'/';
        var dataToSave = {
            id: dataIn.id, 
            displayname:dataIn.displayname,
            email: dataIn.email,
            usergoogid: dataIn.usergoogid,
            regStatus: dataIn.regStatus,
            phone: dataIn.phone, 
            cell1: dataIn.cell1,
            email2: dataIn.email2,
            address1: dataIn.address1,
            address2: dataIn.address2,
            city: dataIn.city,
            state: dataIn.state,
            zip: dataIn.zip,
            mothersmaidenname: dataIn.mothersmaidenname, 
            pet: dataIn.pet
        };
        
        console.log('put:: dataToSave.id = ', dataToSave.id)
        console.log('Axios:put:: started with dataToSave = ', dataToSave, ' time is - ', Date.now() );
        axios.put(url+ dataToSave.id, dataToSave)
        .then(function (response) {
            GetUserRegistrationInfo();
             console.log('DataCollector:putData() ', response, ' time is - ', Date.now() );
           })
           .catch(function (error) {
                console.log('putDataDB   ', error, ' time is - ', Date.now() );
           });
}

export  function signOutUserFromGoogle()
{
    var url = process.env.REACT_APP_SIGN_OUT;
    
    console.log('signOutUserFromGoogle - our data source is ', url);//urlForGetUserData);
    console.log('........ signOutUserFromGoogle in the function signOutUserFromGoogle()........');
    console.log('########################### Logout data gathering started  at - ', Date.now());
    axios.get(url)
    .then(function(response)      // 1
          {                    // 2
            
            console.log('########################### Loging out gathering Ended  at - ', Date.now());
           
            mainStore.dispatch({type: 'USER_LOGIN',payLoad:false});
            mainStore.dispatch({type: 'DATA_READY',payLoad:[]});
             mainStore.dispatch({type: 'FORM_SELECTION_CHANGED',payLoad:0});
             console.log('signOutUserFromGoogle-- after Logged out ');
          })
          .catch(error => {                  // 3
           console.log('Error is signOutUserFromGoogle - ',error, ' time is - ', Date.now() );
          });
}