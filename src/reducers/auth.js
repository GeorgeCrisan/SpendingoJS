import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS
} from "../actions/";

export default (state = {
  isLoggingIn: false,
  isLoggingOut: false,
  isVerifying: false,
  logginError: { isError: false, message: "", statusCode: "" },
  logoutError: { isError: false, message: "", statusCode: "" },
  isAuthenticated: false,
  user: {}
}, action) => {
  console.log('Action Type:', action.type , 'Error:' ,(action?.error));
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        logginError: { isError: false, message: "", statusCode: "" }
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.payload
      };

    case LOGIN_FAILURE:
      let errorLF = action.error;
      console.log(action, '***');
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: { isError: true, message: errorLF.message, statusCode: errorLF.statusCode }
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: { isError: false, message: "", statusCode: "" }
      };

    case LOGOUT_SUCCESS:
      console.log(state, ' on logout success');
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {}
      };

      case LOGOUT_FAILURE:
        let errorLGOF = action.error;
        return {
          ...state,
          isLoggingOut: false,
          logoutError: { isError: true, message: errorLGOF.message, statusCode: errorLGOF.statusCode }
        };


    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false
      };

    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false
      };

    default:
      return state;
  };
};