const initialState = {payLoad :0 };
export default function formReducer(state = initialState, action = []) {
    switch (action.type) {
      case "FORM_SELECTION_CHANGED": {
        var retState = false;
        if (
          action !== null &&
          action !== undefined &&
          action !== [] &&
          action.payLoad !== null &&
          action.payLoad !== undefined &&
          action.payLoad !== [] &&
          action.payLoad.length !== 0
          ) {
                retState = {
                  payLoad: action.payLoad
            };
          return retState;
        }
        break;
      }
      default:
        return state;
    }
  }
  