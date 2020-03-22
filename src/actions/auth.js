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

export const CREATEUSER_REQUEST = "CREATEUSER_REQUEST";
export const CREATEUSER_SUCCESS = "CREATEUSER_SUCCESS";
export const CREATEUSER_ERROR = "CREATEUSER_ERROR";

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_ERROR = "UPDATE_USER_ERROR";

export const REQUEST_PASS_SUCCESS = 'REQUEST_PASS_SUCCESS';
export const REQUEST_PASS_FAIL = 'REQUEST_PASS_FAIL';
export const REQUEST_PASS_START = 'REQUEST_PASS_START';

//Raw Actions
const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: user
  };
};

const errorUpdateUser = (err) => {
  return {
    type: UPDATE_USER_ERROR,
    error: err
  };
};

const requestCreateUser = () => {
  return {
    type: CREATEUSER_REQUEST
  };
};

const successCreateUser = () => {
  return {
    type: CREATEUSER_SUCCESS
  };
};

const errorCreateUser = (err) => {
  return {
    type: CREATEUSER_ERROR,
    error: err
  };
};

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

const passRequestStart = () => {
  return {
    type: REQUEST_PASS_START,
  };
};

const passRequestSuccess = () => {
  return {
    type: REQUEST_PASS_SUCCESS,
  };
};

const passRequestFail = (err) => {
  return {
    type: REQUEST_PASS_FAIL,
    error: err
  };
};

//Thunks
export const passwordReset = (email) => dispatch => {
  console.log('email', email);
  dispatch(passRequestStart());
  myFirebase
  .auth()
  .sendPasswordResetEmail(email)
  .then((data)=>{
    console.log(data);
    dispatch(passRequestSuccess(data));
  })
  .catch((err)=>{
    dispatch(passRequestFail(err));
  });
};

export const createUser = (email, password, displayName) => dispatch => {
  dispatch(requestCreateUser());

  myFirebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      const {user} = data;
      if(user) {
        user.sendEmailVerification();

        user.updateProfile({
          displayName: displayName
        }).then((user)=>{
          dispatch(updateUser(user));
        }).catch((err2)=>{
          dispatch(errorUpdateUser(err2));
        });
      }
      dispatch(successCreateUser(user));
    })
    .catch((err)=>{
      dispatch(errorCreateUser(err));
    });
}

export const loginUser = (email, password) => dispatch => {
  dispatch(requestLogin());

  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user, 'logged');
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