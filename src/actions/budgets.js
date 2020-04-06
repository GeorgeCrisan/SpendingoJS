import { myFirebase, db } from "../firebase/firebase";

export const LOAD__BUDGET__START = 'LOAD__BUDGET__START';
export const LOAD__BUDGET__SUCCESS = 'LOAD__BUDGET__SUCCESS';
export const LOAD__BUDGET__ERROR = 'LOAD__BUDGET__ERROR';

export const SELECTED__BUDGET = 'SELECTED__BUDGET';

export const ADDENTRY__START = 'ADDENTRY__START';
export const ADDENTRY__DONE = 'ADDENTRY__DONE';
export const ADDENTRY__ERROR = 'ADDENTRY__ERROR';

const lbstart = () => {
  return {
    type: LOAD__BUDGET__START
  };
};

export const addestart = () => {
  return {
    type: ADDENTRY__START
  };
}

export const addedone = (el) => {
  return {
    type: ADDENTRY__DONE,
    payload: el
  };
}

export const addefail = (er) => {
  return {
    type: ADDENTRY__ERROR,
    error: er
  };
}

export const selectedBudget = (budget) => {
  return {
    type: SELECTED__BUDGET,
    payload: budget
  }
}


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



 export const addEntry = (budget) => dispatch => {
  dispatch(addestart());
  db.collection('budgets').doc(budget.docid).update({
    progress: budget.progress,
    entries: budget.entries,
    finalized: budget.finalized
  }).then((data)=>{
    dispatch(addedone(data));
  }).catch((err)=>{
    dispatch(addefail(err)); 
  });
}

export const removeBudget = (docid) => dispatch => {
  dispatch(selectedBudget(false));
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
    .orderBy('updateddate', 'desc')
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