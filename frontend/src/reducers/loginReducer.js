export default function loginReducer(state = false, action) {
   switch (action.type) {
      case 'USER_LOGIN':
      {
        var retState = {...state};
        if (action.payLoad !== undefined ){
          retState = {
            payLoad: {...action.payLoad}
          }
        };
         if (action.payLoad === false ){
          retState = {
            payLoad: false
          }
        };
        return retState;
      }
      default:
        return state;
    }
  }
