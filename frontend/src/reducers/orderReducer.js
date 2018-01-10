export default function orderReducer(state = false, action = []) {
  console.log('orderReducer  action.type', action.type);
  console.log('orderReducer  action.payLoad', action.payLoad);
    switch (action.type) {
      case "ADD_SHOPPING_CART": {
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
                  shoppingCart: action.payLoad
            };
          return retState;
        }
        break;
      }
      case "LIST_OF_USER_ORDERS": {
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
                  listOfUserOrders: action.payLoad
            };
          return retState;
        }
        break;
      }
      case "LIST_OF_ALL_PRODUCT_ITEMS": {
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
                  listOfAllProductItems: action.payLoad
            };
          return retState;
        }
        break;
      }
      default:
        return state;
    }
  }
  