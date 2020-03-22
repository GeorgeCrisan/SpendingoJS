import {
  LOAD__BUDGET__ERROR,
  LOAD__BUDGET__START,
  LOAD__BUDGET__SUCCESS
} from "../actions/";

export default (state = {
  error: { isError: false, message: "", statusCode: "" },
  budgets: [],
  loading: false
}, action) => {
  console.log('Action Type:', action.type , 'Error:' ,(action?.error));
  switch (action.type) {
    case LOAD__BUDGET__START:
      return {
        ...state,
        loading: true
      };

      case LOAD__BUDGET__ERROR:
        return {
          ...state,
          loading: false,
          error: { isError: true, message: action.error.message, statusCode: action.error.code}
        };

    case LOAD__BUDGET__SUCCESS:
      return {
        ...state,
        budgets: action.payload,
        error: { isError: false, message: "", statusCode: "" },
        loading: false
      };


    default:
      return state;
  };
};