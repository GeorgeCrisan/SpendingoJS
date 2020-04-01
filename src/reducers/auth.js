import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  CREATEUSER_ERROR,
  CREATEUSER_SUCCESS,
  //REATEUSER_REQUEST,
  //UPDATE_USER,
  UPDATE_USER_ERROR,
} from "../actions/";

export default (state = {
  isLoggingIn: false,
  isLoggingOut: false,
  isVerifying: false,
  logginError: { isError: false, message: "", statusCode: "" },
  logoutError: { isError: false, message: "", statusCode: "" },
  createError: { isError: false, message: "", statusCode: "" },
  isAuthenticated: false,
  user: {}
}, action) => {
  console.log('Action Type:', action.type );
  if(action?.error) {
    console.log( 'Error:' ,(action?.error));
  } 
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
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: { isError: true, message: errorLF.message, statusCode: errorLF.code }
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: { isError: false, message: "", statusCode: "" }
      };

    case LOGOUT_SUCCESS:
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
          logoutError: { isError: true, message: errorLGOF.message, statusCode: errorLGOF.code }
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

    case CREATEUSER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        createError: { isError: false, message: '', statusCode: '' }
      }

      case UPDATE_USER_ERROR:
        let errorUD = action.error;
        return {
          ...state,
          updateError: { isError: true, message: errorUD.message, statusCode: errorUD.code }
        }

    case CREATEUSER_ERROR:
      let errorCU = action.error;
      return {
        ...state,
        createError: { isError: true, message: errorCU.message, statusCode: errorCU.code }
      };

    default:
      return state;
  };
};