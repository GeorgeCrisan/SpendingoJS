import { myFirebase } from "../firebase/firebase";

export const LOAD__BUDGET__START = 'LOAD__BUDGET__START';
export const LOAD__BUDGET__SUCCESS = 'LOAD__BUDGET__SUCCESS';
export const LOAD__BUDGET__ERROR = 'LOAD__BUDGET__ERROR';

const lbstart = () => {
  return {
    type: LOAD__BUDGET__START
  };
};

const lbsuccess = (collection) => {
  return {
    type: LOAD__BUDGET__SUCCESS,
    payload: collection
  };
};

const lberror = (err) => {
  return {
    type: LOAD__BUDGET__ERROR,
    error: err
  };
};

//Define Thunks

export const fetchBudgets = () => dispatch => {
  dispatch(lbstart());
  console.log(myFirebase.auth().currentUser.uid);
  myFirebase.firestore().collection('budgets')
    .where('ownerid', "==", myFirebase.auth().currentUser.uid)
    .orderBy('createddate', 'desc')
    .get().then((data) => {
      
      let dataParsed = [];
      data = data.forEach((el) => {
        dataParsed.push(el.data());
      });

      dispatch(lbsuccess(dataParsed));
    }).catch((e) => {
      dispatch(lberror(e));
    });
};