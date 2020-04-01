import React, {useEffect} from 'react';
import {fetchBudgets} from '../../actions';
import './userdashboard.scss';
import {connect} from 'react-redux';

import DashboardIcon from '@material-ui/icons/Dashboard';

//Components

import SelectedBudget from '../SelectedBudget.react';
import BudgetsList from '../BudgetsList.react';

const UserDashboard = (props) => {
  
  let [slectedState, setSelectedState] = React.useState({
    userSelected: false,
    selectedBudget: false
  });

  useEffect(()=>{
    const { dispatch } = props;
      dispatch(fetchBudgets());
  },[]);

  useEffect(()=>{
    console.log('props have changes', props);
  },[props.budgets, props.loading]);

  return (<div className='dashboard__wrapper' >
      <h1 style={{color: '#fff'}}> <DashboardIcon style={{fontSize: 36, color: '#f25e7f', position: 'relative', top: 5}} /> Dashboard.  </h1>
      <p style={{color: '#fff'}}>  Inspect, Create, Amend, Delete your budgets. </p>
      <div style={{ width: '100%', textAlign: 'center', height: 50, marginTop: 60, marginBottom: 30 }}> Some of my comercials banners </div>
      <div className='dashboard__content'>
        <SelectedBudget loading={props.loading} budgets={props.budgets}  selectedBudget={slectedState} setSelectedBudget={setSelectedState}/>
        <BudgetsList loading={props.loading} budgets={props.budgets} />
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