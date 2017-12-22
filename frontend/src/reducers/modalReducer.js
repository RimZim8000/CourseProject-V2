export default function modalReducer(state = false, action = []) {
    switch (action.type) {
      case "DATA_READY": {
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
  