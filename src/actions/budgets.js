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

export const addBudget = (fbdoc)=> dispatch => {
  fbdoc.ownerid = myFirebase.auth().currentUser.uid;
  fbdoc.owner = myFirebase.auth().currentUser.email;

  myFirebase.firestore().collection('budgets').add(fbdoc).then(()=>{
      dispatch(fetchBudgets());
    }).catch((err)=>{
    //Handle if error 
    });
 };


export const removeBudget = (docid) => dispatch => {
  myFirebase.firestore().collection('budgets').doc(docid).delete().then(()=>{
    dispatch(fetchBudgets());
  }).catch((err)=>{
  //Handle if error 
  });
};
 

export const fetchBudgets = () => dispatch => {
  dispatch(lbstart());

  myFirebase.firestore().collection('budgets')
    .where('ownerid', "==", myFirebase.auth().currentUser.uid)
    .orderBy('createddate', 'desc')
    .get().then((data) => {
      let dataParsed = [];
      data = data.forEach((el) => {
        let newEl = {...el.data(), docid: el.id};
        dataParsed.push(newEl);
      });

      dispatch(lbsuccess(dataParsed));
    }).catch((e) => {
      dispatch(lberror(e));
    });
};