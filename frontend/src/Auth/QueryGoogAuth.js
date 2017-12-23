import axios from 'axios';
import  {mainStore} from '../mainStore';
import getDataDB from '../Data/Data';
export default function isUserAuthenticatedInGoogle()
{
    var urlForGetContactData = '/getLoggedInUserInfo';
    console.log('isUserAuthenticatedInGoogle - our data source is ', urlForGetContactData);//urlForGetUserData);
    console.log('........ isUserAuthenticatedInGoogle in the function isUserAuthenticatedInGoogle()........');
    console.log('########################### Login data gathering started  at - ', Date.now());
    axios.get(urlForGetContactData)
    .then(function(response)      // 1
          {                    // 2
            var json = response.data;
            var inComingUserName = json.displayname;
            console.log('########################### Loging Data gathering Ended  at - ', Date.now());
            console.log('........ Data has arrived from Loing backend provider - just after .then(json => in the function getDataFromDB()........');
            console.log("isUserAuthenticatedInGoogle- typeof json: " + typeof json);
               console.log(json);
               
               var retObj = 
               {
                   "name" : inComingUserName,
                   "otherInfo" : json.email + ' ' +json.usergoogleid
               };
               console.log(retObj);
               mainStore.dispatch({type: 'USER_LOGIN', payLoad: retObj } );
               console.log('isUserAuthenticatedInGoogle function - user is - ', retObj, ' time is - ', Date.now() );
               if(inComingUserName.length >0)
               {
                    getDataDB();
               }
          })
          .catch(error => {                  // 3
           console.log('Error is isUserAuthenticatedInGoogle - ',error, ' time is - ', Date.now() );
          });
}

export  function signOutUserFromGoogle()
{
    var urlForGetContactData = '/signout';
    console.log('signOutUserFromGoogle - our data source is ', urlForGetContactData);//urlForGetUserData);
    console.log('........ signOutUserFromGoogle in the function isUserAuthenticatedInGoogle()........');
    console.log('########################### Logout data gathering started  at - ', Date.now());
    axios.get(urlForGetContactData)
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