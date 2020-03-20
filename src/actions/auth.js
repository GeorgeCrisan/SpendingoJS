import { myFirebase } from "../firebase/firebase";

//Constants

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";


//Raw Actions
const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const successLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  };
};

const errorLogin = (err) => {
  return {
    type: LOGIN_FAILURE,
    error: err
  };
};

const requestLogout = (err) => {
  return {
    type: LOGOUT_REQUEST,
    error: err
  };
};

const successLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};
const errorLogout = (err) => {
  return {
    type: LOGOUT_FAILURE,
    error: err
  };
};
const successCheck = () => {
  return {
    type: VERIFY_SUCCESS
  };
};

const requestCheck = () => {
  return {
    type: VERIFY_REQUEST
  };
};


//Thunks

export const loginUser = (email, password) => dispatch => {
  dispatch(requestLogin());

  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(successLogin(user));
    })
    .catch(err => {
      dispatch(errorLogin(err));
    });
};

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(successLogout());
    })
    .catch((err) => {
      dispatch(errorLogout(err));
    });
}

export const verifyAuth = () => dispatch => {
  dispatch(requestCheck());

  myFirebase
  .auth()
  .onAuthStateChanged(user => {
    if(user !== null) {
        dispatch(successLogin(user));
    }
    dispatch(successCheck());
  })
};