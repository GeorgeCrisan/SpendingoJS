import React, {useEffect} from 'react';
import {fetchBudgets, addBudget, removeBudget} from '../../actions';
import './userdashboard.scss';
import {connect} from 'react-redux';

import DashboardIcon from '@material-ui/icons/Dashboard';

//Components

import SelectedBudget from '../SelectedBudget.react';
import BudgetsList from '../BudgetsList.react';

const UserDashboard = (props) => {
  const {dispatch} = props;
  let [slectedState, setSelectedState] = React.useState({
    userSelected: false,
    selectedBudget: false
  });

  function removeBudgetAction(docid) {
    dispatch(removeBudget(docid));
  }

  function addBudgetAction(fbobj) {
    dispatch(addBudget(fbobj));
  }

  useEffect(()=>{
      dispatch(fetchBudgets());
  },[]);

  useEffect(()=>{
    console.log('props have changes', props);
  },[props.budgets, props.loading]);

  return (<div className='dashboard__wrapper' >
      <h1 style={{color: '#fff'}}> <DashboardIcon style={{fontSize: 36, color: '#f25e7f', position: 'relative', top: 5}} /> Dashboard.  </h1>
      <p style={{color: '#fff'}}>  Inspect, Create, Amend, Delete your budgets. </p>
      <div className='show__desktop__only' style={{ width: '100%', textAlign: 'center', height: 50, marginTop: 60, marginBottom: 30 }}> Some of my comercials banners </div>
      <div className='dashboard__content'>
        
        <SelectedBudget 
        dispatch={dispatch}
        loading={props.loading}
        budgets={props.budgets}
        selectedBudget={slectedState}
        setSelectedBudget={setSelectedState}
        />

        <BudgetsList 
          dispatch={dispatch}
          addBudgetAction={addBudgetAction}
          loading={props.loading}
          removeBudgetAction={removeBudgetAction}
          budgets={props.budgets}
        />
      </div>
      <div style={{ width: '100%', textAlign: 'center', height: 50, marginTop: 60}}> Some of my comercials banners </div>
     </div>);
};

const mapStateToProps = (state) => {
  return { 
    budgets: state.budgets.budgets,
    loading: state.budgets.loading,
    error: state.budgets.error
  };
};

export default connect(mapStateToProps)(UserDashboard);