import {
  LOAD__BUDGET__ERROR,
  LOAD__BUDGET__START,
  LOAD__BUDGET__SUCCESS,
  SELECTED__BUDGET,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  ADDENTRY__DONE,
  DELETE_ACCOUNT_SUCCESS,
} from "../actions/";

export default (state = {
  error: { isError: false, message: "", statusCode: "" , selectedBudget: false},
  budgets: [],
  loading: false
}, action) => {
  //console.log('Action Type:', action.type, 'Then:', action.payload);
  switch (action.type) {
    case LOAD__BUDGET__START:
      return {
        ...state,
        loading: true
      };
      case LOGOUT_SUCCESS:
      case DELETE_ACCOUNT_SUCCESS:
        return {
          error: { isError: false, message: "", statusCode: "" , selectedBudget: false},
          budgets: [],
          loading: false
        }

      case LOAD__BUDGET__ERROR:
        return {
          ...state,
          loading: false,
          error: { isError: true, message: action.error.message, statusCode: action.error.code}
        };

    case LOAD__BUDGET__SUCCESS:
      console.log(action.payload, 'what now');
      return {
        ...state,
        budgets: action.payload,
        error: { isError: false, message: "", statusCode: "" },
        //selectedBudget: action.payload && action.payload.length > 0 ? action.payload[0] : false,
        loading: false
      };

    case LOGIN_SUCCESS: 
    case LOGOUT_SUCCESS: 
      return {
        ...state,
        budgets: [],
        isError: false,
        loading: false,
        selectedBudget: false,
      }
    case SELECTED__BUDGET: 
      return {
        ...state,
        selectedBudget: action.payload
      }

    case ADDENTRY__DONE: {
      
      let oldState = {...state};
      let budgets = oldState.budgets.map((el)=>{
        if(el.docid === action.payload.docid) {
          return action.payload;
        }
        return el;
      });

      return {
        ...state,
        budgets: budgets,
        selectedBudget: action.payload
      }
    }


    default:
      return state;
  };
};